
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, AlertCircle, ArrowRight, Flag, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Globe className="w-16 h-16 mx-auto mb-4 text-movesync-blue" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Welcome to MoveSync</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your personalized guide to relocating abroad. Select your destination country to begin your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              <Sparkles className="w-4 h-4 mr-1" /> Visa Guidance
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              <Sparkles className="w-4 h-4 mr-1" /> Housing Support
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              <Sparkles className="w-4 h-4 mr-1" /> Job Search
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
              <Sparkles className="w-4 h-4 mr-1" /> Local Integration
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {countries.map(country => (
            <Card 
              key={country.id} 
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border-2 ${
                country.active ? 'hover:border-movesync-blue' : 'hover:border-gray-400'
              }`}
              onClick={() => handleSelectCountry(country.id)}
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${
                country.active ? 'from-blue-400 to-purple-500' : 'from-gray-300 to-gray-400'
              } transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-4xl">{country.flag}</span>
                  <span>{country.name}</span>
                  {!country.active && (
                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 py-1 px-2 rounded-full flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Coming Soon
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {country.active ? 'Available now' : 'Coming soon'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {country.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {country.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant="outline" 
                  className={`w-full ${
                    country.active 
                      ? 'group-hover:bg-movesync-blue group-hover:text-white' 
                      : 'group-hover:bg-gray-200'
                  } transition-colors`}
                >
                  {country.active ? (
                    <>
                      <MapPin className="mr-2 h-4 w-4" />
                      Explore {country.name}
                    </>
                  ) : (
                    <>
                      <Flag className="mr-2 h-4 w-4" />
                      {country.name} (Coming Soon)
                    </>
                  )}
                  {country.active && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">More Countries Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're expanding our services to more countries around the world. Sign up to get notified when we launch in your desired destination.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-md border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-movesync-blue"
            />
            <Button type="submit">
              Get Notified
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CountrySelection;
