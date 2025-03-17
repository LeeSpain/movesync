
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InvestmentIntro from '@/components/investment/InvestmentIntro';
import InvestmentCalculator from '@/components/investment/InvestmentCalculator';
import CountryComparison from '@/components/investment/CountryComparison';
import InvestmentCTA from '@/components/investment/InvestmentCTA';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useInvestment } from '@/components/investment/InvestmentContext';
import { calculateEquity } from '@/components/investment/InvestmentUtils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Globe, TrendingUp, DollarSign } from 'lucide-react';

const Investment = () => {
  const { 
    investmentAmount, 
    financialParams, 
    countryGrowthRates, 
    globalGrowthRate 
  } = useInvestment();
  
  const { totalEquityOffered, targetRaise, premoneyValuation } = financialParams;
  const { equityValue } = calculateEquity(investmentAmount, financialParams);
  
  // Create data for the investment breakdown pie chart
  const investmentBreakdownData = [
    { name: 'Global Marketing', value: 35 },
    { name: 'Technology Development', value: 30 },
    { name: 'Operations', value: 20 },
    { name: 'Market Expansion', value: 15 }
  ];
  
  const COLORS = ['#F39C12', '#D35400', '#C0392B', '#27AE60'];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-movesync-gray-light to-white text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-movesync-outback-red">
            Global Investment Opportunity
          </h1>
          
          <p className="text-xl text-center text-movesync-blue-dark mb-8 max-w-3xl mx-auto">
            Join us in building the future of global relocation with MoveSync's innovative AI platform
          </p>
          
          {/* Investment Summary Card */}
          <Card className="p-6 mb-12 bg-gradient-to-r from-movesync-gray-light to-white border-0 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-movesync-outback-red" />
                <h3 className="text-lg font-semibold text-movesync-blue-dark mb-1">Target Raise</h3>
                <p className="text-2xl font-bold text-movesync-outback-red">${targetRaise.toLocaleString()}</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Globe className="h-8 w-8 mx-auto mb-2 text-movesync-outback-red" />
                <h3 className="text-lg font-semibold text-movesync-blue-dark mb-1">Pre-money Valuation</h3>
                <p className="text-2xl font-bold text-movesync-outback-red">${premoneyValuation.toLocaleString()}</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-movesync-outback-red" />
                <h3 className="text-lg font-semibold text-movesync-blue-dark mb-1">Equity Offered</h3>
                <p className="text-2xl font-bold text-movesync-outback-red">{totalEquityOffered}%</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-movesync-outback-red" />
                <h3 className="text-lg font-semibold text-movesync-blue-dark mb-1">Global Growth Rate</h3>
                <p className="text-2xl font-bold text-movesync-outback-red">{(globalGrowthRate * 100).toFixed(0)}%</p>
              </div>
            </div>
          </Card>
          
          {/* Funds Allocation */}
          <Card className="p-6 mb-12 bg-white border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-movesync-outback-red mb-6 flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-movesync-outback-red" />
              Investment Fund Allocation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    value: { theme: { light: "#E67E22", dark: "#E67E22" }, label: "Value" }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investmentBreakdownData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${percent.toFixed(0)}%`}
                      >
                        {investmentBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-movesync-blue-dark">How We'll Use Your Investment</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Allocation</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investmentBreakdownData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.value}%</TableCell>
                        <TableCell>${((item.value / 100) * targetRaise).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 p-4 bg-movesync-gray-light rounded-lg">
                  <p className="text-movesync-blue-dark">
                    Your investment will help accelerate our global expansion across 
                    <strong> {Object.keys(countryGrowthRates).length} countries</strong>, enhance our AI-powered 
                    relocation platform, and strengthen our position as the market leader in global relocation services.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <InvestmentIntro />
            <InvestmentCalculator />
          </div>
          
          <CountryComparison />
          
          <InvestmentCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investment;

