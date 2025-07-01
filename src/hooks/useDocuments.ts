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