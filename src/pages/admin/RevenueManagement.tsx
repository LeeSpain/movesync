
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { LineChart, BarChart, PieChart } from '@/components/ui/charts';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  ArrowUpRight, 
  CreditCard, 
  Wallet,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { getMockStats } from '@/utils/adminMetrics';

const RevenueManagement = () => {
  const stats = getMockStats();

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [19200, 20500, 21700, 23100, 24800, 26500, 28000, 29500, 31200, 33000, 35500, 38000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Target Revenue',
        data: [20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0)',
        borderDashed: true,
      }
    ],
  };

  const revenueSourcesData = {
    labels: ['Premium Subscriptions', 'Enterprise Plans', 'Add-on Services', 'Referral Revenue', 'Other'],
    datasets: [
      {
        data: [68, 15, 10, 5, 2],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(248, 113, 113)',
          'rgb(52, 211, 153)',
          'rgb(209, 213, 219)',
        ],
      },
    ],
  };

  const paymentMethodsData = {
    labels: ['Credit Card', 'PayPal', 'Bank Transfer', 'Crypto', 'Other'],
    datasets: [
      {
        label: 'Payment Methods',
        data: [62, 21, 12, 3, 2],
        backgroundColor: [
          'rgb(99, 102, 241)',
          'rgb(14, 165, 233)',
          'rgb(168, 85, 247)',
          'rgb(239, 68, 68)',
          'rgb(209, 213, 219)',
        ],
      },
    ],
  };

  const monthlyComparisonData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'This Year',
        data: [19200, 20500, 21700, 23100, 24800, 26500, 28000, 29500, 31200, 33000, 35500, 38000],
        backgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Last Year',
        data: [15600, 16200, 17300, 18400, 19500, 20700, 21800, 22900, 24100, 25300, 26500, 28000],
        backgroundColor: 'rgb(209, 213, 219)',
      },
    ],
  };

  return (
    <AdminLayout title="Revenue Management">
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
                +8.7% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.annualRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.2% YoY growth
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$69</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +3.5% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue per User</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(stats.monthlyRevenue / stats.premiumUsers)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +4.8% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
            <TabsTrigger value="sources">Revenue Sources</TabsTrigger>
            <TabsTrigger value="trends">Monthly Comparison</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends (12 Months)</CardTitle>
                <CardDescription>Monthly revenue vs target for the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <LineChart data={revenueData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">YTD Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$264,750</div>
                  <p className="text-xs text-muted-foreground">83% of annual target</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Q4 Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$106,500</div>
                  <p className="text-xs text-muted-foreground">+18% vs Q3</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Annual Target</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$320,000</div>
                  <p className="text-xs text-muted-foreground">+25% from last year</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown by Source</CardTitle>
                <CardDescription>Distribution of revenue across different sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={revenueSourcesData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Premium Subscription Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$18,020</div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">+7.2% MoM</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Enterprise Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$3,975</div>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">+12.5% MoM</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Add-on Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$2,650</div>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">+15.8% MoM</Badge>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Year-over-Year Comparison</CardTitle>
                <CardDescription>Monthly revenue comparison between current and previous year</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <BarChart data={monthlyComparisonData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">YoY Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+23.2%</div>
                  <p className="text-xs text-muted-foreground">Above target of 20%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Best Performing Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">December</div>
                  <p className="text-xs text-muted-foreground">+35.7% YoY increase</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Projected Annual Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28.6%</div>
                  <p className="text-xs text-muted-foreground">Trending above forecast</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
                <CardDescription>Breakdown of revenue by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={paymentMethodsData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Processing Fees (Total)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$795</div>
                      <p className="text-xs text-muted-foreground">3.0% of monthly revenue</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Failed Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1.8%</div>
                      <p className="text-xs text-muted-foreground">Down from 2.3% last month</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default RevenueManagement;
