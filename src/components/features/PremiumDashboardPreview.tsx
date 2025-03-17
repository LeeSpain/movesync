
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Home, Bot, CreditCard, Briefcase, Globe, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PremiumDashboardPreview = ({ isIntersecting }: { isIntersecting: boolean }) => {
  const [activeTab, setActiveTab] = useState("property");
  const navigate = useNavigate();
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div 
      className={`mt-12 transition-all duration-700 delay-300 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-movesync-blue/10 to-purple-500/10 p-4 border-b border-movesync-blue/10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Premium Dashboard Preview</h3>
                <p className="text-movesync-gray text-sm">All the tools you need for a seamless Australian relocation</p>
              </div>
              <Button size="sm" onClick={() => navigate('/checkout')}>
                Upgrade to Premium
              </Button>
            </div>
          </div>
          
          <CardContent className="p-6">
            <Tabs defaultValue="property" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="w-full justify-start mb-4 bg-transparent space-x-2 h-auto overflow-x-auto p-0 flex-wrap">
                <TabsTrigger 
                  value="property" 
                  className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
                >
                  <Home className="h-4 w-4 mr-2" /> Property Search
                </TabsTrigger>
                <TabsTrigger 
                  value="visa" 
                  className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
                >
                  <Globe className="h-4 w-4 mr-2" /> Visa Status
                </TabsTrigger>
                <TabsTrigger 
                  value="jobs" 
                  className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
                >
                  <Briefcase className="h-4 w-4 mr-2" /> Job Opportunities
                </TabsTrigger>
                <TabsTrigger 
                  value="costs" 
                  className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
                >
                  <CreditCard className="h-4 w-4 mr-2" /> Cost of Living
                </TabsTrigger>
              </TabsList>
              
              {/* Content for Property Search Tab */}
              <TabsContent value="property" className="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Property Cards */}
                  {["Sydney Waterfront Apartment", "Melbourne City Loft", "Brisbane Family Home"].map((title, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div 
                        className="h-40 bg-cover bg-center"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1588012886077-cfe4507a3a2d?auto=format&fit=crop&q=80&w=400&h=225)` }}
                      >
                        <div className="p-2">
                          <Badge className="bg-movesync-blue">
                            {90 - index * 5}% Match
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-semibold">{title}</h4>
                        <div className="flex justify-between items-center mt-1 mb-3">
                          <span className="text-movesync-gray-dark text-sm">{["Bondi", "Southbank", "New Farm"][index]}</span>
                          <span className="font-medium text-sm">${(500 + index * 50).toLocaleString()}/week</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Content for Visa Status Tab */}
              <TabsContent value="visa" className="mt-2">
                <Card className="bg-gray-50 border border-gray-100">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Skilled Worker Visa - Application Timeline</h4>
                    <div className="space-y-4">
                      {["Application Submitted", "Documents Verified", "Background Check", "Interview Scheduled", "Final Decision"].map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mr-3 flex flex-col items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              index < 2 ? 'bg-green-500 text-white' : 
                              index === 2 ? 'bg-amber-500 text-white' : 
                              'bg-gray-200'
                            }`}>
                              {index < 2 ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            {index < 4 && (
                              <div className={`w-0.5 h-8 ${
                                index < 2 ? 'bg-green-500' : 'bg-gray-200'
                              }`}></div>
                            )}
                          </div>
                          <div>
                            <p className={`font-medium ${
                              index < 2 ? 'text-green-600' : 
                              index === 2 ? 'text-amber-600' : 
                              'text-movesync-gray'
                            }`}>
                              {step}
                            </p>
                            <p className="text-sm text-movesync-gray">
                              {index < 2 ? 'Completed' : index === 2 ? 'In Progress' : 'Pending'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Content for Job Opportunities Tab */}
              <TabsContent value="jobs" className="mt-2">
                <div className="space-y-3">
                  {["Senior Software Engineer", "Marketing Manager", "Financial Analyst"].map((title, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{title}</h4>
                              <Badge className="bg-green-100 text-green-800">{95 - index * 5}% Match</Badge>
                            </div>
                            <p className="text-movesync-gray-dark text-sm">
                              {["TechSolutions Australia", "Global Marketing Co.", "Finance Partners"][index]} • 
                              {["Sydney CBD", "Melbourne", "Brisbane"][index]}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">$${120 - index * 10}k-${160 - index * 10}k</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Content for Cost of Living Tab */}
              <TabsContent value="costs" className="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Monthly Expenses Comparison</h4>
                      <div className="space-y-2">
                        {["Housing", "Transportation", "Food & Groceries", "Utilities"].map((category, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-movesync-gray-dark">{category}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 line-through">${(500 + index * 200).toLocaleString()}</span>
                              <span className="font-medium">${(400 + index * 150).toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">City Cost Index</h4>
                      <div className="space-y-2">
                        {["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"].map((city, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-24">{city}</span>
                            <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden">
                              <div 
                                className="bg-movesync-blue h-full rounded-full" 
                                style={{ width: `${100 - index * 8}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{100 - index * 8}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-movesync-gray-dark text-sm italic">
                *Preview of the premium dashboard features. Upgrade for full access and personalized assistance.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate('/premium-dashboard')} className="flex items-center">
                Explore Full Features <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumDashboardPreview;
