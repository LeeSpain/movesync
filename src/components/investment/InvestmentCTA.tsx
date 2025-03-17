
import React from 'react';

const InvestmentCTA = () => {
  return (
    <div className="bg-movesync-blue/10 p-6 md:p-8 rounded-2xl text-center shadow-sm">
      <h2 className="heading-md mb-4">Ready to Invest in Our Global Platform?</h2>
      <p className="mb-6 max-w-2xl mx-auto">
        Contact our investment team to discuss your options and learn more about our global growth plans and expansion strategy.
      </p>
      <a 
        href="#" 
        className="px-6 py-3 bg-movesync-blue text-white rounded-lg font-medium transition-all duration-300 hover:bg-movesync-blue-dark hover:shadow-lg inline-block"
      >
        Schedule a Call
      </a>
    </div>
  );
};

export default InvestmentCTA;
