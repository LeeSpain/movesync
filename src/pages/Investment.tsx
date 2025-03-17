
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LineChart } from '@/components/ui/charts';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const Investment = () => {
  // Investment calculation state
  const [investment, setInvestment] = useState(10000);
  const [years, setYears] = useState(3);
  const [growthRate, setGrowthRate] = useState(25);
  const [connectionsPerCountry, setConnectionsPerCountry] = useState(1000);
  const [countriesExpansion, setCountriesExpansion] = useState([2, 3, 5, 8, 10]);
  const [results, setResults] = useState<any>(null);
  const [equity, setEquity] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Calculate equity percentage based on investment amount and $3M valuation
  useEffect(() => {
    const companyValuation = 3000000;
    const equityPercentage = (investment / companyValuation) * 100;
    setEquity(equityPercentage);
  }, [investment]);
  
  // Handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);
  
  // Calculate ROI based on input parameters
  useEffect(() => {
    const baseRevenuePerConnection = 15; // $15 per connection monthly
    const annualRevenuePerConnection = baseRevenuePerConnection * 12;
    const operatingMargin = 0.4; // 40% operating margin
    
    // Calculate growth over years
    const yearlyResults = [];
    let totalRevenue = 0;
    
    for (let year = 1; year <= 5; year++) {
      // Determine number of countries for this year
      const countriesCount = year <= countriesExpansion.length 
        ? countriesExpansion[year - 1] 
        : countriesExpansion[countriesExpansion.length - 1];
      
      // Apply growth rate to connections per country each year after year 1
      const yearlyConnectionGrowth = year === 1 
        ? connectionsPerCountry 
        : connectionsPerCountry * Math.pow(1 + (growthRate / 100), year - 1);
      
      // Calculate revenue
      const yearlyRevenue = countriesCount * yearlyConnectionGrowth * annualRevenuePerConnection;
      const profit = yearlyRevenue * operatingMargin;
      
      totalRevenue += yearlyRevenue;
      
      // Calculate investor's share
      const investorShare = profit * (equity / 100);
      const roi = (investorShare / investment) * 100;
      const cumulativeRoi = ((investorShare * year) / investment) * 100;
      
      yearlyResults.push({
        year,
        countries: countriesCount,
        connections: Math.round(yearlyConnectionGrowth * countriesCount),
        revenue: yearlyRevenue,
        profit: profit,
        investorProfit: investorShare,
        roi: roi,
        cumulativeRoi: cumulativeRoi
      });
    }
    
    const chartData = {
      labels: yearlyResults.map(r => `Year ${r.year}`),
      datasets: [
        {
          label: 'Annual Revenue ($)',
          data: yearlyResults.map(r => r.revenue),
          borderColor: '#1EAEDB',
          backgroundColor: 'rgba(30, 174, 219, 0.1)',
        },
        {
          label: 'Investor Return ($)',
          data: yearlyResults.map(r => r.investorProfit),
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
        }
      ]
    };
    
    setResults({
      yearlyResults,
      totalRevenue,
      chartData,
      totalInvestorReturn: yearlyResults.reduce((sum, year) => sum + year.investorProfit, 0),
    });
  }, [investment, years, growthRate, connectionsPerCountry, countriesExpansion, equity]);

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-movesync-blue/10 to-blue-600/5 py-16">
          <div className="container-content">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Invest in <span className="text-movesync-blue">MoveSync</span>
            </h1>
            <p className="text-xl text-center text-movesync-gray-dark max-w-3xl mx-auto mb-8">
              Join us in revolutionizing the global relocation industry with innovative tech and personalized services.
            </p>
            <div className="flex justify-center">
              <a href="#calculator" className="btn-primary text-lg px-8 py-3">
                Calculate Your ROI
              </a>
            </div>
          </div>
        </section>
        
        {/* Investment Opportunity */}
        <section className="py-16" ref={contentRef}>
          <div className="container-content">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-700 ${
                isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                <h2 className="text-3xl font-bold mb-6">Opportunity Overview</h2>
                <div className="space-y-4">
                  <p className="text-lg">
                    MoveSync is seeking strategic investors to fuel our global expansion. We're offering up to 20% equity
                    at a $3 million valuation.
                  </p>
                  <p className="text-lg">
                    Our platform connects people relocating internationally with essential services, 
                    creating a seamless experience while generating reliable recurring revenue.
                  </p>
                  <div className="bg-movesync-blue/10 p-6 rounded-lg border border-movesync-blue/20 mt-6">
                    <h3 className="font-bold text-xl mb-3">Key Investment Highlights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-movesync-blue mr-2">✓</span>
                        <span>Expanding to 10+ countries over next 5 years</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-movesync-blue mr-2">✓</span>
                        <span>$15 monthly revenue per user with 40% operating margin</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-movesync-blue mr-2">✓</span>
                        <span>25% projected annual growth in user base</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-movesync-blue mr-2">✓</span>
                        <span>Proprietary AI technology creating competitive advantage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className={`transition-all duration-700 delay-300 ${
                isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold mb-4">Investment at a Glance</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-movesync-gray-dark">Company Valuation</p>
                      <p className="text-2xl font-bold">$3,000,000</p>
                    </div>
                    <div>
                      <p className="text-movesync-gray-dark">Equity Available</p>
                      <p className="text-2xl font-bold">20%</p>
                    </div>
                    <div>
                      <p className="text-movesync-gray-dark">Minimum Investment</p>
                      <p className="text-2xl font-bold">$10,000</p>
                    </div>
                    <div>
                      <p className="text-movesync-gray-dark">Expected Annual Growth</p>
                      <p className="text-2xl font-bold">25%</p>
                    </div>
                    <div>
                      <p className="text-movesync-gray-dark">Target Countries by Year 5</p>
                      <p className="text-2xl font-bold">10+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ROI Calculator */}
        <section id="calculator" className="py-16 bg-gray-50">
          <div className="container-content">
            <h2 className="text-3xl font-bold text-center mb-2">Investment ROI Calculator</h2>
            <p className="text-center text-movesync-gray-dark mb-12 max-w-3xl mx-auto">
              Estimate your potential returns based on our growth projections. Adjust the parameters below to see how different scenarios affect your investment.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Calculator Controls */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Adjust Parameters</h3>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-movesync-gray-dark mb-2">Investment Amount</label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        min="10000"
                        max="600000"
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-lg font-medium w-24">
                        {equity.toFixed(2)}% Equity
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-movesync-gray-dark mb-2">Projection Years: {years}</label>
                    <Slider
                      value={[years]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={(value) => setYears(value[0])}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-movesync-gray-dark mb-2">Annual Growth Rate: {growthRate}%</label>
                    <Slider
                      value={[growthRate]}
                      min={10}
                      max={40}
                      step={5}
                      onValueChange={(value) => setGrowthRate(value[0])}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-movesync-gray-dark mb-2">Initial Connections per Country</label>
                    <Input
                      type="number"
                      min="500"
                      max="5000"
                      value={connectionsPerCountry}
                      onChange={(e) => setConnectionsPerCountry(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              
              {/* Results Display */}
              <div>
                {results && (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
                    <h3 className="text-xl font-bold mb-6">Your Projected Returns</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <p className="text-movesync-gray-dark">Total Investment</p>
                        <p className="text-2xl font-bold">{formatCurrency(investment)}</p>
                      </div>
                      <div>
                        <p className="text-movesync-gray-dark">Equity Stake</p>
                        <p className="text-2xl font-bold">{equity.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-movesync-gray-dark">Cumulative Return (5 Years)</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {formatCurrency(results.totalInvestorReturn)}
                        </p>
                      </div>
                      <div>
                        <p className="text-movesync-gray-dark">ROI (5 Years)</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {((results.totalInvestorReturn / investment) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 h-64">
                      <LineChart data={results.chartData} height={250} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Yearly Breakdown Table */}
            {results && (
              <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                <h3 className="text-xl font-bold mb-6">5-Year Projection Breakdown</h3>
                
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4">Year</th>
                      <th className="text-left py-3 px-4">Countries</th>
                      <th className="text-left py-3 px-4">Connections</th>
                      <th className="text-left py-3 px-4">Annual Revenue</th>
                      <th className="text-left py-3 px-4">Your Share</th>
                      <th className="text-left py-3 px-4">Annual ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyResults.map((result: any) => (
                      <tr key={result.year} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Year {result.year}</td>
                        <td className="py-3 px-4">{result.countries}</td>
                        <td className="py-3 px-4">{result.connections.toLocaleString()}</td>
                        <td className="py-3 px-4">{formatCurrency(result.revenue)}</td>
                        <td className="py-3 px-4 text-emerald-600">{formatCurrency(result.investorProfit)}</td>
                        <td className="py-3 px-4 font-medium">{result.roi.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Invest in MoveSync?</h3>
              <p className="text-movesync-gray-dark mb-8 max-w-2xl mx-auto">
                Contact our investment team to discuss opportunities and get detailed information about our expansion plans.
              </p>
              <a href="mailto:invest@movesync.com" className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2">
                Contact Investment Team <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investment;
