
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';

import PricingHeader from './pricing/PricingHeader';
import PricingCard from './pricing/PricingCard';
import EnterpriseSection from './pricing/EnterpriseSection';
import { pricingPlans } from './pricing/pricingData';

const Pricing = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { convertCurrency } = useCurrency();
  
  // Handle intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handlePremiumClick = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  const handleFreeClick = () => {
    // If user is logged in, go to free dashboard
    if (user) {
      navigate('/dashboard/free');
    } else {
      // If not logged in, go to login page
      navigate('/login');
    }
  };

  // Convert pricing plans to current currency
  const convertedPlans = pricingPlans.map(plan => ({
    ...plan,
    price: String(convertCurrency(Number(plan.price)))
  }));

  return (
    <section 
      id="pricing" 
      className="section-spacing" 
      ref={sectionRef}
    >
      <div className="container-content">
        {/* Section header */}
        <PricingHeader isIntersecting={isIntersecting} />
        
        {/* Pricing cards */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-700 delay-300 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {convertedPlans.map((plan) => (
            <PricingCard 
              key={plan.name}
              plan={plan}
              onFreeClick={handleFreeClick}
              onPremiumClick={handlePremiumClick}
            />
          ))}
        </div>
        
        {/* Enterprise section */}
        <EnterpriseSection isIntersecting={isIntersecting} />
      </div>
    </section>
  );
};

export default Pricing;
