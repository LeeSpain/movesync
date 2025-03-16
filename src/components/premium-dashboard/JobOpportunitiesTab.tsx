
import { BarChart3, CreditCard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  match: number;
  salary: string;
};

type JobOpportunitiesTabProps = {
  jobs: Job[];
};

const JobOpportunitiesTab = ({ jobs }: JobOpportunitiesTabProps) => {
  return (
    <div className="mt-0 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">AI-Matched Job Opportunities</h3>
          <p className="text-movesync-gray">Based on your skills and experience</p>
        </div>
        <Button>
          <Search className="h-4 w-4 mr-2" /> Refine Search
        </Button>
      </div>
      
      <div className="space-y-4">
        {jobs.map(job => (
          <Card key={job.id}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-lg">{job.title}</h4>
                    <Badge className="bg-green-100 text-green-800">{job.match}% Match</Badge>
                  </div>
                  <p className="text-movesync-gray-dark">{job.company} • {job.location}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-movesync-gray">
                      <CreditCard className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1 text-movesync-gray">
                      <BarChart3 className="h-4 w-4" />
                      <span>High Demand</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">Details</Button>
                  <Button>Apply Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-movesync-blue-light/10 border-movesync-blue/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h4 className="font-semibold">Enhance Your Job Search</h4>
              <p className="text-movesync-gray-dark">Let our AI improve your resume and prepare you for interviews</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Upload Resume</Button>
              <Button>Get AI Coaching</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobOpportunitiesTab;
