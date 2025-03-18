
import { Home, Globe, Briefcase, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyTab } from './tabs/PropertyTab';
import { VisaTab } from './tabs/VisaTab';
import { JobsTab } from './tabs/JobsTab';
import { CostsTab } from './tabs/CostsTab';

const PreviewTabs = () => {
  const [activeTab, setActiveTab] = useState("property");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Tabs defaultValue="property" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="w-full justify-start mb-6 bg-gradient-to-r from-gray-50 to-white space-x-2 h-auto overflow-x-auto p-2 flex-wrap rounded-xl border border-gray-100">
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
        <PropertyTab />
      </TabsContent>

      <TabsContent value="visa" className="mt-2">
        <VisaTab />
      </TabsContent>
      
      <TabsContent value="jobs" className="mt-2">
        <JobsTab />
      </TabsContent>
      
      <TabsContent value="costs" className="mt-2">
        <CostsTab />
      </TabsContent>
    </Tabs>
  );
};

export default PreviewTabs;
