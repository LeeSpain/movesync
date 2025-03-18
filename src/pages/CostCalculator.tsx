
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BudgetCalculatorTab from '@/components/premium-dashboard/cost-living/BudgetCalculatorTab';
import { costOfLivingData } from '@/components/premium-dashboard/cost-living/costOfLivingData';

const CostCalculator = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-6">Cost of Living Calculator</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Plan your budget with our comprehensive cost of living calculator. Compare expenses between cities 
          and understand what to expect financially in your new location.
        </p>
        
        <BudgetCalculatorTab cityData={costOfLivingData} />
      </main>
      
      <Footer />
    </div>
  );
};

export default CostCalculator;
