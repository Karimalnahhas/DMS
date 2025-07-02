import React, { useState, useRef } from 'react';
import { X, Upload, File, Cloud, CheckCircle, AlertCircle } from 'lucide-react';
import { formatFileSize, getFileCategory } from '../utils/fileUtils';
import { detectProjectFromDocument, projects } from '../utils/projectDetection';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList, projectAssignments: { [key: string]: string }) => void;
}

interface FileWithProject {
  file: File;
  detectedProject: string | null;
  manualProject: string | null;
  confidence: 'high' | 'medium' | 'low' | 'none';
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileWithProject[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const analyzeFileForProject = (file: File): { projectId: string | null; confidence: 'high' | 'medium' | 'low' | 'none' } => {
    const fileName = file.name.toLowerCase();
    const category = getFileCategory(file.type);
    
    // Generate basic tags from filename
    const tags = fileName
      .replace(/\.[^/.]+$/, '') // Remove extension
      .split(/[-_\s]+/) // Split on common separators
      .filter(tag => tag.length > 2); // Filter short words
    
    const detectedProject = detectProjectFromDocument(fileName, tags);
    
    if (!detectedProject) {
      return { projectId: null, confidence: 'none' };
    }
    
    // Determine confidence based on matches
    let matchCount = 0;
    detectedProject.keywords.forEach(keyword => {
      if (fileName.includes(keyword)) matchCount++;
    });
    
    let confidence: 'high' | 'medium' | 'low' = 'low';
    if (matchCount >= 2) confidence = 'high';
    else if (matchCount === 1) confidence = 'medium';
    
    return { projectId: detectedProject.id, confidence };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const filesWithProjects = files.map(file => {
        const analysis = analyzeFileForProject(file);
        return {
          file,
          detectedProject: analysis.projectId,
          manualProject: null,
          confidence: analysis.confidence
        };
      });
      setSelectedFiles(filesWithProjects);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const filesWithProjects = files.map(file => {
        const analysis = analyzeFileForProject(file);
        return {
          file,
          detectedProject: analysis.projectId,
          manualProject: null,
          confidence: analysis.confidence
        };
      });
      setSelectedFiles(filesWithProjects);
    }
  };

  const handleProjectChange = (index: number, projectId: string) => {
    setSelectedFiles(prev => prev.map((item, i) => 
      i === index 
        ? { ...item, manualProject: projectId === 'none' ? null : projectId }
        : item
    ));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const fileList = new DataTransfer();
      const projectAssignments: { [key: string]: string } = {};
      
      selectedFiles.forEach((item, index) => {
        fileList.items.add(item.file);
        const finalProject = item.manualProject || item.detectedProject;
        if (finalProject) {
          projectAssignments[index.toString()] = finalProject;
        }
      });
      
      onUpload(fileList.files, projectAssignments);
      setSelectedFiles([]);
      onClose();
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertCircle className="w-4 h-4" />;
      case 'low': return <AlertCircle className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
            <p className="text-sm text-gray-600 mt-1">Files will be automatically assigned to projects based on content analysis</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Cloud className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop files here to upload
              </h3>
              <p className="text-gray-600 mb-4">
                or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  browse from your computer
                </button>
              </p>
              <p className="text-sm text-gray-500">
                Supports all file types up to 100MB each • Auto-detects project assignment
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Selected Files ({selectedFiles.length}) - Project Assignment
              </h3>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {selectedFiles.map((item, index) => {
                  const detectedProject = projects.find(p => p.id === item.detectedProject);
                  const finalProject = item.manualProject || item.detectedProject;
                  const selectedProject = projects.find(p => p.id === finalProject);
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.file.name}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {formatFileSize(item.file.size)}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-blue-600 font-medium">
                              {getFileCategory(item.file.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        {/* Project Detection Status */}
                        {item.detectedProject && (
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${getConfidenceColor(item.confidence)}`}>
                            {getConfidenceIcon(item.confidence)}
                            <span>{item.confidence} match</span>
                          </div>
                        )}
                        
                        {/* Project Selection */}
                        <select
                          value={finalProject || 'none'}
                          onChange={(e) => handleProjectChange(index, e.target.value)}
                          className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white min-w-48"
                        >
                          <option value="none">No Project</option>
                          {projects.map(project => (
                            <option key={project.id} value={project.id}>
                              {project.name} ({project.code})
                            </option>
                          ))}
                        </select>
                        
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Project Assignment Summary */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Project Assignment Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {projects.map(project => {
                    const assignedCount = selectedFiles.filter(item => 
                      (item.manualProject || item.detectedProject) === project.id
                    ).length;
                    
                    if (assignedCount === 0) return null;
                    
                    return (
                      <div key={project.id} className="flex items-center justify-between">
                        <span className="text-blue-800">{project.name}</span>
                        <span className="font-medium text-blue-900">{assignedCount} files</span>
                      </div>
                    );
                  })}
                  {selectedFiles.filter(item => !item.manualProject && !item.detectedProject).length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800">Unassigned</span>
                      <span className="font-medium text-blue-900">
                        {selectedFiles.filter(item => !item.manualProject && !item.detectedProject).length} files
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedFiles.length > 0 && (
              <span>
                {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                {selectedFiles.filter(item => item.detectedProject).length > 0 && (
                  <span className="ml-2 text-green-600">
                    • {selectedFiles.filter(item => item.detectedProject).length} auto-detected
                  </span>
                )}
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>
                Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};