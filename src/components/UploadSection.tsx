import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthProvider';
import { analyzeDebtDocument, generateAnalysisReport, DebtAnalysisResult } from '@/lib/advancedAIAnalysis';
import { documents, analysis } from '@/lib/supabase';
import { getAllStates, getCountiesForState } from '@/data/states';
import { Loader2, Upload, FileText, AlertTriangle, CheckCircle, Clock, DollarSign, Shield, Gavel } from 'lucide-react';

const UploadSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DebtAnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string>('');
  const { user, checkAccess } = useAuth();
  const { toast } = useToast();

  const states = getAllStates();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 10MB',
          variant: 'destructive'
        });
        return;
      }
      setSelectedFile(file);
      toast({
        title: 'File selected',
        description: `${file.name} has been selected`,
      });
    }
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCounty(''); // Reset county when state changes
    toast({
      title: 'State selected',
      description: `Selected state: ${state}`,
    });
  };

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
    toast({
      title: 'County selected',
      description: `Selected county: ${county}`,
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !selectedState || !selectedCounty) {
      toast({
        title: 'Missing information',
        description: 'Please select a file, state, and county',
        variant: 'destructive'
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to analyze documents',
        variant: 'destructive'
      });
      return;
    }

    if (!checkAccess('upload')) {
      toast({
        title: 'Access denied',
        description: 'Your plan does not include document analysis',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setCurrentStep('Uploading document...');

    try {
      // For demo purposes, simulate upload and analysis
      setProgress(25);
      setCurrentStep('Analyzing document content...');

      // Simulate AI analysis
      const result = await analyzeDebtDocument(selectedFile, selectedState, selectedCounty);

      setProgress(75);
      setCurrentStep('Generating legal response...');

      // Simulate saving analysis
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProgress(100);
      setCurrentStep('Analysis complete!');
      setAnalysisResult(result);

      toast({
        title: 'Analysis complete',
        description: 'Your document has been analyzed successfully',
      });

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: 'Analysis failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
      setCurrentStep('');
    }
  };

  const handleDownloadPDF = () => {
    if (analysisResult) {
      const report = generateAnalysisReport(analysisResult);
      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `legal-analysis-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Download started',
        description: 'Analysis report downloaded successfully',
      });
    }
  };

  const handleSaveResponse = () => {
    if (analysisResult) {
      const response = analysisResult.generatedResponse;
      const blob = new Blob([response], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `legal-response-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Response saved',
        description: 'Legal response saved successfully',
      });
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Legal Document
          </CardTitle>
          <CardDescription>
            Upload your debt lawsuit summons for advanced AI analysis and response generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">Legal Document (PDF, DOC, DOCX)</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              disabled={isAnalyzing}
            />
            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>

          {/* State and County Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={selectedState} onValueChange={handleStateChange} disabled={isAnalyzing}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.abbreviation} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Select value={selectedCounty} onValueChange={handleCountyChange} disabled={isAnalyzing || !selectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  {selectedState && getCountiesForState(selectedState).map((county) => (
                    <SelectItem key={county.fips} value={county.name}>
                      {county.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Analysis Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!selectedFile || !selectedState || !selectedCounty || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Gavel className="mr-2 h-4 w-4" />
                Analyze Document
              </>
            )}
          </Button>

          {/* Progress */}
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{currentStep}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Summary</span>
                <Badge variant={analysisResult.urgencyLevel === 'critical' ? 'destructive' : 'secondary'}>
                  {analysisResult.urgencyLevel.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysisResult.amount}</div>
                  <div className="text-sm text-gray-600">Amount Claimed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{analysisResult.filingDeadline}</div>
                  <div className="text-sm text-gray-600">Filing Deadline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysisResult.legalIssues.length}</div>
                  <div className="text-sm text-gray-600">Legal Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{analysisResult.recommendedDefenses.length}</div>
                  <div className="text-sm text-gray-600">Defenses</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="defenses">Defenses</TabsTrigger>
              <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
              <TabsTrigger value="response">Legal Response</TabsTrigger>
              <TabsTrigger value="instructions">Filing Instructions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Case Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Plaintiff</Label>
                      <p className="text-sm text-gray-600">{analysisResult.plaintiff}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Defendant</Label>
                      <p className="text-sm text-gray-600">{analysisResult.defendant}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Case Type</Label>
                      <p className="text-sm text-gray-600">{analysisResult.caseType.replace('-', ' ').toUpperCase()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Service Date</Label>
                      <p className="text-sm text-gray-600">{analysisResult.serviceDate}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium">Legal Issues</Label>
                    <div className="mt-2 space-y-2">
                      {analysisResult.legalIssues.map((issue, index) => (
                        <Alert key={index}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <div className="flex items-center justify-between">
                              <span>{issue.description}</span>
                              <Badge variant={issue.severity === 'critical' ? 'destructive' : 'secondary'}>
                                {issue.severity}
                              </Badge>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="defenses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Defenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.recommendedDefenses.map((defense, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{defense.type}</h4>
                          <Badge variant="outline">{Math.round(defense.successRate * 100)}% Success Rate</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{defense.description}</p>
                        <div className="text-xs text-gray-500">
                          <strong>Requirements:</strong> {defense.requirements.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Overall Risk</span>
                      <Badge className={getRiskColor(analysisResult.riskAssessment.overallRisk)}>
                        {analysisResult.riskAssessment.overallRisk.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{analysisResult.riskAssessment.defaultRisk}%</div>
                        <div className="text-xs text-gray-600">Default Risk</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{analysisResult.riskAssessment.judgmentRisk}%</div>
                        <div className="text-xs text-gray-600">Judgment Risk</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{analysisResult.riskAssessment.wageGarnishmentRisk}%</div>
                        <div className="text-xs text-gray-600">Wage Garnishment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{analysisResult.riskAssessment.bankLevyRisk}%</div>
                        <div className="text-xs text-gray-600">Bank Levy</div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-sm font-medium">Risk Factors</Label>
                      <div className="mt-2 space-y-1">
                        {analysisResult.riskAssessment.factors.map((factor, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="response" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Generated Legal Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap font-mono">{analysisResult.generatedResponse}</pre>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                      <FileText className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSaveResponse}>
                      <Shield className="mr-2 h-4 w-4" />
                      Save Response
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Filing Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.filingInstructions.map((instruction) => (
                      <div key={instruction.step} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {instruction.step}
                          </div>
                          <h4 className="font-semibold">{instruction.action}</h4>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Deadline:</strong> {instruction.deadline}</p>
                          <p><strong>Form:</strong> {instruction.form}</p>
                          <p><strong>Fee:</strong> {instruction.fee}</p>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div>
                      <Label className="text-sm font-medium">Court Information</Label>
                      <div className="mt-2 space-y-1 text-sm">
                        <p><strong>Court:</strong> {analysisResult.courtInformation.name}</p>
                        <p><strong>Address:</strong> {analysisResult.courtInformation.address}</p>
                        <p><strong>Phone:</strong> {analysisResult.courtInformation.phone}</p>
                        <p><strong>Website:</strong> {analysisResult.courtInformation.website}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default UploadSection;