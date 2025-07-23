import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/AuthProvider';
import { Download, FileText, Calendar, CreditCard } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'answer' | 'motion' | 'settlement';
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
}

const UserDashboard: React.FC = () => {
  const { user, checkAccess } = useAuth();
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Answer to Debt Collection Lawsuit',
      type: 'answer',
      createdAt: '2024-01-15',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Motion to Dismiss - Contract Dispute',
      type: 'motion',
      createdAt: '2024-01-10',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '3',
      name: 'Settlement Negotiation Letter',
      type: 'settlement',
      createdAt: '2024-01-08',
      status: 'processing'
    }
  ]);

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>Please log in to access your dashboard.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {user.email}</h1>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline">{user.plan} plan</Badge>
          <Badge variant={user.status === 'testing' ? 'secondary' : 'default'}>
            {user.status}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="usage">Usage & Billing</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents</CardTitle>
              <CardDescription>
                All your legal documents are stored here for easy access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {doc.createdAt}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      {doc.status === 'completed' && doc.downloadUrl && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold capitalize">{user.plan}</p>
                  <p className="text-gray-600">
                    {user.plan === 'unlimited' ? 'Unlimited document generation' :
                     user.plan === 'premium' ? 'Up to 10 documents per month' :
                     user.plan === 'single' ? 'Pay per document' : 'Free tier'}
                  </p>
                  {user.status === 'testing' && (
                    <Badge variant="secondary">Testing Access - Full Features</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-gray-600">Documents generated</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Account Type</label>
                <p className="text-gray-600 capitalize">{user.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Member Since</label>
                <p className="text-gray-600">January 2024</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;