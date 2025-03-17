
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InvestmentIntro from '@/components/investment/InvestmentIntro';
import InvestmentCalculator from '@/components/investment/InvestmentCalculator';
import CountryComparison from '@/components/investment/CountryComparison';
import InvestmentCTA from '@/components/investment/InvestmentCTA';

const Investment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-blue-800">
            Global Investment Opportunity
          </h1>
          
          <p className="text-xl text-center text-blue-700 mb-12 max-w-3xl mx-auto">
            Join us in building the future of global relocation with MoveSync's innovative AI platform
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <InvestmentIntro />
            <InvestmentCalculator />
          </div>
          
          <CountryComparison />
          
          <InvestmentCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investment;
