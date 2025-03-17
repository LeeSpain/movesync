
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Bot, Sparkles, BrainCircuit, Scan, Laptop, ArrowRight, Clock } from 'lucide-react';

const CountrySelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Featured countries (active & coming soon)
  const countries = [
    { 
      id: 'australia', 
      name: 'Australia', 
      flag: '🇦🇺', 
      description: 'A diverse landscape with vibrant cities, stunning beaches, and unique wildlife.',
      active: true,
      benefits: ['Strong economy', 'High quality of life', 'Excellent healthcare']
    },
    { 
      id: 'usa', 
      name: 'United States', 
      flag: '🇺🇸', 
      description: 'From coast to coast, discover endless opportunities in this diverse melting pot.',
      active: false,
      benefits: ['Career opportunities', 'Educational excellence', 'Cultural diversity']
    },
    { 
      id: 'uk', 
      name: 'United Kingdom', 
      flag: '🇬🇧', 
      description: 'Experience rich history, cultural landmarks, and innovative opportunities.',
      active: false,
      benefits: ['Historical charm', 'World-class education', 'Multicultural cities']
    },
    { 
      id: 'spain', 
      name: 'Spain', 
      flag: '🇪🇸', 
      description: 'Enjoy Mediterranean lifestyle with incredible food, art and architecture.',
      active: false,
      benefits: ['Relaxed lifestyle', 'Rich culture', 'Beautiful climate']
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-movesync-blue/10 to-background pt-20 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-movesync-outback-red/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-movesync-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-movesync-aussie-green/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-movesync-blue/10 border border-movesync-blue/20">
                  <BrainCircuit className="w-12 h-12 text-movesync-blue" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-movesync-blue/10 rounded-full blur-xl opacity-70"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-movesync-black">
              Where would you like to <span className="text-gradient-aussie">relocate?</span>
            </h1>
            
            <p className="text-xl text-movesync-gray-dark mb-8">
              Select your destination and let our AI-powered relocation assistant guide your journey.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-movesync-gray-dark shadow-sm border border-gray-100">
                <Bot className="w-4 h-4 mr-2 text-movesync-blue" /> AI Assistance
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-movesync-gray-dark shadow-sm border border-gray-100">
                <Sparkles className="w-4 h-4 mr-2 text-movesync-blue-dark" /> Smart Recommendations
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-movesync-gray-dark shadow-sm border border-gray-100">
                <Scan className="w-4 h-4 mr-2 text-movesync-outback-red" /> Document Processing
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-movesync-gray-dark shadow-sm border border-gray-100">
                <Laptop className="w-4 h-4 mr-2 text-movesync-aussie-green" /> 24/7 Digital Access
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Countries Selection */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-12 text-movesync-black">Select Your Destination</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {countries.map(country => (
            <Card 
              key={country.id} 
              className={`hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group border-gray-200 ${
                country.active ? 'hover:border-movesync-blue' : 'hover:border-gray-300'
              }`}
              onClick={() => handleSelectCountry(country.id)}
            >
              {/* Status indicator */}
              <div className={`h-1 w-full ${country.active ? 'bg-movesync-blue' : 'bg-gray-200'}`}></div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-movesync-black">
                    <span className="text-4xl mr-2">{country.flag}</span>
                    <span>{country.name}</span>
                  </CardTitle>
                  {!country.active && (
                    <span className="text-xs bg-gray-100 text-movesync-gray py-1 px-3 rounded-full flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Coming Soon
                    </span>
                  )}
                </div>
                <CardDescription className={country.active ? 'text-movesync-blue' : 'text-movesync-gray'}>
                  {country.active ? 'Available now' : 'Coming soon'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-movesync-gray-dark mb-4">
                  {country.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-movesync-gray-dark mb-2">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {country.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-movesync-blue mt-0.5">✓</span>
                        <span className="text-movesync-gray-dark">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant={country.active ? "default" : "outline"} 
                  className={`w-full ${
                    country.active 
                      ? 'bg-movesync-blue hover:bg-movesync-blue-dark text-white border-0' 
                      : 'bg-white text-movesync-gray-dark border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {country.active ? (
                    <>
                      Explore Australia
                      <ArrowRight className="ml-2 h-4 w-4" />
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
          ))}
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-20 px-4 py-12 max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-sm border border-gray-100">          
          <h2 className="text-2xl font-bold mb-4 text-movesync-black">More Countries Coming Soon</h2>
          <p className="text-movesync-gray-dark mb-8 max-w-2xl mx-auto">
            Our AI is constantly learning about more destinations. Sign up to be notified when we add support for your desired country.
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
      </div>
    </div>
  );
};

export default CountrySelection;
