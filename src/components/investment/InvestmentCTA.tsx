
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from './ContactForm';

const InvestmentCTA = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <Card className="bg-[#FEF7CD] border border-amber-200 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl">Ready to Invest in Our Global Platform?</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="mb-8 max-w-2xl mx-auto">
            Contact our investment team to discuss your options and learn more about our global growth plans and expansion strategy.
          </p>
          <button 
            onClick={() => setIsContactFormOpen(true)}
            className="px-8 py-3 bg-movesync-blue text-white rounded-lg font-medium transition-all duration-300 hover:bg-movesync-blue-dark hover:shadow-lg inline-block"
          >
            Schedule a Call
          </button>
        </CardContent>
      </Card>

      <ContactForm 
        open={isContactFormOpen} 
        onOpenChange={setIsContactFormOpen} 
      />
    </>
  );
};

export default InvestmentCTA;
