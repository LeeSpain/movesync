
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const InvestorSection = () => {
  const [open, setOpen] = useState(false);

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
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full flex items-center justify-center text-white bg-movesync-blue py-3 px-6 rounded-lg font-medium hover:bg-movesync-blue-dark transition-colors group"
                  >
                    Global Investment Opportunity
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                      MoveSync: Transforming Global Relocation – Investment Prospectus
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="mt-4 space-y-6 text-foreground">
                    <p className="leading-relaxed">
                      MoveSync represents a strategic investment opportunity in the rapidly evolving global relocation market. Our AI-powered platform is positioned to disrupt a $15 billion industry by introducing unprecedented efficiency and scalability. We are currently raising $2 million for 20% equity at a pre-money valuation of $12 million, bringing our post-money valuation to $14 million. This opportunity offers both significant potential returns and the chance to participate in transforming an essential global service.
                    </p>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Competitive Advantage</h3>
                      <p className="leading-relaxed">
                        MoveSync's proprietary technology platform enables seamless relocation experiences across global markets, whether in New York, Tokyo, Sydney, or Dubai. Our AI systems manage the complete relocation process including housing procurement, employment opportunities, visa administration, and cultural integration across multiple countries and languages with minimal operational overhead. Unlike competitors limited to single markets, MoveSync's infrastructure is designed to serve the 10+ million individuals relocating internationally annually. While the relocation industry currently stands at $11.5 billion and is projected to reach $29.2 billion by 2030, MoveSync is positioned to capture significant market share through technological innovation.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Valuation Analysis</h3>
                      <p className="mb-2">Our $12 million valuation is supported by comprehensive market analysis and growth projections:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li className="leading-relaxed">
                          <span className="font-semibold">Market Opportunity:</span> The global relocation market reached $11.5 billion in 2022 with a projected CAGR of 6.7%, reaching $29.2 billion by 2030. Our target audience comprises 2-3 million potential subscribers globally. With a subscription model at $108/month per client, achieving just 15,000 active users (0.5% market penetration) would generate approximately $19.7 million in annual recurring revenue by Year 5—potentially delivering a 10x return on investment.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-semibold">Technological Advantage:</span> Our AI technology represents a core asset with significant scaling capabilities and minimal marginal costs. Comparable companies in adjacent sectors have achieved 10,000+ users following seed investments of $2 million at valuations between $8-18 million. Our valuation aligns with the 2024 median for AI-focused startups with similar technological capabilities.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-semibold">Growth Trajectory:</span> Investment capital will enable rapid scaling from launch to an estimated 3,000 clients in Year 1 ($3.9 million revenue) with projected growth to 14,000+ clients by Year 5 ($18.39 million revenue). Using standard industry multiples of 5x revenue, even Year 1 performance would validate our current valuation.
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Capital Allocation Strategy</h3>
                      <p className="mb-2">The $2 million investment will be strategically deployed to maximize growth and market penetration:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-semibold">Platform Completion:</span> Finalization of our technology platform within 6 months, enabling global deployment within 12 months</li>
                        <li><span className="font-semibold">Market Validation:</span> Acquisition of 3,000 initial clients in Year 1, establishing proof of concept and initial revenue streams</li>
                        <li><span className="font-semibold">International Expansion:</span> Systematic entry into key global markets, leveraging our scalable AI architecture to maximize operational efficiency</li>
                      </ul>
                      <p className="mt-2 leading-relaxed">
                        Our offering of 20% equity for this investment represents favorable terms compared to industry standards of 15% for comparable seed investments. This equity structure is designed to align investor interests with our growth trajectory while providing attractive potential returns.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Exit Strategy</h3>
                      <p className="mb-2">MoveSync's business model is designed with clear paths to liquidity for investors:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-semibold">Strategic Acquisition:</span> By Year 5, with projected revenue of $18.39 million, MoveSync would represent an attractive acquisition target for established relocation providers like SIRVA or technology companies seeking to expand their service offerings, potentially commanding valuations of $50-100 million (5-10x revenue multiple).</li>
                        <li><span className="font-semibold">Public Market Opportunity:</span> As the global relocation market expands to $29.2 billion by 2030, MoveSync's market position and revenue growth could support a public offering as an alternative exit strategy.</li>
                        <li><span className="font-semibold">Return Potential:</span> A 20% equity stake at the $14 million post-money valuation could appreciate to $10-20 million over a five-year investment horizon, representing a 5-10x return based on conservative revenue projections and industry-standard valuation multiples.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Investment Summary</h3>
                      <p className="leading-relaxed">
                        MoveSync represents a strategic investment opportunity in an essential global service category with substantial growth potential. Our $12 million pre-money valuation reflects our developed technology platform, market-ready status, and the significant disruption opportunity in the global relocation sector. With $2 million in investment capital, we offer the opportunity to participate in building a category-defining company with multiple paths to significant returns. We welcome the opportunity to discuss detailed financial projections and address any specific questions regarding this investment opportunity.
                      </p>
                    </div>
                  </div>

                  <DialogFooter className="mt-6">
                    <Link 
                      to="/investment" 
                      className="w-full sm:w-auto flex items-center justify-center text-white bg-movesync-blue py-3 px-6 rounded-lg font-medium hover:bg-movesync-blue-dark transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Request Investment Prospectus
                    </Link>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;
