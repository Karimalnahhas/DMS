export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  category: string;
  tags: string[];
  url?: string;
  thumbnail?: string;
  projectId?: string;
  projectName?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  count: number;
}

export interface UploadProgress {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export interface Project {
  id: string;
  name: string;
  code: string;
  location: string;
  status: 'active' | 'completed' | 'on-hold';
  color: string;
  keywords: string[];
  documentCount: number;
}