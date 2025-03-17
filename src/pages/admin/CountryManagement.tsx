import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Globe, Flag, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/components/admin/AdminLayout';

// Sample country data
const sampleCountries = [
  {
    id: '1',
    name: 'Australia',
    code: 'AU',
    continent: 'Oceania',
    visaProcessTime: '2-3 months',
    languageRequirements: 'English proficiency test',
    active: true,
    properties: 3254,
    jobs: 1547,
    description: 'Australia offers excellent quality of life, diverse landscapes, and robust economy.',
  },
  {
    id: '2',
    name: 'Canada',
    code: 'CA',
    continent: 'North America',
    visaProcessTime: '3-6 months',
    languageRequirements: 'English or French proficiency test',
    active: true,
    properties: 2845,
    jobs: 2104,
    description: 'Canada is known for its welcoming immigration policies, excellent healthcare, and education systems.',
  },
  {
    id: '3',
    name: 'United Kingdom',
    code: 'GB',
    continent: 'Europe',
    visaProcessTime: '1-2 months',
    languageRequirements: 'English proficiency test',
    active: true,
    properties: 5126,
    jobs: 2376,
    description: 'The UK offers rich culture, historic sites, and diverse career opportunities in many industries.',
  },
  {
    id: '4',
    name: 'United States',
    code: 'US',
    continent: 'North America',
    visaProcessTime: '4-9 months',
    languageRequirements: 'Varies by visa type',
    active: true,
    properties: 7843,
    jobs: 5247,
    description: 'The US provides vast opportunities, world-class universities, and diverse communities.',
  },
  {
    id: '5',
    name: 'Germany',
    code: 'DE',
    continent: 'Europe',
    visaProcessTime: '1-3 months',
    languageRequirements: 'German proficiency for some visas',
    active: true,
    properties: 2134,
    jobs: 1985,
    description: 'Germany has a strong economy, excellent public transportation, and rich cultural heritage.',
  },
  {
    id: '6',
    name: 'New Zealand',
    code: 'NZ',
    continent: 'Oceania',
    visaProcessTime: '2-4 months',
    languageRequirements: 'English proficiency test',
    active: false,
    properties: 987,
    jobs: 456,
    description: 'New Zealand offers stunning natural beauty, relaxed lifestyle, and good work-life balance.',
  },
];

type Country = typeof sampleCountries[0];

const CountryManagement = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would be an API call
    setCountries(sampleCountries);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (country: Country) => {
    setSelectedCountry(country);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (country: Country) => {
    setSelectedCountry(country);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCountry) {
      setCountries(countries.filter(country => country.id !== selectedCountry.id));
      toast({
        title: "Country deleted",
        description: `${selectedCountry.name} has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const toggleCountryStatus = (countryId: string) => {
    setCountries(countries.map(country => 
      country.id === countryId 
        ? { ...country, active: !country.active } 
        : country
    ));
    
    const targetCountry = countries.find(country => country.id === countryId);
    const newStatus = targetCountry?.active ? 'deactivated' : 'activated';
    
    toast({
      title: `Country ${newStatus}`,
      description: `${targetCountry?.name} has been ${newStatus}.`,
    });
  };

  return (
    <AdminLayout title="Country Management">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Countries</CardTitle>
          <div className="flex space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search countries..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Country
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Add New Country</DialogTitle>
                  <DialogDescription>
                    Add a new country to the platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">
                      Country Code
                    </Label>
                    <Input id="code" className="col-span-3" placeholder="e.g. US, CA, AU" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="continent" className="text-right">
                      Continent
                    </Label>
                    <Input id="continent" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="visa-time" className="text-right">
                      Visa Process Time
                    </Label>
                    <Input id="visa-time" className="col-span-3" placeholder="e.g. 3-6 months" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="language" className="text-right">
                      Language Requirements
                    </Label>
                    <Input id="language" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea id="description" className="col-span-3" rows={3} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="active" className="text-right">
                      Active
                    </Label>
                    <div className="col-span-3 flex items-center space-x-2">
                      <Switch id="active" defaultChecked />
                      <Label htmlFor="active">Country is active</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Country</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Continent</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Visa Process</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCountries.map((country) => (
                <TableRow key={country.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4" />
                      {country.name}
                    </div>
                  </TableCell>
                  <TableCell>{country.code}</TableCell>
                  <TableCell>{country.continent}</TableCell>
                  <TableCell>{country.properties.toLocaleString()}</TableCell>
                  <TableCell>{country.jobs.toLocaleString()}</TableCell>
                  <TableCell>{country.visaProcessTime}</TableCell>
                  <TableCell>
                    <Badge variant={country.active ? 'default' : 'outline'}>
                      {country.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(country)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(country)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleCountryStatus(country.id)}
                      >
                        {country.active ? 
                          <X className="h-4 w-4" /> : 
                          <Check className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Country Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Country</DialogTitle>
            <DialogDescription>
              Make changes to country information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input 
                id="edit-name" 
                className="col-span-3" 
                defaultValue={selectedCountry?.name} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-code" className="text-right">
                Country Code
              </Label>
              <Input 
                id="edit-code" 
                className="col-span-3" 
                defaultValue={selectedCountry?.code} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-continent" className="text-right">
                Continent
              </Label>
              <Input 
                id="edit-continent" 
                className="col-span-3" 
                defaultValue={selectedCountry?.continent} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-visa-time" className="text-right">
                Visa Process Time
              </Label>
              <Input 
                id="edit-visa-time" 
                className="col-span-3" 
                defaultValue={selectedCountry?.visaProcessTime} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-language" className="text-right">
                Language Requirements
              </Label>
              <Input 
                id="edit-language" 
                className="col-span-3" 
                defaultValue={selectedCountry?.languageRequirements} 
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-description" className="text-right pt-2">
                Description
              </Label>
              <Textarea 
                id="edit-description" 
                className="col-span-3" 
                rows={3} 
                defaultValue={selectedCountry?.description} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-active" className="text-right">
                Active
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch 
                  id="edit-active" 
                  defaultChecked={selectedCountry?.active} 
                />
                <Label htmlFor="edit-active">Country is active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Country Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCountry?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CountryManagement;
