import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, FileText, Brain, Download } from 'lucide-react';
import LegalAnalysis from './LegalAnalysis';
import DocumentGenerator from './DocumentGenerator';
import StateRulesEngine from './StateRulesEngine';
import { analyzeDocument, generateAnalysisReport, AnalysisResult } from '@/lib/aiAnalysis';

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
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResponse, setAnalysisResponse] = useState('');

  const steps = [
    { id: 'upload', title: 'Document Upload', icon: FileText },
    { id: 'analysis', title: 'AI Analysis', icon: Brain },
    { id: 'rules', title: 'Legal Rules', icon: AlertCircle },
    { id: 'generate', title: 'Generate Response', icon: Download }
  ];

  const startProcessing = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    setCurrentStep(1);
    
    // Simulate progress during analysis
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    try {
      // Perform actual AI analysis
      const analysis = await analyzeDocument(uploadedFile, selectedState, selectedCounty);
      setAnalysisData(analysis);
      
      // Generate detailed report
      const report = generateAnalysisReport(analysis, selectedState, selectedCounty);
      setAnalysisResponse(report);
      
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(3);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsProcessing(false);
    }
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
        <LegalAnalysis analysisData={{
          court: `${selectedState === 'California' ? 'Superior' : selectedState === 'Texas' ? 'District' : 'Supreme'} Court of ${selectedState}, ${selectedCounty} County`,
          jurisdiction: `${selectedState}, ${selectedCounty}`,
          plaintiff: analysisData.plaintiff,
          defendant: analysisData.defendant,
          caseNumber: '2024CV' + Math.floor(Math.random() * 10000),
          caseType: analysisData.caseType,
          filingDeadline: analysisData.filingDeadline,
          legalIssues: analysisData.legalIssues,
          serviceMethod: 'Personal Service',
          urgencyLevel: analysisData.urgencyLevel
        }} />
      )}

      {currentStep >= 2 && (
        <StateRulesEngine 
          state={selectedState} 
          county={selectedCounty} 
          caseType={analysisData?.caseType || 'general-civil'} 
        />
      )}

      {currentStep >= 3 && analysisData && (
        <DocumentGenerator 
          caseData={{
            state: selectedState,
            county: selectedCounty,
            caseType: analysisData.caseType,
            court: `${selectedState === 'California' ? 'Superior' : selectedState === 'Texas' ? 'District' : 'Supreme'} Court`,
            analysisReport: analysisResponse
          }} 
        />
      )}
    </div>
  );
};

export default ProcessingWorkflow;