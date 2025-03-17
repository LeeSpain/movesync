
import { useState } from 'react';
import { Save, Clock, Star, Building, MapPin, Briefcase, Banknote, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  match: number;
  postedDate: string;
  description: string;
  skills: string[];
}

interface JobListingProps {
  job: Job;
  savedJobs: number[];
  onSaveJob: (jobId: number) => void;
  onApplyJob: (jobId: number) => void;
}

const JobListing = ({ job, savedJobs, onSaveJob, onApplyJob }: JobListingProps) => {
  return (
    <Card key={job.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <Badge className={`${job.match >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {job.match}% Match
                </Badge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.postedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Banknote className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`description-${job.id}`} className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium text-movesync-blue hover:text-movesync-blue hover:no-underline">
                    View Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <p className="text-muted-foreground">{job.description}</p>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-slate-50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Why You're a Good Match</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <p className="text-sm">Your experience with {job.skills[0]} matches the job requirements.</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <p className="text-sm">Your profile indicates expertise in {job.skills[1]}.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="flex flex-row md:flex-col gap-2 justify-start md:justify-between items-start md:items-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onSaveJob(job.id)}
                className={savedJobs.includes(job.id) ? "bg-blue-50" : ""}
              >
                <Save className={`h-4 w-4 mr-2 ${savedJobs.includes(job.id) ? "fill-movesync-blue" : ""}`} />
                {savedJobs.includes(job.id) ? "Saved" : "Save"}
              </Button>
              <Button size="sm" onClick={() => onApplyJob(job.id)}>
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListing;
