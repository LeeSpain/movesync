
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobListing, { Job } from './JobListing';
import { useToast } from '@/components/ui/use-toast';

interface JobListingsContainerProps {
  jobs: Job[];
  searchTerm: string;
  filters: {
    location: string;
    jobType: string;
    industry: string;
    experience: string;
    salaryRange: [number, number];
    categories: string[];
    skills: string[];
    postedWithin: string;
    remoteOnly: boolean;
  };
  activeView: string;
}

const JobListingsContainer = ({ jobs, searchTerm, filters, activeView }: JobListingsContainerProps) => {
  const { toast } = useToast();
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = filters.location === 'all' || job.location.includes(filters.location);
    const matchesType = filters.jobType === 'all' || job.type === filters.jobType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleApplyJob = (jobId: number) => {
    // Show toast notification
    toast({
      title: "Application Started",
      description: "Your job application has been initiated.",
    });
  };

  // Display content based on active tab
  if (activeView === "matches") {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">AI Matched Jobs ({filteredJobs.length})</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select defaultValue="matchScore">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matchScore">Match Score</SelectItem>
                <SelectItem value="datePosted">Date Posted</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredJobs.map(job => (
          <JobListing
            key={job.id}
            job={job}
            savedJobs={savedJobs}
            onSaveJob={handleSaveJob}
            onApplyJob={handleApplyJob}
          />
        ))}
      </div>
    );
  } else if (activeView === "all") {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">Browse All Available Jobs</h3>
        <p className="text-muted-foreground mt-1">Use the search and filters to find jobs that match your criteria</p>
      </div>
    );
  } else {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">Your Saved Jobs</h3>
        <p className="text-muted-foreground mt-1">You have {savedJobs.length} saved jobs</p>
      </div>
    );
  }
};

export default JobListingsContainer;
