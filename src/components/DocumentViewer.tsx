import React from 'react';
import { Document } from '../types/document';
import { formatFileSize, getFileIcon } from '../utils/fileUtils';
import { format } from 'date-fns';
import { X, Download, Edit, Share2, Star, Eye, FileText, Calendar, User, Tag, Folder } from 'lucide-react';

interface DocumentViewerProps {
  document: Document | null;
  onClose: () => void;
}

const getDocumentContent = (document: Document): string => {
  // Generate realistic content based on document type and name
  const docName = document.name.toLowerCase();
  
  if (docName.includes('master plan') || docName.includes('feasibility')) {
    return `# ${document.name}

## Executive Summary
This comprehensive master plan outlines the strategic development approach for the project, incorporating sustainable design principles, regulatory compliance, and stakeholder requirements.

## Project Overview
- **Project Type**: Mixed-use development
- **Total Area**: 2.5 million sq ft
- **Estimated Timeline**: 36 months
- **Budget**: $850 million USD

## Key Components
1. **Residential Towers**: 3 high-rise towers (45-55 floors)
2. **Commercial Spaces**: Retail and office complexes
3. **Infrastructure**: Parking, utilities, and transportation
4. **Amenities**: Recreation facilities, landscaping

## Design Principles
- Sustainable construction practices
- LEED Gold certification target
- Integration with existing urban fabric
- Accessibility compliance (ADA standards)

## Regulatory Compliance
- Building codes and zoning requirements
- Environmental impact assessments
- Fire safety and emergency protocols
- Structural engineering standards

## Timeline Milestones
- Phase 1: Site preparation and foundation (Months 1-8)
- Phase 2: Structural construction (Months 9-24)
- Phase 3: MEP installation and finishing (Months 25-32)
- Phase 4: Testing and commissioning (Months 33-36)

## Risk Assessment
- Weather-related delays
- Material supply chain considerations
- Regulatory approval timelines
- Market conditions impact`;
  }
  
  if (docName.includes('structural') || docName.includes('engineering')) {
    return `# ${document.name}

## Structural Analysis Summary
This report presents the comprehensive structural engineering analysis for the foundation and superstructure systems.

## Foundation Design
- **Foundation Type**: Deep pile foundation system
- **Pile Specifications**: 1.2m diameter bored piles
- **Depth**: 35-45 meters to bedrock
- **Load Capacity**: 8,000 kN per pile

## Structural Systems
### Primary Structure
- **Material**: High-strength reinforced concrete (Grade 60)
- **Core Wall System**: Reinforced concrete shear walls
- **Floor System**: Post-tensioned concrete slabs

### Secondary Structure
- **Facade System**: Curtain wall with structural glazing
- **Mechanical Systems**: Integrated MEP coordination
- **Seismic Design**: Zone 3 seismic requirements

## Load Analysis
- **Dead Load**: 6.5 kN/m²
- **Live Load**: 4.0 kN/m² (office), 2.0 kN/m² (residential)
- **Wind Load**: 1.2 kN/m² (design wind speed 180 km/h)
- **Seismic Load**: Response spectrum analysis

## Material Specifications
- Concrete: f'c = 40 MPa minimum
- Reinforcement: Grade 420 deformed bars
- Structural Steel: Grade 350W
- Post-tensioning: 7-wire strand, 1860 MPa

## Quality Control
- Concrete testing protocols
- Reinforcement inspection procedures
- Welding quality standards
- Non-destructive testing requirements`;
  }
  
  if (docName.includes('contract') || docName.includes('procurement')) {
    return `# ${document.name}

## Contract Overview
This agreement establishes the terms and conditions for construction services between HS Group and the selected contractor.

## Parties
- **Client**: HS Group International
- **Contractor**: [Contractor Name]
- **Project**: ${document.tags.find(tag => tag.includes('dubai') || tag.includes('riyadh') || tag.includes('cairo')) || 'Construction Project'}

## Scope of Work
### Primary Responsibilities
- Site preparation and excavation
- Structural construction and installation
- MEP systems integration
- Finishing and commissioning

### Deliverables
- Complete construction as per approved drawings
- Testing and commissioning reports
- As-built documentation
- Warranty and maintenance manuals

## Contract Value
- **Total Contract Value**: $125,000,000 USD
- **Payment Schedule**: Monthly progress payments
- **Retention**: 10% held until final completion
- **Performance Bond**: 10% of contract value

## Timeline
- **Commencement Date**: [Date]
- **Substantial Completion**: 30 months from commencement
- **Final Completion**: 32 months from commencement
- **Warranty Period**: 24 months from substantial completion

## Terms and Conditions
### Payment Terms
- Monthly progress payments based on work completed
- 30-day payment terms from invoice approval
- Retention release upon final acceptance

### Performance Standards
- Quality standards as per project specifications
- Safety compliance with local regulations
- Environmental protection requirements
- Regular progress reporting

## Risk Allocation
- Force majeure provisions
- Change order procedures
- Dispute resolution mechanisms
- Insurance and liability requirements`;
  }
  
  if (docName.includes('safety') || docName.includes('hse')) {
    return `# ${document.name}

## Health, Safety & Environment Management Plan

### Executive Summary
This comprehensive HSE plan establishes safety protocols, environmental protection measures, and health management procedures for all project activities.

## Safety Management System
### Organizational Structure
- **HSE Manager**: Overall safety responsibility
- **Site Safety Officers**: Daily safety supervision
- **Emergency Response Team**: Incident management
- **Safety Committee**: Regular safety reviews

### Safety Policies
1. **Zero Harm Policy**: No accidents, injuries, or environmental incidents
2. **Stop Work Authority**: Any worker can stop unsafe work
3. **Incident Reporting**: Immediate reporting of all incidents
4. **Continuous Improvement**: Regular safety performance reviews

## Risk Assessment
### High-Risk Activities
- Working at height (>2 meters)
- Excavation and trenching
- Heavy lifting operations
- Hot work (welding, cutting)
- Confined space entry

### Control Measures
- Permit-to-work systems
- Personal protective equipment (PPE)
- Safety training and competency
- Regular safety inspections
- Emergency response procedures

## Environmental Protection
### Environmental Aspects
- Waste management and recycling
- Water conservation and treatment
- Air quality monitoring
- Noise control measures
- Soil and groundwater protection

### Compliance Requirements
- Environmental permits and licenses
- Waste disposal regulations
- Air emission standards
- Water discharge permits
- Noise level restrictions

## Emergency Procedures
### Emergency Response Plan
- Fire emergency procedures
- Medical emergency response
- Evacuation procedures
- Incident command system
- Communication protocols

### Emergency Contacts
- Emergency Services: 999
- Site HSE Manager: [Contact]
- Medical Facility: [Contact]
- Environmental Authority: [Contact]`;
  }
  
  if (docName.includes('financial') || docName.includes('budget')) {
    return `# ${document.name}

## Financial Summary
This report provides a comprehensive overview of project financial performance and budget allocation.

## Budget Overview
### Total Project Budget: $850,000,000 USD

#### Cost Breakdown by Category
- **Construction**: $680,000,000 (80%)
- **Design & Engineering**: $68,000,000 (8%)
- **Project Management**: $42,500,000 (5%)
- **Contingency**: $42,500,000 (5%)
- **Other Costs**: $17,000,000 (2%)

## Quarterly Financial Performance
### Q1 2024 Expenditure
- **Planned**: $85,000,000
- **Actual**: $82,300,000
- **Variance**: -$2,700,000 (3.2% under budget)

### Key Financial Metrics
- **Cost Performance Index (CPI)**: 1.03
- **Schedule Performance Index (SPI)**: 0.98
- **Estimate at Completion (EAC)**: $847,500,000
- **Budget at Completion (BAC)**: $850,000,000

## Cash Flow Analysis
### Monthly Cash Flow Projection
- January: $28,500,000
- February: $31,200,000
- March: $29,800,000
- April: $33,100,000 (projected)

### Payment Schedule
- Client payments: Net 30 days
- Subcontractor payments: Net 15 days
- Material suppliers: Net 30 days
- Equipment rental: Monthly

## Cost Control Measures
### Budget Monitoring
- Weekly cost reporting
- Monthly budget reviews
- Quarterly forecasting updates
- Annual budget revisions

### Change Management
- Change order approval process
- Cost impact assessments
- Budget reallocation procedures
- Stakeholder approval requirements

## Financial Risks
### Identified Risks
- Currency exchange fluctuations
- Material price escalations
- Labor cost increases
- Regulatory changes impact

### Mitigation Strategies
- Fixed-price contracts where possible
- Currency hedging instruments
- Contingency fund allocation
- Regular market price monitoring`;
  }
  
  // Default content for other document types
  return `# ${document.name}

## Document Information
This document contains important project information and technical specifications related to the HS Group construction and consultancy operations.

## Project Context
This document is part of the comprehensive project documentation for one of HS Group's major construction projects across the Middle East and North Africa region.

## Key Details
- **Document Type**: ${document.category}
- **File Size**: ${formatFileSize(document.size)}
- **Upload Date**: ${format(document.uploadDate, 'MMMM d, yyyy')}
- **Tags**: ${document.tags.join(', ')}

## Content Overview
This document contains detailed technical information, specifications, and project requirements that are essential for the successful execution of construction and engineering activities.

### Technical Specifications
- Compliance with international standards
- Local regulatory requirements
- Quality assurance protocols
- Safety and environmental considerations

### Project Requirements
- Scope of work definition
- Performance criteria
- Delivery timelines
- Quality standards

## Related Documents
This document should be reviewed in conjunction with other project documentation including:
- Project master plans
- Technical drawings
- Safety documentation
- Contract agreements
- Financial reports

## Approval Status
- **Status**: Approved
- **Approved By**: Project Manager
- **Approval Date**: ${format(document.uploadDate, 'MMMM d, yyyy')}
- **Next Review**: ${format(new Date(document.uploadDate.getTime() + 90 * 24 * 60 * 60 * 1000), 'MMMM d, yyyy')}

## Contact Information
For questions or clarifications regarding this document, please contact the project team through the appropriate channels.`;
};

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onClose,
}) => {
  if (!document) return null;

  const content = getDocumentContent(document);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
        {/* Document Info Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Document Info</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">{getFileIcon(document.type)}</div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm leading-tight">{document.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{formatFileSize(document.size)}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200">
                <Star className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</label>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {document.category}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</label>
                    <div className="mt-1 flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {format(document.uploadDate, 'MMM d, yyyy')}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">File Type</label>
                    <div className="mt-1 text-sm text-gray-900">{document.type}</div>
                  </div>
                </div>
              </div>

              {document.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Folder className="w-4 h-4 mr-2" />
                  Project
                </h4>
                <div className="text-sm text-gray-600">
                  {document.tags.find(tag => 
                    tag.includes('dubai') || tag.includes('riyadh') || 
                    tag.includes('cairo') || tag.includes('kuwait') || 
                    tag.includes('doha') || tag.includes('bahrain')
                  )?.split('-')[0] || 'General'} Project
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Access
                </h4>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center justify-between py-1">
                    <span>View</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Download</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Edit</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Share</span>
                    <span className="text-green-600">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{document.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Last modified {format(document.uploadDate, 'MMM d, yyyy')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-gray max-w-none">
                {content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-4 mt-8">{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold text-gray-800 mb-3 mt-6">{line.substring(4)}</h3>;
                  } else if (line.startsWith('#### ')) {
                    return <h4 key={index} className="text-lg font-semibold text-gray-800 mb-2 mt-4">{line.substring(5)}</h4>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="text-gray-700 mb-1 ml-4">{line.substring(2)}</li>;
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-semibold text-gray-800 mb-2">{line.substring(2, line.length - 2)}</p>;
                  } else {
                    return <p key={index} className="text-gray-700 mb-3 leading-relaxed">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};