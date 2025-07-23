import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface Discount {
  id: string;
  code: string;
  percentage: number;
  expiresAt: string;
  isActive: boolean;
  usageCount: number;
  maxUses?: number;
}

interface DiscountManagerProps {
  onApplyDiscount?: (discount: Discount) => void;
  showApplyInterface?: boolean;
}

const DiscountManager: React.FC<DiscountManagerProps> = ({ 
  onApplyDiscount, 
  showApplyInterface = false 
}) => {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: '1',
      code: 'BETA50',
      percentage: 50,
      expiresAt: '2024-12-31',
      isActive: true,
      usageCount: 12,
      maxUses: 100
    },
    {
      id: '2',
      code: 'WELCOME25',
      percentage: 25,
      expiresAt: '2024-06-30',
      isActive: true,
      usageCount: 45
    },
    {
      id: '3',
      code: 'TESTFREE',
      percentage: 100,
      expiresAt: '2024-03-31',
      isActive: true,
      usageCount: 3,
      maxUses: 10
    }
  ]);
  
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);

  const validateDiscount = (code: string): Discount | null => {
    const discount = discounts.find(d => 
      d.code.toLowerCase() === code.toLowerCase() && 
      d.isActive &&
      new Date(d.expiresAt) > new Date() &&
      (!d.maxUses || d.usageCount < d.maxUses)
    );
    
    return discount || null;
  };

  const applyDiscount = () => {
    if (!discountCode.trim()) {
      toast({ title: 'Error', description: 'Please enter a discount code', variant: 'destructive' });
      return;
    }

    const discount = validateDiscount(discountCode);
    
    if (discount) {
      setAppliedDiscount(discount);
      onApplyDiscount?.(discount);
      toast({ 
        title: 'Discount applied!', 
        description: `${discount.percentage}% off with code ${discount.code}` 
      });
    } else {
      toast({ 
        title: 'Invalid code', 
        description: 'This discount code is invalid or expired', 
        variant: 'destructive' 
      });
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    onApplyDiscount?.(null as any);
    toast({ title: 'Discount removed', description: 'Discount code has been removed' });
  };

  if (showApplyInterface) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Discount Code</CardTitle>
          <CardDescription>Have a promo code? Enter it here for savings!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {appliedDiscount ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
              <div>
                <p className="font-medium text-green-800">{appliedDiscount.code}</p>
                <p className="text-sm text-green-600">{appliedDiscount.percentage}% discount applied</p>
              </div>
              <Button variant="outline" size="sm" onClick={removeDiscount}>
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && applyDiscount()}
              />
              <Button onClick={applyDiscount}>Apply</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Active Discount Codes</h3>
      <div className="grid gap-4">
        {discounts.map(discount => {
          const isExpired = new Date(discount.expiresAt) <= new Date();
          const isMaxedOut = discount.maxUses && discount.usageCount >= discount.maxUses;
          
          return (
            <Card key={discount.id} className={!discount.isActive || isExpired || isMaxedOut ? 'opacity-50' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono font-bold text-lg">{discount.code}</p>
                    <p className="text-sm text-gray-600">
                      {discount.percentage}% off • Expires: {discount.expiresAt}
                    </p>
                    <p className="text-xs text-gray-500">
                      Used: {discount.usageCount}{discount.maxUses ? `/${discount.maxUses}` : ''} times
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge variant={discount.isActive && !isExpired && !isMaxedOut ? 'default' : 'secondary'}>
                      {!discount.isActive ? 'Disabled' : 
                       isExpired ? 'Expired' : 
                       isMaxedOut ? 'Max Uses' : 'Active'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DiscountManager;