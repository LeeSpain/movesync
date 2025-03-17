import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Home, ShoppingBag, Utensils, Train, Lightbulb, Wifi, FileText, Download, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CostOfLivingTab from '@/components/premium-dashboard/CostOfLivingTab';

// Sample cost of living data by city
const cityData = {
  sydney: {
    housing: 2600, // Monthly rent for 1-bedroom apartment in city center
    groceries: 600, // Monthly grocery costs
    dining: 800, // Monthly dining out costs
    transport: 180, // Monthly public transport costs
    utilities: 220, // Monthly utilities (electricity, water, etc.)
    internet: 80, // Monthly internet costs
    other: 500, // Other monthly expenses
  },
  melbourne: {
    housing: 2200,
    groceries: 550,
    dining: 750,
    transport: 160,
    utilities: 200,
    internet: 75,
    other: 450,
  },
  brisbane: {
    housing: 1800,
    groceries: 500,
    dining: 650,
    transport: 140,
    utilities: 180,
    internet: 70,
    other: 400,
  },
  perth: {
    housing: 1600,
    groceries: 520,
    dining: 600,
    transport: 130,
    utilities: 190,
    internet: 75,
    other: 380,
  },
  adelaide: {
    housing: 1400,
    groceries: 480,
    dining: 550,
    transport: 120,
    utilities: 170,
    internet: 70,
    other: 350,
  },
  goldcoast: {
    housing: 1700,
    groceries: 520,
    dining: 620,
    transport: 130,
    utilities: 180,
    internet: 75,
    other: 370,
  },
};

// Common expenses data
const commonExpenses = [
  { name: 'One-bedroom apartment (city center)', value: 'A$1,500-2,600/month' },
  { name: 'One-bedroom apartment (outside center)', value: 'A$1,200-1,800/month' },
  { name: 'Three-bedroom apartment (city center)', value: 'A$2,800-4,500/month' },
  { name: 'Three-bedroom apartment (outside center)', value: 'A$2,000-3,000/month' },
  { name: 'Monthly utilities (electricity, heating, water)', value: 'A$150-250/month' },
  { name: 'Internet', value: 'A$70-100/month' },
  { name: 'Public transport monthly pass', value: 'A$120-180' },
  { name: 'Gym membership', value: 'A$50-100/month' },
  { name: 'Restaurant meal (mid-range)', value: 'A$20-35/person' },
  { name: 'Cinema ticket', value: 'A$15-25' },
  { name: 'Cappuccino', value: 'A$4-5.50' },
  { name: 'Liter of milk', value: 'A$1.50-2.50' },
  { name: 'Loaf of bread', value: 'A$2.50-4.50' },
  { name: 'Dozen eggs', value: 'A$4-7' },
  { name: 'Local beer (0.5 liter)', value: 'A$8-12' },
  { name: 'Bottle of wine (mid-range)', value: 'A$15-25' },
];

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F', '#AF19FF', '#FF1919'];

const CostOfLiving = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState('sydney');
  const [comparisonCity, setComparisonCity] = useState('');
  const [housingType, setHousingType] = useState('1bed-city');
  const [incomeValue, setIncomeValue] = useState(7000); // Monthly income in AUD
  const [activeTab, setActiveTab] = useState('calculator');
  
  // Get selected city data
  const cityExpenses = cityData[selectedCity as keyof typeof cityData];
  
  // Calculate total monthly expenses
  const totalMonthly = Object.values(cityExpenses).reduce((sum, value) => sum + value, 0);
  
  // Calculate remaining after expenses
  const remainingAmount = incomeValue - totalMonthly;
  
  // Prepare data for charts
  const expensesChartData = [
    { name: 'Housing', value: cityExpenses.housing, icon: <Home size={16} /> },
    { name: 'Groceries', value: cityExpenses.groceries, icon: <ShoppingBag size={16} /> },
    { name: 'Dining', value: cityExpenses.dining, icon: <Utensils size={16} /> },
    { name: 'Transport', value: cityExpenses.transport, icon: <Train size={16} /> },
    { name: 'Utilities', value: cityExpenses.utilities, icon: <Lightbulb size={16} /> },
    { name: 'Internet', value: cityExpenses.internet, icon: <Wifi size={16} /> },
    { name: 'Other', value: cityExpenses.other, icon: null },
  ];
  
  // Comparison data for bar chart
  const comparisonData = comparisonCity ? 
    Object.entries(cityData[comparisonCity as keyof typeof cityData]).map(([key, value]) => {
      return {
        name: key.charAt(0).toUpperCase() + key.slice(1),
        [selectedCity]: cityExpenses[key as keyof typeof cityExpenses],
        [comparisonCity]: value,
      };
    }) : [];
  
  const handleSaveReport = () => {
    toast({
      title: "Report saved",
      description: "Cost of living report has been saved to your documents."
    });
  };
  
  const handleShareReport = () => {
    toast({
      title: "Report shared",
      description: "Cost of living report has been shared to your email."
    });
  };

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Cost of Living</h1>
        <p className="text-muted-foreground">Plan your budget with accurate cost of living information for Australian cities.</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4 bg-transparent space-x-2 h-auto overflow-x-auto p-0 flex-wrap">
            <TabsTrigger 
              value="calculator" 
              className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
            >
              Budget Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="comparison" 
              className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
            >
              City Comparison
            </TabsTrigger>
            <TabsTrigger 
              value="expenses" 
              className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
            >
              Common Expenses
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
            >
              Local Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Expenses Calculator</CardTitle>
                  <CardDescription>View estimated monthly expenses in your chosen city</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sydney">Sydney</SelectItem>
                          <SelectItem value="melbourne">Melbourne</SelectItem>
                          <SelectItem value="brisbane">Brisbane</SelectItem>
                          <SelectItem value="perth">Perth</SelectItem>
                          <SelectItem value="adelaide">Adelaide</SelectItem>
                          <SelectItem value="goldcoast">Gold Coast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Housing Type</label>
                      <Select value={housingType} onValueChange={setHousingType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select housing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1bed-city">1-Bedroom Apartment (City Center)</SelectItem>
                          <SelectItem value="1bed-outside">1-Bedroom Apartment (Outside Center)</SelectItem>
                          <SelectItem value="3bed-city">3-Bedroom Apartment (City Center)</SelectItem>
                          <SelectItem value="3bed-outside">3-Bedroom Apartment (Outside Center)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Monthly Income (AUD)</label>
                        <span className="text-sm">${incomeValue.toLocaleString()}</span>
                      </div>
                      <Slider 
                        defaultValue={[7000]} 
                        max={20000} 
                        step={100} 
                        onValueChange={(value) => setIncomeValue(value[0])}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Monthly Expenses Breakdown</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={expensesChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {expensesChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Monthly Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Income:</span>
                          <span className="font-medium">${incomeValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Expenses:</span>
                          <span className="font-medium">${totalMonthly.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between">
                          <span className="font-medium">Remaining:</span>
                          <span className={`font-bold ${remainingAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            ${remainingAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-4 space-y-2">
                        <h4 className="font-medium">Expense Details</h4>
                        {expensesChartData.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {item.icon}
                              <span className="text-muted-foreground text-sm">{item.name}:</span>
                            </div>
                            <span className="text-sm">${item.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleSaveReport}>
                    <FileText className="h-4 w-4 mr-2" /> Save Report
                  </Button>
                  <Button onClick={handleShareReport}>
                    <Share2 className="h-4 w-4 mr-2" /> Share Report
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>City Comparison</CardTitle>
                  <CardDescription>Compare costs between cities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <label className="text-sm font-medium block mb-2">Compare with:</label>
                    <Select value={comparisonCity} onValueChange={setComparisonCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city to compare" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {Object.keys(cityData).filter(city => city !== selectedCity).map(city => (
                          <SelectItem key={city} value={city}>
                            {city.charAt(0).toUpperCase() + city.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {comparisonCity && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">Cost Comparison</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{fontSize: 12}} />
                          <YAxis tick={{fontSize: 12}} />
                          <Tooltip formatter={(value) => `$${value}`} />
                          <Legend />
                          <Bar 
                            dataKey={selectedCity} 
                            fill="#4F46E5" 
                            name={selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)} 
                          />
                          <Bar 
                            dataKey={comparisonCity} 
                            fill="#FF8042" 
                            name={comparisonCity.charAt(0).toUpperCase() + comparisonCity.slice(1)} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>City Comparison</CardTitle>
                <CardDescription>Compare costs between cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="text-sm font-medium block mb-2">Compare with:</label>
                  <Select value={comparisonCity} onValueChange={setComparisonCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city to compare" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {Object.keys(cityData).filter(city => city !== selectedCity).map(city => (
                        <SelectItem key={city} value={city}>
                          {city.charAt(0).toUpperCase() + city.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {comparisonCity && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Cost Comparison</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{fontSize: 12}} />
                        <YAxis tick={{fontSize: 12}} />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                        <Bar 
                          dataKey={selectedCity} 
                          fill="#4F46E5" 
                          name={selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)} 
                        />
                        <Bar 
                          dataKey={comparisonCity} 
                          fill="#FF8042" 
                          name={comparisonCity.charAt(0).toUpperCase() + comparisonCity.slice(1)} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Common Expenses in Australia</CardTitle>
                <CardDescription>Average prices for everyday items and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {commonExpenses.map((expense, index) => (
                    <div key={index} className="flex flex-col p-3 border rounded-lg">
                      <span className="text-sm font-medium">{expense.name}</span>
                      <span className="text-lg font-bold mt-1">{expense.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" /> Download Full Price List
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <CostOfLivingTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CostOfLiving;
