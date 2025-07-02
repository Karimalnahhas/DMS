import React from 'react';
import { Document } from '../types/document';
import { DocumentCard } from './DocumentCard';
import { DocumentListItem } from './DocumentListItem';

interface DocumentGridProps {
  documents: Document[];
  onDocumentDelete: (id: string) => void;
  onDocumentUpdate: (id: string, updates: Partial<Document>) => void;
  viewMode: 'grid' | 'list';
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  onDocumentDelete,
  onDocumentUpdate,
  viewMode,
}) => {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No documents found</h3>
        <p className="text-gray-600 text-center max-w-md">
          Upload your first document or adjust your search criteria to see documents here.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-1"></div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {documents.map((document) => (
            <DocumentListItem
              key={document.id}
              document={document}
              onDelete={onDocumentDelete}
              onUpdate={onDocumentUpdate}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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