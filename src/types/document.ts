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