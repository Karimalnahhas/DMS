import { useState, useEffect } from 'react';
import { Document, Category } from '../types/document';

const STORAGE_KEY = 'dms_documents';
const CATEGORIES_KEY = 'dms_categories';

const defaultCategories: Category[] = [
  { id: '1', name: 'Documents', color: 'bg-blue-500', count: 0 },
  { id: '2', name: 'Images', color: 'bg-green-500', count: 0 },
  { id: '3', name: 'Videos', color: 'bg-purple-500', count: 0 },
  { id: '4', name: 'Audio', color: 'bg-yellow-500', count: 0 },
  { id: '5', name: 'Archives', color: 'bg-red-500', count: 0 },
  { id: '6', name: 'Other', color: 'bg-gray-500', count: 0 },
];

// Sample dummy data
const dummyDocuments: Document[] = [
  {
    id: '1',
    name: 'Project Proposal.pdf',
    type: 'application/pdf',
    size: 2048576, // 2MB
    uploadDate: new Date('2024-01-15'),
    category: 'Documents',
    tags: ['proposal', 'project'],
    url: 'https://example.com/project-proposal.pdf'
  },
  {
    id: '2',
    name: 'Team Photo.jpg',
    type: 'image/jpeg',
    size: 1536000, // 1.5MB
    uploadDate: new Date('2024-01-14'),
    category: 'Images',
    tags: ['team', 'photo'],
    url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
  },
  {
    id: '3',
    name: 'Presentation.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: 5242880, // 5MB
    uploadDate: new Date('2024-01-13'),
    category: 'Documents',
    tags: ['presentation', 'slides'],
    url: 'https://example.com/presentation.pptx'
  },
  {
    id: '4',
    name: 'Meeting Recording.mp4',
    type: 'video/mp4',
    size: 15728640, // 15MB
    uploadDate: new Date('2024-01-12'),
    category: 'Videos',
    tags: ['meeting', 'recording'],
    url: 'https://example.com/meeting-recording.mp4'
  },
  {
    id: '5',
    name: 'Budget Spreadsheet.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1048576, // 1MB
    uploadDate: new Date('2024-01-11'),
    category: 'Documents',
    tags: ['budget', 'finance'],
    url: 'https://example.com/budget.xlsx'
  },
  {
    id: '6',
    name: 'Logo Design.png',
    type: 'image/png',
    size: 512000, // 500KB
    uploadDate: new Date('2024-01-10'),
    category: 'Images',
    tags: ['logo', 'design'],
    url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg'
  },
  {
    id: '7',
    name: 'Audio Notes.mp3',
    type: 'audio/mpeg',
    size: 3145728, // 3MB
    uploadDate: new Date('2024-01-09'),
    category: 'Audio',
    tags: ['notes', 'audio'],
    url: 'https://example.com/audio-notes.mp3'
  },
  {
    id: '8',
    name: 'Project Archive.zip',
    type: 'application/zip',
    size: 10485760, // 10MB
    uploadDate: new Date('2024-01-08'),
    category: 'Archives',
    tags: ['archive', 'backup'],
    url: 'https://example.com/project-archive.zip'
  },
  {
    id: '9',
    name: 'Contract.pdf',
    type: 'application/pdf',
    size: 768000, // 750KB
    uploadDate: new Date('2024-01-07'),
    category: 'Documents',
    tags: ['contract', 'legal'],
    url: 'https://example.com/contract.pdf'
  },
  {
    id: '10',
    name: 'Product Demo.mp4',
    type: 'video/mp4',
    size: 25165824, // 24MB
    uploadDate: new Date('2024-01-06'),
    category: 'Videos',
    tags: ['demo', 'product'],
    url: 'https://example.com/product-demo.mp4'
  }
];

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    const savedDocs = localStorage.getItem(STORAGE_KEY);
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    
    if (savedDocs) {
      const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
        ...doc,
        uploadDate: new Date(doc.uploadDate)
      }));
      setDocuments(parsedDocs);
    } else {
      // Load dummy data if no saved documents exist
      setDocuments(dummyDocuments);
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    
    // Update category counts
    const updatedCategories = categories.map(category => ({
      ...category,
      count: documents.filter(doc => doc.category === category.name).length
    }));
    setCategories(updatedCategories);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
  }, [documents]);

  const addDocument = (doc: Omit<Document, 'id' | 'uploadDate'>) => {
    const newDoc: Document = {
      ...doc,
      id: Date.now().toString(),
      uploadDate: new Date(),
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, ...updates } : doc
    ));
  };

  return {
    documents,
    categories,
    addDocument,
    deleteDocument,
    updateDocument,
  };
};