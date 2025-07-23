import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, FileText, Globe, Users, Award } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI reads your lawsuit and identifies key legal elements automatically'
    },
    {
      icon: Clock,
      title: 'Deadline Tracking',
      description: 'Never miss a filing deadline with our urgency meter and automated reminders'
    },
    {
      icon: FileText,
      title: 'State-Specific Formatting',
      description: 'Documents formatted according to your state and county court rules'
    },
    {
      icon: Globe,
      title: 'All 50 States Supported',
      description: 'Comprehensive coverage for civil, small claims, and county courts nationwide'
    },
    {
      icon: Users,
      title: 'Professional Templates',
      description: 'Legally sound templates created by experienced attorneys'
    },
    {
      icon: Award,
      title: 'Instant Downloads',
      description: 'Get your defense documents in PDF and DOCX formats immediately'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional-grade legal defense tools that save you time and money
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;