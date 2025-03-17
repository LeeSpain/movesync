
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InvestmentIntro from '@/components/investment/InvestmentIntro';
import InvestmentCalculator from '@/components/investment/InvestmentCalculator';
import CountryComparison from '@/components/investment/CountryComparison';
import InvestmentCTA from '@/components/investment/InvestmentCTA';
import { Card, CardContent } from '@/components/ui/card';

const Investment = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-10">
          Global Investment Opportunity
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-md border border-gray-200 h-full">
            <CardContent className="p-6">
              <InvestmentIntro />
            </CardContent>
          </Card>
          
          <Card className="shadow-md border border-gray-200 h-full">
            <CardContent className="p-6">
              <InvestmentCalculator />
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <CountryComparison />
        </div>
        
        <div className="mb-12">
          <InvestmentCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investment;
