import React from 'react';
import { Category } from '../types/document';
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
  Trash2
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
    case 'Contracts':
      return <FileText className="w-4 h-4" />;
    case 'Reports':
      return <FileText className="w-4 h-4" />;
    case 'Permits & Licenses':
      return <FileText className="w-4 h-4" />;
    case 'Safety Documents':
      return <FileText className="w-4 h-4" />;
    case 'Financial':
      return <FileText className="w-4 h-4" />;
    case 'Correspondence':
      return <FileText className="w-4 h-4" />;
    case 'Specifications':
      return <FileText className="w-4 h-4" />;
    case 'Photos & Media':
      return <Image className="w-4 h-4" />;
    default:
      return <Folder className="w-4 h-4" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-full overflow-y-auto">
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
              <span className="ml-auto text-xs text-gray-500">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </span>
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Clock className="w-4 h-4 mr-3" />
              Recent
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Star className="w-4 h-4 mr-3" />
              Favorites
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 mr-3" />
              Shared
            </button>
          </div>
        </div>
        
        {/* Categories */}
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
                <span className="flex-1 text-left">{category.name}</span>
                <span className="text-xs text-gray-500">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Active Projects
          </h3>
          <div className="space-y-1">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Dubai Marina Tower
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Riyadh Business District
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              Cairo Metro Extension
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Kuwait Oil Refinery
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              Doha Airport Terminal
            </button>
          </div>
        </div>

        {/* Storage */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Storage
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Used</span>
              <span className="text-sm font-medium text-gray-900">2.1 GB of 10 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '21%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};