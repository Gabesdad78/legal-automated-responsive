import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText } from 'lucide-react';
import { counties } from '@/data/counties';
import ProcessingWorkflow from './ProcessingWorkflow';

const UploadSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [showWorkflow, setShowWorkflow] = useState(false);

  const states = Object.keys(counties);
  const availableCounties = selectedState ? counties[selectedState] || [] : [];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleStartAnalysis = () => {
    if (selectedFile && selectedState && selectedCounty) {
      setShowWorkflow(true);
    }
  };

  if (showWorkflow) {
    return (
      <ProcessingWorkflow 
        uploadedFile={selectedFile}
        selectedState={selectedState}
        selectedCounty={selectedCounty}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Legal Document
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium">Click to upload document</p>
              <p className="text-sm text-gray-500">PDF, DOC, DOCX, or TXT files</p>
            </label>
            {selectedFile && (
              <p className="mt-2 text-sm text-green-600">Selected: {selectedFile.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">County</label>
              <Select value={selectedCounty} onValueChange={setSelectedCounty} disabled={!selectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  {availableCounties.map(county => (
                    <SelectItem key={county} value={county}>{county}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleStartAnalysis}
            disabled={!selectedFile || !selectedState || !selectedCounty}
            className="w-full"
          >
            Start Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadSection;