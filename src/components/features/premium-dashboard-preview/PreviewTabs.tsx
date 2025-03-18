
import { Home, Globe, Briefcase, CreditCard, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const PreviewTabs = () => {
  const [activeTab, setActiveTab] = useState("property");
  
  const propertyImage = "https://images.unsplash.com/photo-1588012886077-cfe4507a3a2d?auto=format&fit=crop&w=400&h=225&q=75";

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <Tabs defaultValue="property" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="w-full justify-start mb-6 bg-gradient-to-r from-gray-50 to-white space-x-2 h-auto overflow-x-auto p-2 flex-wrap rounded-xl border border-gray-100 shadow-sm">
        <TabsTrigger 
          value="property" 
          className="data-[state=active]:bg-movesync-blue data-[state=active]:text-white rounded-lg px-4 py-2 transition-all duration-200"
        >
          <Home className="h-4 w-4 mr-2" /> Property Search
        </TabsTrigger>
        <TabsTrigger 
          value="visa" 
          className="data-[state=active]:bg-movesync-blue data-[state=active]:text-white rounded-lg px-4 py-2 transition-all duration-200"
        >
          <Globe className="h-4 w-4 mr-2" /> Visa Status
        </TabsTrigger>
        <TabsTrigger 
          value="jobs" 
          className="data-[state=active]:bg-movesync-blue data-[state=active]:text-white rounded-lg px-4 py-2 transition-all duration-200"
        >
          <Briefcase className="h-4 w-4 mr-2" /> Job Opportunities
        </TabsTrigger>
        <TabsTrigger 
          value="costs" 
          className="data-[state=active]:bg-movesync-blue data-[state=active]:text-white rounded-lg px-4 py-2 transition-all duration-200"
        >
          <CreditCard className="h-4 w-4 mr-2" /> Cost of Living
        </TabsTrigger>
      </TabsList>

      <TabsContent value="property">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {["Sydney Waterfront Apartment", "Melbourne City Loft", "Brisbane Family Home"].map((title, index) => (
            <Card key={index} className="overflow-hidden transform hover:scale-105 transition-transform duration-200 shadow-lg">
              <div className="h-48 bg-cover bg-center bg-gray-100 relative">
                <img 
                  src={propertyImage}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-movesync-blue/90 backdrop-blur-sm">
                    {90 - index * 5}% Match
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-2">{title}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-movesync-gray-dark">{["Bondi", "Southbank", "New Farm"][index]}</span>
                  <span className="font-medium text-movesync-blue">${(500 + index * 50).toLocaleString()}/week</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </TabsContent>

      {/* Content for Visa Status Tab */}
      <TabsContent value="visa" className="mt-2">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
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
        </motion.div>
      </TabsContent>
      
      {/* Content for Job Opportunities Tab */}
      <TabsContent value="jobs" className="mt-2">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
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
        </motion.div>
      </TabsContent>
      
      {/* Content for Cost of Living Tab */}
      <TabsContent value="costs" className="mt-2">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
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
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default PreviewTabs;
