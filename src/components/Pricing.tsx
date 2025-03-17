
import { useState, useRef, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Define pricing plans
const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    description: 'Experience the core features of MoveSync with limited access.',
    features: [
      'AI-powered search, chat, and recommendations (5 uses)',
      'Basic relocation guides',
      'City comparisons',
      'Job search insights',
      'Limited property searches',
      'Basic visa application guidance',
    ],
    limitations: [
      'Limited to 5 AI assistant interactions',
      'No personalized relocation plan',
      'No document management',
      'No email assistance',
    ],
    cta: 'Try for Free',
    popular: false,
  },
  {
    name: 'Premium',
    price: '99',
    description: 'Full access to all MoveSync features with unlimited AI assistance.',
    features: [
      'Unlimited AI search & chat',
      'Full AI concierge with 24/7 support',
      'Personalized relocation plans & timelines',
      'Advanced property search & lease negotiation',
      'AI job matching & career coaching',
      'Comprehensive visa & immigration assistance',
      'AI email & document management',
      'AR/VR home & city exploration',
      'Blockchain document security',
    ],
    limitations: [],
    cta: 'Get Premium',
    popular: true,
  },
];

const Pricing = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
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

  return (
    <section 
      id="pricing" 
      className="section-spacing" 
      ref={sectionRef}
    >
      <div className="container-content">
        {/* Section header */}
        <div 
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="heading-lg mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-movesync-gray-dark text-lg">
            MoveSync offers a straightforward pricing model designed to make relocation
            accessible to everyone. Start for free or unlock all features with Premium.
          </p>
        </div>
        
        {/* Pricing cards */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-700 delay-300 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name}
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
                    onClick={handlePremiumClick}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 group bg-movesync-blue text-white hover:bg-movesync-blue-dark"
                  >
                    {plan.cta}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button 
                    onClick={handleFreeClick}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 group bg-white border border-gray-200 text-movesync-black hover:bg-gray-50"
                  >
                    {plan.cta}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional info */}
        <div 
          className={`mt-16 max-w-3xl mx-auto text-center bg-movesync-gray-light rounded-xl p-6 md:p-8 transition-all duration-700 delay-500 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">Enterprise Solutions</h3>
          <p className="text-movesync-gray-dark mb-6">
            Looking for a custom solution for your business? MoveSync offers API and B2B licensing options 
            for HR departments, relocation agencies, and real estate firms.
          </p>
          <a 
            href="#" 
            className="btn-secondary inline-flex"
          >
            Contact for Enterprise
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
