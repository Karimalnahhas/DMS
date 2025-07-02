import { Project } from '../types/document';

// Define active projects with their detection keywords
export const projects: Project[] = [
  {
    id: 'proj-001',
    name: 'Dubai Marina Tower',
    code: 'DMT-2024',
    location: 'Dubai, UAE',
    status: 'active',
    color: 'bg-blue-500',
    keywords: ['dubai', 'marina', 'tower', 'residential', 'dmt'],
    documentCount: 0
  },
  {
    id: 'proj-002',
    name: 'Riyadh Business District',
    code: 'RBD-2024',
    location: 'Riyadh, Saudi Arabia',
    status: 'active',
    color: 'bg-green-500',
    keywords: ['riyadh', 'business', 'district', 'commercial', 'rbd', 'saudi'],
    documentCount: 0
  },
  {
    id: 'proj-003',
    name: 'Cairo Metro Extension',
    code: 'CME-2024',
    location: 'Cairo, Egypt',
    status: 'active',
    color: 'bg-yellow-500',
    keywords: ['cairo', 'metro', 'line', 'tunnel', 'station', 'cme', 'egypt'],
    documentCount: 0
  },
  {
    id: 'proj-004',
    name: 'Kuwait Oil Refinery',
    code: 'KOR-2024',
    location: 'Kuwait City, Kuwait',
    status: 'active',
    color: 'bg-purple-500',
    keywords: ['kuwait', 'oil', 'refinery', 'petrochemical', 'kor', 'industrial'],
    documentCount: 0
  },
  {
    id: 'proj-005',
    name: 'Doha Airport Terminal',
    code: 'DAT-2024',
    location: 'Doha, Qatar',
    status: 'active',
    color: 'bg-red-500',
    keywords: ['doha', 'airport', 'terminal', 'aviation', 'dat', 'qatar'],
    documentCount: 0
  },
  {
    id: 'proj-006',
    name: 'Abu Dhabi Hospital',
    code: 'ADH-2024',
    location: 'Abu Dhabi, UAE',
    status: 'active',
    color: 'bg-indigo-500',
    keywords: ['abu', 'dhabi', 'hospital', 'medical', 'healthcare', 'adh'],
    documentCount: 0
  },
  {
    id: 'proj-007',
    name: 'Bahrain Bridge Project',
    code: 'BBP-2024',
    location: 'Manama, Bahrain',
    status: 'active',
    color: 'bg-pink-500',
    keywords: ['bahrain', 'bridge', 'marine', 'cable', 'bbp', 'manama'],
    documentCount: 0
  }
];

export const detectProjectFromDocument = (fileName: string, tags: string[]): Project | null => {
  const searchText = `${fileName} ${tags.join(' ')}`.toLowerCase();
  
  // Score each project based on keyword matches
  const projectScores = projects.map(project => {
    let score = 0;
    let matchedKeywords: string[] = [];
    
    project.keywords.forEach(keyword => {
      if (searchText.includes(keyword.toLowerCase())) {
        score += 1;
        matchedKeywords.push(keyword);
        
        // Bonus points for exact matches in filename
        if (fileName.toLowerCase().includes(keyword.toLowerCase())) {
          score += 2;
        }
      }
    });
    
    return {
      project,
      score,
      matchedKeywords
    };
  });
  
  // Sort by score and return the best match if score > 0
  projectScores.sort((a, b) => b.score - a.score);
  
  if (projectScores[0].score > 0) {
    return projectScores[0].project;
  }
  
  return null;
};

export const generateProjectTags = (project: Project): string[] => {
  return [
    project.code.toLowerCase(),
    project.location.split(',')[0].toLowerCase(),
    project.name.toLowerCase().replace(/\s+/g, '-')
  ];
};

export const getProjectById = (projectId: string): Project | null => {
  return projects.find(p => p.id === projectId) || null;
};

export const updateProjectDocumentCount = (projectId: string, count: number): void => {
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.documentCount = count;
  }
};