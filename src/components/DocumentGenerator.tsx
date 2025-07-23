import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentGeneratorProps {
  caseData: {
    state: string;
    county: string;
    caseType: string;
    court: string;
  };
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ caseData }) => {
  const [generatedDocs, setGeneratedDocs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateDocuments = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedDocs([
        'Answer to Complaint',
        'Motion to Dismiss', 
        'Affirmative Defenses',
        'Jury Demand Form'
      ]);
      setIsGenerating(false);
      toast({
        title: "Documents Generated",
        description: "All documents are ready for download.",
      });
    }, 3000);
  };

  const downloadDocument = (docName: string, format: string) => {
    const content = `${docName}\n\nCase Type: ${caseData.caseType}\nJurisdiction: ${caseData.state}, ${caseData.county}\nCourt: ${caseData.court}\n\nGenerated on: ${new Date().toLocaleDateString()}\n\nThis is a ${docName} document template.\n\nDocument content would go here with proper legal formatting and structure.`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docName.replace(/\s+/g, '_')}.txt`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    toast({
      title: "Download Started",
      description: `${docName} is downloading as TXT file.`,
    });
  };

  const documentTemplates = {
    'Answer to Complaint': {
      description: 'Formal response to each allegation in the complaint',
      required: true,
      format: 'State-specific format with numbered responses'
    },
    'Motion to Dismiss': {
      description: 'Request to dismiss case for legal deficiencies', 
      required: false,
      format: 'Based on jurisdiction rules and case analysis'
    },
    'Affirmative Defenses': {
      description: 'Legal defenses specific to your case type',
      required: true,
      format: 'Customized for debt collection, eviction, or contract disputes'
    },
    'Jury Demand Form': {
      description: 'Request for jury trial (if applicable)',
      required: false,
      format: 'State-specific jury demand requirements'
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Generation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Jurisdiction: {caseData.state}, {caseData.county}</h4>
            <p className="text-sm text-gray-600">
              Documents will be formatted according to {caseData.court} rules and {caseData.state} civil procedure.
            </p>
          </div>

          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Document Templates</TabsTrigger>
              <TabsTrigger value="generated">Generated Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-4">
              {Object.entries(documentTemplates).map(([name, details]) => (
                <div key={name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{name}</h5>
                    <Badge variant={details.required ? 'default' : 'secondary'}>
                      {details.required ? 'Required' : 'Optional'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{details.description}</p>
                  <p className="text-xs text-gray-500">{details.format}</p>
                </div>
              ))}
              
              <Button 
                onClick={generateDocuments} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? 'Generating Documents...' : 'Generate All Documents'}
              </Button>
            </TabsContent>
            
            <TabsContent value="generated" className="space-y-4">
              {generatedDocs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                  <p>No documents generated yet. Click "Generate All Documents" to start.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {generatedDocs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">{doc}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => downloadDocument(doc, 'TXT')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download TXT
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentGenerator;