
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

// Import components
import CostOfLivingOverviewTab from '@/components/admin/cost-living/CostOfLivingOverviewTab';
import LocationsTable from '@/components/admin/cost-living/LocationsTable';
import EditLocationForm from '@/components/admin/cost-living/EditLocationForm';
import AddLocationForm from '@/components/admin/cost-living/AddLocationForm';
import CityComparisonTab from '@/components/admin/cost-living/CityComparisonTab';
import FilterControls from '@/components/admin/cost-living/FilterControls';

// Import data
import { costOfLivingData, compareData } from '@/components/admin/cost-living/costOfLivingData';

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
  useEffect(() => {
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
    <AdminLayout title="Cost of Living Management">
      <div className="space-y-6">
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
              <AddLocationForm
                newEntry={newEntry}
                setNewEntry={setNewEntry}
                handleAddEntry={handleAddEntry}
              />
            </DialogContent>
          </Dialog>
        </div>

        <FilterControls 
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          countries={countries}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="compare">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CostOfLivingOverviewTab 
              costOfLivingData={costOfLivingData}
              countries={countries}
              getTotalCost={getTotalCost}
            />
          </TabsContent>

          <TabsContent value="locations">
            <LocationsTable 
              displayData={displayData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              getTotalCost={getTotalCost}
            />
            {editingEntry && (
              <Dialog open={!!editingEntry} onOpenChange={(open) => !open && setEditingEntry(null)}>
                <DialogContent>
                  <EditLocationForm
                    editingEntry={editingEntry}
                    setEditingEntry={setEditingEntry}
                    handleSaveEdit={handleSaveEdit}
                  />
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          <TabsContent value="compare">
            <CityComparisonTab 
              costOfLivingData={costOfLivingData}
              compareData={compareData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default CostOfLivingManagement;
