export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileCategory = (type: string): string => {
  // Construction and engineering specific file types
  if (type.includes('pdf')) return 'Reports';
  if (type.includes('dwg') || type.includes('acad')) return 'Technical Drawings';
  if (type.includes('document') || type.includes('word')) return 'Correspondence';
  if (type.includes('spreadsheet') || type.includes('excel')) return 'Financial';
  if (type.includes('presentation') || type.includes('powerpoint')) return 'Reports';
  if (type.startsWith('image/') || type.includes('photoshop')) return 'Photos & Media';
  if (type.startsWith('video/')) return 'Photos & Media';
  if (type.startsWith('audio/')) return 'Photos & Media';
  if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return 'Photos & Media';
  return 'Specifications';
};

export const getFileIcon = (type: string): string => {
  // Construction and engineering specific icons
  if (type.includes('pdf')) return '📋';
  if (type.includes('dwg') || type.includes('acad')) return '📐';
  if (type.includes('document') || type.includes('word')) return '📝';
  if (type.includes('spreadsheet') || type.includes('excel')) return '📊';
  if (type.includes('presentation') || type.includes('powerpoint')) return '📈';
  if (type.startsWith('image/') || type.includes('photoshop')) return '🖼️';
  if (type.startsWith('video/')) return '🎥';
  if (type.startsWith('audio/')) return '🎵';
  if (type.includes('zip') || type.includes('rar')) return '🗜️';
  return '📁';
};