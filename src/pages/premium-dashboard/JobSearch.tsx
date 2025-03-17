
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

// Import refactored components
import JobSearchFilters, { AdvancedFiltersSheet } from '@/components/job-search/JobSearchFilters';
import JobListingsContainer from '@/components/job-search/JobListingsContainer';
import JobSearchTips from '@/components/job-search/JobSearchTips';

// Import job data
import { jobListings, jobCategories, skillOptions } from '@/data/jobData';

const JobSearch = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: 'all',
    jobType: 'all',
    industry: 'all',
    experience: 'all',
    salaryRange: [0, 200000] as [number, number],
    categories: [] as string[],
    skills: [] as string[],
    postedWithin: 'anytime',
    remoteOnly: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('matches');
  
  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Search</h1>
            <p className="text-muted-foreground">Find your ideal job opportunity in Australia</p>
          </div>
          <div className="flex gap-2">
            <AdvancedFiltersSheet 
              filters={filters} 
              setFilters={setFilters} 
              jobCategories={jobCategories} 
              skillOptions={skillOptions} 
            />
            
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Sliders className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>
        
        {/* Search and filters */}
        <JobSearchFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          jobCategories={jobCategories}
          skillOptions={skillOptions}
        />
        
        {/* Job listings tabs */}
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="bg-transparent border-b w-full justify-start rounded-none p-0">
            <TabsTrigger value="matches" className="rounded-t-lg data-[state=active]:bg-background border data-[state=active]:border-b-transparent data-[state=inactive]:border-transparent">
              AI Matched Jobs
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-t-lg data-[state=active]:bg-background border data-[state=active]:border-b-transparent data-[state=inactive]:border-transparent">
              All Jobs
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-t-lg data-[state=active]:bg-background border data-[state=active]:border-b-transparent data-[state=inactive]:border-transparent">
              Saved Jobs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="matches" className="pt-6">
            <JobListingsContainer 
              jobs={jobListings}
              searchTerm={searchTerm}
              filters={filters}
              activeView={activeView}
            />
          </TabsContent>
          
          <TabsContent value="all" className="pt-6">
            <JobListingsContainer 
              jobs={jobListings}
              searchTerm={searchTerm}
              filters={filters}
              activeView={activeView}
            />
          </TabsContent>
          
          <TabsContent value="saved" className="pt-6">
            <JobListingsContainer 
              jobs={jobListings}
              searchTerm={searchTerm}
              filters={filters}
              activeView={activeView}
            />
          </TabsContent>
        </Tabs>
        
        {/* Job search tips */}
        <JobSearchTips />
      </div>
    </DashboardLayout>
  );
};

export default JobSearch;
