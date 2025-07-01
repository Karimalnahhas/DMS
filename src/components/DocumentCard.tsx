import React, { useState } from 'react';
import { Document } from '../types/document';
import { formatFileSize, getFileIcon } from '../utils/fileUtils';
import { format } from 'date-fns';
import { MoreVertical, Download, Trash2, Edit, Eye } from 'lucide-react';

interface DocumentCardProps {
  document: Document;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Document>) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onDelete,
  onUpdate,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(document.name);

  const handleSaveEdit = () => {
    if (editName.trim() && editName !== document.name) {
      onUpdate(document.id, { name: editName.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditName(document.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-32">
            <button
              onClick={() => {
                setIsEditing(true);
                setShowMenu(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center"
            >
              <Edit className="w-3 h-3 mr-2" />
              Rename
            </button>
            <button
              onClick={() => {
                if (document.url) {
                  window.open(document.url, '_blank');
                }
                setShowMenu(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center"
            >
              <Eye className="w-3 h-3 mr-2" />
              Preview
            </button>
            <button
              onClick={() => {
                // In a real app, this would trigger a download
                setShowMenu(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center"
            >
              <Download className="w-3 h-3 mr-2" />
              Download
            </button>
            <hr className="my-1" />
            <button
              onClick={() => {
                onDelete(document.id);
                setShowMenu(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-600 flex items-center"
            >
              <Trash2 className="w-3 h-3 mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="text-4xl mb-3">
          {getFileIcon(document.type)}
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyPress}
            className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded px-2 py-1 w-full text-center"
            autoFocus
          />
        ) : (
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
            {document.name}
          </h3>
        )}
        
        <p className="text-xs text-gray-500 mb-2">{formatFileSize(document.size)}</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {document.category}
          </span>
        </div>
        
        <p className="text-xs text-gray-400">
          {format(document.uploadDate, 'MMM d, yyyy')}
        </p>
      </div>
    </div>
  );
};