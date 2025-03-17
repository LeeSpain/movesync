
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InvestmentIntro from '@/components/investment/InvestmentIntro';
import InvestmentCalculator from '@/components/investment/InvestmentCalculator';
import FutureVision from '@/components/investment/FutureVision';
import InvestmentCTA from '@/components/investment/InvestmentCTA';
import { Card, CardContent } from '@/components/ui/card';

const Investment = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl"> {/* Added pt-24 to move content below navbar */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Global Investment Opportunity
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <Card className="shadow-md border border-gray-200 h-full">
            <CardContent className="p-8">
              <InvestmentIntro />
            </CardContent>
          </Card>
          
          <Card className="shadow-md border border-gray-200 h-full">
            <CardContent className="p-8">
              <InvestmentCalculator />
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-16">
          <FutureVision />
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
