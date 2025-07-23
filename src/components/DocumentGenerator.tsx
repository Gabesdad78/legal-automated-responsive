import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { generatePDF, generateTXT } from '@/lib/pdfGenerator';

interface DocumentGeneratorProps {
  caseData: {
    state: string;
    county: string;
    caseType: string;
    court: string;
    analysisReport?: string;
  };
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ caseData }) => {
  const handleDownloadPDF = () => {
    const documentData = {
      title: 'Legal Document Analysis Report',
      content: caseData.analysisReport || 'Analysis report not available',
      metadata: {
        state: caseData.state,
        county: caseData.county,
        court: caseData.court,
        date: new Date().toLocaleDateString()
      }
    };
    generatePDF(documentData);
  };

  const handleDownloadTXT = () => {
    const documentData = {
      title: 'Legal Document Analysis Report',
      content: caseData.analysisReport || 'Analysis report not available',
      metadata: {
        state: caseData.state,
        county: caseData.county,
        court: caseData.court,
        date: new Date().toLocaleDateString()
      }
    };
    generateTXT(documentData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Download your legal analysis report in your preferred format.
          </p>
          
          <div className="flex gap-4">
            <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            
            <Button onClick={handleDownloadTXT} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download TXT
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-4">
            <p>• PDF format includes proper formatting and metadata</p>
            <p>• TXT format is plain text for easy editing</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentGenerator;