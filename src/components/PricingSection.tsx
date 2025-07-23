import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import DiscountManager from '@/components/DiscountManager';
import { useAuth } from '@/components/AuthProvider';
import { toast } from '@/components/ui/use-toast';

interface Discount {
  id: string;
  code: string;
  percentage: number;
  expiresAt: string;
  isActive: boolean;
}

const PricingSection: React.FC = () => {
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const { user, checkAccess } = useAuth();

  const calculatePrice = (originalPrice: number) => {
    if (!appliedDiscount) return originalPrice;
    return originalPrice * (1 - appliedDiscount.percentage / 100);
  };

  const handlePurchase = (plan: string, price: number) => {
    if (!user) {
      toast({ title: 'Login required', description: 'Please log in to purchase a plan' });
      return;
    }
    
    const finalPrice = calculatePrice(price);
    toast({ 
      title: 'Purchase initiated', 
      description: `Processing ${plan} plan for $${finalPrice.toFixed(2)}` 
    });
  };

  const plans = [
    {
      name: 'Single Case',
      price: 49,
      description: 'Perfect for one-time legal document needs',
      features: [
        'AI lawsuit analysis',
        'State-specific legal response',
        'Court filing instructions',
        'PDF & DOCX downloads',
        '24/7 email support'
      ]
    },
    {
      name: 'Premium Package',
      price: 99,
      description: 'Best value for comprehensive legal defense',
      features: [
        'Everything in Single Case',
        'Motion to Dismiss generation',
        'Settlement negotiation kit',
        'Jury demand templates',
        'Priority phone support',
        'Legal strategy consultation'
      ],
      popular: true
    },
    {
      name: 'Unlimited Monthly',
      price: 29,
      description: 'Unlimited access for ongoing legal needs',
      features: [
        'Unlimited document generation',
        'All premium features',
        'Advanced legal templates',
        'Bulk document processing',
        'Dedicated account manager',
        'Custom legal workflows'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Legal Defense Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-grade legal document generation at a fraction of attorney costs
          </p>
        </div>

        {/* Discount Code Section */}
        <div className="max-w-md mx-auto mb-12">
          <DiscountManager 
            showApplyInterface={true} 
            onApplyDiscount={setAppliedDiscount}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const originalPrice = plan.price;
            const finalPrice = calculatePrice(originalPrice);
            const savings = originalPrice - finalPrice;
            
            return (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 border-2' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    {appliedDiscount && savings > 0 ? (
                      <div>
                        <span className="text-3xl font-bold line-through text-gray-400">
                          ${originalPrice}
                        </span>
                        <span className="text-4xl font-bold text-green-600 ml-2">
                          ${finalPrice.toFixed(0)}
                        </span>
                        <p className="text-sm text-green-600 mt-1">
                          Save ${savings.toFixed(0)} with {appliedDiscount.code}
                        </p>
                      </div>
                    ) : (
                      <span className="text-4xl font-bold">${originalPrice}</span>
                    )}
                    <span className="text-gray-600 ml-1">
                      {plan.name === 'Unlimited Monthly' ? '/month' : ''}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    onClick={() => handlePurchase(plan.name, finalPrice)}
                  >
                    {user?.status === 'testing' ? 'Test Access Active' : 
                     plan.name === 'Unlimited Monthly' ? 'Start Monthly Plan' : 'Purchase Now'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 30-day money-back guarantee. 
            <span className="font-semibold">No hidden fees or recurring charges</span> 
            (except monthly plan).
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;