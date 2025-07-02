import { useState, useEffect } from 'react';
import { Document, Category } from '../types/document';
import { projects, updateProjectDocumentCount } from '../utils/projectDetection';

const STORAGE_KEY = 'dms_documents';
const CATEGORIES_KEY = 'dms_categories';

const defaultCategories: Category[] = [
  { id: '1', name: 'Project Plans', color: 'bg-blue-500', count: 0 },
  { id: '2', name: 'Technical Drawings', color: 'bg-green-500', count: 0 },
  { id: '3', name: 'Contracts', color: 'bg-purple-500', count: 0 },
  { id: '4', name: 'Reports', color: 'bg-yellow-500', count: 0 },
  { id: '5', name: 'Permits & Licenses', color: 'bg-red-500', count: 0 },
  { id: '6', name: 'Safety Documents', color: 'bg-orange-500', count: 0 },
  { id: '7', name: 'Financial', color: 'bg-indigo-500', count: 0 },
  { id: '8', name: 'Correspondence', color: 'bg-pink-500', count: 0 },
  { id: '9', name: 'Specifications', color: 'bg-teal-500', count: 0 },
  { id: '10', name: 'Photos & Media', color: 'bg-cyan-500', count: 0 },
];

// Enhanced dummy data with project assignments
const dummyDocuments: Document[] = [
  // Dubai Marina Tower Project
  {
    id: '1',
    name: 'Dubai Marina Tower - Master Plan.pdf',
    type: 'application/pdf',
    size: 15728640,
    uploadDate: new Date('2024-01-20'),
    category: 'Project Plans',
    tags: ['dubai', 'marina', 'tower', 'master-plan', 'residential', 'dmt-2024'],
    url: 'https://example.com/dubai-marina-master-plan.pdf',
    projectId: 'proj-001',
    projectName: 'Dubai Marina Tower'
  },
  {
    id: '2',
    name: 'Structural Engineering Report - Tower Foundation.pdf',
    type: 'application/pdf',
    size: 8388608,
    uploadDate: new Date('2024-01-19'),
    category: 'Reports',
    tags: ['structural', 'foundation', 'engineering', 'dubai', 'tower', 'dmt-2024'],
    url: 'https://example.com/structural-report.pdf',
    projectId: 'proj-001',
    projectName: 'Dubai Marina Tower'
  },
  {
    id: '3',
    name: 'Architectural Drawings - Floor Plans.dwg',
    type: 'application/acad',
    size: 25165824,
    uploadDate: new Date('2024-01-18'),
    category: 'Technical Drawings',
    tags: ['architectural', 'floor-plans', 'autocad', 'residential', 'dmt-2024'],
    url: 'https://example.com/floor-plans.dwg',
    projectId: 'proj-001',
    projectName: 'Dubai Marina Tower'
  },
  
  // Riyadh Business District Project
  {
    id: '6',
    name: 'Riyadh Business District - Feasibility Study.pdf',
    type: 'application/pdf',
    size: 12582912,
    uploadDate: new Date('2024-01-15'),
    category: 'Reports',
    tags: ['riyadh', 'business-district', 'feasibility', 'commercial', 'rbd-2024'],
    url: 'https://example.com/feasibility-study.pdf',
    projectId: 'proj-002',
    projectName: 'Riyadh Business District'
  },
  {
    id: '7',
    name: 'MEP Systems Design - HVAC Layout.pdf',
    type: 'application/pdf',
    size: 18874368,
    uploadDate: new Date('2024-01-14'),
    category: 'Technical Drawings',
    tags: ['mep', 'hvac', 'mechanical', 'electrical', 'plumbing', 'rbd-2024'],
    url: 'https://example.com/mep-design.pdf',
    projectId: 'proj-002',
    projectName: 'Riyadh Business District'
  },
  
  // Cairo Metro Extension Project
  {
    id: '11',
    name: 'Cairo Metro Line 4 - Environmental Impact Assessment.pdf',
    type: 'application/pdf',
    size: 20971520,
    uploadDate: new Date('2024-01-10'),
    category: 'Reports',
    tags: ['cairo', 'metro', 'environmental', 'impact', 'assessment', 'cme-2024'],
    url: 'https://example.com/environmental-impact.pdf',
    projectId: 'proj-003',
    projectName: 'Cairo Metro Extension'
  },
  {
    id: '12',
    name: 'Tunnel Boring Machine Specifications.pdf',
    type: 'application/pdf',
    size: 7340032,
    uploadDate: new Date('2024-01-09'),
    category: 'Specifications',
    tags: ['tunnel', 'boring', 'machine', 'specifications', 'metro', 'cme-2024'],
    url: 'https://example.com/tbm-specs.pdf',
    projectId: 'proj-003',
    projectName: 'Cairo Metro Extension'
  },
  
  // Kuwait Oil Refinery Project
  {
    id: '16',
    name: 'Oil Refinery Modernization - Process Flow Diagram.pdf',
    type: 'application/pdf',
    size: 31457280,
    uploadDate: new Date('2024-01-05'),
    category: 'Technical Drawings',
    tags: ['oil', 'refinery', 'process', 'flow', 'diagram', 'kuwait', 'kor-2024'],
    url: 'https://example.com/process-flow.pdf',
    projectId: 'proj-004',
    projectName: 'Kuwait Oil Refinery'
  },
  {
    id: '17',
    name: 'HSE Risk Assessment - Chemical Handling.pdf',
    type: 'application/pdf',
    size: 6291456,
    uploadDate: new Date('2024-01-04'),
    category: 'Safety Documents',
    tags: ['hse', 'risk', 'assessment', 'chemical', 'handling', 'safety', 'kor-2024'],
    url: 'https://example.com/hse-risk-assessment.pdf',
    projectId: 'proj-004',
    projectName: 'Kuwait Oil Refinery'
  },
  
  // Doha Airport Terminal Project
  {
    id: '21',
    name: 'Airport Terminal - Structural Steel Drawings.dwg',
    type: 'application/acad',
    size: 41943040,
    uploadDate: new Date('2023-12-30'),
    category: 'Technical Drawings',
    tags: ['airport', 'terminal', 'structural', 'steel', 'doha', 'dat-2024'],
    url: 'https://example.com/steel-drawings.dwg',
    projectId: 'proj-005',
    projectName: 'Doha Airport Terminal'
  },
  {
    id: '22',
    name: 'Fire Safety System Design.pdf',
    type: 'application/pdf',
    size: 13631488,
    uploadDate: new Date('2023-12-29'),
    category: 'Safety Documents',
    tags: ['fire', 'safety', 'system', 'design', 'airport', 'terminal', 'dat-2024'],
    url: 'https://example.com/fire-safety.pdf',
    projectId: 'proj-005',
    projectName: 'Doha Airport Terminal'
  },
  
  // Abu Dhabi Hospital Project
  {
    id: '26',
    name: 'Hospital Medical Equipment Layout.pdf',
    type: 'application/pdf',
    size: 22020096,
    uploadDate: new Date('2023-12-25'),
    category: 'Technical Drawings',
    tags: ['hospital', 'medical', 'equipment', 'layout', 'abu-dhabi', 'adh-2024'],
    url: 'https://example.com/medical-layout.pdf',
    projectId: 'proj-006',
    projectName: 'Abu Dhabi Hospital'
  },
  {
    id: '27',
    name: 'HVAC System Performance Report.pdf',
    type: 'application/pdf',
    size: 11534336,
    uploadDate: new Date('2023-12-24'),
    category: 'Reports',
    tags: ['hvac', 'performance', 'report', 'hospital', 'systems', 'adh-2024'],
    url: 'https://example.com/hvac-performance.pdf',
    projectId: 'proj-006',
    projectName: 'Abu Dhabi Hospital'
  },
  
  // Bahrain Bridge Project
  {
    id: '31',
    name: 'Bridge Design - Cable Stay Analysis.pdf',
    type: 'application/pdf',
    size: 28311552,
    uploadDate: new Date('2023-12-20'),
    category: 'Technical Drawings',
    tags: ['bridge', 'cable', 'stay', 'analysis', 'bahrain', 'bbp-2024'],
    url: 'https://example.com/cable-analysis.pdf',
    projectId: 'proj-007',
    projectName: 'Bahrain Bridge Project'
  },
  {
    id: '32',
    name: 'Marine Environmental Study.pdf',
    type: 'application/pdf',
    size: 17825792,
    uploadDate: new Date('2023-12-19'),
    category: 'Reports',
    tags: ['marine', 'environmental', 'study', 'bridge', 'impact', 'bbp-2024'],
    url: 'https://example.com/marine-study.pdf',
    projectId: 'proj-007',
    projectName: 'Bahrain Bridge Project'
  },
  
  // General/Unassigned Documents
  {
    id: '4',
    name: 'Construction Contract - Main Contractor.pdf',
    type: 'application/pdf',
    size: 3145728,
    uploadDate: new Date('2024-01-17'),
    category: 'Contracts',
    tags: ['contract', 'main-contractor', 'legal', 'construction'],
    url: 'https://example.com/main-contract.pdf'
  },
  {
    id: '5',
    name: 'Building Permit - Dubai Municipality.pdf',
    type: 'application/pdf',
    size: 2097152,
    uploadDate: new Date('2024-01-16'),
    category: 'Permits & Licenses',
    tags: ['permit', 'municipality', 'dubai', 'building'],
    url: 'https://example.com/building-permit.pdf'
  },
  {
    id: '36',
    name: 'Company Safety Manual 2024.pdf',
    type: 'application/pdf',
    size: 12058624,
    uploadDate: new Date('2023-12-15'),
    category: 'Safety Documents',
    tags: ['company', 'safety', 'manual', '2024', 'procedures'],
    url: 'https://example.com/safety-manual.pdf'
  },
  {
    id: '37',
    name: 'ISO 9001 Certification.pdf',
    type: 'application/pdf',
    size: 2359296,
    uploadDate: new Date('2023-12-14'),
    category: 'Permits & Licenses',
    tags: ['iso', '9001', 'certification', 'quality', 'management'],
    url: 'https://example.com/iso-certification.pdf'
  },
  {
    id: '38',
    name: 'Annual Financial Report 2023.pdf',
    type: 'application/pdf',
    size: 8650752,
    uploadDate: new Date('2023-12-13'),
    category: 'Financial',
    tags: ['annual', 'financial', 'report', '2023', 'company'],
    url: 'https://example.com/annual-report.pdf'
  }
];

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>(dummyDocuments);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  // Clear localStorage and force reload dummy data
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
    
    setDocuments(dummyDocuments);
    setCategories(defaultCategories);
  }, []);

  useEffect(() => {
    // Update category counts whenever documents change
    const updatedCategories = defaultCategories.map(category => ({
      ...category,
      count: documents.filter(doc => doc.category === category.name).length
    }));
    setCategories(updatedCategories);

    // Update project document counts
    projects.forEach(project => {
      const count = documents.filter(doc => doc.projectId === project.id).length;
      updateProjectDocumentCount(project.id, count);
    });
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