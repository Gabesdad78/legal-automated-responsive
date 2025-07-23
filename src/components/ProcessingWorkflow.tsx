import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, FileText, Brain, Download } from 'lucide-react';
import LegalAnalysis from './LegalAnalysis';
import DocumentGenerator from './DocumentGenerator';
import StateRulesEngine from './StateRulesEngine';

interface ProcessingWorkflowProps {
  uploadedFile: File | null;
  selectedState: string;
  selectedCounty: string;
}

const ProcessingWorkflow: React.FC<ProcessingWorkflowProps> = ({ 
  uploadedFile, 
  selectedState, 
  selectedCounty 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResponse, setAnalysisResponse] = useState('');

  const steps = [
    { id: 'upload', title: 'Document Upload', icon: FileText },
    { id: 'analysis', title: 'AI Analysis', icon: Brain },
    { id: 'rules', title: 'Legal Rules', icon: AlertCircle },
    { id: 'generate', title: 'Generate Response', icon: Download }
  ];

  const startProcessing = async () => {
    setIsProcessing(true);
    setCurrentStep(1);
    
    // Simulate AI analysis with progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Generate detailed analysis response
    const response = `LEGAL DOCUMENT ANALYSIS REPORT

Jurisdiction: ${selectedState}, ${selectedCounty} County
Document Type: Civil Complaint
Case Type: Debt Collection

KEY FINDINGS:
1. Plaintiff: ABC Collection Agency LLC
2. Defendant: John Doe
3. Amount Claimed: $5,247.83
4. Original Creditor: XYZ Credit Card Company
5. Service Date: ${new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}

LEGAL ISSUES IDENTIFIED:
- Statute of Limitations: Verify 4-year limit for written contracts
- Standing to Sue: Request proof of ownership of debt
- FDCPA Compliance: Check for proper debt validation notices
- Account Stated: Challenge lack of detailed accounting

RECOMMENDED DEFENSES:
1. Lack of Standing - Demand proof plaintiff owns the debt
2. Statute of Limitations - Calculate from last payment date
3. Failure to State a Claim - Challenge vague allegations
4. FDCPA Violations - Review collection practices

NEXT STEPS:
- File Answer within ${selectedState === 'California' ? '30' : '20'} days
- Assert all affirmative defenses
- Consider counterclaims for FDCPA violations
- Request debt validation documentation`;
    
    setAnalysisResponse(response);
    
    // Mock analysis results
    setAnalysisData({
      court: `${selectedState === 'California' ? 'Superior' : selectedState === 'Texas' ? 'District' : 'Supreme'} Court of ${selectedState}, ${selectedCounty} County`,
      jurisdiction: `${selectedState}, ${selectedCounty}`,
      plaintiff: 'ABC Collection Agency LLC',
      defendant: 'John Doe',
      caseNumber: '2024CV' + Math.floor(Math.random() * 10000),
      caseType: 'debt-collection',
      filingDeadline: `${selectedState === 'California' ? '30' : '20'} days from service`,
      legalIssues: ['FDCPA Violations', 'Statute of Limitations', 'Lack of Standing', 'Account Stated'],
      serviceMethod: 'Personal Service',
      urgencyLevel: 'high' as const
    });
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentStep(3);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (uploadedFile && selectedState && selectedCounty) {
      startProcessing();
    }
  }, [uploadedFile, selectedState, selectedCounty]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Processing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted ? 'bg-green-600 text-white' :
                    isActive ? 'bg-blue-600 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          
          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600 text-center">
                {currentStep === 1 ? 'Analyzing document...' : 'Processing legal rules...'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Response Display */}
      {analysisResponse && currentStep >= 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm font-mono">{analysisResponse}</pre>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisData && currentStep >= 2 && (
        <LegalAnalysis analysisData={analysisData} />
      )}

      {currentStep >= 2 && (
        <StateRulesEngine 
          state={selectedState} 
          county={selectedCounty} 
          caseType="debt-collection" 
        />
      )}

      {currentStep >= 3 && (
        <DocumentGenerator 
          caseData={{
            state: selectedState,
            county: selectedCounty,
            caseType: 'debt-collection',
            court: `${selectedState === 'California' ? 'Superior' : selectedState === 'Texas' ? 'District' : 'Supreme'} Court`
          }} 
        />
      )}
    </div>
  );
};

export default ProcessingWorkflow;