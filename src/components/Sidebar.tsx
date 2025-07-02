import React from 'react';
import { Category } from '../types/document';
import { projects, offices } from '../utils/projectDetection';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive,
  Star,
  Clock,
  Share2,
  Trash2,
  Building2,
  MapPin,
  Globe,
  Users,
  TrendingUp,
  Shield,
  Award,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'Project Plans':
      return <FileText className="w-4 h-4" />;
    case 'Technical Drawings':
      return <FileText className="w-4 h-4" />;
    case 'Contracts & Procurement':
      return <Briefcase className="w-4 h-4" />;
    case 'Engineering Reports':
      return <TrendingUp className="w-4 h-4" />;
    case 'Permits & Licenses':
      return <Award className="w-4 h-4" />;
    case 'Safety & HSE Documents':
      return <Shield className="w-4 h-4" />;
    case 'Financial & Cost Reports':
      return <FileText className="w-4 h-4" />;
    case 'Client Correspondence':
      return <Users className="w-4 h-4" />;
    case 'Technical Specifications':
      return <FileText className="w-4 h-4" />;
    case 'Site Photos & Media':
      return <Image className="w-4 h-4" />;
    case 'Quality Assurance':
      return <Award className="w-4 h-4" />;
    case 'Environmental Studies':
      return <Globe className="w-4 h-4" />;
    default:
      return <Folder className="w-4 h-4" />;
  }
};

const getProjectStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'completed': return 'bg-blue-500';
    case 'on-hold': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

const getOfficeTypeIcon = (type: string) => {
  switch (type) {
    case 'headquarters': return '🏢';
    case 'regional': return '🏛️';
    case 'branch': return '🏪';
    default: return '🏢';
  }
};

const getCountryFlag = (location: string) => {
  if (location.includes('UAE')) return '🇦🇪';
  if (location.includes('Saudi Arabia')) return '🇸🇦';
  if (location.includes('Qatar')) return '🇶🇦';
  if (location.includes('Kuwait')) return '🇰🇼';
  if (location.includes('Bahrain')) return '🇧🇭';
  if (location.includes('Egypt')) return '🇪🇬';
  if (location.includes('Jordan')) return '🇯🇴';
  if (location.includes('Lebanon')) return '🇱🇧';
  return '🌍';
};

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const activeProjects = projects.filter(p => p.status === 'active');
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Quick Access
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => onCategorySelect(null)}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FolderOpen className="w-4 h-4 mr-3" />
              All Documents
              <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </span>
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Clock className="w-4 h-4 mr-3" />
              Recent Documents
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Star className="w-4 h-4 mr-3" />
              Starred
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 mr-3" />
              Shared with Me
            </button>
          </div>
        </div>
        
        {/* Document Categories */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Document Categories
          </h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.name)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="mr-3">
                  {getCategoryIcon(category.name)}
                </div>
                <span className="flex-1 text-left text-xs">{category.name}</span>
                {category.count > 0 && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Active Projects ({activeProjects.length})
          </h3>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {activeProjects.map((project) => (
              <button
                key={project.id}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                title={`${project.name} (${project.code}) - ${project.location}`}
              >
                <div className="flex items-center space-x-2 mr-3 flex-shrink-0">
                  <div className={`w-2 h-2 ${getProjectStatusColor(project.status)} rounded-full`}></div>
                  <span className="text-sm">{getCountryFlag(project.location)}</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="truncate font-medium text-xs">{project.name}</div>
                  <div className="text-xs text-gray-500 truncate">{project.code} • {project.location.split(',')[0]}</div>
                </div>
                {project.documentCount > 0 && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                    {project.documentCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* HS Group Offices */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            HS Group Offices
          </h3>
          <div className="space-y-1">
            {offices.slice(0, 5).map((office) => (
              <button
                key={office.id}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                title={`${office.name} - ${office.location}`}
              >
                <div className="flex items-center space-x-2 mr-3 flex-shrink-0">
                  <span className="text-sm">{getOfficeTypeIcon(office.type)}</span>
                  <span className="text-sm">{getCountryFlag(office.location)}</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="truncate font-medium text-xs">{office.name}</div>
                  <div className="text-xs text-gray-500 truncate">{office.location}</div>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                  {office.projects.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Completed Projects ({completedProjects.length})
            </h3>
            <div className="space-y-1">
              {completedProjects.map((project) => (
                <button
                  key={project.id}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors opacity-75"
                  title={`${project.name} (${project.code}) - ${project.location}`}
                >
                  <div className="flex items-center space-x-2 mr-3 flex-shrink-0">
                    <div className={`w-2 h-2 ${getProjectStatusColor(project.status)} rounded-full`}></div>
                    <span className="text-sm">{getCountryFlag(project.location)}</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="truncate font-medium text-xs">{project.name}</div>
                    <div className="text-xs text-gray-500 truncate">{project.code}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Storage Usage */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Storage Usage
          </h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-800 font-medium">Used Storage</span>
              <span className="text-sm font-bold text-blue-900">8.7 GB of 50 GB</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '17.4%' }}></div>
            </div>
            <div className="text-xs text-blue-700">
              Across {projects.length} active projects
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};