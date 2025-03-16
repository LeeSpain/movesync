
import { useState, useRef, useEffect } from 'react';
import { 
  Home, Briefcase, Globe, CreditCard, Map, 
  Truck, Languages, Bot, Lock, BarChart, Calendar, FileText
} from 'lucide-react';

// Feature category type
type FeatureCategory = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  items: string[];
};

// Feature data
const featureCategories: FeatureCategory[] = [
  {
    id: 'home-search',
    title: 'AI-Powered Home Search',
    description: 'Find your perfect home with personalized AI property matching and market analysis.',
    icon: Home,
    items: [
      'Personalized AI property matching based on preferences',
      'Real-time market analysis and insights',
      'Virtual property tours with AR/VR technology',
      'AI-driven lease negotiation assistance'
    ]
  },
  {
    id: 'visa-support',
    title: 'Visa & Immigration',
    description: 'Navigate complex visa processes with AI guidance on eligibility and applications.',
    icon: Globe,
    items: [
      'Step-by-step visa application guidance',
      'Real-time visa eligibility assessment',
      'Automated document processing',
      'Embassy appointment scheduling'
    ]
  },
  {
    id: 'cost-living',
    title: 'Cost of Living Analysis',
    description: 'Get detailed cost breakdowns and financial planning tools for your new location.',
    icon: CreditCard,
    items: [
      'Personalized expense estimator',
      'City and neighborhood comparisons',
      'AI financial planning tools',
      'Currency conversion and salary analysis'
    ]
  },
  {
    id: 'local-services',
    title: 'Local Services Finder',
    description: 'Discover essential local services with AI-curated directories and verified reviews.',
    icon: Map,
    items: [
      'AI-curated local service directories',
      'Verified reviews and ratings',
      'Automated appointment scheduling',
      'Personalized recommendations based on needs'
    ]
  },
  {
    id: 'job-assistance',
    title: 'Job & Business Assistance',
    description: 'Accelerate your career with AI job matching and professional development tools.',
    icon: Briefcase,
    items: [
      'AI job matching based on your skill set',
      'Remote work and freelancing opportunities',
      'Resume and cover letter optimization',
      'Interview preparation with AI coaching'
    ]
  },
  {
    id: 'moving-logistics',
    title: 'Moving Logistics',
    description: 'Streamline your move with AI-scheduled services and settling-in assistance.',
    icon: Truck,
    items: [
      'AI-scheduled moving services',
      'Utility setup and administrative services',
      'Neighborhood orientation guides',
      'Packing and inventory management'
    ]
  },
  {
    id: 'cultural-support',
    title: 'Cultural & Language',
    description: 'Integrate smoothly with AI language learning and cultural adaptation resources.',
    icon: Languages,
    items: [
      'AI language learning modules',
      'Cultural integration guides',
      'Local customs and etiquette tips',
      'Community networking opportunities'
    ]
  },
  {
    id: 'ai-concierge',
    title: 'AI Concierge',
    description: 'Enjoy 24/7 support from a realistic AI assistant that handles your relocation needs.',
    icon: Bot,
    items: [
      'Real-time AI chat with realistic human-like avatar',
      'Personalized reminders and notifications',
      'Email and communication management',
      'Round-the-clock relocation assistance'
    ]
  },
  {
    id: 'advanced-tools',
    title: 'Advanced Tools',
    description: 'Access cutting-edge tools like blockchain document security and AR/VR exploration.',
    icon: Lock,
    items: [
      'AI-generated relocation timelines',
      'Blockchain-verified document security',
      'AI relocation readiness assessments',
      'AR/VR home and city exploration'
    ]
  }
];

const Features = () => {
  const [activeCategory, setActiveCategory] = useState<string>(featureCategories[0].id);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  
  // Find active feature category
  const activeFeature = featureCategories.find(cat => cat.id === activeCategory) || featureCategories[0];

  return (
    <section 
      id="features" 
      className="section-spacing bg-movesync-gray-light py-24 sm:py-32"
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
            AI-Powered <span className="text-gradient">Features</span>
          </h2>
          <p className="text-movesync-gray-dark text-lg">
            MoveSync combines advanced artificial intelligence with relocation expertise to provide a 
            seamless, end-to-end moving experience tailored to your unique needs.
          </p>
        </div>
        
        {/* Feature tabs and content */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-700 delay-300 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Feature tabs - scrollable on mobile */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto lg:overflow-visible p-1 lg:p-0">
                <div className="flex flex-row lg:flex-col min-w-max lg:min-w-0">
                  {featureCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center gap-3 p-4 w-full text-left transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-movesync-blue text-white'
                          : 'hover:bg-movesync-blue/5'
                      }`}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activeCategory === category.id
                            ? 'bg-white/20'
                            : 'bg-movesync-blue/10'
                        }`}
                      >
                        <category.icon 
                          size={20} 
                          className={activeCategory === category.id ? 'text-white' : 'text-movesync-blue'} 
                        />
                      </div>
                      <div>
                        <p className={`font-medium ${
                          activeCategory === category.id ? 'text-white' : 'text-movesync-black'
                        }`}>
                          {category.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature detail */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-movesync-blue/10 flex items-center justify-center text-movesync-blue">
                    <activeFeature.icon size={24} />
                  </div>
                  <h3 className="heading-sm text-movesync-black">{activeFeature.title}</h3>
                </div>
                
                <p className="text-movesync-gray-dark mb-6">
                  {activeFeature.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {activeFeature.items.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-movesync-gray-light/50"
                    >
                      <div className="w-6 h-6 rounded-full bg-movesync-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-sm text-movesync-gray-dark">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional feature highlights */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 transition-all duration-700 delay-500 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-movesync-blue mb-4">
              <BarChart size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-movesync-gray-dark">
              Get insights into property markets, cost of living trends, and job opportunities with AI-powered analytics.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Timeline</h3>
            <p className="text-movesync-gray-dark">
              Your AI assistant creates custom relocation timelines with automated reminders for each step.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Document Management</h3>
            <p className="text-movesync-gray-dark">
              Securely store and manage all your relocation documents with blockchain verification technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
