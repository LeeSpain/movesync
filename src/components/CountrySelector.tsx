
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export type Country = {
  id: string;
  name: string;
  flag: string;
  capital: string;
  description: string;
  image?: string;
};

export const countries: Country[] = [
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    capital: 'Canberra',
    description: 'A diverse landscape with vibrant cities, stunning beaches, and unique wildlife.',
    image: '/placeholder.svg'
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    capital: 'Washington D.C.',
    description: 'A vast country with diverse cultures, landscapes, and opportunities.',
    image: '/placeholder.svg'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    capital: 'London',
    description: 'Rich in history and culture with world-class cities and picturesque countryside.',
    image: '/placeholder.svg'
  },
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    capital: 'Madrid',
    description: 'Known for vibrant culture, delicious cuisine, and beautiful beaches.',
    image: '/placeholder.svg'
  }
];

export const CountrySelector = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleSelectCountry = (countryId: string) => {
    setSelectedCountry(countryId);
  };

  const handleConfirmSelection = () => {
    if (!selectedCountry) {
      toast({
        title: "No country selected",
        description: "Please select a country to continue",
        variant: "destructive"
      });
      return;
    }

    // In a real application, you would save the selected country to user preferences
    localStorage.setItem('moveSync_country', selectedCountry);
    
    const country = countries.find(c => c.id === selectedCountry);
    toast({
      title: "Country updated",
      description: `Your selected destination is now ${country?.name} ${country?.flag}`,
    });
    
    // Redirect to dashboard or home page
    navigate('/dashboard');
  };

  return (
    <div className="container-content max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Select Your Destination</h1>
        <p className="text-movesync-gray-dark">
          Choose the country you're planning to move to, and we'll personalize your experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <Card 
            key={country.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCountry === country.id ? 'ring-2 ring-movesync-blue' : ''
            }`}
            onClick={() => handleSelectCountry(country.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <span className="text-3xl">{country.flag}</span>
                {selectedCountry === country.id && (
                  <div className="w-6 h-6 bg-movesync-blue rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              <CardTitle>{country.name}</CardTitle>
              <CardDescription>Capital: {country.capital}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md mb-3 overflow-hidden">
                <img 
                  src={country.image} 
                  alt={country.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm">{country.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleConfirmSelection}
          className="px-8"
          size="lg"
        >
          Continue with Selected Country
        </Button>
      </div>
    </div>
  );
};

export default CountrySelector;
