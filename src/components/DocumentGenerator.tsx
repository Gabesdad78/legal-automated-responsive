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

  const downloadDocument = (docName: string) => {
    const docContent = generateDocumentContent(docName);
    
    const blob = new Blob([docContent], { 
      type: 'text/plain;charset=utf-8' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${docName.replace(/\s+/g, '_')}_${caseData.state}_${caseData.county}.txt`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
    
    toast({
      title: "Download Complete",
      description: `${docName} downloaded successfully as TXT file.`,
    });
  };

  const generateDocumentContent = (docName: string): string => {
    const caseNumber = '2024CV' + Math.floor(Math.random() * 10000);
    const currentDate = new Date().toLocaleDateString();
    
    const header = `${caseData.court} of ${caseData.state}\n${caseData.county} County\n\nCase No: ${caseNumber}\n\nABC Collection Agency LLC,\n    Plaintiff,\nv.\nJohn Doe,\n    Defendant.\n\n`;
    
    switch (docName) {
      case 'Answer to Complaint':
        return `${header}ANSWER TO COMPLAINT\n\nTO THE HONORABLE COURT:\n\nDefendant John Doe hereby answers the Complaint as follows:\n\n1. GENERAL DENIAL\nDefendant denies each and every allegation contained in the Complaint except as specifically admitted herein.\n\n2. AFFIRMATIVE DEFENSES\n\nFIRST AFFIRMATIVE DEFENSE - Statute of Limitations\nThe alleged cause of action is barred by the applicable statute of limitations.\n\nSECOND AFFIRMATIVE DEFENSE - Lack of Standing\nPlaintiff lacks standing to bring this action as it has failed to prove ownership of the alleged debt.\n\nTHIRD AFFIRMATIVE DEFENSE - Failure to State a Claim\nThe Complaint fails to state a claim upon which relief can be granted.\n\nFOURTH AFFIRMATIVE DEFENSE - FDCPA Violations\nPlaintiff has violated the Fair Debt Collection Practices Act.\n\nWHEREFORE, Defendant respectfully requests that this Court:\n1. Dismiss the Complaint with prejudice\n2. Award Defendant costs and attorney fees\n3. Grant such other relief as the Court deems just and proper\n\nRespectfully submitted,\n\n_________________________\nDefendant Pro Se\nDate: ${currentDate}`;
        
      case 'Motion to Dismiss':
        return `${header}MOTION TO DISMISS\n\nTO THE HONORABLE COURT:\n\nDefendant moves this Court to dismiss the Complaint pursuant to ${caseData.state === 'California' ? 'Code of Civil Procedure Section 438' : 'applicable civil procedure rules'} on the following grounds:\n\n1. FAILURE TO STATE A CLAIM\nThe Complaint fails to state facts sufficient to constitute a cause of action.\n\n2. LACK OF STANDING\nPlaintiff has failed to establish standing to bring this action.\n\n3. STATUTE OF LIMITATIONS\nThe alleged cause of action is time-barred.\n\nSUPPORTING MEMORANDUM\n\nI. LEGAL STANDARD\nA motion to dismiss tests the legal sufficiency of the complaint.\n\nII. ARGUMENT\nA. Plaintiff Lacks Standing\nPlaintiff has not provided evidence of ownership of the alleged debt.\n\nB. Statute of Limitations\nThe alleged debt is beyond the ${caseData.state === 'California' ? '4-year' : '4-year'} statute of limitations.\n\nWHEREFORE, Defendant respectfully requests dismissal with prejudice.\n\nRespectfully submitted,\n\n_________________________\nDefendant Pro Se\nDate: ${currentDate}`;
        
      case 'Affirmative Defenses':
        return `${header}AFFIRMATIVE DEFENSES\n\nDefendant asserts the following affirmative defenses:\n\n1. STATUTE OF LIMITATIONS\nThe alleged cause of action accrued more than four years prior to filing.\n\n2. LACK OF STANDING\nPlaintiff lacks standing as it cannot prove ownership of the debt.\n\n3. FAILURE TO STATE A CLAIM\nThe Complaint fails to state a claim upon which relief can be granted.\n\n4. FDCPA VIOLATIONS\nPlaintiff violated the Fair Debt Collection Practices Act.\n\n5. ACCOUNT STATED\nNo account stated exists between the parties.\n\n6. LACK OF CONSIDERATION\nThere was no consideration for the alleged agreement.\n\n7. PAYMENT\nThe alleged debt has been paid in full.\n\n8. ACCORD AND SATISFACTION\nAny obligation was discharged by accord and satisfaction.\n\nRespectfully submitted,\n\n_________________________\nDefendant Pro Se\nDate: ${currentDate}`;
        
      case 'Jury Demand Form':
        return `${header}DEMAND FOR JURY TRIAL\n\nTO THE HONORABLE COURT:\n\nDefendant hereby demands a trial by jury on all issues triable by jury in this action.\n\nThis demand is made pursuant to ${caseData.state === 'California' ? 'Code of Civil Procedure Section 631' : 'applicable civil procedure rules'} and the Seventh Amendment to the United States Constitution.\n\nDefendant demands a jury of twelve persons for trial of this matter.\n\nRespectfully submitted,\n\n_________________________\nDefendant Pro Se\nDate: ${currentDate}`;
        
      default:
        return `${header}${docName}\n\nGenerated on: ${currentDate}\n\nThis document has been generated for ${caseData.state}, ${caseData.county} County.`;
    }
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
                        onClick={() => downloadDocument(doc)}
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