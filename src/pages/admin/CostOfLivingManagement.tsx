import React, { useState } from 'react';
import { CreditCard, LineChart, BarChart3, Globe, DollarSign, PlusCircle, Building, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Sample data for cost of living entries
const costOfLivingData = [
  { id: 1, city: 'Sydney', country: 'Australia', housing: 2500, utilities: 200, food: 600, transport: 150, healthcare: 100, entertainment: 300, lastUpdated: '2025-03-01' },
  { id: 2, city: 'Melbourne', country: 'Australia', housing: 2200, utilities: 180, food: 550, transport: 140, healthcare: 100, entertainment: 280, lastUpdated: '2025-03-05' },
  { id: 3, city: 'Brisbane', country: 'Australia', housing: 1800, utilities: 170, food: 520, transport: 130, healthcare: 90, entertainment: 250, lastUpdated: '2025-03-10' },
  { id: 4, city: 'London', country: 'United Kingdom', housing: 3000, utilities: 220, food: 700, transport: 170, healthcare: 50, entertainment: 350, lastUpdated: '2025-02-28' },
  { id: 5, city: 'New York', country: 'United States', housing: 3500, utilities: 250, food: 800, transport: 180, healthcare: 400, entertainment: 400, lastUpdated: '2025-03-02' },
  { id: 6, city: 'Toronto', country: 'Canada', housing: 2700, utilities: 210, food: 650, transport: 160, healthcare: 80, entertainment: 320, lastUpdated: '2025-03-07' },
];

// Sample data for comparison metrics
const compareData = [
  { category: 'Housing', Sydney: 2500, Melbourne: 2200, Brisbane: 1800, London: 3000, NewYork: 3500, Toronto: 2700 },
  { category: 'Utilities', Sydney: 200, Melbourne: 180, Brisbane: 170, London: 220, NewYork: 250, Toronto: 210 },
  { category: 'Food', Sydney: 600, Melbourne: 550, Brisbane: 520, London: 700, NewYork: 800, Toronto: 650 },
  { category: 'Transport', Sydney: 150, Melbourne: 140, Brisbane: 130, London: 170, NewYork: 180, Toronto: 160 },
  { category: 'Healthcare', Sydney: 100, Melbourne: 100, Brisbane: 90, London: 50, NewYork: 400, Toronto: 80 },
  { category: 'Entertainment', Sydney: 300, Melbourne: 280, Brisbane: 250, London: 350, NewYork: 400, Toronto: 320 },
];

const CostOfLivingManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayData, setDisplayData] = useState(costOfLivingData);
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [newEntry, setNewEntry] = useState({
    city: '',
    country: '',
    housing: 0,
    utilities: 0,
    food: 0,
    transport: 0,
    healthcare: 0,
    entertainment: 0
  });

  // Filter data based on country selection and search term
  React.useEffect(() => {
    let filtered = costOfLivingData;
    
    if (selectedCountry !== 'All Countries') {
      filtered = filtered.filter(item => item.country === selectedCountry);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setDisplayData(filtered);
  }, [selectedCountry, searchTerm]);

  // Calculate total monthly cost for each city
  const getTotalCost = (entry: any) => {
    return entry.housing + entry.utilities + entry.food + entry.transport + entry.healthcare + entry.entertainment;
  };

  // Handle editing an entry
  const handleEdit = (entry: any) => {
    setEditingEntry({ ...entry });
  };

  // Handle saving edited entry
  const handleSaveEdit = () => {
    // In a real app, this would update the database
    toast({
      title: "Entry Updated",
      description: `Cost of living data for ${editingEntry.city} has been updated.`,
    });
    setEditingEntry(null);
  };

  // Handle adding a new entry
  const handleAddEntry = () => {
    // In a real app, this would add to the database
    toast({
      title: "Entry Added",
      description: `Cost of living data for ${newEntry.city}, ${newEntry.country} has been added.`,
    });
    setNewEntry({
      city: '',
      country: '',
      housing: 0,
      utilities: 0,
      food: 0,
      transport: 0,
      healthcare: 0,
      entertainment: 0
    });
  };

  // Handle deleting an entry
  const handleDelete = (id: number) => {
    // In a real app, this would delete from the database
    toast({
      title: "Entry Deleted",
      description: "Cost of living data has been removed.",
    });
  };

  const countries = Array.from(new Set(costOfLivingData.map(item => item.country)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cost of Living Management</h1>
          <p className="text-muted-foreground">Manage and update cost of living data for all supported locations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Cost of Living Data</DialogTitle>
              <DialogDescription>
                Enter details for a new location's cost of living.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city">City</label>
                  <Input 
                    id="city" 
                    value={newEntry.city} 
                    onChange={(e) => setNewEntry({...newEntry, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country">Country</label>
                  <Input 
                    id="country" 
                    value={newEntry.country} 
                    onChange={(e) => setNewEntry({...newEntry, country: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="housing">Housing (Monthly)</label>
                  <Input 
                    id="housing" 
                    type="number" 
                    value={newEntry.housing.toString()} 
                    onChange={(e) => setNewEntry({...newEntry, housing: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="utilities">Utilities (Monthly)</label>
                  <Input 
                    id="utilities" 
                    type="number" 
                    value={newEntry.utilities.toString()} 
                    onChange={(e) => setNewEntry({...newEntry, utilities: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="food">Food (Monthly)</label>
                  <Input 
                    id="food" 
                    type="number" 
                    value={newEntry.food.toString()} 
                    onChange={(e) => setNewEntry({...newEntry, food: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="transport">Transport (Monthly)</label>
                  <Input 
                    id="transport" 
                    type="number" 
                    value={newEntry.transport.toString()} 
                    onChange={(e) => setNewEntry({...newEntry, transport: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="healthcare">Healthcare (Monthly)</label>
                  <Input 
                    id="healthcare" 
                    type="number" 
                    value={newEntry.healthcare.toString()} 
                    onChange={(e) => setNewEntry({...newEntry, healthcare: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="entertainment">Entertainment (Monthly)</label>
                  <Input 
                    id="entertainment" 
                    type="number" 
                    value={newEntry.entertainment.toString()} 
                    onChange={(e) => setNewEntry({...newEntry, entertainment: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddEntry}>Add Location</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4 items-center mb-6">
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Countries">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Search by city or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="compare">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{costOfLivingData.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across {countries.length} countries
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Most Expensive City</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {costOfLivingData.sort((a, b) => getTotalCost(b) - getTotalCost(a))[0].city}
                </div>
                <p className="text-xs text-muted-foreground">
                  ${getTotalCost(costOfLivingData.sort((a, b) => getTotalCost(b) - getTotalCost(a))[0]).toLocaleString()} monthly total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Most Affordable City</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {costOfLivingData.sort((a, b) => getTotalCost(a) - getTotalCost(b))[0].city}
                </div>
                <p className="text-xs text-muted-foreground">
                  ${getTotalCost(costOfLivingData.sort((a, b) => getTotalCost(a) - getTotalCost(b))[0]).toLocaleString()} monthly total
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cost of Living Breakdown</CardTitle>
                <CardDescription>Average monthly expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="mx-auto h-12 w-12 opacity-50" />
                    <p>Interactive chart would be displayed here</p>
                    <p className="text-sm">Showing average costs across all cities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>Cost of Living Data by Location</CardTitle>
              <CardDescription>
                Manage all location data and make updates when needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>City</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Housing</TableHead>
                    <TableHead>Utilities</TableHead>
                    <TableHead>Food</TableHead>
                    <TableHead>Transport</TableHead>
                    <TableHead>Healthcare</TableHead>
                    <TableHead>Entertainment</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.city}</TableCell>
                      <TableCell>{entry.country}</TableCell>
                      <TableCell>${entry.housing}</TableCell>
                      <TableCell>${entry.utilities}</TableCell>
                      <TableCell>${entry.food}</TableCell>
                      <TableCell>${entry.transport}</TableCell>
                      <TableCell>${entry.healthcare}</TableCell>
                      <TableCell>${entry.entertainment}</TableCell>
                      <TableCell className="font-bold">${getTotalCost(entry)}</TableCell>
                      <TableCell>{entry.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => handleEdit(entry)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Cost of Living Data</DialogTitle>
                                <DialogDescription>
                                  Update the cost of living information for {entry.city}, {entry.country}.
                                </DialogDescription>
                              </DialogHeader>
                              {editingEntry && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label htmlFor="edit-city">City</label>
                                      <Input 
                                        id="edit-city" 
                                        value={editingEntry.city} 
                                        onChange={(e) => setEditingEntry({...editingEntry, city: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label htmlFor="edit-country">Country</label>
                                      <Input 
                                        id="edit-country" 
                                        value={editingEntry.country} 
                                        onChange={(e) => setEditingEntry({...editingEntry, country: e.target.value})}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label htmlFor="edit-housing">Housing (Monthly)</label>
                                      <Input 
                                        id="edit-housing" 
                                        type="number" 
                                        value={editingEntry.housing.toString()} 
                                        onChange={(e) => setEditingEntry({...editingEntry, housing: Number(e.target.value)})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label htmlFor="edit-utilities">Utilities (Monthly)</label>
                                      <Input 
                                        id="edit-utilities" 
                                        type="number" 
                                        value={editingEntry.utilities.toString()} 
                                        onChange={(e) => setEditingEntry({...editingEntry, utilities: Number(e.target.value)})}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label htmlFor="edit-food">Food (Monthly)</label>
                                      <Input 
                                        id="edit-food" 
                                        type="number" 
                                        value={editingEntry.food.toString()} 
                                        onChange={(e) => setEditingEntry({...editingEntry, food: Number(e.target.value)})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label htmlFor="edit-transport">Transport (Monthly)</label>
                                      <Input 
                                        id="edit-transport" 
                                        type="number" 
                                        value={editingEntry.transport.toString()} 
                                        onChange={(e) => setEditingEntry({...editingEntry, transport: Number(e.target.value)})}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label htmlFor="edit-healthcare">Healthcare (Monthly)</label>
                                      <Input 
                                        id="edit-healthcare" 
                                        type="number" 
                                        value={editingEntry.healthcare.toString()} 
                                        onChange={(e) => setEditingEntry({...editingEntry, healthcare: Number(e.target.value)})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label htmlFor="edit-entertainment">Entertainment (Monthly)</label>
                                      <Input 
                                        id="edit-entertainment" 
                                        type="number" 
                                        value={editingEntry.entertainment.toString()} 
                                        onChange={(e) => setEditingEntry({...editingEntry, entertainment: Number(e.target.value)})}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button type="submit" onClick={handleSaveEdit}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDelete(entry.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compare">
          <Card>
            <CardHeader>
              <CardTitle>City-to-City Comparison</CardTitle>
              <CardDescription>Compare cost of living between different locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center space-x-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Primary City</label>
                  <Select defaultValue="Sydney">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {costOfLivingData.map((entry) => (
                        <SelectItem key={entry.id} value={entry.city}>{entry.city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Compare With</label>
                  <Select defaultValue="Melbourne">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {costOfLivingData.map((entry) => (
                        <SelectItem key={entry.id} value={entry.city}>{entry.city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="mt-6">Compare</Button>
              </div>
              
              <div className="relative">
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="mx-auto h-12 w-12 opacity-50" />
                    <p>Interactive comparison chart would be displayed here</p>
                    <p className="text-sm">Showing differences between selected cities</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Category-by-Category Comparison</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expense Category</TableHead>
                      <TableHead>Sydney</TableHead>
                      <TableHead>Melbourne</TableHead>
                      <TableHead>Difference</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {compareData.map((item, index) => {
                      const diff = item.Sydney - item.Melbourne;
                      const percentage = ((diff / item.Melbourne) * 100).toFixed(1);
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.category}</TableCell>
                          <TableCell>${item.Sydney}</TableCell>
                          <TableCell>${item.Melbourne}</TableCell>
                          <TableCell className={diff > 0 ? 'text-red-500' : 'text-green-500'}>
                            {diff > 0 ? `+$${diff}` : `-$${Math.abs(diff)}`}
                          </TableCell>
                          <TableCell>
                            <Badge variant={diff > 0 ? 'destructive' : 'secondary'} className={diff > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                              {diff > 0 ? `+${percentage}%` : `${percentage}%`}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="font-bold">
                      <TableCell>Total Monthly Cost</TableCell>
                      <TableCell>${compareData.reduce((acc, curr) => acc + curr.Sydney, 0)}</TableCell>
                      <TableCell>${compareData.reduce((acc, curr) => acc + curr.Melbourne, 0)}</TableCell>
                      <TableCell className={compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) > 0 ? 'text-red-500' : 'text-green-500'}>
                        {compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) > 0 
                          ? `+$${compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0)}` 
                          : `-$${Math.abs(compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0))}`}
                      </TableCell>
                      <TableCell>
                        <Badge variant={compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) > 0 ? 'destructive' : 'secondary'} 
                          className={compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          {((compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0)) / compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) * 100).toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostOfLivingManagement;
