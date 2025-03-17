
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Bot, Sparkles, BrainCircuit, Scan, Laptop, ArrowRight, AlertCircle } from 'lucide-react';

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
    toast({
      title: "Country selected",
      description: `You've selected ${country?.name} ${country?.flag} as your destination. Welcome!`,
    });
    
    // Navigate to the homepage with the selected country
    if (countryId === 'australia') {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="relative inline-block mb-4">
            <BrainCircuit className="w-20 h-20 mx-auto text-blue-400" />
            <div className="absolute inset-0 animate-pulse bg-blue-500 blur-xl rounded-full opacity-30"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Welcome to MoveSync AI
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Your AI-powered relocation assistant. Select your destination to begin your personalized moving journey.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="inline-flex items-center px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-full text-sm backdrop-blur-sm">
              <Bot className="w-4 h-4 mr-2 text-blue-400" /> AI Personalization
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-full text-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" /> Smart Recommendations
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-full text-sm backdrop-blur-sm">
              <Scan className="w-4 h-4 mr-2 text-cyan-400" /> Document Scanning
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-full text-sm backdrop-blur-sm">
              <Laptop className="w-4 h-4 mr-2 text-green-400" /> 24/7 Digital Access
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {countries.map(country => (
            <Card 
              key={country.id} 
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group relative bg-slate-800/70 backdrop-blur-sm border-slate-700 ${
                country.active ? 'hover:border-blue-500' : 'hover:border-slate-600'
              }`}
              onClick={() => handleSelectCountry(country.id)}
            >
              {/* Glow effect at the top of active cards */}
              {country.active && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
              )}
              
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <span className="text-4xl">{country.flag}</span>
                  <span>{country.name}</span>
                  {!country.active && (
                    <span className="ml-auto text-xs bg-slate-700 text-slate-300 py-1 px-2 rounded-full flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Coming Soon
                    </span>
                  )}
                </CardTitle>
                <CardDescription className={country.active ? 'text-blue-400' : 'text-slate-500'}>
                  {country.active ? 'Available now' : 'Coming soon'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  {country.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {country.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-400 mt-0.5">✓</span>
                        <span className="text-slate-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant={country.active ? "default" : "outline"} 
                  className={`w-full ${
                    country.active 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0' 
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {country.active ? (
                    <>
                      <Bot className="mr-2 h-4 w-4" />
                      Explore with AI
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      Coming Soon
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 text-center max-w-2xl mx-auto relative">
          <div className="absolute -z-10 w-full h-full blur-3xl opacity-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full"></div>
          
          <h2 className="text-2xl font-bold mb-4 text-white">More Countries Coming Soon</h2>
          <p className="text-slate-300 mb-8">
            Our AI is learning about more destinations every day. Sign up to be the first to know when we expand to your desired country.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-md border border-slate-700 bg-slate-800/70 text-white flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Get Notified
            </Button>
          </form>
          
          <div className="mt-12 pt-10 border-t border-slate-800 text-sm text-slate-500">
            Powered by advanced artificial intelligence. MoveSync AI is continuously learning and improving.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySelection;
