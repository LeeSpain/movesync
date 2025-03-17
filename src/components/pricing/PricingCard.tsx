
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  limitations: string[];
  cta: string;
  popular: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  onFreeClick: () => void;
  onPremiumClick: () => void;
}

const PricingCard = ({ plan, onFreeClick, onPremiumClick }: PricingCardProps) => {
  return (
    <div 
      className={`rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl ${
        plan.popular 
          ? 'border-2 border-movesync-blue shadow-lg shadow-movesync-blue/10' 
          : 'border border-gray-200 shadow-md'
      }`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="bg-movesync-blue text-white text-center py-2 font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 md:p-8">
        {/* Plan name and price */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-movesync-black mb-2">{plan.name}</h3>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-movesync-black">
              ${plan.price}
            </span>
            {plan.popular ? (
              <span className="ml-2 text-movesync-gray">per month</span>
            ) : (
              <span className="ml-2 text-movesync-gray">forever</span>
            )}
          </div>
          <p className="mt-3 text-movesync-gray-dark">{plan.description}</p>
        </div>
        
        {/* Features */}
        <div className="mb-8">
          <p className="font-medium text-movesync-black mb-4">What's included:</p>
          <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <div className="mr-3 mt-1 text-movesync-blue">
                  <Check size={18} />
                </div>
                <span className="text-movesync-gray-dark">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Limitations for free plan */}
        {plan.limitations.length > 0 && (
          <div className="mb-8">
            <p className="font-medium text-movesync-black mb-4">Limitations:</p>
            <ul className="space-y-3">
              {plan.limitations.map((limitation, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="mr-3 mt-1 text-movesync-gray">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-movesync-gray-dark">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* CTA Button */}
        {plan.popular ? (
          <button 
            onClick={onPremiumClick}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 group bg-movesync-blue text-white hover:bg-movesync-blue-dark"
          >
            {plan.cta}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button 
            onClick={onFreeClick}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 group bg-white border border-gray-200 text-movesync-black hover:bg-gray-50"
          >
            {plan.cta}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
