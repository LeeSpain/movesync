
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import CountryCard, { Country } from "./CountryCard";

interface CountryListProps {
  countries: Country[];
}

const CountryList = ({ countries }: CountryListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {countries.map((country, index) => (
        <CountryCard 
          key={country.id}
          country={country}
          onSelect={handleSelectCountry}
          index={index}
        />
      ))}
    </div>
  );
};

export default CountryList;
