
import { useState } from 'react';
import { Search, MapPin, Star, Clock, Phone, Globe, Filter, ChevronDown, XCircle, CheckCircle, Info, Map, Share, ExternalLink } from 'lucide-react';
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
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/components/ui/use-toast';

// Define service types
const serviceTypes = ['All Services', 'Banks', 'Schools', 'Healthcare', 'Utilities', 'Legal', 'Insurance'];

// Add service languages
const serviceLanguages = ['English', 'Mandarin', 'Spanish', 'Arabic', 'Hindi', 'French', 'German'];

// Add service features
const serviceFeatures = [
  { id: 'english', label: 'English speaking staff' },
  { id: 'online', label: 'Online services' },
  { id: 'weekend', label: 'Open on weekends' },
  { id: 'intl', label: 'International friendly' },
  { id: '24hours', label: '24-hour service' },
  { id: 'appointment', label: 'Appointment booking' },
  { id: 'translation', label: 'Translation services' },
  { id: 'accessible', label: 'Wheelchair accessible' },
];

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

// Add neighborhoods
const neighborhoods = [
  'Sydney CBD',
  'Bondi',
  'Surry Hills',
  'Newtown',
  'Parramatta',
  'Manly',
  'Chatswood',
  'North Sydney'
];

const ServicesFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Services');
  const [view, setView] = useState('list');
  const [selectedDistance, setSelectedDistance] = useState('5km');
  const [selectedRating, setSelectedRating] = useState('any');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedService, setSelectedService] = useState<any>(null);
  const { toast } = useToast();
  
  // Filter services based on search term and selected type
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All Services' || service.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSaveService = (service: any) => {
    toast({
      title: "Service saved",
      description: `${service.name} has been saved to your favorites.`,
    });
  };
  
  const handleShareService = (service: any) => {
    toast({
      title: "Link copied",
      description: `A link to ${service.name} has been copied to your clipboard.`,
    });
  };

  const handleShowDirections = (service: any) => {
    toast({
      title: "Directions",
      description: `Opening directions to ${service.name} in maps.`,
    });
  };
  
  const handleApplyFilters = () => {
    toast({
      title: "Filters applied",
      description: "Your service search filters have been applied.",
    });
  };

  const handleResetFilters = () => {
    setSelectedType('All Services');
    setSelectedDistance('5km');
    setSelectedRating('any');
    setSelectedFeatures([]);
    setSelectedNeighborhood('');
    setSearchTerm('');
    toast({
      title: "Filters reset",
      description: "All service search filters have been reset.",
    });
  };
  
  return (
    <DashboardLayout isPremium={true} userName="Sarah Johnson" progressPercentage={65}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Services Finder</h1>
            <p className="text-muted-foreground">Discover and connect with essential services in your new location</p>
          </div>
          
          <div className="flex gap-2">
            <Tabs value={view} onValueChange={setView} className="hidden md:block">
              <TabsList className="bg-muted">
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Services</SheetTitle>
                  <SheetDescription>
                    Refine your service search with these filters
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-5">
                  <div>
                    <Label className="text-sm font-medium">Service Type</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Neighborhood</Label>
                    <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select neighborhood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any neighborhood</SelectItem>
                        {neighborhoods.map((neighborhood) => (
                          <SelectItem key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Distance</Label>
                    <RadioGroup value={selectedDistance} onValueChange={setSelectedDistance} className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1km" id="r1" />
                        <Label htmlFor="r1">Within 1 km</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5km" id="r2" />
                        <Label htmlFor="r2">Within 5 km</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10km" id="r3" />
                        <Label htmlFor="r3">Within 10 km</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="25km" id="r4" />
                        <Label htmlFor="r4">Within 25 km</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Rating</Label>
                    <Select value={selectedRating} onValueChange={setSelectedRating}>
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
                    <Label className="text-sm font-medium block mb-3">Languages</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceLanguages.map(language => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox id={`lang-${language}`} />
                          <Label htmlFor={`lang-${language}`}>{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Features</Label>
                    <div className="space-y-3">
                      {serviceFeatures.map(feature => (
                        <div key={feature.id} className="flex items-center justify-between">
                          <Label htmlFor={feature.id}>{feature.label}</Label>
                          <Switch 
                            id={feature.id} 
                            checked={selectedFeatures.includes(feature.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFeatures([...selectedFeatures, feature.id]);
                              } else {
                                setSelectedFeatures(selectedFeatures.filter(id => id !== feature.id));
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:space-x-2">
                  <Button variant="outline" onClick={handleResetFilters}>Reset All</Button>
                  <SheetClose asChild>
                    <Button onClick={handleApplyFilters}>Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
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
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                onClick={() => setSearchTerm('')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
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
        
        {view === 'list' ? (
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
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button className="ml-auto" size="sm">
                          View Details
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-md">
                          <DrawerHeader>
                            <DrawerTitle>{service.name}</DrawerTitle>
                            <DrawerDescription>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{service.type}</Badge>
                                <span className="flex items-center">
                                  <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4 mr-1" /> 
                                  {service.rating} ({service.reviews} reviews)
                                </span>
                              </div>
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4 pb-0">
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="info">
                                <AccordionTrigger>Information</AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-3">
                                    <p>{service.description}</p>
                                    <div className="space-y-2">
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                                        <span>{service.address}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                                        <span>{service.hours}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                                        <span>{service.phone}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                                        <span>{service.website}</span>
                                      </div>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="features">
                                <AccordionTrigger>Features & Services</AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid grid-cols-2 gap-2">
                                    {service.features.map((feature, index) => (
                                      <div key={index} className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="newcomer">
                                <AccordionTrigger>Newcomer Tips</AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                      <Info className="h-4 w-4 text-blue-500 mt-1" />
                                      <p className="text-sm">Bring proof of identity and address when visiting for the first time.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Info className="h-4 w-4 text-blue-500 mt-1" />
                                      <p className="text-sm">Some staff members speak multiple languages - you can request a specific language speaker when booking.</p>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                          <DrawerFooter className="flex-row gap-2 justify-between">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleShowDirections(service)}>
                                <Map className="h-4 w-4 mr-1" /> Directions
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleShareService(service)}>
                                <Share className="h-4 w-4 mr-1" /> Share
                              </Button>
                            </div>
                            <DrawerClose asChild>
                              <Button size="sm">
                                <ExternalLink className="h-4 w-4 mr-1" /> Visit Website
                              </Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Map View</h3>
              <p className="text-muted-foreground mt-1">Map view is coming soon</p>
            </div>
          </div>
        )}
        
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
