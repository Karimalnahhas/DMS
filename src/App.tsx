import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DocumentGrid } from './components/DocumentGrid';
import { UploadModal } from './components/UploadModal';
import { DocumentViewer } from './components/DocumentViewer';
import { useDocuments } from './hooks/useDocuments';
import { getFileCategory, getCategoryFromFilename } from './utils/fileUtils';
import { getProjectById, generateProjectTags } from './utils/projectDetection';
import { Document } from './types/document';

function App() {
  const { documents, categories, addDocument, deleteDocument, updateDocument } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (doc.projectName && doc.projectName.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [documents, searchTerm, selectedCategory]);

  const handleFileUpload = (files: FileList, projectAssignments: { [key: string]: string }) => {
    Array.from(files).forEach((file, index) => {
      // Create a mock URL for demo purposes
      const url = URL.createObjectURL(file);
      
      // Get project assignment
      const projectId = projectAssignments[index.toString()];
      const project = projectId ? getProjectById(projectId) : null;
      
      // Determine category from filename and file type
      const categoryFromFilename = getCategoryFromFilename(file.name);
      const categoryFromType = getFileCategory(file.type);
      const finalCategory = categoryFromFilename !== 'Technical Specifications' ? categoryFromFilename : categoryFromType;
      
      // Generate tags based on file and project
      let tags: string[] = [];
      
      // Add basic tags from filename
      const baseFileName = file.name.replace(/\.[^/.]+$/, '').toLowerCase();
      const basicTags = baseFileName
        .split(/[-_\s]+/)
        .filter(tag => tag.length > 2)
        .slice(0, 4); // Limit to 4 basic tags
      
      tags.push(...basicTags);
      
      // Add project-specific tags if assigned
      if (project) {
        const projectTags = generateProjectTags(project);
        tags.push(...projectTags);
      }
      
      // Add category-based tags
      if (finalCategory === 'Technical Drawings') {
        tags.push('cad', 'design', 'architectural');
      } else if (finalCategory === 'Engineering Reports') {
        tags.push('analysis', 'engineering', 'technical');
      } else if (finalCategory === 'Safety & HSE Documents') {
        tags.push('safety', 'hse', 'compliance');
      } else if (finalCategory === 'Site Photos & Media') {
        tags.push('site', 'progress', 'visual');
      } else if (finalCategory === 'Financial & Cost Reports') {
        tags.push('financial', 'cost', 'budget');
      }
      
      // Add location-based tags if project has location
      if (project) {
        const location = project.location.toLowerCase();
        if (location.includes('dubai')) tags.push('dubai', 'uae');
        if (location.includes('riyadh')) tags.push('riyadh', 'saudi');
        if (location.includes('doha')) tags.push('doha', 'qatar');
        if (location.includes('kuwait')) tags.push('kuwait');
        if (location.includes('bahrain')) tags.push('bahrain');
        if (location.includes('cairo')) tags.push('cairo', 'egypt');
        if (location.includes('amman')) tags.push('amman', 'jordan');
        if (location.includes('beirut')) tags.push('beirut', 'lebanon');
      }
      
      // Remove duplicates and limit total tags
      tags = [...new Set(tags)].slice(0, 8);
      
      addDocument({
        name: file.name,
        type: file.type,
        size: file.size,
        category: finalCategory,
        tags,
        url,
        projectId: project?.id,
        projectName: project?.name,
      });
    });
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleCloseViewer = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onUploadClick={() => setIsUploadModalOpen(true)}
      />
      
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedCategory || 'All Documents'}
                  </h1>
                  <p className="text-gray-600 flex items-center space-x-4">
                    <span>{filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found</span>
                    {searchTerm && (
                      <span className="text-blue-600">• Searching for "{searchTerm}"</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                    Sort by: Date Modified
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                    Filter
                  </button>
                </div>
              </div>
            </div>
            
            <DocumentGrid
              documents={filteredDocuments}
              onDocumentDelete={deleteDocument}
              onDocumentUpdate={updateDocument}
              onDocumentClick={handleDocumentClick}
              viewMode={viewMode}
            />
          </div>
        </main>
      </div>
      
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
      />

      <DocumentViewer
        document={selectedDocument}
        onClose={handleCloseViewer}
      />
    </div>
  );
}

export default App;