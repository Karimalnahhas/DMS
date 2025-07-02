import { useState, useEffect } from 'react';
import { Document, Category } from '../types/document';

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

// Comprehensive dummy data for HS Group construction and consultancy projects
const dummyDocuments: Document[] = [
  // Dubai Marina Tower Project
  {
    id: '1',
    name: 'Dubai Marina Tower - Master Plan.pdf',
    type: 'application/pdf',
    size: 15728640, // 15MB
    uploadDate: new Date('2024-01-20'),
    category: 'Project Plans',
    tags: ['dubai', 'marina', 'tower', 'master-plan', 'residential'],
    url: 'https://example.com/dubai-marina-master-plan.pdf'
  },
  {
    id: '2',
    name: 'Structural Engineering Report - Tower Foundation.pdf',
    type: 'application/pdf',
    size: 8388608, // 8MB
    uploadDate: new Date('2024-01-19'),
    category: 'Reports',
    tags: ['structural', 'foundation', 'engineering', 'dubai', 'tower'],
    url: 'https://example.com/structural-report.pdf'
  },
  {
    id: '3',
    name: 'Architectural Drawings - Floor Plans.dwg',
    type: 'application/acad',
    size: 25165824, // 24MB
    uploadDate: new Date('2024-01-18'),
    category: 'Technical Drawings',
    tags: ['architectural', 'floor-plans', 'autocad', 'residential'],
    url: 'https://example.com/floor-plans.dwg'
  },
  {
    id: '4',
    name: 'Construction Contract - Main Contractor.pdf',
    type: 'application/pdf',
    size: 3145728, // 3MB
    uploadDate: new Date('2024-01-17'),
    category: 'Contracts',
    tags: ['contract', 'main-contractor', 'legal', 'construction'],
    url: 'https://example.com/main-contract.pdf'
  },
  {
    id: '5',
    name: 'Building Permit - Dubai Municipality.pdf',
    type: 'application/pdf',
    size: 2097152, // 2MB
    uploadDate: new Date('2024-01-16'),
    category: 'Permits & Licenses',
    tags: ['permit', 'municipality', 'dubai', 'building'],
    url: 'https://example.com/building-permit.pdf'
  },
  
  // Riyadh Business District Project
  {
    id: '6',
    name: 'Riyadh Business District - Feasibility Study.pdf',
    type: 'application/pdf',
    size: 12582912, // 12MB
    uploadDate: new Date('2024-01-15'),
    category: 'Reports',
    tags: ['riyadh', 'business-district', 'feasibility', 'commercial'],
    url: 'https://example.com/feasibility-study.pdf'
  },
  {
    id: '7',
    name: 'MEP Systems Design - HVAC Layout.pdf',
    type: 'application/pdf',
    size: 18874368, // 18MB
    uploadDate: new Date('2024-01-14'),
    category: 'Technical Drawings',
    tags: ['mep', 'hvac', 'mechanical', 'electrical', 'plumbing'],
    url: 'https://example.com/mep-design.pdf'
  },
  {
    id: '8',
    name: 'Safety Management Plan.pdf',
    type: 'application/pdf',
    size: 5242880, // 5MB
    uploadDate: new Date('2024-01-13'),
    category: 'Safety Documents',
    tags: ['safety', 'management', 'plan', 'construction', 'health'],
    url: 'https://example.com/safety-plan.pdf'
  },
  {
    id: '9',
    name: 'Project Budget - Q1 2024.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1048576, // 1MB
    uploadDate: new Date('2024-01-12'),
    category: 'Financial',
    tags: ['budget', 'financial', 'q1', '2024', 'costs'],
    url: 'https://example.com/project-budget.xlsx'
  },
  {
    id: '10',
    name: 'Site Survey Photos - January 2024.zip',
    type: 'application/zip',
    size: 52428800, // 50MB
    uploadDate: new Date('2024-01-11'),
    category: 'Photos & Media',
    tags: ['photos', 'site-survey', 'january', 'documentation'],
    url: 'https://example.com/site-photos.zip'
  },
  
  // Cairo Metro Extension Project
  {
    id: '11',
    name: 'Cairo Metro Line 4 - Environmental Impact Assessment.pdf',
    type: 'application/pdf',
    size: 20971520, // 20MB
    uploadDate: new Date('2024-01-10'),
    category: 'Reports',
    tags: ['cairo', 'metro', 'environmental', 'impact', 'assessment'],
    url: 'https://example.com/environmental-impact.pdf'
  },
  {
    id: '12',
    name: 'Tunnel Boring Machine Specifications.pdf',
    type: 'application/pdf',
    size: 7340032, // 7MB
    uploadDate: new Date('2024-01-09'),
    category: 'Specifications',
    tags: ['tunnel', 'boring', 'machine', 'specifications', 'metro'],
    url: 'https://example.com/tbm-specs.pdf'
  },
  {
    id: '13',
    name: 'Geotechnical Investigation Report.pdf',
    type: 'application/pdf',
    size: 16777216, // 16MB
    uploadDate: new Date('2024-01-08'),
    category: 'Reports',
    tags: ['geotechnical', 'investigation', 'soil', 'analysis', 'foundation'],
    url: 'https://example.com/geotechnical-report.pdf'
  },
  {
    id: '14',
    name: 'Station Design - Architectural Renderings.psd',
    type: 'image/vnd.adobe.photoshop',
    size: 104857600, // 100MB
    uploadDate: new Date('2024-01-07'),
    category: 'Technical Drawings',
    tags: ['station', 'design', 'architectural', 'renderings', 'photoshop'],
    url: 'https://example.com/station-renderings.psd'
  },
  {
    id: '15',
    name: 'Client Correspondence - Ministry of Transport.pdf',
    type: 'application/pdf',
    size: 1572864, // 1.5MB
    uploadDate: new Date('2024-01-06'),
    category: 'Correspondence',
    tags: ['correspondence', 'ministry', 'transport', 'client', 'official'],
    url: 'https://example.com/ministry-correspondence.pdf'
  },
  
  // Kuwait Oil Refinery Project
  {
    id: '16',
    name: 'Oil Refinery Modernization - Process Flow Diagram.pdf',
    type: 'application/pdf',
    size: 31457280, // 30MB
    uploadDate: new Date('2024-01-05'),
    category: 'Technical Drawings',
    tags: ['oil', 'refinery', 'process', 'flow', 'diagram', 'kuwait'],
    url: 'https://example.com/process-flow.pdf'
  },
  {
    id: '17',
    name: 'HSE Risk Assessment - Chemical Handling.pdf',
    type: 'application/pdf',
    size: 6291456, // 6MB
    uploadDate: new Date('2024-01-04'),
    category: 'Safety Documents',
    tags: ['hse', 'risk', 'assessment', 'chemical', 'handling', 'safety'],
    url: 'https://example.com/hse-risk-assessment.pdf'
  },
  {
    id: '18',
    name: 'Equipment Procurement Contract - Pumps & Valves.pdf',
    type: 'application/pdf',
    size: 4194304, // 4MB
    uploadDate: new Date('2024-01-03'),
    category: 'Contracts',
    tags: ['procurement', 'equipment', 'pumps', 'valves', 'contract'],
    url: 'https://example.com/equipment-contract.pdf'
  },
  {
    id: '19',
    name: 'Quality Control Procedures.pdf',
    type: 'application/pdf',
    size: 3670016, // 3.5MB
    uploadDate: new Date('2024-01-02'),
    category: 'Specifications',
    tags: ['quality', 'control', 'procedures', 'standards', 'compliance'],
    url: 'https://example.com/quality-procedures.pdf'
  },
  {
    id: '20',
    name: 'Monthly Progress Report - December 2023.pdf',
    type: 'application/pdf',
    size: 9437184, // 9MB
    uploadDate: new Date('2024-01-01'),
    category: 'Reports',
    tags: ['progress', 'report', 'monthly', 'december', '2023'],
    url: 'https://example.com/progress-report.pdf'
  },
  
  // Doha Airport Terminal Project
  {
    id: '21',
    name: 'Airport Terminal - Structural Steel Drawings.dwg',
    type: 'application/acad',
    size: 41943040, // 40MB
    uploadDate: new Date('2023-12-30'),
    category: 'Technical Drawings',
    tags: ['airport', 'terminal', 'structural', 'steel', 'doha'],
    url: 'https://example.com/steel-drawings.dwg'
  },
  {
    id: '22',
    name: 'Fire Safety System Design.pdf',
    type: 'application/pdf',
    size: 13631488, // 13MB
    uploadDate: new Date('2023-12-29'),
    category: 'Safety Documents',
    tags: ['fire', 'safety', 'system', 'design', 'airport', 'terminal'],
    url: 'https://example.com/fire-safety.pdf'
  },
  {
    id: '23',
    name: 'Baggage Handling System Specifications.pdf',
    type: 'application/pdf',
    size: 8912896, // 8.5MB
    uploadDate: new Date('2023-12-28'),
    category: 'Specifications',
    tags: ['baggage', 'handling', 'system', 'airport', 'specifications'],
    url: 'https://example.com/baggage-system.pdf'
  },
  {
    id: '24',
    name: 'Construction Progress Photos - Week 52.zip',
    type: 'application/zip',
    size: 73400320, // 70MB
    uploadDate: new Date('2023-12-27'),
    category: 'Photos & Media',
    tags: ['construction', 'progress', 'photos', 'week52', 'documentation'],
    url: 'https://example.com/progress-photos.zip'
  },
  {
    id: '25',
    name: 'Change Order #15 - Terminal Expansion.pdf',
    type: 'application/pdf',
    size: 2621440, // 2.5MB
    uploadDate: new Date('2023-12-26'),
    category: 'Contracts',
    tags: ['change', 'order', 'terminal', 'expansion', 'contract'],
    url: 'https://example.com/change-order-15.pdf'
  },
  
  // Abu Dhabi Hospital Project
  {
    id: '26',
    name: 'Hospital Medical Equipment Layout.pdf',
    type: 'application/pdf',
    size: 22020096, // 21MB
    uploadDate: new Date('2023-12-25'),
    category: 'Technical Drawings',
    tags: ['hospital', 'medical', 'equipment', 'layout', 'abu-dhabi'],
    url: 'https://example.com/medical-layout.pdf'
  },
  {
    id: '27',
    name: 'HVAC System Performance Report.pdf',
    type: 'application/pdf',
    size: 11534336, // 11MB
    uploadDate: new Date('2023-12-24'),
    category: 'Reports',
    tags: ['hvac', 'performance', 'report', 'hospital', 'systems'],
    url: 'https://example.com/hvac-performance.pdf'
  },
  {
    id: '28',
    name: 'Medical Gas System Certification.pdf',
    type: 'application/pdf',
    size: 3932160, // 3.75MB
    uploadDate: new Date('2023-12-23'),
    category: 'Permits & Licenses',
    tags: ['medical', 'gas', 'system', 'certification', 'hospital'],
    url: 'https://example.com/gas-certification.pdf'
  },
  {
    id: '29',
    name: 'Project Financial Summary - Q4 2023.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1310720, // 1.25MB
    uploadDate: new Date('2023-12-22'),
    category: 'Financial',
    tags: ['financial', 'summary', 'q4', '2023', 'hospital'],
    url: 'https://example.com/financial-summary.xlsx'
  },
  {
    id: '30',
    name: 'Infection Control Guidelines.pdf',
    type: 'application/pdf',
    size: 4718592, // 4.5MB
    uploadDate: new Date('2023-12-21'),
    category: 'Safety Documents',
    tags: ['infection', 'control', 'guidelines', 'hospital', 'safety'],
    url: 'https://example.com/infection-control.pdf'
  },
  
  // Bahrain Bridge Project
  {
    id: '31',
    name: 'Bridge Design - Cable Stay Analysis.pdf',
    type: 'application/pdf',
    size: 28311552, // 27MB
    uploadDate: new Date('2023-12-20'),
    category: 'Technical Drawings',
    tags: ['bridge', 'cable', 'stay', 'analysis', 'bahrain'],
    url: 'https://example.com/cable-analysis.pdf'
  },
  {
    id: '32',
    name: 'Marine Environmental Study.pdf',
    type: 'application/pdf',
    size: 17825792, // 17MB
    uploadDate: new Date('2023-12-19'),
    category: 'Reports',
    tags: ['marine', 'environmental', 'study', 'bridge', 'impact'],
    url: 'https://example.com/marine-study.pdf'
  },
  {
    id: '33',
    name: 'Pile Foundation Installation Procedure.pdf',
    type: 'application/pdf',
    size: 6815744, // 6.5MB
    uploadDate: new Date('2023-12-18'),
    category: 'Specifications',
    tags: ['pile', 'foundation', 'installation', 'procedure', 'marine'],
    url: 'https://example.com/pile-procedure.pdf'
  },
  {
    id: '34',
    name: 'Navigation Impact Assessment.pdf',
    type: 'application/pdf',
    size: 9961472, // 9.5MB
    uploadDate: new Date('2023-12-17'),
    category: 'Reports',
    tags: ['navigation', 'impact', 'assessment', 'marine', 'traffic'],
    url: 'https://example.com/navigation-impact.pdf'
  },
  {
    id: '35',
    name: 'Bridge Lighting Design.pdf',
    type: 'application/pdf',
    size: 15204352, // 14.5MB
    uploadDate: new Date('2023-12-16'),
    category: 'Technical Drawings',
    tags: ['bridge', 'lighting', 'design', 'electrical', 'aesthetic'],
    url: 'https://example.com/lighting-design.pdf'
  },
  
  // Additional Documents
  {
    id: '36',
    name: 'Company Safety Manual 2024.pdf',
    type: 'application/pdf',
    size: 12058624, // 11.5MB
    uploadDate: new Date('2023-12-15'),
    category: 'Safety Documents',
    tags: ['company', 'safety', 'manual', '2024', 'procedures'],
    url: 'https://example.com/safety-manual.pdf'
  },
  {
    id: '37',
    name: 'ISO 9001 Certification.pdf',
    type: 'application/pdf',
    size: 2359296, // 2.25MB
    uploadDate: new Date('2023-12-14'),
    category: 'Permits & Licenses',
    tags: ['iso', '9001', 'certification', 'quality', 'management'],
    url: 'https://example.com/iso-certification.pdf'
  },
  {
    id: '38',
    name: 'Annual Financial Report 2023.pdf',
    type: 'application/pdf',
    size: 8650752, // 8.25MB
    uploadDate: new Date('2023-12-13'),
    category: 'Financial',
    tags: ['annual', 'financial', 'report', '2023', 'company'],
    url: 'https://example.com/annual-report.pdf'
  },
  {
    id: '39',
    name: 'BIM Modeling Standards.pdf',
    type: 'application/pdf',
    size: 5767168, // 5.5MB
    uploadDate: new Date('2023-12-12'),
    category: 'Specifications',
    tags: ['bim', 'modeling', 'standards', 'guidelines', 'cad'],
    url: 'https://example.com/bim-standards.pdf'
  },
  {
    id: '40',
    name: 'Project Portfolio Overview.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: 45088768, // 43MB
    uploadDate: new Date('2023-12-11'),
    category: 'Reports',
    tags: ['portfolio', 'overview', 'presentation', 'projects', 'company'],
    url: 'https://example.com/portfolio-overview.pptx'
  }
];

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>(dummyDocuments);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  // Clear localStorage and force reload dummy data
  useEffect(() => {
    // Clear any existing data to ensure fresh start
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
    
    // Set dummy data immediately
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