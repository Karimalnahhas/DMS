import React, { useState } from 'react';
import { Document } from '../types/document';
import { formatFileSize, getFileIcon } from '../utils/fileUtils';
import { format } from 'date-fns';
import { MoreVertical, Download, Trash2, Edit, Eye, Star } from 'lucide-react';

interface DocumentCardProps {
  document: Document;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Document>) => void;
  onClick: (document: Document) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onDelete,
  onUpdate,
  onClick,
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger onClick if clicking on menu or editing
    if (showMenu || isEditing) return;
    
    // Don't trigger if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input')) return;
    
    onClick(document);
  };

  return (
    <div 
      className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{getFileIcon(document.type)}</div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-2 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40 py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick(document);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Open
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Rename
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // In a real app, this would trigger a download
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle favorite
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Add to Favorites
                </button>
                <hr className="my-1" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(document.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-600 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyPress}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-md px-2 py-1"
              autoFocus
            />
          ) : (
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-5">
              {document.name}
            </h3>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatFileSize(document.size)}</span>
            <span>{format(document.uploadDate, 'MMM d, yyyy')}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {document.category}
            </span>
          </div>
          
          {document.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {document.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
              {document.tags.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600">
                  +{document.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};