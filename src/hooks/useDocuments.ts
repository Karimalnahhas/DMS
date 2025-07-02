import { useState, useEffect } from 'react';
import { Document, Category } from '../types/document';
import { projects, updateProjectDocumentCount } from '../utils/projectDetection';

const STORAGE_KEY = 'dms_documents';
const CATEGORIES_KEY = 'dms_categories';

// HS Group specific document categories
const defaultCategories: Category[] = [
  { id: '1', name: 'Project Plans', color: 'bg-blue-500', count: 0 },
  { id: '2', name: 'Technical Drawings', color: 'bg-green-500', count: 0 },
  { id: '3', name: 'Contracts & Procurement', color: 'bg-purple-500', count: 0 },
  { id: '4', name: 'Engineering Reports', color: 'bg-yellow-500', count: 0 },
  { id: '5', name: 'Permits & Licenses', color: 'bg-red-500', count: 0 },
  { id: '6', name: 'Safety & HSE Documents', color: 'bg-orange-500', count: 0 },
  { id: '7', name: 'Financial & Cost Reports', color: 'bg-indigo-500', count: 0 },
  { id: '8', name: 'Client Correspondence', color: 'bg-pink-500', count: 0 },
  { id: '9', name: 'Technical Specifications', color: 'bg-teal-500', count: 0 },
  { id: '10', name: 'Site Photos & Media', color: 'bg-cyan-500', count: 0 },
  { id: '11', name: 'Quality Assurance', color: 'bg-lime-500', count: 0 },
  { id: '12', name: 'Environmental Studies', color: 'bg-emerald-500', count: 0 },
];

// Enhanced dummy data reflecting HS Group's actual operations
const dummyDocuments: Document[] = [
  // Dubai Marina Residential Complex
  {
    id: '1',
    name: 'Dubai Marina Residential Complex - Master Development Plan.pdf',
    type: 'application/pdf',
    size: 25728640,
    uploadDate: new Date('2024-01-20'),
    category: 'Project Plans',
    tags: ['dubai', 'marina', 'residential', 'complex', 'dmrc-2024', 'master-plan', 'uae'],
    url: 'https://example.com/dubai-marina-master-plan.pdf',
    projectId: 'proj-001',
    projectName: 'Dubai Marina Residential Complex'
  },
  {
    id: '2',
    name: 'Structural Foundation Analysis - Tower A & B.pdf',
    type: 'application/pdf',
    size: 18388608,
    uploadDate: new Date('2024-01-19'),
    category: 'Engineering Reports',
    tags: ['structural', 'foundation', 'analysis', 'tower', 'dmrc-2024', 'engineering'],
    url: 'https://example.com/structural-analysis.pdf',
    projectId: 'proj-001',
    projectName: 'Dubai Marina Residential Complex'
  },
  {
    id: '3',
    name: 'Architectural Drawings - Residential Floor Plans.dwg',
    type: 'application/acad',
    size: 35165824,
    uploadDate: new Date('2024-01-18'),
    category: 'Technical Drawings',
    tags: ['architectural', 'residential', 'floor-plans', 'autocad', 'dmrc-2024'],
    url: 'https://example.com/residential-floor-plans.dwg',
    projectId: 'proj-001',
    projectName: 'Dubai Marina Residential Complex'
  },

  // Abu Dhabi Government Building
  {
    id: '4',
    name: 'Abu Dhabi Government Building - MEP Systems Design.pdf',
    type: 'application/pdf',
    size: 22874368,
    uploadDate: new Date('2024-01-17'),
    category: 'Technical Specifications',
    tags: ['abu-dhabi', 'government', 'building', 'mep', 'systems', 'adgb-2024'],
    url: 'https://example.com/mep-systems.pdf',
    projectId: 'proj-002',
    projectName: 'Abu Dhabi Government Building'
  },
  {
    id: '5',
    name: 'Fire Safety & Life Protection Systems.pdf',
    type: 'application/pdf',
    size: 12582912,
    uploadDate: new Date('2024-01-16'),
    category: 'Safety & HSE Documents',
    tags: ['fire-safety', 'life-protection', 'systems', 'government', 'adgb-2024'],
    url: 'https://example.com/fire-safety.pdf',
    projectId: 'proj-002',
    projectName: 'Abu Dhabi Government Building'
  },

  // Riyadh Business District Phase 2
  {
    id: '6',
    name: 'Riyadh Business District Phase 2 - Feasibility Study.pdf',
    type: 'application/pdf',
    size: 28582912,
    uploadDate: new Date('2024-01-15'),
    category: 'Engineering Reports',
    tags: ['riyadh', 'business-district', 'phase-2', 'feasibility', 'rbd2-2024', 'saudi'],
    url: 'https://example.com/feasibility-study.pdf',
    projectId: 'proj-004',
    projectName: 'Riyadh Business District Phase 2'
  },
  {
    id: '7',
    name: 'Commercial Tower - Structural Steel Specifications.pdf',
    type: 'application/pdf',
    size: 15874368,
    uploadDate: new Date('2024-01-14'),
    category: 'Technical Specifications',
    tags: ['commercial', 'tower', 'structural', 'steel', 'specifications', 'rbd2-2024'],
    url: 'https://example.com/steel-specs.pdf',
    projectId: 'proj-004',
    projectName: 'Riyadh Business District Phase 2'
  },

  // Doha Metro Station Complex
  {
    id: '8',
    name: 'Doha Metro Station - Underground Construction Method.pdf',
    type: 'application/pdf',
    size: 31457280,
    uploadDate: new Date('2024-01-13'),
    category: 'Technical Specifications',
    tags: ['doha', 'metro', 'station', 'underground', 'construction', 'dmsc-2024', 'qatar'],
    url: 'https://example.com/underground-construction.pdf',
    projectId: 'proj-007',
    projectName: 'Doha Metro Station Complex'
  },
  {
    id: '9',
    name: 'Environmental Impact Assessment - Metro Construction.pdf',
    type: 'application/pdf',
    size: 19971520,
    uploadDate: new Date('2024-01-12'),
    category: 'Environmental Studies',
    tags: ['environmental', 'impact', 'assessment', 'metro', 'construction', 'dmsc-2024'],
    url: 'https://example.com/environmental-impact.pdf',
    projectId: 'proj-007',
    projectName: 'Doha Metro Station Complex'
  },

  // Kuwait Oil Refinery Modernization
  {
    id: '10',
    name: 'Kuwait Oil Refinery - Process Equipment Specifications.pdf',
    type: 'application/pdf',
    size: 42943040,
    uploadDate: new Date('2024-01-11'),
    category: 'Technical Specifications',
    tags: ['kuwait', 'oil', 'refinery', 'process', 'equipment', 'korm-2024', 'petrochemical'],
    url: 'https://example.com/process-equipment.pdf',
    projectId: 'proj-010',
    projectName: 'Kuwait Oil Refinery Modernization'
  },
  {
    id: '11',
    name: 'HSE Risk Assessment - Chemical Processing Units.pdf',
    type: 'application/pdf',
    size: 16291456,
    uploadDate: new Date('2024-01-10'),
    category: 'Safety & HSE Documents',
    tags: ['hse', 'risk', 'assessment', 'chemical', 'processing', 'korm-2024', 'safety'],
    url: 'https://example.com/hse-risk.pdf',
    projectId: 'proj-010',
    projectName: 'Kuwait Oil Refinery Modernization'
  },

  // Manama Bay Bridge
  {
    id: '12',
    name: 'Manama Bay Bridge - Marine Foundation Design.pdf',
    type: 'application/pdf',
    size: 38311552,
    uploadDate: new Date('2024-01-09'),
    category: 'Engineering Reports',
    tags: ['manama', 'bay', 'bridge', 'marine', 'foundation', 'mbb-2024', 'bahrain'],
    url: 'https://example.com/marine-foundation.pdf',
    projectId: 'proj-011',
    projectName: 'Manama Bay Bridge'
  },
  {
    id: '13',
    name: 'Cable Stay Bridge - Structural Analysis Report.pdf',
    type: 'application/pdf',
    size: 27825792,
    uploadDate: new Date('2024-01-08'),
    category: 'Engineering Reports',
    tags: ['cable', 'stay', 'bridge', 'structural', 'analysis', 'mbb-2024'],
    url: 'https://example.com/cable-analysis.pdf',
    projectId: 'proj-011',
    projectName: 'Manama Bay Bridge'
  },

  // Cairo New Administrative Capital
  {
    id: '14',
    name: 'Cairo Administrative Capital - Urban Planning Guidelines.pdf',
    type: 'application/pdf',
    size: 33971520,
    uploadDate: new Date('2024-01-07'),
    category: 'Project Plans',
    tags: ['cairo', 'administrative', 'capital', 'urban', 'planning', 'cnac-2024', 'egypt'],
    url: 'https://example.com/urban-planning.pdf',
    projectId: 'proj-013',
    projectName: 'Cairo New Administrative Capital'
  },
  {
    id: '15',
    name: 'Government District - Infrastructure Master Plan.pdf',
    type: 'application/pdf',
    size: 29058624,
    uploadDate: new Date('2024-01-06'),
    category: 'Project Plans',
    tags: ['government', 'district', 'infrastructure', 'master-plan', 'cnac-2024'],
    url: 'https://example.com/infrastructure-plan.pdf',
    projectId: 'proj-013',
    projectName: 'Cairo New Administrative Capital'
  },

  // General HS Group Documents
  {
    id: '16',
    name: 'HS Group - ISO 9001:2015 Quality Management Certificate.pdf',
    type: 'application/pdf',
    size: 3145728,
    uploadDate: new Date('2024-01-05'),
    category: 'Quality Assurance',
    tags: ['hs-group', 'iso', '9001', 'quality', 'management', 'certificate'],
    url: 'https://example.com/iso-certificate.pdf'
  },
  {
    id: '17',
    name: 'Company Safety Manual - 2024 Edition.pdf',
    type: 'application/pdf',
    size: 18058624,
    uploadDate: new Date('2024-01-04'),
    category: 'Safety & HSE Documents',
    tags: ['company', 'safety', 'manual', '2024', 'hse', 'procedures'],
    url: 'https://example.com/safety-manual.pdf'
  },
  {
    id: '18',
    name: 'HS Group Annual Report 2023.pdf',
    type: 'application/pdf',
    size: 12650752,
    uploadDate: new Date('2024-01-03'),
    category: 'Financial & Cost Reports',
    tags: ['hs-group', 'annual', 'report', '2023', 'financial', 'performance'],
    url: 'https://example.com/annual-report.pdf'
  },
  {
    id: '19',
    name: 'Middle East Construction Market Analysis.pdf',
    type: 'application/pdf',
    size: 15728640,
    uploadDate: new Date('2024-01-02'),
    category: 'Engineering Reports',
    tags: ['middle-east', 'construction', 'market', 'analysis', 'industry', 'trends'],
    url: 'https://example.com/market-analysis.pdf'
  },
  {
    id: '20',
    name: 'Standard Contract Template - Construction Services.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 2097152,
    uploadDate: new Date('2024-01-01'),
    category: 'Contracts & Procurement',
    tags: ['standard', 'contract', 'template', 'construction', 'services', 'legal'],
    url: 'https://example.com/contract-template.docx'
  },

  // Site Photos and Media
  {
    id: '21',
    name: 'Dubai Marina Site Progress - January 2024.jpg',
    type: 'image/jpeg',
    size: 8388608,
    uploadDate: new Date('2024-01-25'),
    category: 'Site Photos & Media',
    tags: ['dubai', 'marina', 'site', 'progress', 'january', 'dmrc-2024', 'construction'],
    url: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
    projectId: 'proj-001',
    projectName: 'Dubai Marina Residential Complex'
  },
  {
    id: '22',
    name: 'Riyadh Business District Aerial View.jpg',
    type: 'image/jpeg',
    size: 12582912,
    uploadDate: new Date('2024-01-24'),
    category: 'Site Photos & Media',
    tags: ['riyadh', 'business', 'district', 'aerial', 'view', 'rbd2-2024', 'progress'],
    url: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
    projectId: 'proj-004',
    projectName: 'Riyadh Business District Phase 2'
  },
  {
    id: '23',
    name: 'Kuwait Refinery Construction Timelapse.mp4',
    type: 'video/mp4',
    size: 157286400,
    uploadDate: new Date('2024-01-23'),
    category: 'Site Photos & Media',
    tags: ['kuwait', 'refinery', 'construction', 'timelapse', 'korm-2024', 'progress'],
    url: 'https://example.com/refinery-timelapse.mp4',
    projectId: 'proj-010',
    projectName: 'Kuwait Oil Refinery Modernization'
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