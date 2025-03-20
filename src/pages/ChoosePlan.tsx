
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { pricingPlans } from '@/components/pricing/pricingData';
import PricingCard from '@/components/pricing/PricingCard';
import PricingHeader from '@/components/pricing/PricingHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const ChoosePlan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { convertCurrency } = useCurrency();
  const [isIntersecting, setIsIntersecting] = useState(true);
  
  const handleFreeClick = () => {
    // If user is logged in, go to free dashboard
    if (user) {
      navigate('/dashboard/free');
    } else {
      // If not logged in, go to login page with redirect info
      navigate('/login', { state: { redirectTo: '/dashboard/free' } });
    }
  };

  const handlePremiumClick = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };
  
  // Convert pricing plans to current currency
  const convertedPlans = pricingPlans.map(plan => ({
    ...plan,
    price: String(convertCurrency(Number(plan.price)))
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-content">
          {/* Section header */}
          <PricingHeader isIntersecting={isIntersecting} />
          
          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {convertedPlans.map((plan) => (
              <PricingCard 
                key={plan.name}
                plan={plan}
                onFreeClick={handleFreeClick}
                onPremiumClick={handlePremiumClick}
              />
            ))}
          </div>
          
          {/* Return to Home Button */}
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/home')}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChoosePlan;
