
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';

const Investment = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reference to the calculator section for smooth scrolling
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Investment Calculator state
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [companyValuation, setCompanyValuation] = useState(3000000);
  const [equityPercentage, setEquityPercentage] = useState(0);
  const [projectedGrowth, setProjectedGrowth] = useState(30);
  const [selectedYear, setSelectedYear] = useState(5);

  // Calculate equity percentage based on investment amount
  useEffect(() => {
    const calculatedEquity = (initialInvestment / companyValuation) * 100;
    setEquityPercentage(parseFloat(calculatedEquity.toFixed(2)));
  }, [initialInvestment, companyValuation]);

  // Scroll to calculator function
  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate ROI for different time periods
  const calculateROI = (years: number) => {
    const growthMultiplier = Math.pow(1 + projectedGrowth / 100, years);
    const futureValuation = companyValuation * growthMultiplier;
    const futureEquityValue = futureValuation * (equityPercentage / 100);
    const roi = ((futureEquityValue - initialInvestment) / initialInvestment) * 100;
    return {
      futureValuation: futureValuation.toFixed(0),
      equityValue: futureEquityValue.toFixed(0),
      roi: roi.toFixed(0)
    };
  };

  // Get ROI data for the selected year
  const roiData = calculateROI(selectedYear);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-movesync-blue/10 to-white">
        <div className="container-content text-center mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Invest in MoveSync's Global Future
          </h1>
          <p className="text-xl text-movesync-gray-dark max-w-3xl mx-auto mb-10">
            Join us in revolutionizing the international relocation experience and earn 
            competitive returns as we expand to new markets worldwide.
          </p>
          <Button 
            onClick={scrollToCalculator}
            className="bg-movesync-blue hover:bg-movesync-blue-dark text-white px-6 py-6 text-lg"
          >
            Calculate Your Potential Returns <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Key Investment Points */}
      <div className="py-16 bg-white">
        <div className="container-content mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Invest in MoveSync?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-movesync-blue">
              <CardHeader>
                <CardTitle>Expanding Global Market</CardTitle>
              </CardHeader>
              <CardContent>
                <p>International relocations are growing at 15% annually, with over 280 million people living outside their birth countries. MoveSync is positioned to capture this expanding market.</p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-movesync-blue">
              <CardHeader>
                <CardTitle>Proven Business Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our freemium to premium conversion rate is 22%, well above industry average. With 76% customer retention and referral-driven growth, we have a sustainable path to profitability.</p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-movesync-blue">
              <CardHeader>
                <CardTitle>Tech-Driven Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our AI-powered platform enables rapid scaling with minimal overhead. Each new country we add increases our serviceable market by millions of potential users.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Investment Opportunity */}
      <div className="py-16 bg-gray-50">
        <div className="container-content mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Current Investment Opportunity
              </h2>
              <p className="text-lg mb-4">
                MoveSync is offering 20% equity at a $3 million valuation to fund our expansion to 12 new countries over the next 18 months.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-movesync-blue font-bold mr-2">•</span>
                  <span>Minimum investment: $10,000</span>
                </li>
                <li className="flex items-start">
                  <span className="text-movesync-blue font-bold mr-2">•</span>
                  <span>Projected annual growth: 30%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-movesync-blue font-bold mr-2">•</span>
                  <span>Target exit: 5-7 years via acquisition or IPO</span>
                </li>
                <li className="flex items-start">
                  <span className="text-movesync-blue font-bold mr-2">•</span>
                  <span>Expected ROI: 400%+ over 5 years</span>
                </li>
              </ul>
              <Button onClick={scrollToCalculator} className="bg-movesync-blue hover:bg-movesync-blue-dark text-white">
                Calculate Your Returns
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Funding Use Allocation</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>International Market Expansion</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-movesync-blue h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>AI & Technology Development</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-movesync-blue h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Marketing & Customer Acquisition</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-movesync-blue h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Operations & Admin</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-movesync-blue h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Investment Calculator */}
      <div ref={calculatorRef} className="py-16 bg-movesync-blue/5">
        <div className="container-content mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Investment ROI Calculator
          </h2>
          <p className="text-center text-movesync-gray-dark max-w-2xl mx-auto mb-12">
            See how your investment could grow as MoveSync expands globally. Adjust the variables below to calculate potential returns.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-movesync-gray-dark block mb-2">
                    Investment Amount (USD)
                  </label>
                  <Input
                    type="number"
                    min="10000"
                    max="600000"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="mb-1"
                  />
                  <Slider
                    defaultValue={[10000]}
                    max={600000}
                    step={1000}
                    value={[initialInvestment]}
                    onValueChange={(value) => setInitialInvestment(value[0])}
                  />
                  <div className="flex justify-between text-xs text-movesync-gray mt-1">
                    <span>$10,000</span>
                    <span>$600,000</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-movesync-gray-dark block mb-2">
                    Company Valuation (USD)
                  </label>
                  <div className="text-2xl font-bold mb-2">${companyValuation.toLocaleString()}</div>
                  <div className="text-sm text-movesync-gray-dark">Current valuation based on revenue, growth rate, and market potential.</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-movesync-gray-dark block mb-2">
                    Projected Annual Growth Rate
                  </label>
                  <Input
                    type="number"
                    min="10"
                    max="50"
                    value={projectedGrowth}
                    onChange={(e) => setProjectedGrowth(Number(e.target.value))}
                    className="mb-1"
                  />
                  <Slider
                    defaultValue={[30]}
                    max={50}
                    min={10}
                    step={1}
                    value={[projectedGrowth]}
                    onValueChange={(value) => setProjectedGrowth(value[0])}
                  />
                  <div className="flex justify-between text-xs text-movesync-gray mt-1">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-movesync-gray-dark block mb-2">
                    Your Equity
                  </label>
                  <div className="text-3xl font-bold text-movesync-blue mb-2">{equityPercentage}%</div>
                  <div className="text-sm text-movesync-gray-dark">Percentage of MoveSync ownership based on your investment.</div>
                </div>
              </div>
              
              <div className="border-t pt-6 md:pt-0 md:border-t-0 md:border-l md:pl-8">
                <h3 className="text-xl font-bold mb-4">Projected Returns</h3>
                
                <Tabs defaultValue="5" className="w-full" onValueChange={(value) => setSelectedYear(parseInt(value))}>
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="1" className="flex-1">1 Year</TabsTrigger>
                    <TabsTrigger value="3" className="flex-1">3 Years</TabsTrigger>
                    <TabsTrigger value="5" className="flex-1">5 Years</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="1" className="mt-0">
                    <ResultDisplay data={calculateROI(1)} investment={initialInvestment} equity={equityPercentage} />
                  </TabsContent>
                  
                  <TabsContent value="3" className="mt-0">
                    <ResultDisplay data={calculateROI(3)} investment={initialInvestment} equity={equityPercentage} />
                  </TabsContent>
                  
                  <TabsContent value="5" className="mt-0">
                    <ResultDisplay data={calculateROI(5)} investment={initialInvestment} equity={equityPercentage} />
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-movesync-gray-dark">
                    <p className="mb-2">This calculator provides estimates based on projected growth rates and is for informational purposes only. Actual returns may vary.</p>
                    <p>Interested in exploring investment opportunities with MoveSync? Contact our investor relations team.</p>
                  </div>
                  
                  <Button className="w-full mt-4 bg-movesync-blue hover:bg-movesync-blue-dark text-white">
                    Request Investor Information
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container-content mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What is the minimum investment amount?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>The minimum investment in MoveSync is $10,000 USD. This allows you to own approximately 0.33% equity in the company at our current valuation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How is the company valuation determined?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our $3 million valuation is based on our current user base, growth rate, market penetration, and comparable companies in the relocation technology space. We've applied standard SaaS revenue multiples adjusted for our growth stage.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>What is the projected exit strategy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We're building MoveSync for long-term success, with a targeted exit in 5-7 years through either acquisition by a larger relocation company or technology firm, or potentially an IPO if our growth trajectory continues as projected.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How will my investment be used?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your investment will primarily fund our expansion into 12 new countries, enhance our AI capabilities, and accelerate user acquisition. We maintain full transparency with our investors through quarterly reports detailing how funds are being utilized.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-movesync-blue">
        <div className="container-content mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Grow with MoveSync?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join our investment community and be part of revolutionizing how people relocate around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-movesync-blue hover:bg-gray-100">
              Download Investor Deck
            </Button>
            <Button className="bg-transparent border border-white text-white hover:bg-white/10">
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Helper component for displaying ROI results
const ResultDisplay = ({ 
  data, 
  investment, 
  equity 
}: { 
  data: { futureValuation: string; equityValue: string; roi: string; }; 
  investment: number;
  equity: number;
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-movesync-blue/5 p-4 rounded-lg">
        <div className="text-sm text-movesync-gray-dark mb-1">Company Valuation</div>
        <div className="text-2xl font-bold">${parseInt(data.futureValuation).toLocaleString()}</div>
      </div>
      
      <div className="bg-movesync-blue/5 p-4 rounded-lg">
        <div className="text-sm text-movesync-gray-dark mb-1">Your Equity Value</div>
        <div className="text-2xl font-bold">${parseInt(data.equityValue).toLocaleString()}</div>
      </div>
      
      <div className="bg-movesync-blue/5 p-4 rounded-lg">
        <div className="text-sm text-movesync-gray-dark mb-1">Return on Investment</div>
        <div className="text-2xl font-bold text-green-600">+{data.roi}%</div>
      </div>
      
      <div className="p-4 border border-movesync-blue/20 rounded-lg">
        <div className="flex justify-between">
          <div>
            <div className="text-sm text-movesync-gray-dark">Initial Investment</div>
            <div className="font-semibold">${investment.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-movesync-gray-dark">Equity</div>
            <div className="font-semibold">{equity}%</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-movesync-gray-dark">Profit</div>
            <div className="font-semibold text-green-600">
              +${(parseInt(data.equityValue) - investment).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;
