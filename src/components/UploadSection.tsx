import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import ProcessingWorkflow from './ProcessingWorkflow';

const UploadSection: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  const counties = {
    'California': ['Alameda', 'Contra Costa', 'Fresno', 'Kern', 'Los Angeles', 'Orange', 'Riverside', 'Sacramento', 'San Bernardino', 'San Diego', 'San Francisco', 'Santa Clara', 'Ventura'],
    'Texas': ['Bexar', 'Collin', 'Dallas', 'Denton', 'Fort Bend', 'Harris', 'Hidalgo', 'Montgomery', 'Tarrant', 'Travis', 'Williamson'],
    'New York': ['Bronx', 'Erie', 'Kings', 'Monroe', 'Nassau', 'New York', 'Queens', 'Richmond', 'Suffolk', 'Westchester'],
    'Florida': ['Broward', 'Duval', 'Hillsborough', 'Miami-Dade', 'Orange', 'Palm Beach', 'Pinellas', 'Polk']
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const canProcess = uploadedFile && selectedState && selectedCounty;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Upload Your Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {uploadedFile ? (
              <div className="space-y-2">
                <FileText className="h-12 w-12 text-green-600 mx-auto" />
                <p className="font-medium text-green-600">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Drop your documents here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Or click to browse (PDF, JPG, PNG)
                  </p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Choose Files
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
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
              <Select 
                value={selectedCounty} 
                onValueChange={setSelectedCounty}
                disabled={!selectedState}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your county" />
                </SelectTrigger>
                <SelectContent>
                  {selectedState && counties[selectedState as keyof typeof counties] ? 
                    counties[selectedState as keyof typeof counties].map(county => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    )) : 
                    <SelectItem value="other">Other</SelectItem>
                  }
                </SelectContent>
              </Select>
            </div>
          </div>

          {!canProcess && (
            <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Please upload a document and select your state and county to continue.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {canProcess && (
        <ProcessingWorkflow 
          uploadedFile={uploadedFile}
          selectedState={selectedState}
          selectedCounty={selectedCounty}
        />
      )}
    </div>
  );
};

export default UploadSection;