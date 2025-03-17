
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
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
  Luggage,
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
      title: "Select Destination",
      description: "Choose your ideal location from our expanding list of supported destinations."
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
    <div className="min-h-screen bg-gradient-to-b from-movesync-blue/5 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-14 pb-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 w-72 h-72 bg-movesync-outback-red/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-60 h-60 bg-movesync-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-movesync-aussie-green/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-movesync-black">
              Begin Your <span className="text-gradient-aussie">Relocation</span> Journey
            </h1>
            
            <p className="text-lg text-movesync-gray-dark mb-6 max-w-2xl mx-auto">
              Relocating is complex. Our AI-powered platform makes it simple, guiding you through every step from applications to finding the perfect home.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-movesync-blue" />
                <span className="text-sm text-movesync-gray-dark font-medium">AI-Powered Guidance</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm">
                <Compass className="w-4 h-4 text-movesync-aussie-green" />
                <span className="text-sm text-movesync-gray-dark font-medium">Personalized Roadmap</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm">
                <Luggage className="w-4 h-4 text-movesync-outback-red" />
                <span className="text-sm text-movesync-gray-dark font-medium">Streamlined Relocation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Journey Steps */}
      <div className="container mx-auto px-4 py-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-3 text-movesync-black">Your Relocation Journey</h2>
          <p className="text-base text-movesync-gray-dark max-w-2xl mx-auto">
            Select your destination below and let MoveSync guide you through every step of your relocation
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {journeySteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg p-4 shadow-sm relative overflow-hidden group"
              variants={itemVariants}
            >
              <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-movesync-blue/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="mb-3">{step.icon}</div>
                <h3 className="text-lg font-bold mb-1.5 text-movesync-black">{step.title}</h3>
                <p className="text-sm text-movesync-gray-dark">{step.description}</p>
              </div>
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-movesync-blue/10 flex items-center justify-center">
                <span className="text-xs font-medium text-movesync-blue">{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Countries Selection */}
        <h2 className="text-2xl font-bold text-center mb-8 text-movesync-black">Select Your Destination</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {countries.map((country, index) => (
            <motion.div 
              key={country.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleSelectCountry(country.id)}
            >
              <Card className={`h-full border-0 shadow-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-md ${
                country.active ? 'ring-1 ring-movesync-blue/30' : 'opacity-75 hover:opacity-100'
              }`}>
                {/* Card header with gradient overlay and country flag */}
                <div className={`h-16 relative bg-gradient-to-r ${country.color}`}>
                  <div className="absolute inset-0 flex items-center p-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-xl">{country.flag}</span>
                      {country.name}
                    </h3>
                    {country.active ? (
                      <span className="ml-auto inline-flex items-center px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                        <Check className="w-3 h-3 mr-0.5" /> Active
                      </span>
                    ) : (
                      <span className="ml-auto inline-flex items-center px-2 py-0.5 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full">
                        <Clock className="w-3 h-3 mr-0.5" /> Soon
                      </span>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <p className="text-sm text-movesync-gray-dark mb-3">{country.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-movesync-blue mb-2">KEY BENEFITS</h4>
                    <ul className="space-y-1.5">
                      {country.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1.5 text-xs">
                          <div className="mt-0.5 h-3 w-3 rounded-full bg-movesync-blue/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-2 w-2 text-movesync-blue" />
                          </div>
                          <span className="text-movesync-gray-dark">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-3">
                    <div className="inline-block px-2 py-0.5 bg-movesync-blue/5 text-movesync-blue text-xs rounded-md">
                      {country.highlights}
                    </div>
                  </div>
                  
                  <Button 
                    variant={country.active ? "default" : "outline"} 
                    size="sm"
                    className={`w-full group ${
                      country.active 
                        ? 'bg-movesync-blue hover:bg-movesync-blue-dark text-white border-0' 
                        : 'bg-white text-movesync-gray-dark border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {country.active ? (
                      <>
                        Select {country.name}
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-1 h-3 w-3" />
                        Coming Soon
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Newsletter Section */}
        <motion.div 
          className="mt-12 px-4 py-8 max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >          
          <div className="text-center">
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
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-movesync-gray">
              Powered by MoveSync AI — making relocation simpler through intelligent assistance.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountrySelection;
