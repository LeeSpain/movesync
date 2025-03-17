
import { useState } from 'react';
import { Search, MapPin, Star, Clock, Phone, Globe, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Define service types
const serviceTypes = ['All Services', 'Banks', 'Schools', 'Healthcare', 'Utilities', 'Legal', 'Insurance'];

// Sample service data
const services = [
  {
    id: 1,
    name: 'Australia National Bank',
    type: 'Banks',
    address: '123 Financial St, Sydney',
    phone: '+61 2 1234 5678',
    website: 'www.anb.com.au',
    rating: 4.5,
    reviews: 124,
    hours: 'Mon-Fri: 9am-5pm',
    description: 'Full-service bank providing accounts, loans, and international banking services for expatriates.',
    features: ['Expat accounts', 'International transfers', 'Multi-currency', 'Mobile banking'],
    distance: '1.2 km'
  },
  {
    id: 2,
    name: 'Melbourne Medical Center',
    type: 'Healthcare',
    address: '456 Health Ave, Melbourne',
    phone: '+61 3 8765 4321',
    website: 'www.melbmedical.com.au',
    rating: 4.8,
    reviews: 89,
    hours: 'Mon-Sun: 8am-8pm',
    description: 'Comprehensive medical center with English-speaking doctors specializing in expatriate healthcare needs.',
    features: ['English-speaking staff', 'International insurance accepted', 'Online appointments', '24/7 emergency'],
    distance: '0.8 km'
  },
  {
    id: 3,
    name: 'Sydney International School',
    type: 'Schools',
    address: '789 Education Rd, Sydney',
    phone: '+61 2 9876 5432',
    website: 'www.sydneyintschool.edu.au',
    rating: 4.7,
    reviews: 56,
    hours: 'Mon-Fri: 8am-4pm',
    description: 'International school offering IB curriculum for students aged 5-18 with multilingual education options.',
    features: ['IB curriculum', 'Multilingual', 'After-school programs', 'University counseling'],
    distance: '3.4 km'
  },
  {
    id: 4,
    name: 'Expat Legal Services',
    type: 'Legal',
    address: '101 Justice Blvd, Brisbane',
    phone: '+61 7 3456 7890',
    website: 'www.expatlegal.com.au',
    rating: 4.6,
    reviews: 38,
    hours: 'Mon-Fri: 9am-6pm',
    description: 'Specialized legal services for expatriates including visa applications, property law, and employment contracts.',
    features: ['Visa specialists', 'Property law', 'Employment contracts', 'Multiple languages'],
    distance: '2.1 km'
  },
];

const ServicesFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Services');
  
  // Filter services based on search term and selected type
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All Services' || service.type === selectedType;
    return matchesSearch && matchesType;
  });
  
  return (
    <DashboardLayout isPremium={true} userName="Sarah Johnson" progressPercentage={65}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Services Finder</h1>
            <p className="text-muted-foreground">Discover and connect with essential services in your new location</p>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Services</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Distance</Label>
                    <Select defaultValue="5km">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1km">Within 1 km</SelectItem>
                        <SelectItem value="5km">Within 5 km</SelectItem>
                        <SelectItem value="10km">Within 10 km</SelectItem>
                        <SelectItem value="25km">Within 25 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Rating</Label>
                    <Select defaultValue="4+">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any rating</SelectItem>
                        <SelectItem value="3+">3+ stars</SelectItem>
                        <SelectItem value="4+">4+ stars</SelectItem>
                        <SelectItem value="4.5+">4.5+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Features</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="english-speaking">English speaking staff</Label>
                        <Switch id="english-speaking" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="online-service">Online services</Label>
                        <Switch id="online-service" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="weekend">Open on weekends</Label>
                        <Switch id="weekend" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="intl-friendly">International friendly</Label>
                        <Switch id="intl-friendly" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search for services..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="Service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Service Categories</SelectLabel>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {filteredServices.map((service) => (
            <Card key={service.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Badge variant="outline">{service.type}</Badge>
                      <span className="flex items-center text-sm">
                        <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4 mr-1" /> 
                        {service.rating} ({service.reviews} reviews)
                      </span>
                    </CardDescription>
                  </div>
                  <div className="bg-muted px-2 py-1 rounded text-sm font-medium">
                    {service.distance}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">{service.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">{service.hours}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex flex-wrap gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span className="hidden sm:inline">{service.phone}</span>
                    <span className="sm:hidden">Call</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{service.website}</span>
                    <span className="sm:hidden">Website</span>
                  </Button>
                  <Button className="ml-auto" size="sm">
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No services found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ServicesFinder;
