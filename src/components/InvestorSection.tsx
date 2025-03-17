
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const InvestorSection = () => {
  return (
    <section className="py-16 bg-movesync-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Investor Opportunity</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            Join our vision to transform the global relocation experience with AI-powered solutions. 
            MoveSync is expanding rapidly across multiple markets.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-[#FEF7CD] border border-amber-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Global Growth Potential</h3>
              <p className="mb-4">Our expansion into multiple international markets creates significant growth opportunities with projected returns.</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Multi-country expansion strategy</li>
                <li>Proprietary AI technology</li>
                <li>Recurring revenue model</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-[#D3E4FD] border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Investment Opportunity</h3>
              <p className="mb-5">We're offering equity investment opportunities to fund our global expansion with promising ROI projections.</p>
              <Link 
                to="/investment" 
                className="flex items-center justify-center text-white bg-movesync-blue py-3 px-6 rounded-lg font-medium hover:bg-movesync-blue-dark transition-colors group"
              >
                Global Investment Opportunity
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;
