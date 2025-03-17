
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Globe, 
  ArrowRight, 
  Check,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const CountrySelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Featured countries
  const countries = [
    { 
      id: 'australia', 
      name: 'Australia', 
      flag: '🇦🇺', 
      description: 'A diverse landscape with vibrant cities, stunning beaches, and unique wildlife.',
      active: true,
      highlights: ['Strong economy', 'High quality of life', 'Excellent healthcare']
    },
    { 
      id: 'usa', 
      name: 'United States', 
      flag: '🇺🇸', 
      description: 'From coast to coast, discover endless opportunities in this diverse melting pot.',
      active: false,
      highlights: ['Career opportunities', 'Educational excellence', 'Cultural diversity']
    },
    { 
      id: 'uk', 
      name: 'United Kingdom', 
      flag: '🇬🇧', 
      description: 'Experience rich history, cultural landmarks, and innovative opportunities.',
      active: false,
      highlights: ['Historical charm', 'World-class education', 'Multicultural cities']
    },
    { 
      id: 'spain', 
      name: 'Spain', 
      flag: '🇪🇸', 
      description: 'Enjoy Mediterranean lifestyle with incredible food, art and architecture.',
      active: false,
      highlights: ['Relaxed lifestyle', 'Rich culture', 'Beautiful climate']
    },
  ];

  const handleSelectCountry = (countryId: string) => {
    // Save selected country to localStorage
    localStorage.setItem('moveSync_country', countryId);
    
    const country = countries.find(c => c.id === countryId);
    
    if (countryId === 'australia') {
      toast({
        title: "Country selected",
        description: `You've selected ${country?.name} ${country?.flag} as your destination.`,
      });
      navigate('/home');
    } else {
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-12">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >            
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Welcome to <span className="text-movesync-blue">MoveSync</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Select your destination to begin your personalized relocation experience. 
            Our AI-powered platform will guide you through every step of your journey.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent rounded-full">
              <Globe className="w-4 h-4 text-movesync-blue" />
              <span className="text-sm font-medium">Choose Your Destination</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* How It Works */}
      <div className="bg-accent/50 py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-2">How MoveSync Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes relocation simple and stress-free
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border">
                <Globe className="w-6 h-6 text-movesync-blue" />
              </div>
              <h3 className="font-medium mb-2">Select Location</h3>
              <p className="text-sm text-muted-foreground">Choose your ideal destination from our supported locations.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border">
                <svg className="w-6 h-6 text-movesync-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">AI Planning</h3>
              <p className="text-sm text-muted-foreground">Get a personalized relocation plan created for your specific needs.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border">
                <svg className="w-6 h-6 text-movesync-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L20 6M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Guided Process</h3>
              <p className="text-sm text-muted-foreground">Navigate applications, housing, and job searches with expert guidance.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border">
                <svg className="w-6 h-6 text-movesync-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Seamless Move</h3>
              <p className="text-sm text-muted-foreground">Arrive with confidence, knowing everything has been organized.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Countries Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Select Your Destination</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a country to begin your personalized relocation journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {countries.map((country, index) => (
            <motion.div 
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card 
                onClick={() => handleSelectCountry(country.id)}
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-md ${
                  country.active ? 'border-movesync-blue/30' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{country.flag}</span>
                      <h3 className="text-xl font-medium">{country.name}</h3>
                    </div>
                    {country.active ? (
                      <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                        <Check className="w-3 h-3 mr-0.5" /> Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-muted-foreground text-sm mb-4">{country.description}</p>
                  <div className="space-y-2">
                    {country.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-movesync-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-movesync-blue" />
                        </div>
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={country.active ? "default" : "outline"} 
                    size="sm"
                    className="w-full"
                  >
                    {country.active ? (
                      <>
                        Select Country
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-1 h-3 w-3" />
                        Coming Soon
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Info Section */}
        <motion.div 
          className="max-w-2xl mx-auto mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-xl font-medium mb-3">Expanding to More Locations</h3>
          <p className="text-muted-foreground mb-6">
            Our AI is learning about more destinations every day. Sign up to be notified when we add support for your desired location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-3 py-2 rounded-md border border-input bg-background text-foreground flex-grow focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
            <Button 
              type="submit"
              size="default"
            >
              Get Updates
            </Button>
          </div>
          
          <div className="mt-8 pt-6 text-xs text-muted-foreground border-t border-border">
            Powered by MoveSync AI — making relocation simpler through intelligent assistance.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountrySelection;
