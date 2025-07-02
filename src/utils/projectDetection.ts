import { Project } from '../types/document';

// HS Group's actual projects and locations based on their operations
export const projects: Project[] = [
  // UAE Projects
  {
    id: 'proj-001',
    name: 'Dubai Marina Residential Complex',
    code: 'DMRC-2024',
    location: 'Dubai, UAE',
    status: 'active',
    color: 'bg-blue-500',
    keywords: ['dubai', 'marina', 'residential', 'complex', 'dmrc', 'uae', 'tower', 'apartment'],
    documentCount: 0
  },
  {
    id: 'proj-002',
    name: 'Abu Dhabi Government Building',
    code: 'ADGB-2024',
    location: 'Abu Dhabi, UAE',
    status: 'active',
    color: 'bg-green-500',
    keywords: ['abu', 'dhabi', 'government', 'building', 'adgb', 'uae', 'office', 'administrative'],
    documentCount: 0
  },
  {
    id: 'proj-003',
    name: 'Sharjah Industrial Facility',
    code: 'SIF-2024',
    location: 'Sharjah, UAE',
    status: 'active',
    color: 'bg-purple-500',
    keywords: ['sharjah', 'industrial', 'facility', 'sif', 'uae', 'manufacturing', 'warehouse'],
    documentCount: 0
  },

  // Saudi Arabia Projects
  {
    id: 'proj-004',
    name: 'Riyadh Business District Phase 2',
    code: 'RBD2-2024',
    location: 'Riyadh, Saudi Arabia',
    status: 'active',
    color: 'bg-red-500',
    keywords: ['riyadh', 'business', 'district', 'phase', 'rbd2', 'saudi', 'arabia', 'commercial', 'office'],
    documentCount: 0
  },
  {
    id: 'proj-005',
    name: 'Jeddah Coastal Development',
    code: 'JCD-2024',
    location: 'Jeddah, Saudi Arabia',
    status: 'active',
    color: 'bg-yellow-500',
    keywords: ['jeddah', 'coastal', 'development', 'jcd', 'saudi', 'arabia', 'waterfront', 'mixed-use'],
    documentCount: 0
  },
  {
    id: 'proj-006',
    name: 'Dammam Infrastructure Upgrade',
    code: 'DIU-2024',
    location: 'Dammam, Saudi Arabia',
    status: 'active',
    color: 'bg-indigo-500',
    keywords: ['dammam', 'infrastructure', 'upgrade', 'diu', 'saudi', 'arabia', 'utilities', 'roads'],
    documentCount: 0
  },

  // Qatar Projects
  {
    id: 'proj-007',
    name: 'Doha Metro Station Complex',
    code: 'DMSC-2024',
    location: 'Doha, Qatar',
    status: 'active',
    color: 'bg-pink-500',
    keywords: ['doha', 'metro', 'station', 'complex', 'dmsc', 'qatar', 'transportation', 'transit'],
    documentCount: 0
  },
  {
    id: 'proj-008',
    name: 'Qatar National Museum Extension',
    code: 'QNME-2024',
    location: 'Doha, Qatar',
    status: 'active',
    color: 'bg-teal-500',
    keywords: ['qatar', 'national', 'museum', 'extension', 'qnme', 'doha', 'cultural', 'heritage'],
    documentCount: 0
  },

  // Kuwait Projects
  {
    id: 'proj-009',
    name: 'Kuwait City Financial Center',
    code: 'KCFC-2024',
    location: 'Kuwait City, Kuwait',
    status: 'active',
    color: 'bg-orange-500',
    keywords: ['kuwait', 'city', 'financial', 'center', 'kcfc', 'banking', 'commercial', 'tower'],
    documentCount: 0
  },
  {
    id: 'proj-010',
    name: 'Kuwait Oil Refinery Modernization',
    code: 'KORM-2024',
    location: 'Al Ahmadi, Kuwait',
    status: 'active',
    color: 'bg-cyan-500',
    keywords: ['kuwait', 'oil', 'refinery', 'modernization', 'korm', 'ahmadi', 'petrochemical', 'industrial'],
    documentCount: 0
  },

  // Bahrain Projects
  {
    id: 'proj-011',
    name: 'Manama Bay Bridge',
    code: 'MBB-2024',
    location: 'Manama, Bahrain',
    status: 'active',
    color: 'bg-lime-500',
    keywords: ['manama', 'bay', 'bridge', 'mbb', 'bahrain', 'marine', 'infrastructure', 'causeway'],
    documentCount: 0
  },
  {
    id: 'proj-012',
    name: 'Bahrain International Airport Terminal',
    code: 'BIAT-2024',
    location: 'Muharraq, Bahrain',
    status: 'active',
    color: 'bg-emerald-500',
    keywords: ['bahrain', 'international', 'airport', 'terminal', 'biat', 'muharraq', 'aviation', 'passenger'],
    documentCount: 0
  },

  // Egypt Projects
  {
    id: 'proj-013',
    name: 'Cairo New Administrative Capital',
    code: 'CNAC-2024',
    location: 'New Administrative Capital, Egypt',
    status: 'active',
    color: 'bg-violet-500',
    keywords: ['cairo', 'new', 'administrative', 'capital', 'cnac', 'egypt', 'government', 'district'],
    documentCount: 0
  },
  {
    id: 'proj-014',
    name: 'Alexandria Port Expansion',
    code: 'APE-2024',
    location: 'Alexandria, Egypt',
    status: 'active',
    color: 'bg-rose-500',
    keywords: ['alexandria', 'port', 'expansion', 'ape', 'egypt', 'maritime', 'logistics', 'harbor'],
    documentCount: 0
  },

  // Jordan Projects
  {
    id: 'proj-015',
    name: 'Amman Smart City Initiative',
    code: 'ASCI-2024',
    location: 'Amman, Jordan',
    status: 'active',
    color: 'bg-amber-500',
    keywords: ['amman', 'smart', 'city', 'initiative', 'asci', 'jordan', 'technology', 'urban'],
    documentCount: 0
  },

  // Lebanon Projects
  {
    id: 'proj-016',
    name: 'Beirut Reconstruction Project',
    code: 'BRP-2024',
    location: 'Beirut, Lebanon',
    status: 'active',
    color: 'bg-slate-500',
    keywords: ['beirut', 'reconstruction', 'project', 'brp', 'lebanon', 'urban', 'renewal', 'infrastructure'],
    documentCount: 0
  },

  // Completed Projects
  {
    id: 'proj-017',
    name: 'Dubai World Trade Center Renovation',
    code: 'DWTCR-2023',
    location: 'Dubai, UAE',
    status: 'completed',
    color: 'bg-gray-500',
    keywords: ['dubai', 'world', 'trade', 'center', 'renovation', 'dwtcr', 'uae', 'commercial'],
    documentCount: 0
  },
  {
    id: 'proj-018',
    name: 'Riyadh Metro Line 3',
    code: 'RML3-2023',
    location: 'Riyadh, Saudi Arabia',
    status: 'completed',
    color: 'bg-gray-500',
    keywords: ['riyadh', 'metro', 'line', 'rml3', 'saudi', 'arabia', 'transportation', 'rail'],
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
        
        // Extra bonus for project code matches
        if (fileName.toLowerCase().includes(project.code.toLowerCase())) {
          score += 5;
        }
      }
    });
    
    // Bonus for location matches
    const location = project.location.toLowerCase();
    if (searchText.includes(location.split(',')[0].toLowerCase())) {
      score += 3;
    }
    
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
  const tags = [
    project.code.toLowerCase(),
    project.location.split(',')[0].toLowerCase(),
    project.name.toLowerCase().replace(/\s+/g, '-').substring(0, 20)
  ];
  
  // Add country tags
  if (project.location.includes('UAE')) tags.push('uae', 'emirates');
  if (project.location.includes('Saudi Arabia')) tags.push('saudi', 'ksa');
  if (project.location.includes('Qatar')) tags.push('qatar');
  if (project.location.includes('Kuwait')) tags.push('kuwait');
  if (project.location.includes('Bahrain')) tags.push('bahrain');
  if (project.location.includes('Egypt')) tags.push('egypt');
  if (project.location.includes('Jordan')) tags.push('jordan');
  if (project.location.includes('Lebanon')) tags.push('lebanon');
  
  return tags;
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

// Office locations for HS Group
export const offices = [
  {
    id: 'office-001',
    name: 'Dubai Head Office',
    location: 'Dubai, UAE',
    type: 'headquarters',
    projects: ['proj-001', 'proj-002', 'proj-003', 'proj-017']
  },
  {
    id: 'office-002',
    name: 'Riyadh Regional Office',
    location: 'Riyadh, Saudi Arabia',
    type: 'regional',
    projects: ['proj-004', 'proj-005', 'proj-006', 'proj-018']
  },
  {
    id: 'office-003',
    name: 'Doha Office',
    location: 'Doha, Qatar',
    type: 'branch',
    projects: ['proj-007', 'proj-008']
  },
  {
    id: 'office-004',
    name: 'Kuwait Office',
    location: 'Kuwait City, Kuwait',
    type: 'branch',
    projects: ['proj-009', 'proj-010']
  },
  {
    id: 'office-005',
    name: 'Manama Office',
    location: 'Manama, Bahrain',
    type: 'branch',
    projects: ['proj-011', 'proj-012']
  },
  {
    id: 'office-006',
    name: 'Cairo Office',
    location: 'Cairo, Egypt',
    type: 'regional',
    projects: ['proj-013', 'proj-014']
  },
  {
    id: 'office-007',
    name: 'Amman Office',
    location: 'Amman, Jordan',
    type: 'branch',
    projects: ['proj-015']
  },
  {
    id: 'office-008',
    name: 'Beirut Office',
    location: 'Beirut, Lebanon',
    type: 'branch',
    projects: ['proj-016']
  }
];