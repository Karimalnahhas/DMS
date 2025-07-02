export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileCategory = (type: string): string => {
  // HS Group construction and engineering specific file types
  if (type.includes('pdf')) {
    // Determine PDF category based on common naming patterns
    return 'Engineering Reports';
  }
  if (type.includes('dwg') || type.includes('acad') || type.includes('autocad')) return 'Technical Drawings';
  if (type.includes('document') || type.includes('word') || type.includes('docx')) return 'Client Correspondence';
  if (type.includes('spreadsheet') || type.includes('excel') || type.includes('xlsx')) return 'Financial & Cost Reports';
  if (type.includes('presentation') || type.includes('powerpoint') || type.includes('pptx')) return 'Engineering Reports';
  if (type.startsWith('image/') || type.includes('jpeg') || type.includes('jpg') || type.includes('png')) return 'Site Photos & Media';
  if (type.startsWith('video/') || type.includes('mp4') || type.includes('avi')) return 'Site Photos & Media';
  if (type.startsWith('audio/')) return 'Site Photos & Media';
  if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return 'Technical Specifications';
  
  // Default categorization for construction industry
  return 'Technical Specifications';
};

export const getFileIcon = (type: string): string => {
  // HS Group construction and engineering specific icons
  if (type.includes('pdf')) return '📋';
  if (type.includes('dwg') || type.includes('acad')) return '📐';
  if (type.includes('document') || type.includes('word')) return '📝';
  if (type.includes('spreadsheet') || type.includes('excel')) return '📊';
  if (type.includes('presentation') || type.includes('powerpoint')) return '📈';
  if (type.startsWith('image/') || type.includes('jpeg') || type.includes('jpg')) return '📸';
  if (type.startsWith('video/') || type.includes('mp4')) return '🎥';
  if (type.startsWith('audio/')) return '🎵';
  if (type.includes('zip') || type.includes('rar')) return '🗜️';
  
  // Construction-specific file types
  if (type.includes('revit') || type.includes('rvt')) return '🏗️';
  if (type.includes('sketchup') || type.includes('skp')) return '🏠';
  if (type.includes('3ds') || type.includes('max')) return '🎯';
  
  return '📁';
};

// Helper function to determine document category from filename
export const getCategoryFromFilename = (filename: string): string => {
  const name = filename.toLowerCase();
  
  if (name.includes('master plan') || name.includes('site plan') || name.includes('development plan')) {
    return 'Project Plans';
  }
  if (name.includes('drawing') || name.includes('plan') || name.includes('elevation') || name.includes('section')) {
    return 'Technical Drawings';
  }
  if (name.includes('contract') || name.includes('procurement') || name.includes('tender')) {
    return 'Contracts & Procurement';
  }
  if (name.includes('report') || name.includes('analysis') || name.includes('study') || name.includes('assessment')) {
    return 'Engineering Reports';
  }
  if (name.includes('permit') || name.includes('license') || name.includes('approval') || name.includes('certificate')) {
    return 'Permits & Licenses';
  }
  if (name.includes('safety') || name.includes('hse') || name.includes('risk') || name.includes('hazard')) {
    return 'Safety & HSE Documents';
  }
  if (name.includes('cost') || name.includes('budget') || name.includes('financial') || name.includes('invoice')) {
    return 'Financial & Cost Reports';
  }
  if (name.includes('correspondence') || name.includes('letter') || name.includes('email') || name.includes('memo')) {
    return 'Client Correspondence';
  }
  if (name.includes('specification') || name.includes('standard') || name.includes('requirement')) {
    return 'Technical Specifications';
  }
  if (name.includes('photo') || name.includes('image') || name.includes('video') || name.includes('media')) {
    return 'Site Photos & Media';
  }
  if (name.includes('quality') || name.includes('inspection') || name.includes('test') || name.includes('compliance')) {
    return 'Quality Assurance';
  }
  if (name.includes('environmental') || name.includes('impact') || name.includes('sustainability')) {
    return 'Environmental Studies';
  }
  
  return 'Technical Specifications';
};