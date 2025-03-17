
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InvestmentIntro from '@/components/investment/InvestmentIntro';
import InvestmentCalculator from '@/components/investment/InvestmentCalculator';
import CountryComparison from '@/components/investment/CountryComparison';
import InvestmentCTA from '@/components/investment/InvestmentCTA';

const Investment = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container-content section-spacing">
        <h1 className="heading-lg text-center mb-12">
          Global Investment Opportunity
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <InvestmentIntro />
          <InvestmentCalculator />
        </div>
        
        <CountryComparison />
        
        <InvestmentCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Investment;
