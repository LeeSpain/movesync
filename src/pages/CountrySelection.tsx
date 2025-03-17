
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, Flag, AlertCircle } from 'lucide-react';

const CountrySelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Enhanced country data with more information
  const countries = [
    { 
      id: 'australia', 
      name: 'Australia', 
      flag: '🇦🇺', 
      description: 'Explore opportunities in the land down under with beautiful landscapes and vibrant cities.',
      active: true 
    },
    { 
      id: 'canada', 
      name: 'Canada', 
      flag: '🇨🇦', 
      description: 'Discover the great north with friendly communities and stunning natural beauty.',
      active: false 
    },
    { 
      id: 'uk', 
      name: 'United Kingdom', 
      flag: '🇬🇧', 
      description: 'Learn about life in the UK with its rich history and diverse cultural experiences.',
      active: false 
    },
    { 
      id: 'usa', 
      name: 'United States', 
      flag: '🇺🇸', 
      description: 'Explore the land of opportunity with diverse landscapes and vibrant cities.',
      active: false 
    },
    { 
      id: 'germany', 
      name: 'Germany', 
      flag: '🇩🇪', 
      description: 'Consider Germany for its strong economy and high quality of life in the heart of Europe.',
      active: false 
    },
    { 
      id: 'newzealand', 
      name: 'New Zealand', 
      flag: '🇳🇿', 
      description: 'Experience the natural wonders and relaxed lifestyle of this Pacific paradise.',
      active: false 
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MoveSync</h1>
          <p className="text-xl text-gray-600 mb-6">
            Your personalized guide to relocating abroad. Select your destination country to begin your journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {countries.map(country => (
            <Card 
              key={country.id} 
              className={`hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group border-2 ${country.active ? 'hover:border-movesync-blue' : 'hover:border-gray-400'}`}
              onClick={() => handleSelectCountry(country.id)}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${country.active ? 'from-blue-400 to-purple-500' : 'from-gray-300 to-gray-400'} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
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
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {country.description}
                </p>
                <Button 
                  variant="outline" 
                  className={`w-full ${country.active 
                    ? 'group-hover:bg-movesync-blue group-hover:text-white' 
                    : 'group-hover:bg-gray-200'} transition-colors`}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {country.active ? `Explore ${country.name}` : `${country.name} (Coming Soon)`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountrySelection;
