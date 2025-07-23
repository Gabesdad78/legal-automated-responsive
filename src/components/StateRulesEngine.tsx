import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Clock, FileText, AlertTriangle } from 'lucide-react';

interface StateRulesEngineProps {
  state: string;
  county: string;
  caseType: string;
}

const StateRulesEngine: React.FC<StateRulesEngineProps> = ({ state, county, caseType }) => {
  const stateRules = {
    'California': {
      responseTime: '30 days',
      filingMethod: 'Online or in-person',
      courtFees: '$435',
      specialRules: ['Anti-SLAPP motion available', 'Mandatory settlement conference'],
      defenses: ['Statute of limitations', 'Lack of standing', 'Improper service']
    },
    'Texas': {
      responseTime: '20 days (plus Monday)',
      filingMethod: 'In-person or mail',
      courtFees: '$402',
      specialRules: ['General denial allowed', 'Verified pleading required'],
      defenses: ['Lack of consideration', 'Payment', 'Accord and satisfaction']
    },
    'New York': {
      responseTime: '20 days (30 if served by mail)',
      filingMethod: 'NYSCEF or in-person',
      courtFees: '$210',
      specialRules: ['Verified answer required', 'Counterclaim permitted'],
      defenses: ['Statute of limitations', 'Usury', 'Lack of privity']
    },
    'Florida': {
      responseTime: '20 days',
      filingMethod: 'E-filing required',
      courtFees: '$401',
      specialRules: ['Affirmative defenses must be pled', 'Jury demand with answer'],
      defenses: ['Payment', 'Waiver', 'Estoppel']
    }
  };

  const currentRules = stateRules[state as keyof typeof stateRules] || stateRules['California'];

  const caseTypeRules = {
    'debt-collection': {
      commonDefenses: ['FDCPA violations', 'Lack of standing', 'Statute of limitations'],
      requiredDocs: ['Answer', 'Affirmative Defenses'],
      strategicOptions: ['Motion to Compel Arbitration', 'Counterclaim for damages']
    },
    'eviction': {
      commonDefenses: ['Warranty of habitability', 'Retaliatory eviction', 'Improper notice'],
      requiredDocs: ['Answer', 'Counterclaim'],
      strategicOptions: ['Jury trial demand', 'Discovery requests']
    },
    'contract': {
      commonDefenses: ['Breach by plaintiff', 'Impossibility', 'Frustration of purpose'],
      requiredDocs: ['Answer', 'Counterclaim'],
      strategicOptions: ['Third-party complaint', 'Cross-claim']
    }
  };

  const typeRules = caseTypeRules[caseType as keyof typeof caseTypeRules] || caseTypeRules['debt-collection'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          {state} Legal Rules & Procedures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rules" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rules">State Rules</TabsTrigger>
            <TabsTrigger value="defenses">Defenses</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Response Time:</span>
                  <Badge variant="outline">{currentRules.responseTime}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Filing Method:</span>
                  <span className="text-sm">{currentRules.filingMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Court Fees:</span>
                  <Badge>{currentRules.courtFees}</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Special Rules:</h4>
                <ul className="text-sm space-y-1">
                  {currentRules.specialRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="defenses" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Common Defenses for {caseType}:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {typeRules.commonDefenses.map((defense, index) => (
                    <Badge key={index} variant="secondary" className="justify-start">
                      {defense}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">State-Specific Defenses:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentRules.defenses.map((defense, index) => (
                    <Badge key={index} variant="outline" className="justify-start">
                      {defense}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="strategy" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Required Documents:</h4>
                <div className="space-y-2">
                  {typeRules.requiredDocs.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">{doc}</span>
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Strategic Options:</h4>
                <div className="space-y-2">
                  {typeRules.strategicOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <span className="text-sm">{option}</span>
                      <Badge variant="secondary" className="text-xs">Optional</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StateRulesEngine;