import React from 'react';
import { Category } from '../types/document';
import { Folder, Tag } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Folder className="w-4 h-4 mr-2" />
            Categories
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => onCategorySelect(null)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === null
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Documents
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.name)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                  selectedCategory === category.name
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
                  {category.name}
                </div>
                <span className="text-xs text-gray-500">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Tag className="w-4 h-4 mr-2" />
            Quick Actions
          </h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              Recent Uploads
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              Favorites
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              Shared Files
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};