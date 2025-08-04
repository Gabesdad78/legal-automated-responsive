import { getStateByName, getCountyByName } from '@/data/states';

export interface DebtAnalysisResult {
  documentType: string;
  caseType: 'debt-collection' | 'credit-card' | 'medical-debt' | 'personal-loan' | 'mortgage' | 'other';
  plaintiff: string;
  defendant: string;
  amount: string;
  serviceDate: string;
  filingDeadline: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  
  // Legal Analysis
  legalIssues: LegalIssue[];
  recommendedDefenses: Defense[];
  statuteOfLimitations: StatuteOfLimitations;
  fdcpaViolations: FDCPAViolation[];
  
  // Response Strategy
  responseStrategy: ResponseStrategy;
  filingInstructions: FilingInstruction[];
  courtInformation: CourtInfo;
  
  // AI Generated Content
  generatedResponse: string;
  affirmativeDefenses: string[];
  counterclaims: string[];
  
  // Risk Assessment
  riskAssessment: RiskAssessment;
  recommendedActions: string[];
}

export interface LegalIssue {
  type: 'standing' | 'statute_of_limitations' | 'fdcpa' | 'validation' | 'service' | 'jurisdiction' | 'other';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  evidence: string[];
}

export interface Defense {
  type: string;
  description: string;
  successRate: number;
  requirements: string[];
  caseLaw: string[];
}

export interface StatuteOfLimitations {
  applicable: boolean;
  timeLimit: string;
  startDate: string;
  expired: boolean;
  exceptions: string[];
}

export interface FDCPAViolation {
  type: 'harassment' | 'false_representation' | 'unfair_practices' | 'validation' | 'cease_communication';
  description: string;
  damages: string;
  evidence: string[];
}

export interface ResponseStrategy {
  primary: string;
  secondary: string[];
  timeline: string;
  estimatedCost: string;
}

export interface FilingInstruction {
  step: number;
  action: string;
  deadline: string;
  form: string;
  fee: string;
}

export interface CourtInfo {
  name: string;
  address: string;
  phone: string;
  website: string;
  filingMethods: string[];
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  defaultRisk: number;
  judgmentRisk: number;
  wageGarnishmentRisk: number;
  bankLevyRisk: number;
  factors: string[];
}

// State-specific legal rules
const stateRules = {
  'California': {
    statuteOfLimitations: {
      'credit-card': '4 years',
      'medical-debt': '4 years',
      'personal-loan': '4 years',
      'mortgage': '4 years'
    },
    filingDeadline: '30 days',
    courtSystem: 'Superior Court',
    specialRules: ['CCP 98', 'B&P 17200']
  },
  'New York': {
    statuteOfLimitations: {
      'credit-card': '6 years',
      'medical-debt': '6 years',
      'personal-loan': '6 years',
      'mortgage': '6 years'
    },
    filingDeadline: '20 days',
    courtSystem: 'Civil Court',
    specialRules: ['CPLR 3012', 'CPLR 3211']
  },
  'Texas': {
    statuteOfLimitations: {
      'credit-card': '4 years',
      'medical-debt': '4 years',
      'personal-loan': '4 years',
      'mortgage': '4 years'
    },
    filingDeadline: '20 days',
    courtSystem: 'Justice Court',
    specialRules: ['TRCP 99', 'TRCP 121']
  },
  'Florida': {
    statuteOfLimitations: {
      'credit-card': '5 years',
      'medical-debt': '5 years',
      'personal-loan': '5 years',
      'mortgage': '5 years'
    },
    filingDeadline: '20 days',
    courtSystem: 'County Court',
    specialRules: ['Fla. R. Civ. P. 1.110', 'Fla. R. Civ. P. 1.140']
  }
};

export const analyzeDebtDocument = async (
  file: File, 
  state: string, 
  county: string
): Promise<DebtAnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const text = await file.text();
  const stateData = getStateByName(state);
  const countyData = getCountyByName(state, county);
  
  // Enhanced document analysis
  const analysis = await performAdvancedAnalysis(text, state, county);
  
  // Generate comprehensive response
  const response = await generateLegalResponse(analysis, state, county);
  
  // Calculate risk assessment
  const risk = calculateRiskAssessment(analysis);
  
  // Get court information
  const courtInfo = getCourtInformation(state, county);
  
  return {
    ...analysis,
    generatedResponse: response,
    courtInformation: courtInfo,
    riskAssessment: risk,
    recommendedActions: generateRecommendedActions(analysis, risk)
  };
};

const performAdvancedAnalysis = async (text: string, state: string, county: string) => {
  const lowerText = text.toLowerCase();
  
  // Determine case type
  let caseType: DebtAnalysisResult['caseType'] = 'other';
  if (lowerText.includes('credit card') || lowerText.includes('visa') || lowerText.includes('mastercard')) {
    caseType = 'credit-card';
  } else if (lowerText.includes('medical') || lowerText.includes('hospital') || lowerText.includes('doctor')) {
    caseType = 'medical-debt';
  } else if (lowerText.includes('mortgage') || lowerText.includes('home loan')) {
    caseType = 'mortgage';
  } else if (lowerText.includes('personal loan') || lowerText.includes('installment')) {
    caseType = 'personal-loan';
  } else if (lowerText.includes('debt') || lowerText.includes('collection')) {
    caseType = 'debt-collection';
  }
  
  // Extract parties
  const plaintiff = extractParty(text, 'plaintiff');
  const defendant = extractParty(text, 'defendant');
  
  // Extract amount
  const amount = extractAmount(text);
  
  // Extract service date
  const serviceDate = extractServiceDate(text);
  
  // Calculate filing deadline
  const stateRules = getStateRules(state);
  const filingDeadline = calculateFilingDeadline(serviceDate, stateRules.filingDeadline);
  
  // Analyze legal issues
  const legalIssues = analyzeLegalIssues(text, state);
  
  // Generate defenses
  const recommendedDefenses = generateDefenses(caseType, state, legalIssues);
  
  // Check FDCPA violations
  const fdcpaViolations = analyzeFDCPAViolations(text);
  
  // Statute of limitations analysis
  const statuteOfLimitations = analyzeStatuteOfLimitations(
    caseType, 
    serviceDate, 
    state, 
    stateRules.statuteOfLimitations
  );
  
  return {
    documentType: 'Civil Complaint - Debt Collection',
    caseType,
    plaintiff,
    defendant,
    amount,
    serviceDate,
    filingDeadline,
    urgencyLevel: calculateUrgencyLevel(filingDeadline),
    legalIssues,
    recommendedDefenses,
    statuteOfLimitations,
    fdcpaViolations,
    responseStrategy: generateResponseStrategy(caseType, legalIssues, fdcpaViolations),
    filingInstructions: generateFilingInstructions(state, county),
    affirmativeDefenses: generateAffirmativeDefenses(caseType, legalIssues),
    counterclaims: generateCounterclaims(fdcpaViolations)
  };
};

const extractParty = (text: string, partyType: string): string => {
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.toLowerCase().includes(partyType) && line.includes(':')) {
      return line.split(':')[1]?.trim() || `Unknown ${partyType}`;
    }
  }
  return `Unknown ${partyType}`;
};

const extractAmount = (text: string): string => {
  const amountMatch = text.match(/\$([\d,]+\.?\d*)/)?.[0];
  return amountMatch || 'Amount not specified';
};

const extractServiceDate = (text: string): string => {
  // Look for service date patterns
  const datePatterns = [
    /service.*date.*(\d{1,2}\/\d{1,2}\/\d{4})/i,
    /served.*(\d{1,2}\/\d{1,2}\/\d{4})/i,
    /date.*(\d{1,2}\/\d{1,2}\/\d{4})/i
  ];
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  
  // Default to 5 days ago if not found
  return new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString();
};

const getStateRules = (state: string) => {
  return stateRules[state as keyof typeof stateRules] || {
    statuteOfLimitations: { 'credit-card': '4 years', 'medical-debt': '4 years', 'personal-loan': '4 years', 'mortgage': '4 years' },
    filingDeadline: '21 days',
    courtSystem: 'Civil Court',
    specialRules: []
  };
};

const calculateFilingDeadline = (serviceDate: string, deadlineDays: string): string => {
  const days = parseInt(deadlineDays);
  const service = new Date(serviceDate);
  const deadline = new Date(service.getTime() + days * 24 * 60 * 60 * 1000);
  return deadline.toLocaleDateString();
};

const calculateUrgencyLevel = (deadline: string): 'low' | 'medium' | 'high' | 'critical' => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysLeft <= 3) return 'critical';
  if (daysLeft <= 7) return 'high';
  if (daysLeft <= 14) return 'medium';
  return 'low';
};

const analyzeLegalIssues = (text: string, state: string): LegalIssue[] => {
  const issues: LegalIssue[] = [];
  const lowerText = text.toLowerCase();
  
  // Standing issues
  if (!lowerText.includes('original creditor') && lowerText.includes('assignee')) {
    issues.push({
      type: 'standing',
      description: 'Plaintiff may lack standing to sue as assignee',
      severity: 'high',
      evidence: ['No proof of assignment', 'No chain of title']
    });
  }
  
  // Statute of limitations
  if (lowerText.includes('time barred') || lowerText.includes('statute of limitations')) {
    issues.push({
      type: 'statute_of_limitations',
      description: 'Potential statute of limitations defense',
      severity: 'high',
      evidence: ['Debt may be time-barred', 'Check applicable statute']
    });
  }
  
  // FDCPA violations
  if (lowerText.includes('debt collector') && !lowerText.includes('original creditor')) {
    issues.push({
      type: 'fdcpa',
      description: 'Potential FDCPA violations by debt collector',
      severity: 'medium',
      evidence: ['Third-party debt collector', 'Check for FDCPA compliance']
    });
  }
  
  // Service issues
  if (!lowerText.includes('personal service') && !lowerText.includes('substitute service')) {
    issues.push({
      type: 'service',
      description: 'Potential improper service of process',
      severity: 'medium',
      evidence: ['Service method unclear', 'Check state service requirements']
    });
  }
  
  return issues;
};

const generateDefenses = (caseType: string, state: string, issues: LegalIssue[]): Defense[] => {
  const defenses: Defense[] = [];
  
  // General defenses
  defenses.push({
    type: 'Lack of Standing',
    description: 'Plaintiff lacks standing to bring this action',
    successRate: 0.7,
    requirements: ['Plaintiff must prove ownership of debt', 'Chain of assignment must be clear'],
    caseLaw: ['Standing is a fundamental requirement', 'Plaintiff bears burden of proof']
  });
  
  defenses.push({
    type: 'Statute of Limitations',
    description: 'Action is barred by applicable statute of limitations',
    successRate: 0.8,
    requirements: ['Debt must be time-barred', 'Proper calculation of time period'],
    caseLaw: ['Statute of limitations is an affirmative defense', 'Must be pleaded specifically']
  });
  
  // FDCPA defenses
  if (issues.some(i => i.type === 'fdcpa')) {
    defenses.push({
      type: 'FDCPA Violations',
      description: 'Plaintiff violated Fair Debt Collection Practices Act',
      successRate: 0.6,
      requirements: ['Must be third-party debt collector', 'Specific violation must be proven'],
      caseLaw: ['FDCPA provides statutory damages', 'Violations can result in attorney fees']
    });
  }
  
  // Validation defense
  defenses.push({
    type: 'Lack of Validation',
    description: 'Plaintiff failed to provide proper debt validation',
    successRate: 0.5,
    requirements: ['Must request validation within 30 days', 'Plaintiff must respond with verification'],
    caseLaw: ['FDCPA requires validation upon request', 'Failure to validate can be defense']
  });
  
  return defenses;
};

const analyzeFDCPAViolations = (text: string): FDCPAViolation[] => {
  const violations: FDCPAViolation[] = [];
  const lowerText = text.toLowerCase();
  
  // Harassment
  if (lowerText.includes('harass') || lowerText.includes('threaten')) {
    violations.push({
      type: 'harassment',
      description: 'Potential harassment in debt collection',
      damages: 'Up to $1,000 per violation',
      evidence: ['Threatening language', 'Excessive calls']
    });
  }
  
  // False representation
  if (lowerText.includes('false') || lowerText.includes('misrepresent')) {
    violations.push({
      type: 'false_representation',
      description: 'False or misleading representations',
      damages: 'Up to $1,000 per violation',
      evidence: ['False statements about debt', 'Misleading legal status']
    });
  }
  
  return violations;
};

const analyzeStatuteOfLimitations = (
  caseType: string, 
  serviceDate: string, 
  state: string, 
  stateLimits: Record<string, string>
): StatuteOfLimitations => {
  const limit = stateLimits[caseType] || '4 years';
  const limitYears = parseInt(limit.split(' ')[0]);
  const service = new Date(serviceDate);
  const expiration = new Date(service.getTime() + limitYears * 365 * 24 * 60 * 60 * 1000);
  const now = new Date();
  
  return {
    applicable: true,
    timeLimit: limit,
    startDate: serviceDate,
    expired: now > expiration,
    exceptions: ['Tolling agreements', 'Bankruptcy stay', 'Military service']
  };
};

const generateResponseStrategy = (
  caseType: string, 
  issues: LegalIssue[], 
  violations: FDCPAViolation[]
): ResponseStrategy => {
  const hasStrongDefenses = issues.some(i => i.severity === 'high' || i.severity === 'critical');
  const hasFDCPAViolations = violations.length > 0;
  
  if (hasStrongDefenses && hasFDCPAViolations) {
    return {
      primary: 'File Answer with Counterclaims',
      secondary: ['Assert all affirmative defenses', 'File FDCPA counterclaim'],
      timeline: 'File within deadline, then negotiate',
      estimatedCost: '$500-2000'
    };
  } else if (hasStrongDefenses) {
    return {
      primary: 'File Answer with Defenses',
      secondary: ['Assert statute of limitations', 'Challenge standing'],
      timeline: 'File answer, then seek dismissal',
      estimatedCost: '$300-1000'
    };
  } else {
    return {
      primary: 'Negotiate Settlement',
      secondary: ['Request debt validation', 'Offer payment plan'],
      timeline: 'Contact plaintiff immediately',
      estimatedCost: '$100-500'
    };
  }
};

const generateFilingInstructions = (state: string, county: string): FilingInstruction[] => {
  return [
    {
      step: 1,
      action: 'Prepare Answer to Complaint',
      deadline: 'File within deadline',
      form: 'Answer form available at court website',
      fee: '$50-200 (varies by court)'
    },
    {
      step: 2,
      action: 'File Answer with Court',
      deadline: 'Same as step 1',
      form: 'File in person or electronically',
      fee: 'Included in step 1'
    },
    {
      step: 3,
      action: 'Serve Answer on Plaintiff',
      deadline: 'Within 5 days of filing',
      form: 'Proof of service required',
      fee: '$50-100'
    }
  ];
};

const generateAffirmativeDefenses = (caseType: string, issues: LegalIssue[]): string[] => {
  const defenses = [
    'Lack of standing',
    'Statute of limitations',
    'Failure to state a claim',
    'Lack of personal jurisdiction',
    'Improper venue'
  ];
  
  if (issues.some(i => i.type === 'fdcpa')) {
    defenses.push('FDCPA violations');
  }
  
  return defenses;
};

const generateCounterclaims = (violations: FDCPAViolation[]): string[] => {
  return violations.map(v => `FDCPA violation - ${v.type}`);
};

const calculateRiskAssessment = (analysis: any): RiskAssessment => {
  const hasStrongDefenses = analysis.legalIssues.some((i: LegalIssue) => 
    i.severity === 'high' || i.severity === 'critical'
  );
  const hasFDCPAViolations = analysis.fdcpaViolations.length > 0;
  const isTimeBarred = analysis.statuteOfLimitations.expired;
  
  let overallRisk: 'low' | 'medium' | 'high' = 'medium';
  let defaultRisk = 50;
  let judgmentRisk = 30;
  let wageGarnishmentRisk = 20;
  let bankLevyRisk = 15;
  
  if (hasStrongDefenses && (hasFDCPAViolations || isTimeBarred)) {
    overallRisk = 'low';
    defaultRisk = 20;
    judgmentRisk = 10;
    wageGarnishmentRisk = 5;
    bankLevyRisk = 5;
  } else if (hasStrongDefenses) {
    overallRisk = 'medium';
    defaultRisk = 40;
    judgmentRisk = 25;
    wageGarnishmentRisk = 15;
    bankLevyRisk = 10;
  } else {
    overallRisk = 'high';
    defaultRisk = 80;
    judgmentRisk = 60;
    wageGarnishmentRisk = 40;
    bankLevyRisk = 30;
  }
  
  return {
    overallRisk,
    defaultRisk,
    judgmentRisk,
    wageGarnishmentRisk,
    bankLevyRisk,
    factors: generateRiskFactors(analysis)
  };
};

const generateRiskFactors = (analysis: any): string[] => {
  const factors = [];
  
  if (analysis.statuteOfLimitations.expired) {
    factors.push('Debt may be time-barred');
  }
  
  if (analysis.fdcpaViolations.length > 0) {
    factors.push('FDCPA violations present');
  }
  
  if (analysis.legalIssues.some((i: LegalIssue) => i.type === 'standing')) {
    factors.push('Standing issues identified');
  }
  
  return factors;
};

const generateRecommendedActions = (analysis: any, risk: RiskAssessment): string[] => {
  const actions = [];
  
  if (risk.overallRisk === 'low') {
    actions.push('File answer with all defenses');
    actions.push('Consider filing motion to dismiss');
    actions.push('Prepare for settlement negotiations');
  } else if (risk.overallRisk === 'medium') {
    actions.push('File answer within deadline');
    actions.push('Request debt validation');
    actions.push('Consider settlement options');
  } else {
    actions.push('File answer immediately');
    actions.push('Contact legal aid or attorney');
    actions.push('Consider bankruptcy if appropriate');
  }
  
  return actions;
};

const getCourtInformation = (state: string, county: string): CourtInfo => {
  // This would typically come from a database
  return {
    name: `${county} County Court`,
    address: `123 Court Street, ${county}, ${state}`,
    phone: '(555) 123-4567',
    website: `https://${county.toLowerCase()}court.${state.toLowerCase()}.gov`,
    filingMethods: ['In person', 'Electronic filing', 'Mail']
  };
};

const generateLegalResponse = async (analysis: any, state: string, county: string): Promise<string> => {
  const stateRules = getStateRules(state);
  
  return `IN THE ${county.toUpperCase()} COUNTY COURT
${state.toUpperCase()}

${analysis.defendant.toUpperCase()}, Defendant

ANSWER TO COMPLAINT

Defendant, ${analysis.defendant}, hereby answers the complaint filed by ${analysis.plaintiff} as follows:

GENERAL DENIAL
1. Defendant denies each and every allegation in the complaint not specifically admitted herein.

AFFIRMATIVE DEFENSES
${analysis.affirmativeDefenses.map((defense: string, index: number) => 
  `${index + 1}. ${defense.toUpperCase()}: Defendant asserts the defense of ${defense.toLowerCase()}.`
).join('\n')}

${analysis.counterclaims.length > 0 ? `
COUNTERCLAIMS
${analysis.counterclaims.map((claim: string, index: number) => 
  `${index + 1}. ${claim}: Defendant seeks damages for ${claim.toLowerCase()}.`
).join('\n')}` : ''}

WHEREFORE, Defendant prays that:
1. The complaint be dismissed with prejudice;
2. Defendant be awarded costs and attorney fees;
3. Such other relief as the court deems just and proper.

Dated: ${new Date().toLocaleDateString()}

Respectfully submitted,
${analysis.defendant}
Defendant, Pro Se`;
};

export const generateAnalysisReport = (analysis: DebtAnalysisResult): string => {
  return `ADVANCED DEBT LAWSUIT ANALYSIS REPORT

JURISDICTION: ${analysis.courtInformation.name}
CASE TYPE: ${analysis.caseType.toUpperCase().replace('-', ' ')}
URGENCY LEVEL: ${analysis.urgencyLevel.toUpperCase()}

KEY FINDINGS:
1. Plaintiff: ${analysis.plaintiff}
2. Defendant: ${analysis.defendant}
3. Amount Claimed: ${analysis.amount}
4. Service Date: ${analysis.serviceDate}
5. Filing Deadline: ${analysis.filingDeadline}

LEGAL ISSUES IDENTIFIED:
${analysis.legalIssues.map(issue => 
  `- ${issue.description} (${issue.severity.toUpperCase()})`
).join('\n')}

RECOMMENDED DEFENSES:
${analysis.recommendedDefenses.map(defense => 
  `- ${defense.type}: ${defense.description} (Success Rate: ${defense.successRate * 100}%)`
).join('\n')}

FDCPA VIOLATIONS:
${analysis.fdcpaViolations.map(violation => 
  `- ${violation.type}: ${violation.description} (Damages: ${violation.damages})`
).join('\n')}

STATUTE OF LIMITATIONS:
- Applicable: ${analysis.statuteOfLimitations.applicable ? 'Yes' : 'No'}
- Time Limit: ${analysis.statuteOfLimitations.timeLimit}
- Expired: ${analysis.statuteOfLimitations.expired ? 'Yes' : 'No'}

RISK ASSESSMENT:
- Overall Risk: ${analysis.riskAssessment.overallRisk.toUpperCase()}
- Default Risk: ${analysis.riskAssessment.defaultRisk}%
- Judgment Risk: ${analysis.riskAssessment.judgmentRisk}%
- Wage Garnishment Risk: ${analysis.riskAssessment.wageGarnishmentRisk}%
- Bank Levy Risk: ${analysis.riskAssessment.bankLevyRisk}%

RECOMMENDED ACTIONS:
${analysis.recommendedActions.map(action => `- ${action}`).join('\n')}

COURT INFORMATION:
${analysis.courtInformation.name}
${analysis.courtInformation.address}
Phone: ${analysis.courtInformation.phone}
Website: ${analysis.courtInformation.website}

FILING INSTRUCTIONS:
${analysis.filingInstructions.map(instruction => 
  `${instruction.step}. ${instruction.action} - ${instruction.deadline} (Fee: ${instruction.fee})`
).join('\n')}

DISCLAIMER: This analysis is for informational purposes only and does not constitute legal advice. 
Consult with a qualified attorney for specific legal guidance.`;
}; 