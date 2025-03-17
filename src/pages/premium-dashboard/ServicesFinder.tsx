
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Globe, Star, ThumbsUp, ExternalLink, Plus, Mail, Clock, Info } from 'lucide-react';

// Sample services data
const servicesData = {
  healthcare: [
    {
      id: 1,
      name: "Sydney Central Medical Centre",
      type: "Medical Center",
      address: "242 Pitt Street, Sydney NSW 2000",
      phone: "+61 2 9123 4567",
      website: "sydneycentralmedical.com.au",
      email: "info@sydneycentral.com.au",
      rating: 4.8,
      reviews: 124,
      hours: "Monday-Friday: 8am-6pm, Saturday: 9am-1pm",
      description: "Full-service medical center offering general practice, specialists, and allied health services. Bulk billing available with Medicare card.",
      features: ["Bulk Billing", "Online Booking", "Walk-ins Welcome", "Multilingual Staff"],
      distance: "1.2 km"
    },
    {
      id: 2,
      name: "Medicare Service Centre",
      type: "Government Service",
      address: "56 York Street, Sydney NSW 2000",
      phone: "+61 2 9876 5432",
      website: "servicesaustralia.gov.au",
      rating: 4.2,
      reviews: 89,
      hours: "Monday-Friday: 9am-5pm",
      description: "Official Medicare service center for enrollments, claims, and inquiries. Bring your identification and visa documents to register for Medicare.",
      features: ["Medicare Registration", "Claims Processing", "Health Insurance Inquiries"],
      distance: "0.8 km"
    },
    {
      id: 3,
      name: "Australian Dental Clinic",
      type: "Dental Clinic",
      address: "78 Crown Street, Surry Hills NSW 2010",
      phone: "+61 2 8765 4321",
      website: "australiandental.com.au",
      email: "smile@australiandental.com.au",
      rating: 4.9,
      reviews: 156,
      hours: "Monday-Friday: 8am-7pm, Saturday: 9am-4pm",
      description: "Modern dental clinic offering general, cosmetic, and emergency dental care. Medicare Child Dental Benefits Schedule accepted.",
      features: ["Emergency Care", "Cosmetic Dentistry", "Online Booking", "Payment Plans"],
      distance: "2.1 km"
    }
  ],
  banking: [
    {
      id: 4,
      name: "Commonwealth Bank",
      type: "Bank Branch",
      address: "48 Martin Place, Sydney NSW 2000",
      phone: "+61 2 1234 5678",
      website: "commbank.com.au",
      rating: 4.5,
      reviews: 213,
      hours: "Monday-Friday: 9am-5pm, Thursday: 9am-7pm",
      description: "Full-service bank branch offering personal and business banking, foreign currency exchange, and financial advice for new residents.",
      features: ["Foreign Currency Exchange", "New Resident Services", "ATM Access", "Mobile Banking"],
      distance: "0.5 km"
    },
    {
      id: 5,
      name: "ANZ Bank",
      type: "Bank Branch",
      address: "242 Pitt Street, Sydney NSW 2000",
      phone: "+61 2 9876 1234",
      website: "anz.com.au",
      rating: 4.3,
      reviews: 187,
      hours: "Monday-Friday: 9:30am-4:30pm",
      description: "Full-service ANZ branch with dedicated new resident services. Offers account setup assistance and identification verification for newcomers.",
      features: ["New Resident Banking", "Foreign Currency Services", "Financial Planning"],
      distance: "1.0 km"
    }
  ],
  telecom: [
    {
      id: 6,
      name: "Telstra Store",
      type: "Telecommunications",
      address: "400 George Street, Sydney NSW 2000",
      phone: "+61 2 8765 9876",
      website: "telstra.com.au",
      rating: 4.1,
      reviews: 156,
      hours: "Monday-Friday: 9am-6pm, Saturday-Sunday: 10am-5pm",
      description: "Official Telstra store offering mobile plans, home internet, and connection services. Special plans available for new residents.",
      features: ["Mobile Plans", "NBN Connection", "International Calling Plans", "Tech Support"],
      distance: "0.7 km"
    },
    {
      id: 7,
      name: "Optus Shop",
      type: "Telecommunications",
      address: "252 Pitt Street, Sydney NSW 2000",
      phone: "+61 2 9876 2345",
      website: "optus.com.au",
      rating: 4.2,
      reviews: 143,
      hours: "Monday-Saturday: 9am-6pm, Sunday: 10am-4pm",
      description: "Official Optus store for mobile, internet, and home entertainment services. Offers prepaid and postpaid options suitable for newcomers.",
      features: ["Mobile Services", "Home Internet", "International Calls", "Device Sales"],
      distance: "1.1 km"
    }
  ],
  utilities: [
    {
      id: 8,
      name: "Origin Energy Service Center",
      type: "Utility Provider",
      address: "321 Kent Street, Sydney NSW 2000",
      phone: "+61 2 1234 9876",
      website: "originenergy.com.au",
      rating: 4.0,
      reviews: 98,
      hours: "Monday-Friday: 9am-5pm",
      description: "Customer service center for electricity and gas connections. New resident packages available with simplified documentation requirements.",
      features: ["Electricity Connection", "Gas Connection", "New Resident Services", "Online Account Management"],
      distance: "1.5 km"
    },
    {
      id: 9,
      name: "Sydney Water Customer Hub",
      type: "Utility Provider",
      address: "1 Smith Street, Parramatta NSW 2150",
      phone: "+61 2 9765 4321",
      website: "sydneywater.com.au",
      rating: 3.9,
      reviews: 76,
      hours: "Monday-Friday: 8:30am-5pm",
      description: "Customer service center for water connection and account services. Provides assistance with setting up new accounts for rental properties.",
      features: ["Water Connection", "Account Setup", "Payment Options", "Moving Home Services"],
      distance: "24 km"
    }
  ]
};

const ServicesFinder = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('healthcare');
  const [activeTab, setActiveTab] = useState('list');
  
  // Filter services based on search term
  const filteredServices = servicesData[activeCategory as keyof typeof servicesData].filter(service => {
    return service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           service.type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services Finder</h1>
          <p className="text-muted-foreground">Discover and connect with essential services for your new life in Australia</p>
        </div>
        
        {/* Search bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search for services..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Service categories and view toggle */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Tabs defaultValue="healthcare" value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList className="w-full sm:w-auto grid grid-cols-2 md:grid-cols-4 h-auto gap-2">
              <TabsTrigger value="healthcare" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 px-3">
                Healthcare
              </TabsTrigger>
              <TabsTrigger value="banking" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 px-3">
                Banking
              </TabsTrigger>
              <TabsTrigger value="telecom" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 px-3">
                Telecom
              </TabsTrigger>
              <TabsTrigger value="utilities" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 px-3">
                Utilities
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="w-full sm:w-auto grid grid-cols-2 h-auto">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Services listing */}
        <TabsContent value="list" className="m-0" hidden={activeTab !== 'list'}>
          <div className="space-y-4">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <Card key={service.id}>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="text-lg font-semibold">{service.name}</h3>
                            <Badge variant="outline" className="bg-slate-50 w-fit">
                              {service.type}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{service.address}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              <span>{service.phone}</span>
                            </div>
                            {service.website && (
                              <div className="flex items-center gap-1">
                                <Globe className="h-4 w-4" />
                                <span>{service.website}</span>
                              </div>
                            )}
                            {service.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                <span>{service.email}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">{service.rating}</span>
                              <span className="text-muted-foreground">({service.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{service.hours}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground">{service.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="bg-slate-50">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-row md:flex-col gap-2 items-start md:items-end justify-start md:justify-between">
                          <div className="text-right">
                            <Badge className="bg-blue-50 text-blue-800 hover:bg-blue-50">
                              {service.distance} away
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </Button>
                            <Button size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No services found matching your search. Try different keywords.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Map view placeholder */}
        <TabsContent value="map" className="m-0" hidden={activeTab !== 'map'}>
          <Card className="h-[500px] flex items-center justify-center">
            <div className="text-center p-6">
              <p className="text-muted-foreground mb-4">Map view is currently being updated with the latest service locations.</p>
              <Button variant="outline">Switch to List View</Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Service recommendation */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Can't find what you're looking for?</CardTitle>
            <CardDescription>Let our AI assistant help you find the perfect service for your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Input placeholder="Describe the service you need..." className="bg-white" />
              <Button className="whitespace-nowrap">Get Recommendations</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Service request feature */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Request to Add a Service</CardTitle>
            <CardDescription>Know a great service that's not listed? Help us expand our database</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Suggest a New Service
            </Button>
          </CardContent>
        </Card>
        
        {/* New resident tips */}
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New Resident Tips</CardTitle>
            <CardDescription>Essential services to set up when moving to Australia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Medicare</h3>
                </div>
                <p className="text-sm text-muted-foreground">Register for Medicare within your first few weeks if eligible. Bring your passport, visa, and proof of residence.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Tax File Number</h3>
                </div>
                <p className="text-sm text-muted-foreground">Apply for a TFN online through the Australian Taxation Office website as soon as you arrive.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Bank Account</h3>
                </div>
                <p className="text-sm text-muted-foreground">Open an Australian bank account immediately. Many banks offer accounts that can be set up before arrival.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ServicesFinder;
