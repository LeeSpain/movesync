
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Users, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InvestmentCTA = () => {
  const { investmentAmount } = useInvestment();
  
  return (
    <Card className="p-8 rounded-xl shadow-lg border-0 bg-gradient-to-br from-movesync-blue to-movesync-blue-light text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Invest in Our Global Growth?</h2>
        <p className="text-lg mb-8 opacity-90">
          Take the next step to become part of MoveSync's international expansion and benefit from our growth across all countries.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm">
            <Users className="h-10 w-10 mx-auto mb-4 text-movesync-gray-light" />
            <h3 className="font-bold mb-2">Join Our Investors</h3>
            <p className="opacity-80 text-sm">Become part of our global community of forward-thinking investors</p>
          </div>
          
          <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm">
            <DollarSign className="h-10 w-10 mx-auto mb-4 text-movesync-gray-light" />
            <h3 className="font-bold mb-2">Minimum Investment</h3>
            <p className="opacity-80 text-sm">Starting from just $10,000 with attractive growth potential</p>
          </div>
          
          <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm">
            <Mail className="h-10 w-10 mx-auto mb-4 text-movesync-gray-light" />
            <h3 className="font-bold mb-2">Investment Support</h3>
            <p className="opacity-80 text-sm">Our team is ready to answer all your questions about investing</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-movesync-blue hover:bg-movesync-gray-light border-none shadow-lg min-w-40 text-base"
          >
            <Link to="/contact">
              Contact Investment Team
            </Link>
          </Button>
          
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 min-w-40 text-base"
          >
            <Link to="/investment-deck">
              Download Investment Deck <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InvestmentCTA;
