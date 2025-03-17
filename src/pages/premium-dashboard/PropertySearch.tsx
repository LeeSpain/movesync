
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, MapPin, Building, Home as HomeIcon, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import PropertySearchTab from '@/components/premium-dashboard/PropertySearchTab';

// Sample property data
const sampleProperties = [
  { 
    id: 1, 
    title: "Modern 2BR Apartment",
    location: "Sydney CBD",
    price: "$650/week",
    match: 92,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop",
    type: "apartment",
    area: "sydney",
    bedrooms: 2,
    bathrooms: 1
  },
  { 
    id: 2, 
    title: "Spacious 3BR House",
    location: "Melbourne, Richmond",
    price: "$750/week",
    match: 88,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop",
    type: "house",
    area: "melbourne",
    bedrooms: 3,
    bathrooms: 2
  },
  { 
    id: 3, 
    title: "Studio with Harbour Views",
    location: "Sydney, Kirribilli",
    price: "$520/week",
    match: 85,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    type: "apartment",
    area: "sydney",
    bedrooms: 1,
    bathrooms: 1
  },
  { 
    id: 4, 
    title: "Family Home with Garden",
    location: "Brisbane, New Farm",
    price: "$680/week",
    match: 80,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
    type: "house",
    area: "brisbane",
    bedrooms: 4,
    bathrooms: 2
  },
  { 
    id: 5, 
    title: "Executive Apartment",
    location: "Perth CBD",
    price: "$590/week",
    match: 78,
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&auto=format&fit=crop",
    type: "apartment",
    area: "perth",
    bedrooms: 2,
    bathrooms: 2
  },
  { 
    id: 6, 
    title: "Beachside Condo",
    location: "Gold Coast, Surfers Paradise",
    price: "$620/week",
    match: 75,
    image: "https://images.unsplash.com/photo-1566734904496-9309bb1798ae?w=800&auto=format&fit=crop",
    type: "apartment",
    area: "goldcoast",
    bedrooms: 2,
    bathrooms: 1
  }
];

const PropertyCard = ({ property }: { property: any }) => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Property saved",
      description: `${property.title} has been saved to your favorites.`
    });
  };
  
  const handleContact = () => {
    toast({
      title: "Request sent",
      description: "Your viewing request has been sent to the property manager."
    });
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-2 right-2 bg-movesync-blue" 
          variant="secondary"
        >
          {property.match}% Match
        </Badge>
      </div>
      <CardContent className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{property.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="text-right font-medium">{property.price}</div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.bathrooms} Bathrooms</span>
          <span>{property.type === "apartment" ? "Apartment" : "House"}</span>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" className="flex-1" onClick={handleContact}>
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PropertySearch = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [areaFilter, setAreaFilter] = useState('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for properties matching "${searchTerm}"`
    });
  };
  
  // Filter properties based on current filters
  const filteredProperties = sampleProperties.filter(property => {
    const matchesArea = areaFilter === 'all' || property.area === areaFilter;
    const matchesType = propertyTypeFilter === 'all' || property.type === propertyTypeFilter;
    return matchesArea && matchesType;
  });

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Property Search</h1>
        <p className="text-muted-foreground">Find your ideal home in Australia with our personalized property matching system.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Search Properties</CardTitle>
            <CardDescription>Browse available properties or search for specific criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by location, property type, features..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit">
                Search
              </Button>
            </form>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div>
                <span className="text-sm font-medium mr-2">Area:</span>
                <Tabs value={areaFilter} onValueChange={setAreaFilter} className="inline-flex">
                  <TabsList>
                    <TabsTrigger value="all"><MapPin className="h-4 w-4 mr-1" />All</TabsTrigger>
                    <TabsTrigger value="sydney">Sydney</TabsTrigger>
                    <TabsTrigger value="melbourne">Melbourne</TabsTrigger>
                    <TabsTrigger value="brisbane">Brisbane</TabsTrigger>
                    <TabsTrigger value="perth">Perth</TabsTrigger>
                    <TabsTrigger value="goldcoast">Gold Coast</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div>
                <span className="text-sm font-medium mr-2">Property Type:</span>
                <Tabs value={propertyTypeFilter} onValueChange={setPropertyTypeFilter} className="inline-flex">
                  <TabsList>
                    <TabsTrigger value="all"><Building className="h-4 w-4 mr-1" />All</TabsTrigger>
                    <TabsTrigger value="apartment">Apartments</TabsTrigger>
                    <TabsTrigger value="house">Houses</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" /> More Filters
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Available Properties ({filteredProperties.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PropertySearch;
