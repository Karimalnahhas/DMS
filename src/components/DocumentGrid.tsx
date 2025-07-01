import React from 'react';
import { Document } from '../types/document';
import { DocumentCard } from './DocumentCard';

interface DocumentGridProps {
  documents: Document[];
  onDocumentDelete: (id: string) => void;
  onDocumentUpdate: (id: string, updates: Partial<Document>) => void;
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  onDocumentDelete,
  onDocumentUpdate,
}) => {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <div className="text-6xl mb-4">📁</div>
        <h3 className="text-lg font-medium mb-2">No documents found</h3>
        <p className="text-sm">Upload your first document to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onDelete={onDocumentDelete}
          onUpdate={onDocumentUpdate}
        />
      ))}
    </div>
  );
};