
import { useCountries } from '@/hooks/useCountries';
import HeroSection from '@/components/country-selection/HeroSection';
import CountryList from '@/components/country-selection/CountryList';
import UpdateSection from '@/components/country-selection/UpdateSection';

const CountrySelection = () => {
  const { countries } = useCountries();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Countries Section - Enhanced with immersive design */}
      <div className="py-16 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(109.6deg,rgba(223,234,247,0.2)_11.2%,rgba(244,248,252,0.2)_91.1%)]"></div>
        
        <div className="container mx-auto relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Select Your Destination</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a country to begin your personalized relocation journey. 
              Each destination offers unique opportunities and lifestyle benefits.
            </p>
          </div>
          
          <CountryList countries={countries} />
          
          {/* Info Section */}
          <UpdateSection />
        </div>
      </div>
    </div>
  );
};

export default CountrySelection;
