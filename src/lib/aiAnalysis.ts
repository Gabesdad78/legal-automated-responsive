export interface AnalysisResult {
  documentType: string;
  caseType: string;
  plaintiff: string;
  defendant: string;
  amount?: string;
  serviceDate: string;
  legalIssues: string[];
  recommendedDefenses: string[];
  filingDeadline: string;
  urgencyLevel: 'low' | 'medium' | 'high';
}

export const analyzeDocument = async (file: File, state: string, county: string): Promise<AnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const text = await file.text();
  
  // Enhanced analysis based on document content
  const isDebtCollection = text.toLowerCase().includes('debt') || text.toLowerCase().includes('collection') || text.toLowerCase().includes('owed');
  const isEviction = text.toLowerCase().includes('evict') || text.toLowerCase().includes('rent') || text.toLowerCase().includes('lease');
  const isContract = text.toLowerCase().includes('contract') || text.toLowerCase().includes('breach') || text.toLowerCase().includes('agreement');
  
  let caseType = 'general-civil';
  let legalIssues: string[] = [];
  let recommendedDefenses: string[] = [];
  
  if (isDebtCollection) {
    caseType = 'debt-collection';
    legalIssues = ['FDCPA Compliance', 'Statute of Limitations', 'Standing to Sue', 'Account Stated'];
    recommendedDefenses = ['Lack of Standing', 'Statute of Limitations', 'FDCPA Violations', 'Failure to State Claim'];
  } else if (isEviction) {
    caseType = 'eviction';
    legalIssues = ['Notice Requirements', 'Habitability Issues', 'Rent Control', 'Tenant Rights'];
    recommendedDefenses = ['Improper Notice', 'Warranty of Habitability', 'Retaliatory Eviction', 'Rent Control Violations'];
  } else if (isContract) {
    caseType = 'contract-dispute';
    legalIssues = ['Contract Formation', 'Performance', 'Breach', 'Damages'];
    recommendedDefenses = ['Lack of Consideration', 'Impossibility', 'Frustration of Purpose', 'Unconscionability'];
  }
  
  // Extract potential plaintiff/defendant names
  const lines = text.split('\n');
  let plaintiff = 'Unknown Plaintiff';
  let defendant = 'Unknown Defendant';
  
  for (const line of lines) {
    if (line.toLowerCase().includes('plaintiff') && line.includes(':')) {
      plaintiff = line.split(':')[1]?.trim() || plaintiff;
    }
    if (line.toLowerCase().includes('defendant') && line.includes(':')) {
      defendant = line.split(':')[1]?.trim() || defendant;
    }
  }
  
  // Extract amount if present
  const amountMatch = text.match(/\$([\d,]+\.?\d*)/)?.[0];
  
  // Calculate filing deadline based on state
  const deadlineDays = state === 'California' ? 30 : state === 'New York' ? 20 : 21;
  
  return {
    documentType: 'Civil Complaint',
    caseType,
    plaintiff,
    defendant,
    amount: amountMatch,
    serviceDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    legalIssues,
    recommendedDefenses,
    filingDeadline: `${deadlineDays} days from service`,
    urgencyLevel: deadlineDays <= 20 ? 'high' : 'medium'
  };
};

export const generateAnalysisReport = (analysis: AnalysisResult, state: string, county: string): string => {
  return `LEGAL DOCUMENT ANALYSIS REPORT

Jurisdiction: ${state}, ${county} County
Document Type: ${analysis.documentType}
Case Type: ${analysis.caseType.replace('-', ' ').toUpperCase()}

KEY FINDINGS:
1. Plaintiff: ${analysis.plaintiff}
2. Defendant: ${analysis.defendant}
${analysis.amount ? `3. Amount Claimed: ${analysis.amount}\n` : ''}4. Service Date: ${analysis.serviceDate}
5. Filing Deadline: ${analysis.filingDeadline}

LEGAL ISSUES IDENTIFIED:
${analysis.legalIssues.map((issue, i) => `- ${issue}`).join('\n')}

RECOMMENDED DEFENSES:
${analysis.recommendedDefenses.map((defense, i) => `${i + 1}. ${defense}`).join('\n')}

URGENCY LEVEL: ${analysis.urgencyLevel.toUpperCase()}

NEXT STEPS:
- File Answer within ${analysis.filingDeadline}
- Assert all affirmative defenses
- Gather supporting documentation
- Consider consulting with local attorney

DISCLAIMER: This analysis is for informational purposes only and does not constitute legal advice.`;
};