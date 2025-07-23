import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, MapPin, User, FileText, Scale } from 'lucide-react';

interface LegalAnalysisProps {
  analysisData: {
    court: string;
    jurisdiction: string;
    plaintiff: string;
    defendant: string;
    caseNumber: string;
    caseType: string;
    filingDeadline: string;
    legalIssues: string[];
    serviceMethod: string;
    urgencyLevel: 'low' | 'medium' | 'high';
  };
}

const LegalAnalysis: React.FC<LegalAnalysisProps> = ({ analysisData }) => {
  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Case Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Court:</span>
              <span className="text-sm">{analysisData.court}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Plaintiff:</span>
              <span className="text-sm">{analysisData.plaintiff}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Case #:</span>
              <span className="text-sm">{analysisData.caseNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Deadline:</span>
              <Badge className={urgencyColors[analysisData.urgencyLevel]}>
                {analysisData.filingDeadline}
              </Badge>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Legal Issues Identified:</h4>
            <div className="flex flex-wrap gap-2">
              {analysisData.legalIssues.map((issue, index) => (
                <Badge key={index} variant="outline">{issue}</Badge>
              ))}
            </div>
          </div>
          
          {analysisData.urgencyLevel === 'high' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-800 font-medium">
                Urgent: Response deadline approaching soon!
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalAnalysis;