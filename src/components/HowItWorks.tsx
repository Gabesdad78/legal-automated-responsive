import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Brain, FileText, Download, Scale, Clock } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Lawsuit',
      description: 'Upload your summons, complaint, or legal documents in PDF or image format.',
      details: ['Accepts PDF, JPG, PNG formats', 'Secure encrypted upload', 'OCR text extraction']
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our AI extracts key information and identifies legal issues specific to your case.',
      details: ['Court and jurisdiction detection', 'Deadline calculation', 'Legal issue identification']
    },
    {
      icon: Scale,
      title: 'Legal Rules Engine',
      description: 'System applies state-specific rules and procedures for your jurisdiction.',
      details: ['50-state rules database', 'County-specific procedures', 'Case type customization']
    },
    {
      icon: FileText,
      title: 'Generate Response',
      description: 'Creates professionally formatted legal documents tailored to your case.',
      details: ['Answer to complaint', 'Affirmative defenses', 'Motion to dismiss (if applicable)']
    },
    {
      icon: Download,
      title: 'Download & File',
      description: 'Get your documents in multiple formats with filing instructions.',
      details: ['PDF and DOCX formats', 'Court-specific filing guide', 'Deadline reminders']
    },
    {
      icon: Clock,
      title: 'Ongoing Support',
      description: 'Access your documents anytime and get updates on your case status.',
      details: ['Document storage', 'Case tracking', '24/7 access to files']
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From lawsuit to legal response in minutes, not months. Our AI-powered system 
            handles the complex legal work so you don't have to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-600">
                        Step {index + 1}
                      </span>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-blue-200" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Legal Assistant?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">50</span>
                </div>
                <h4 className="font-semibold mb-2">All 50 States</h4>
                <p className="text-sm text-gray-600">Complete coverage of state and local court rules</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">24/7</span>
                </div>
                <h4 className="font-semibold mb-2">Always Available</h4>
                <p className="text-sm text-gray-600">Generate responses anytime, even on weekends</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">99%</span>
                </div>
                <h4 className="font-semibold mb-2">Accuracy Rate</h4>
                <p className="text-sm text-gray-600">Professionally formatted, legally sound documents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;