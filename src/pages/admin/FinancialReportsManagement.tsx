import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, PieChart } from '@/components/ui/charts';
import { Badge } from '@/components/ui/badge';
import { DollarSign, ArrowUpRight, TrendingUp, CreditCard, BarChart3 } from 'lucide-react';
import { getMockStats } from '@/utils/adminMetrics';
import { getCostBreakdownData } from '@/utils/adminChartData';

const FinancialReportsManagement = () => {
  const stats = getMockStats();
  const costBreakdownData = getCostBreakdownData();
  
  // Profit and Loss data
  const profitLossData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [19200, 20500, 21700, 23100, 24800, 26500],
        backgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Expenses',
        data: [14800, 15200, 15900, 16300, 17100, 18200],
        backgroundColor: 'rgb(248, 113, 113)',
      },
      {
        label: 'Profit',
        data: [4400, 5300, 5800, 6800, 7700, 8300],
        backgroundColor: 'rgb(52, 211, 153)',
      },
    ],
  };
  
  // Cash Flow data
  const cashFlowData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Cash Flow',
        data: [5200, 6100, 5900, 7200, 8100, 8900],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Projected',
        data: [5000, 6000, 7000, 8000, 9000, 10000],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0)',
        borderDashed: true,
      }
    ],
  };
  
  // Budget vs Actual data
  const budgetVsActualData = {
    labels: ['Marketing', 'Tech Infra', 'Salaries', 'Operations', 'Customer Support', 'Other'],
    datasets: [
      {
        label: 'Budget',
        data: [5000, 6500, 12000, 3500, 4000, 1000],
        backgroundColor: 'rgb(99, 102, 241)',
      },
      {
        label: 'Actual',
        data: [5300, 6200, 11800, 3600, 3800, 1100],
        backgroundColor: 'rgb(52, 211, 153)',
      },
    ],
  };

  return (
    <>
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +6.8% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,200</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +6.4% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,300</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +7.8% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.3% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <Tabs defaultValue="profit-loss">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
            <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
            <TabsTrigger value="budget">Budget vs Actual</TabsTrigger>
            <TabsTrigger value="cost">Cost Breakdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profit-loss" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <CardDescription>Revenue, expenses, and profit over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <BarChart data={profitLossData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Gross Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68.7%</div>
                  <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Operating Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">35.2%</div>
                  <p className="text-xs text-muted-foreground">+0.8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Net Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">31.3%</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="cash-flow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
                <CardDescription>Actual and projected cash flow over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <LineChart data={cashFlowData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Operating Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$9,200</div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+8.2% MoM</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Investing Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-$1,850</div>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">New equipment</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Financing Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,550</div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Investor funds</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs. Actual Spending</CardTitle>
                <CardDescription>Comparison of planned vs actual expenditure by category</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <BarChart data={budgetVsActualData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$32,000</div>
                  <p className="text-xs text-muted-foreground">Monthly allocation</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Spend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$31,800</div>
                  <p className="text-xs text-muted-foreground">99.4% of budget used</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Largest Variance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Marketing</div>
                  <p className="text-xs text-muted-foreground">+$300 over budget</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="cost" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Operational Cost Breakdown</CardTitle>
                <CardDescription>Distribution of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={costBreakdownData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Largest Expense</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Personnel</div>
                      <p className="text-xs text-muted-foreground">28% of total costs</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Cost Per User</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$14.62</div>
                      <p className="text-xs text-muted-foreground">-$0.48 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Fixed vs Variable</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">72% / 28%</div>
                      <p className="text-xs text-muted-foreground">Ratio of fixed to variable costs</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default FinancialReportsManagement;
