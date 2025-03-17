
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
                      MoveSync: The Future of Global Relocation – Investment Opportunity
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="mt-4 space-y-6 text-foreground">
                    <p className="leading-relaxed">
                      Welcome to MoveSync, the AI-powered platform poised to revolutionize how the world relocates. We're transforming a $15 billion industry with cutting-edge technology, and we're inviting you to join us. With a pre-money valuation of $12 million, we're raising $2 million for 20% equity, bringing our post-money valuation to $14 million. This isn't just an investment—it's your chance to shape a global game-changer. Here's why MoveSync is the opportunity you've been looking for.
                    </p>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Why MoveSync Stands Out</h3>
                      <p className="leading-relaxed">
                        Picture relocating anywhere—New York, Tokyo, Sydney, or Dubai—as seamless as booking a flight. That's MoveSync. Our platform leverages advanced AI to manage housing, jobs, visas, and cultural integration across every country, in every language, with zero manual overhead. Unlike competitors stuck in single markets, we've built a scalable ecosystem ready to tap into the 10 million people who relocate internationally each year. While the relocation industry sits at $11.5 billion today, projected to soar to $29.2 billion by 2030, MoveSync is rewriting the rules—and your investment can ignite that revolution.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Why We're Valued at $12 Million</h3>
                      <p className="mb-2">Numbers don't lie, and ours tell a story of massive potential:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li className="leading-relaxed">
                          <span className="font-semibold">Global Market Power:</span> The relocation market is a giant—$11.5 billion in 2022, growing at 6.7% annually to $29.2 billion by 2030. We're targeting 2-3 million potential subscribers worldwide. At $108/month per client, just 15,000 active users (0.5% market share) delivers $19.7 million in annual revenue by Year 5—a 10x return trajectory from your $2 million stake.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-semibold">AI Innovation:</span> Our tech isn't a feature—it's the core. MoveSync's AI learns, adapts, and scales globally with minimal cost. Competitors like Jobbatical hit 10,000 users after years with a $2 million seed at $8-18 million valuation. We're pre-revenue but pre-built, with AI that outpaces them, aligning with 2024's $12 million median AI startup valuations.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-semibold">Explosive Growth:</span> With $2 million, we'll launch from zero to 3,000 clients in Year 1 ($3.9 million revenue) and hit 14,188 by Year 5 ($18.39 million). A 5x revenue multiple on Year 1 alone tops our $12 million ask—your investment buys undervalued potential.
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">How Your $2 Million Fuels the Future</h3>
                      <p className="mb-2">Your investment isn't just capital—it's the key to unlocking MoveSync's global dominance:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-semibold">Rapid Deployment:</span> $2 million finishes our platform in 6 months and launches it worldwide in 12.</li>
                        <li><span className="font-semibold">Proven Traction:</span> We'll hit 3,000 clients in Year 1, proving our model while others lag behind.</li>
                        <li><span className="font-semibold">Global Scale:</span> Your funds and insight will expand MoveSync to every market, leveraging our AI to outpace competitors.</li>
                      </ul>
                      <p className="mt-2 leading-relaxed">
                        Seed deals typically offer 15% for this kind of investment—we're giving you 20%. That's not a discount; it's a deliberate bonus because your involvement amplifies our success. This is your chance to back a winner with outsized potential.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">The Big Payoff Ahead</h3>
                      <p className="mb-2">MoveSync isn't built for small wins—it's designed for massive exits:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-semibold">Acquisition Potential:</span> By Year 5, with $18.39 million revenue, we could fetch $50-100 million from giants like SIRVA or tech leaders like Google (5-10x multiple).</li>
                        <li><span className="font-semibold">IPO Horizon:</span> We're positioned to ride the $29.2 billion market wave by 2030, offering a public exit option.</li>
                        <li><span className="font-semibold">Your Return:</span> A 20% stake at $14 million post-money could grow to $10-20 million in five years—a 5-10x return backed by hard market data.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Why Invest in MoveSync?</h3>
                      <p className="leading-relaxed">
                        MoveSync isn't just an app—it's a global necessity ready to explode. Our $12 million pre-money valuation reflects a built, scalable platform targeting a market ripe for disruption. With $2 million, you're not just funding us—you're partnering to build a category leader. Explore our growth calculator below to see how your investment could multiply as we connect the world.
                      </p>
                    </div>
                  </div>

                  <DialogFooter className="mt-6">
                    <Link 
                      to="/investment" 
                      className="w-full sm:w-auto flex items-center justify-center text-white bg-movesync-blue py-3 px-6 rounded-lg font-medium hover:bg-movesync-blue-dark transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Contact Us About Investing
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
