import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
      icon: <Globe className="w-10 h-10 text-movesync-blue" />,
      title: "Select Destination",
      description: "Choose your ideal country from our expanding list of supported destinations."
    },
    {
      icon: <Compass className="w-10 h-10 text-movesync-aussie-green" />,
      title: "AI-Guided Planning",
      description: "Our AI assistant helps create a personalized relocation roadmap."
    },
    {
      icon: <Route className="w-10 h-10 text-movesync-outback-red" />,
      title: "Streamlined Process",
      description: "Navigate visa applications, housing, and job searches with ease."
    },
    {
      icon: <Plane className="w-10 h-10 text-movesync-blue-dark" />,
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
      <div className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-movesync-outback-red/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-movesync-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-movesync-aussie-green/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-movesync-black">
              Begin Your <span className="text-gradient-aussie">Journey</span> Abroad
            </h1>
            
            <p className="text-xl text-movesync-gray-dark mb-8 max-w-3xl mx-auto">
              Relocating is complex. Our AI-powered platform makes it simple, guiding you through every step from visa applications to finding the perfect home.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Sparkles className="w-5 h-5 text-movesync-blue" />
                <span className="text-movesync-gray-dark font-medium">AI-Powered Guidance</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Compass className="w-5 h-5 text-movesync-aussie-green" />
                <span className="text-movesync-gray-dark font-medium">Personalized Roadmap</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Luggage className="w-5 h-5 text-movesync-outback-red" />
                <span className="text-movesync-gray-dark font-medium">Streamlined Relocation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Journey Steps */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-movesync-black">Your Relocation Journey</h2>
          <p className="text-lg text-movesync-gray-dark max-w-3xl mx-auto">
            Select your destination below and let MoveSync guide you through every step of your international move
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {journeySteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm relative overflow-hidden group"
              variants={itemVariants}
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-movesync-blue/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-movesync-black">{step.title}</h3>
                <p className="text-movesync-gray-dark">{step.description}</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-movesync-blue/10 flex items-center justify-center">
                <span className="font-medium text-movesync-blue">{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Countries Selection */}
        <h2 className="text-3xl font-bold text-center mb-12 text-movesync-black">Select Your Destination</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {countries.map((country, index) => (
            <motion.div 
              key={country.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleSelectCountry(country.id)}
            >
              <Card className={`h-full border-0 shadow-md overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg ${
                country.active ? 'ring-1 ring-movesync-blue' : 'opacity-80 hover:opacity-100'
              }`}>
                {/* Card header with gradient overlay and country flag */}
                <div className={`h-32 relative overflow-hidden bg-gradient-to-r ${country.color}`}>
                  <div className="absolute inset-0 flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                        <span className="text-4xl">{country.flag}</span>
                        {country.name}
                      </h3>
                      {country.active ? (
                        <span className="inline-flex items-center mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                          <Check className="w-3 h-3 mr-1" /> Available Now
                        </span>
                      ) : (
                        <span className="inline-flex items-center mt-2 px-3 py-1 bg-black/20 backdrop-blur-sm text-white text-sm rounded-full">
                          <Clock className="w-3 h-3 mr-1" /> Coming Soon
                        </span>
                      )}
                    </div>
                    <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-movesync-blue mb-1">COUNTRY HIGHLIGHTS</h4>
                    <p className="text-movesync-gray-dark">{country.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-movesync-blue mb-2">WHY CHOOSE {country.name.toUpperCase()}</h4>
                    <ul className="space-y-2">
                      {country.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="mt-0.5 h-4 w-4 rounded-full bg-movesync-blue/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-movesync-blue" />
                          </div>
                          <span className="text-movesync-gray-dark">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-2">
                    <div className="inline-block px-3 py-1 bg-movesync-blue/5 text-movesync-blue text-sm rounded-lg mb-2">
                      {country.highlights}
                    </div>
                  </div>
                  
                  <Button 
                    variant={country.active ? "default" : "outline"} 
                    className={`w-full group ${
                      country.active 
                        ? 'bg-movesync-blue hover:bg-movesync-blue-dark text-white border-0' 
                        : 'bg-white text-movesync-gray-dark border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {country.active ? (
                      <>
                        Explore {country.name}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-2 h-4 w-4" />
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
          className="mt-20 px-4 py-12 max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-movesync-black">Expanding to More Countries Soon</h2>
            <p className="text-movesync-gray-dark mb-8 max-w-2xl mx-auto">
              Our AI is learning about more destinations every day. Sign up to be notified when we add support for your desired country.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-movesync-black flex-grow focus:outline-none focus:ring-2 focus:ring-movesync-blue/30"
              />
              <Button 
                type="submit"
                className="bg-movesync-blue hover:bg-movesync-blue-dark text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Get Notified
              </Button>
            </form>
            
            <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-movesync-gray">
              Powered by MoveSync AI — making relocation simpler through intelligent assistance.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountrySelection;
