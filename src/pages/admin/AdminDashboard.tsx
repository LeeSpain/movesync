
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { Users, CreditCard, ArrowUpRight, Globe, Home, Briefcase, Mail, Bot } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import EmailManager from '@/components/admin/EmailManager';

const AdminDashboard = () => {
  // This would normally come from an API
  const [stats, setStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    activeCountries: 0,
    totalProperties: 0,
    totalJobs: 0,
    recentSignups: 0,
    webScrapingMetrics: {
      dailyScrapedProperties: 0,
      dailyScrapedJobs: 0,
      lastScrapeTime: '',
    }
  });

  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setStats({
        totalUsers: 1245,
        premiumUsers: 384,
        activeCountries: 12,
        totalProperties: 5762,
        totalJobs: 1893,
        recentSignups: 27,
        webScrapingMetrics: {
          dailyScrapedProperties: 187,
          dailyScrapedJobs: 92,
          lastScrapeTime: new Date().toISOString(),
        }
      });
    }, 1000);
  }, []);

  // Sample chart data
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Users',
        data: [800, 950, 1050, 1150, 1220, 1245],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Premium Users',
        data: [200, 250, 300, 320, 350, 384],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const countryDistributionData = {
    labels: ['Australia', 'Canada', 'UK', 'USA', 'Germany', 'Others'],
    datasets: [
      {
        data: [40, 20, 15, 10, 8, 7],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(248, 113, 113)',
          'rgb(52, 211, 153)',
          'rgb(251, 191, 36)',
          'rgb(209, 213, 219)',
        ],
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 18000, 19500, 22000, 26000],
        backgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  // New data for AI scraping metrics
  const scrapingStatsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Properties Scraped',
        data: [156, 187, 142, 198, 176, 103, 87],
        borderColor: 'rgb(52, 211, 153)',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        fill: true,
      },
      {
        label: 'Jobs Scraped',
        data: [78, 92, 68, 104, 85, 42, 36],
        borderColor: 'rgb(248, 113, 113)',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.recentSignups} new users this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.premiumUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.premiumUsers / stats.totalUsers) * 100)}% conversion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Countries</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCountries}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                2 new countries added
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Listed Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.webScrapingMetrics.dailyScrapedProperties} new today via AI scraping
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Listings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{stats.webScrapingMetrics.dailyScrapedJobs} new today via AI scraping
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Web Scraping</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(stats.webScrapingMetrics.lastScrapeTime).toLocaleTimeString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Last automated scraping run time
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">User Analytics</TabsTrigger>
            <TabsTrigger value="scraping">AI Scraping</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="email">Email System</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  User growth over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart data={userGrowthData} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-6">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly revenue from premium subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart data={revenueData} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="scraping" className="space-y-6">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>AI Web Scraping Metrics</CardTitle>
                <CardDescription>Daily property and job listings collected by our AI system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart data={scrapingStatsData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Properties Scraped (Today)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.webScrapingMetrics.dailyScrapedProperties}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Jobs Scraped (Today)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.webScrapingMetrics.dailyScrapedJobs}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Next Scheduled Scrape</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">
                        {new Date(new Date().setHours(24, 0, 0, 0)).toLocaleTimeString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="countries" className="space-y-6">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>User Distribution by Country</CardTitle>
                <CardDescription>Percentage of users by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={countryDistributionData} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="email" className="space-y-6">
            <EmailManager />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
