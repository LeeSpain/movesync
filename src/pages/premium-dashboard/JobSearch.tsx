
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Briefcase, Building, MapPin, Sliders, Filter, Save, Clock, Star } from 'lucide-react';

// Sample job data
const jobListings = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechSydney",
    location: "Sydney CBD",
    salary: "$120K-$150K AUD",
    type: "Full-time",
    match: 95,
    postedDate: "2 days ago",
    description: "Join our team to build cutting-edge applications using React, Node.js, and AWS infrastructure. Looking for someone with 5+ years of experience in web development.",
    skills: ["React", "Node.js", "AWS", "TypeScript", "GraphQL"]
  },
  {
    id: 2,
    title: "UX Designer",
    company: "CreativeOz",
    location: "Melbourne",
    salary: "$90K-$110K AUD",
    type: "Full-time",
    match: 90,
    postedDate: "3 days ago",
    description: "Help us create beautiful, intuitive interfaces for our clients across various industries. Must have a strong portfolio and experience with Figma and Adobe Creative Suite.",
    skills: ["UI/UX", "Figma", "Adobe XD", "Prototyping", "User Research"]
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "FinTech Australia",
    location: "Brisbane",
    salary: "$85K-$105K AUD",
    type: "Full-time",
    match: 88,
    postedDate: "1 week ago",
    description: "Analyze financial data and create actionable insights for our clients. Requires strong SQL skills and experience with data visualization tools.",
    skills: ["SQL", "Power BI", "Python", "Data Visualization", "Excel"]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Sydney, Remote",
    salary: "$110K-$140K AUD",
    type: "Full-time",
    match: 85,
    postedDate: "5 days ago",
    description: "Manage our cloud infrastructure and CI/CD pipelines. Looking for experience with Kubernetes, Docker, and major cloud providers.",
    skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Infrastructure as Code"]
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "Aussie Brands",
    location: "Perth",
    salary: "$75K-$95K AUD",
    type: "Full-time",
    match: 82,
    postedDate: "3 days ago",
    description: "Develop and implement marketing strategies for our consumer products division. Experience with digital marketing and campaign management required.",
    skills: ["Digital Marketing", "Campaign Management", "SEO", "Content Strategy", "Analytics"]
  },
  {
    id: 6,
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Remote (Australia)",
    salary: "$85K-$110K AUD",
    type: "Full-time",
    match: 92,
    postedDate: "Just posted",
    description: "Create responsive, accessible web applications with modern JavaScript frameworks. Looking for someone with strong CSS skills and experience with React.",
    skills: ["React", "JavaScript", "HTML/CSS", "Responsive Design", "Web Accessibility"]
  }
];

const JobSearch = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: 'all',
    jobType: 'all',
    industry: 'all',
    experience: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter jobs based on search term and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = filters.location === 'all' || job.location.includes(filters.location);
    const matchesType = filters.jobType === 'all' || job.type === filters.jobType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Search</h1>
            <p className="text-muted-foreground">Find your ideal job opportunity in Australia</p>
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Sliders className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        
        {/* Search and filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search jobs by title, company, or keyword..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {showFilters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="Sydney">Sydney</SelectItem>
                        <SelectItem value="Melbourne">Melbourne</SelectItem>
                        <SelectItem value="Brisbane">Brisbane</SelectItem>
                        <SelectItem value="Perth">Perth</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Job Type</label>
                    <Select value={filters.jobType} onValueChange={(value) => setFilters({...filters, jobType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Industry</label>
                    <Select value={filters.industry} onValueChange={(value) => setFilters({...filters, industry: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All industries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Experience Level</label>
                    <Select value={filters.experience} onValueChange={(value) => setFilters({...filters, experience: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Entry">Entry Level</SelectItem>
                        <SelectItem value="Mid">Mid Level</SelectItem>
                        <SelectItem value="Senior">Senior Level</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Job listings */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Available Jobs ({filteredJobs.length})</h2>
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
                      </div>
                      <p className="text-muted-foreground">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 justify-start md:justify-between items-start md:items-end">
                      <div className="text-right">
                        <p className="font-semibold">{job.salary}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Job search tips */}
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Job Search Tips</CardTitle>
            <CardDescription>AI-powered recommendations to help your application stand out</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Resume Tips</h3>
                </div>
                <p className="text-sm text-muted-foreground">Tailor your resume for Australian employers by highlighting relevant skills and using local terminology.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Interview Preparation</h3>
                </div>
                <p className="text-sm text-muted-foreground">Research Australian workplace culture and prepare specific examples of your achievements for behavioral questions.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Visa Requirements</h3>
                </div>
                <p className="text-sm text-muted-foreground">Ensure you understand your work rights in Australia and mention your visa status clearly in your application.</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Get Personalized Job Search Coaching
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default JobSearch;
