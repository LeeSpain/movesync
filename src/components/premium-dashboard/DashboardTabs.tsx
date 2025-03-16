
import { Home, Bot, Map, CreditCard, Briefcase, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertySearchTab from './PropertySearchTab';
import VisaStatusTab from './VisaStatusTab';
import JobOpportunitiesTab from './JobOpportunitiesTab';
import CostOfLivingTab from './CostOfLivingTab';

type Property = { 
  id: number; 
  title: string;
  location: string;
  price: string;
  match: number;
  image: string;
};

type VisaStep = {
  id: number;
  title: string;
  completed: boolean;
  inProgress?: boolean;
  date: string;
};

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  match: number;
  salary: string;
};

type DashboardTabsProps = {
  properties: Property[];
  visaSteps: VisaStep[];
  jobs: Job[];
  onTabChange: (tab: string) => void;
};

const DashboardTabs = ({ properties, visaSteps, jobs, onTabChange }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="property" className="w-full">
      <TabsList className="w-full justify-start mb-4 bg-transparent space-x-2 h-auto overflow-x-auto p-0 flex-wrap">
        <TabsTrigger 
          value="property" 
          className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
          onClick={() => onTabChange('property')}
        >
          <Home className="h-4 w-4 mr-2" /> Property Search
        </TabsTrigger>
        <TabsTrigger 
          value="visa" 
          className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
          onClick={() => onTabChange('visa')}
        >
          <Globe className="h-4 w-4 mr-2" /> Visa Status
        </TabsTrigger>
        <TabsTrigger 
          value="jobs" 
          className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
          onClick={() => onTabChange('jobs')}
        >
          <Briefcase className="h-4 w-4 mr-2" /> Job Opportunities
        </TabsTrigger>
        <TabsTrigger 
          value="costs" 
          className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
          onClick={() => onTabChange('costs')}
        >
          <CreditCard className="h-4 w-4 mr-2" /> Cost of Living
        </TabsTrigger>
      </TabsList>
      
      {/* Property Search Tab */}
      <TabsContent value="property">
        <PropertySearchTab properties={properties} />
      </TabsContent>
      
      {/* Visa Status Tab */}
      <TabsContent value="visa">
        <VisaStatusTab visaSteps={visaSteps} />
      </TabsContent>
      
      {/* Job Opportunities Tab */}
      <TabsContent value="jobs">
        <JobOpportunitiesTab jobs={jobs} />
      </TabsContent>
      
      {/* Cost of Living Tab */}
      <TabsContent value="costs">
        <CostOfLivingTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
