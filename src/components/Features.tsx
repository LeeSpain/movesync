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
  australianContext?: string;
};

// Feature data with Australian-specific context
const featureCategories: FeatureCategory[] = [
  {
    id: 'home-search',
    title: 'AI-Powered Australian Property Finder',
    description: 'Find your perfect Australian home with personalized AI property matching and market analysis.',
    icon: Home,
    australianContext: 'Access real-time insights into Sydney, Melbourne, Brisbane, and other Australian property markets.',
    items: [
      'Personalized AI property matching based on Australian lifestyle preferences',
      'Real-time market analysis of Australian property trends',
      'Virtual property tours of Australian homes with AR/VR technology',
      'AI-driven lease negotiation assistance with Australian landlords'
    ]
  },
  {
    id: 'visa-support',
    title: 'Australian Visa & Immigration',
    description: 'Navigate complex Australian visa processes with AI guidance on eligibility and applications.',
    icon: Globe,
    australianContext: 'Get precise guidance on work visas, skilled migration, and permanent residency pathways in Australia.',
    items: [
      'Step-by-step Australian visa application guidance',
      'Real-time Australian visa eligibility assessment',
      'Automated Australian immigration document processing',
      'Department of Home Affairs appointment scheduling'
    ]
  },
  {
    id: 'cost-living',
    title: 'Australian Cost of Living Analysis',
    description: 'Get detailed cost breakdowns and financial planning tools for your new Australian location.',
    icon: CreditCard,
    australianContext: 'Compare living costs across Sydney, Melbourne, Brisbane, Perth, and other Australian cities.',
    items: [
      'Australian-specific expense estimator with local data',
      'Australian city and suburb comparisons',
      'AI financial planning tools with AUD currency',
      'Australian salary analysis and tax calculations'
    ]
  },
  {
    id: 'local-services',
    title: 'Australian Services Finder',
    description: 'Discover essential local services with AI-curated directories and verified reviews across Australia.',
    icon: Map,
    australianContext: 'Find the best local services in your Australian neighborhood, from Medicare providers to NBN plans.',
    items: [
      'AI-curated Australian service directories',
      'Verified reviews of Australian service providers',
      'Automated appointment scheduling with Australian businesses',
      'Personalized recommendations based on your Australian neighborhood'
    ]
  },
  {
    id: 'job-assistance',
    title: 'Australian Job & Career Assistance',
    description: 'Accelerate your career in Australia with AI job matching and professional development tools.',
    icon: Briefcase,
    australianContext: "Connect with opportunities in Australia's booming industries, from tech in Sydney to mining in Perth.",
    items: [
      "AI job matching based on Australia's skill shortages",
      'Remote work opportunities within Australian time zones',
      'Resume optimization for Australian employers',
      'Interview preparation with AI coaching for Australian workplaces'
    ]
  },
  {
    id: 'moving-logistics',
    title: 'Australia Moving Logistics',
    description: 'Streamline your move to Australia with AI-scheduled services and settling-in assistance.',
    icon: Truck,
    australianContext: 'Get help with everything from international shipping to setting up utilities in your new Australian home.',
    items: [
      'AI-scheduled international shipping to Australia',
      'Australian utility setup (electricity, gas, NBN)',
      'Local Australian neighborhood orientation guides',
      'Customs declaration assistance for Australian imports'
    ]
  },
  {
    id: 'cultural-support',
    title: 'Australian Culture & Language',
    description: 'Integrate smoothly with AI language learning and Australian cultural adaptation resources.',
    icon: Languages,
    australianContext: 'Learn Australian slang, cultural norms, and social etiquette to feel at home down under.',
    items: [
      'Australian slang and expressions guide',
      'Australian cultural integration assistance',
      'Local Australian customs and etiquette tips',
      'Australian community networking opportunities'
    ]
  },
  {
    id: 'ai-concierge',
    title: 'Australian AI Concierge',
    description: 'Enjoy 24/7 support from a realistic AI assistant that handles your relocation needs in Australia.',
    icon: Bot,
    australianContext: 'Your personal assistant is available 24/7, working in Australian time zones when you need help.',
    items: [
      'Real-time AI chat with Australian local knowledge',
      'Personalized Australian relocation reminders',
      'Communication management with Australian service providers',
      'Round-the-clock Australian relocation assistance'
    ]
  },
  {
    id: 'advanced-tools',
    title: 'Advanced Australian Tools',
    description: 'Access cutting-edge tools like blockchain document security and AR exploration of Australian properties.',
    icon: Lock,
    australianContext: 'Utilize cutting-edge technology to make your Australian relocation seamless and secure.',
    items: [
      'AI-generated Australian relocation timelines',
      'Blockchain-verified document security for Australian authorities',
      'AI relocation readiness assessments for Australia',
      'AR/VR exploration of Australian neighborhoods before arrival'
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
      className="section-spacing bg-movesync-gray-light py-24 sm:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Australian-themed background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-40 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-content">
        {/* Section header */}
        <div 
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center rounded-full bg-movesync-blue/10 px-3 py-1 text-sm font-medium text-movesync-blue mb-4">
            <span className="animate-pulse-light mr-1">•</span> Complete Relocation Solution
          </div>
          <h2 className="heading-lg mb-4">
            AI-Powered Australian <span className="text-gradient">Relocation Features</span>
          </h2>
          <p className="text-movesync-gray-dark text-lg">
            MoveSync combines advanced artificial intelligence with Australian relocation expertise to provide a 
            seamless, end-to-end moving experience tailored to your unique needs down under.
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
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-movesync-blue/10 flex items-center justify-center text-movesync-blue">
                    <activeFeature.icon size={24} />
                  </div>
                  <h3 className="heading-sm text-movesync-black">{activeFeature.title}</h3>
                </div>
                
                <p className="text-movesync-gray-dark mb-4">
                  {activeFeature.description}
                </p>
                
                {/* Australian context */}
                {activeFeature.australianContext && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
                    <p className="text-movesync-gray-dark italic">
                      {activeFeature.australianContext}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {activeFeature.items.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-movesync-gray-light/50 hover:bg-movesync-gray-light/80 transition-colors"
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
        
        {/* Additional feature highlights with Australian context */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 transition-all duration-700 delay-500 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-movesync-blue mb-4">
              <BarChart size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Australian Market Analytics</h3>
            <p className="text-movesync-gray-dark">
              Get insights into Australian property markets, cost of living trends, and job opportunities with AI-powered analytics focused on Sydney, Melbourne, and beyond.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Australian Relocation Timeline</h3>
            <p className="text-movesync-gray-dark">
              Your AI assistant creates custom Australian relocation timelines with automated reminders for visa deadlines, shipping arrivals, and property inspections.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Australian Documentation</h3>
            <p className="text-movesync-gray-dark">
              Securely store and manage all your Australian relocation documents, from visa applications to property contracts, with blockchain verification technology.
            </p>
          </div>
        </div>
        
        {/* Australian testimonial */}
        <div 
          className={`mt-16 bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto transition-all duration-700 delay-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-movesync-blue/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🇦🇺</span>
            </div>
            <p className="italic text-movesync-gray-dark mb-4">
              "MoveSync made our relocation to Sydney completely stress-free. The AI assistant helped us find the perfect apartment in Bondi, navigate the visa process, and even suggested the best schools for our children. We couldn't have done it without this incredible technology!"
            </p>
            <p className="font-semibold">Sarah & Michael Thompson</p>
            <p className="text-sm text-movesync-gray">Relocated from London to Sydney</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
