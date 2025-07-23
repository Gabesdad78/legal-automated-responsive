import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Upload, FileText, Download } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Defend Yourself Against
            <span className="text-blue-600 block">Any Lawsuit</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your lawsuit and get professionally formatted legal responses 
            tailored to your state and county in minutes, not months.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
            Start Your Defense Now
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Upload Lawsuit</h3>
            <p className="text-gray-600 text-sm">PDF or image format</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm">Auto-detect key elements</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Generate Response</h3>
            <p className="text-gray-600 text-sm">State-specific formatting</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Download & File</h3>
            <p className="text-gray-600 text-sm">PDF & DOCX formats</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;