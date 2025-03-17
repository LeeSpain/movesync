
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Globe, 
  Sparkles, 
  Route, 
  Plane, 
  Compass, 
  ArrowRight, 
  Clock, 
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

const CountrySelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Journey steps to visualize the relocation process
  const journeySteps = [
    {
      icon: <Globe className="w-6 h-6 text-movesync-blue" />,
      title: "Select Location",
      description: "Choose your ideal destination from our supported locations."
    },
    {
      icon: <Compass className="w-6 h-6 text-movesync-aussie-green" />,
      title: "AI-Guided Planning",
      description: "Our AI assistant helps create a personalized relocation roadmap."
    },
    {
      icon: <Route className="w-6 h-6 text-movesync-outback-red" />,
      title: "Streamlined Process",
      description: "Navigate applications, housing, and job searches with ease."
    },
    {
      icon: <Plane className="w-6 h-6 text-movesync-blue-dark" />,
      title: "Seamless Transition",
      description: "Arrive with confidence, knowing everything is organized."
    }
  ];

  // Featured countries (active & coming soon)
  const countries = [
    { 
      id: 'australia', 
      name: 'Australia', 
      flag: '🇦🇺', 
      description: 'A diverse landscape with vibrant cities, stunning beaches, and unique wildlife.',
      active: true,
      benefits: ['Strong economy', 'High quality of life', 'Excellent healthcare'],
      highlights: 'Ranked #1 for expat quality of life',
      image: 'bg-[url("/img/australia.jpg")]',
      color: 'from-movesync-aussie-green/80 to-movesync-blue/80'
    },
    { 
      id: 'usa', 
      name: 'United States', 
      flag: '🇺🇸', 
      description: 'From coast to coast, discover endless opportunities in this diverse melting pot.',
      active: false,
      benefits: ['Career opportunities', 'Educational excellence', 'Cultural diversity'],
      highlights: 'World\'s largest economy',
      image: 'bg-[url("/img/usa.jpg")]',
      color: 'from-blue-600/80 to-red-600/80'
    },
    { 
      id: 'uk', 
      name: 'United Kingdom', 
      flag: '🇬🇧', 
      description: 'Experience rich history, cultural landmarks, and innovative opportunities.',
      active: false,
      benefits: ['Historical charm', 'World-class education', 'Multicultural cities'],
      highlights: 'Global financial center',
      image: 'bg-[url("/img/uk.jpg")]',
      color: 'from-blue-700/80 to-red-500/80'
    },
    { 
      id: 'spain', 
      name: 'Spain', 
      flag: '🇪🇸', 
      description: 'Enjoy Mediterranean lifestyle with incredible food, art and architecture.',
      active: false,
      benefits: ['Relaxed lifestyle', 'Rich culture', 'Beautiful climate'],
      highlights: 'High quality of life index',
      image: 'bg-[url("/img/spain.jpg")]',
      color: 'from-yellow-600/80 to-red-500/80'
    },
  ];

  const handleSelectCountry = (countryId: string) => {
    // Save selected country to localStorage
    localStorage.setItem('moveSync_country', countryId);
    
    const country = countries.find(c => c.id === countryId);
    
    if (countryId === 'australia') {
      toast({
        title: "Country selected",
        description: `You've selected ${country?.name} ${country?.flag} as your destination. Welcome!`,
      });
      navigate('/home');
    } else {
      // For other countries, just show toast but don't navigate
      toast({
        title: "Coming Soon",
        description: `Support for ${country?.name} is coming soon. Stay tuned!`,
        variant: "destructive",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-movesync-blue/5 to-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-14 pb-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 w-72 h-72 bg-movesync-outback-red/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-60 h-60 bg-movesync-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-movesync-aussie-green/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-movesync-black">
              Begin Your <span className="text-gradient-aussie">Relocation</span> Journey
            </h1>
            
            <p className="text-lg text-movesync-gray-dark mb-5 max-w-2xl mx-auto">
              Relocating is complex. Our AI-powered platform makes it simple, guiding you through every step from applications to finding the perfect home.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-movesync-blue" />
                <span className="text-sm text-movesync-gray-dark font-medium">AI-Powered Guidance</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                <Compass className="w-4 h-4 text-movesync-aussie-green" />
                <span className="text-sm text-movesync-gray-dark font-medium">Personalized Roadmap</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Journey Steps - Creative Wave Design */}
      <div className="relative py-10 overflow-hidden">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-2 text-movesync-black">Your Relocation Journey</h2>
          <p className="text-base text-movesync-gray-dark max-w-2xl mx-auto">
            Select your destination and let MoveSync guide you every step of the way
          </p>
        </motion.div>
        
        {/* Wave background for journey steps */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path 
              d="M 0 100 Q 300 150 600 100 Q 900 50 1200 100 L 1200 300 L 0 300 Z" 
              fill="url(#journeyGradient)" 
            />
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E67E22" />
                <stop offset="50%" stopColor="#27AE60" />
                <stop offset="100%" stopColor="#3498DB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Journey steps in a flowing line */}
        <div className="container mx-auto px-4">
          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Flowing connection line */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-movesync-blue via-movesync-aussie-green to-movesync-outback-red rounded-full opacity-30 transform -translate-y-1/2 z-0"></div>
            
            {/* Journey step cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-8 relative z-10">
              {journeySteps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="relative group"
                  variants={itemVariants}
                >
                  <div className="text-center">
                    <div className="mb-3 mx-auto w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center relative z-10">
                      {step.icon}
                      <div className="absolute top-0 left-0 w-full h-full rounded-full bg-movesync-blue/5 animate-pulse"></div>
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-movesync-black group-hover:text-movesync-blue transition-colors">{step.title}</h3>
                    <p className="text-sm text-movesync-gray-dark">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Countries Selection - Immersive Creative Design */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-movesync-black">Select Your Destination</h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Visually engaging country selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {countries.map((country, index) => (
              <motion.div 
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleSelectCountry(country.id)}
                className={`cursor-pointer group relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg ${
                  country.active ? 'ring-1 ring-movesync-blue/30' : 'opacity-75 hover:opacity-100'
                }`}
              >
                {/* Immersive background card with gradient overlay */}
                <div className={`h-32 md:h-40 relative bg-gradient-to-r ${country.color} overflow-hidden`}>
                  {/* Abstract shapes in background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -right-10 -bottom-20 w-40 h-40 bg-white/10 rounded-full"></div>
                    <div className="absolute left-10 top-10 w-16 h-16 bg-white/10 rounded-full"></div>
                  </div>
                  
                  {/* Country name and availability flag */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-2xl">{country.flag}</span>
                        {country.name}
                      </h3>
                      {country.active ? (
                        <span className="inline-flex items-center px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                          <Check className="w-3 h-3 mr-0.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full">
                          <Clock className="w-3 h-3 mr-0.5" /> Soon
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-white/90 max-w-md">{country.description}</p>
                  </div>
                </div>
                
                {/* Country benefits with minimal boxing */}
                <div className="p-5 bg-white">
                  <div className="mb-4 space-y-2">
                    {country.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-movesync-blue/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-2.5 w-2.5 text-movesync-blue" />
                        </div>
                        <span className="text-sm text-movesync-gray-dark">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-movesync-blue bg-movesync-blue/5 px-2 py-1 rounded-md">
                      {country.highlights}
                    </div>
                    
                    <Button 
                      variant={country.active ? "default" : "outline"} 
                      size="sm"
                      className={`group ${
                        country.active 
                          ? 'bg-movesync-blue hover:bg-movesync-blue-dark text-white border-0' 
                          : 'bg-white text-movesync-gray-dark border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {country.active ? (
                        <>
                          Select
                          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </>
                      ) : (
                        <>
                          <MapPin className="mr-1 h-3 w-3" />
                          Coming Soon
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Creative newsletter section without a box */}
          <motion.div 
            className="mt-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Background gradient waves */}
            <div className="absolute inset-0 -z-10">
              <svg className="w-full h-full opacity-10" viewBox="0 0 1200 300" preserveAspectRatio="none">
                <path 
                  d="M 0 50 Q 200 100 400 50 Q 600 0 800 50 Q 1000 100 1200 50 L 1200 300 L 0 300 Z" 
                  fill="url(#newsletterGradient)" 
                />
                <defs>
                  <linearGradient id="newsletterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C0392B" />
                    <stop offset="50%" stopColor="#27AE60" />
                    <stop offset="100%" stopColor="#3498DB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="text-center relative z-10 py-10">
              <h2 className="text-xl font-bold mb-3 text-movesync-black">Expanding to More Locations Soon</h2>
              <p className="text-sm text-movesync-gray-dark mb-6 max-w-xl mx-auto">
                Our AI is learning about more destinations every day. Sign up to be notified when we add support for your desired location.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-movesync-black flex-grow focus:outline-none focus:ring-2 focus:ring-movesync-blue/30 text-sm"
                />
                <Button 
                  type="submit"
                  size="sm"
                  className="bg-movesync-blue hover:bg-movesync-blue-dark text-white"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Get Updates
                </Button>
              </form>
              
              <div className="mt-8 pt-6 text-xs text-movesync-gray max-w-xs mx-auto border-t border-gray-100">
                Powered by MoveSync AI — making relocation simpler through intelligent assistance.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CountrySelection;
