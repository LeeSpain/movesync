
import React from 'react';
import HeroSection from '@/components/country-selection/HeroSection';
import CountryList from '@/components/country-selection/CountryList';
import HowItWorks from '@/components/country-selection/HowItWorks';
import UpdateSection from '@/components/country-selection/UpdateSection';
import InvestorSection from '@/components/InvestorSection';
import Footer from '@/components/Footer';
import { useCountries } from '@/hooks/useCountries';
import useScrollToTop from '@/hooks/useScrollToTop';

const CountrySelection = () => {
  const { countries } = useCountries();
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <main className="py-12">
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Select Your Destination</h2>
          <CountryList countries={countries} />
        </div>
        
        <HowItWorks />
        <UpdateSection />
        <InvestorSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default CountrySelection;
