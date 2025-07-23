import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  status: 'active' | 'testing' | 'suspended';
  plan: 'free' | 'single' | 'premium' | 'unlimited';
  createdAt: string;
}

interface Discount {
  id: string;
  code: string;
  percentage: number;
  expiresAt: string;
  isActive: boolean;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', email: 'tester@example.com', status: 'testing', plan: 'premium', createdAt: '2024-01-15' },
    { id: '2', email: 'user@example.com', status: 'active', plan: 'single', createdAt: '2024-01-20' }
  ]);
  
  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: '1', code: 'BETA50', percentage: 50, expiresAt: '2024-12-31', isActive: true },
    { id: '2', code: 'WELCOME25', percentage: 25, expiresAt: '2024-06-30', isActive: true }
  ]);
  
  const [newDiscount, setNewDiscount] = useState({ code: '', percentage: 0, expiresAt: '' });
  const [testUserEmail, setTestUserEmail] = useState('');

  const grantTestAccess = () => {
    if (!testUserEmail) return;
    
    const newUser: User = {
      id: Date.now().toString(),
      email: testUserEmail,
      status: 'testing',
      plan: 'premium',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUser]);
    setTestUserEmail('');
    toast({ title: 'Test access granted', description: `${testUserEmail} now has premium testing access` });
  };

  const createDiscount = () => {
    if (!newDiscount.code || !newDiscount.percentage) return;
    
    const discount: Discount = {
      id: Date.now().toString(),
      code: newDiscount.code.toUpperCase(),
      percentage: newDiscount.percentage,
      expiresAt: newDiscount.expiresAt,
      isActive: true
    };
    
    setDiscounts([...discounts, discount]);
    setNewDiscount({ code: '', percentage: 0, expiresAt: '' });
    toast({ title: 'Discount created', description: `Code ${discount.code} is now active` });
  };

  const toggleDiscount = (id: string) => {
    setDiscounts(discounts.map(d => 
      d.id === id ? { ...d, isActive: !d.isActive } : d
    ));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="discounts">Discount Codes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grant Test Access</CardTitle>
              <CardDescription>Give premium testing access to specific users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email address"
                  value={testUserEmail}
                  onChange={(e) => setTestUserEmail(e.target.value)}
                />
                <Button onClick={grantTestAccess}>Grant Access</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Current Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-gray-500">Joined: {user.createdAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={user.status === 'testing' ? 'secondary' : 'default'}>
                        {user.status}
                      </Badge>
                      <Badge variant="outline">{user.plan}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Discount Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="code">Discount Code</Label>
                  <Input
                    id="code"
                    placeholder="SAVE20"
                    value={newDiscount.code}
                    onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="percentage">Percentage Off</Label>
                  <Input
                    id="percentage"
                    type="number"
                    placeholder="20"
                    value={newDiscount.percentage || ''}
                    onChange={(e) => setNewDiscount({...newDiscount, percentage: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="expires">Expires</Label>
                  <Input
                    id="expires"
                    type="date"
                    value={newDiscount.expiresAt}
                    onChange={(e) => setNewDiscount({...newDiscount, expiresAt: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={createDiscount}>Create Discount</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Active Discount Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {discounts.map(discount => (
                  <div key={discount.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{discount.code}</p>
                      <p className="text-sm text-gray-500">{discount.percentage}% off • Expires: {discount.expiresAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={discount.isActive ? 'default' : 'secondary'}>
                        {discount.isActive ? 'Active' : 'Disabled'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleDiscount(discount.id)}
                      >
                        {discount.isActive ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;