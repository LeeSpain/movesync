
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Search, MapPin, Building, SortAsc, SortDesc, Star, StarOff, Bookmark, ExternalLink, FileText, Download, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample job listings
const jobListings = [
  { 
    id: 1, 
    title: "Senior Software Engineer",
    company: "TechSydney",
    location: "Sydney CBD",
    salary: "$120K-$150K",
    match: 95,
    description: "Join our team to develop innovative solutions using React, Node.js, and cloud technologies.",
    requirements: ["5+ years of experience", "React", "Node.js", "Cloud platforms"],
    benefits: ["Flexible work", "Health insurance", "Relocation assistance"],
    postedDate: "3 days ago",
    type: "Full-time",
    visa: "Sponsorship available",
    industry: "Technology"
  },
  { 
    id: 2, 
    title: "UX Designer",
    company: "CreativeOz",
    location: "Melbourne",
    salary: "$90K-$110K",
    match: 90,
    description: "Create exceptional user experiences for our digital products and services.",
    requirements: ["3+ years of experience", "Figma", "User research", "Prototyping"],
    benefits: ["Remote work options", "Professional development", "Relocation package"],
    postedDate: "1 week ago",
    type: "Full-time",
    visa: "Sponsorship available",
    industry: "Creative & Design"
  },
  { 
    id: 3, 
    title: "Marketing Manager",
    company: "Aussie Brands",
    location: "Brisbane",
    salary: "$85K-$100K",
    match: 85,
    description: "Lead marketing campaigns for our consumer products across Australia.",
    requirements: ["4+ years in marketing", "Campaign management", "Digital marketing", "Analytics"],
    benefits: ["Hybrid work model", "Career progression", "Visa sponsorship"],
    postedDate: "2 weeks ago",
    type: "Full-time",
    visa: "Sponsorship available",
    industry: "Marketing & Communications"
  },
  { 
    id: 4, 
    title: "Financial Analyst",
    company: "Pacific Finance",
    location: "Sydney",
    salary: "$95K-$115K",
    match: 82,
    description: "Analyze financial data and provide insights to support business decision-making.",
    requirements: ["Financial modeling", "Excel advanced", "Accounting principles", "Bachelor's in Finance"],
    benefits: ["Yearly bonus", "Subsidized housing", "Relocation assistance"],
    postedDate: "3 days ago",
    type: "Full-time",
    visa: "Sponsorship available",
    industry: "Finance & Banking"
  },
  { 
    id: 5, 
    title: "Project Manager",
    company: "BuildGroup Australia",
    location: "Perth",
    salary: "$110K-$130K",
    match: 80,
    description: "Oversee construction projects from planning to completion across Western Australia.",
    requirements: ["PMP Certification", "5+ years in construction", "Budget management", "Team leadership"],
    benefits: ["Company vehicle", "Performance bonuses", "Housing allowance"],
    postedDate: "1 week ago",
    type: "Full-time",
    visa: "Sponsorship available",
    industry: "Construction & Engineering"
  },
  { 
    id: 6, 
    title: "Healthcare Administrator",
    company: "AusHealth",
    location: "Adelaide",
    salary: "$80K-$95K",
    match: 78,
    description: "Coordinate daily operations for our growing healthcare facility.",
    requirements: ["Healthcare administration experience", "Staff management", "EHR systems", "Compliance"],
    benefits: ["Health benefits", "Flexible scheduling", "Professional development"],
    postedDate: "5 days ago",
    type: "Full-time",
    visa: "Sponsorship available",
    industry: "Healthcare"
  }
];

// Resume tips data
const resumeTips = [
  {
    title: "Understand Australian Format",
    description: "Australian resumes typically include contact details, a professional summary, work experience, education, skills, and references. They are usually 2-3 pages long."
  },
  {
    title: "Highlight Relevant Experience",
    description: "Focus on experience most relevant to Australian employers. Emphasize transferable skills and achievements with measurable results."
  },
  {
    title: "Include Key Information",
    description: "Mention your visa status, Australian qualifications (if applicable), and any local experience or knowledge."
  },
  {
    title: "Use Australian English",
    description: "Use Australian English spelling (e.g., organisation instead of organization) and terminology relevant to your industry."
  },
  {
    title: "Tailor Your Resume for Each Job",
    description: "Customize your resume for each application to match the job requirements and company culture."
  }
];

// Interview preparation tips
const interviewTips = [
  {
    title: "Research Australian Workplace Culture",
    description: "Understand the relaxed yet professional nature of Australian workplaces, the emphasis on work-life balance, and the value placed on directness and honesty."
  },
  {
    title: "Prepare for Behavioral Questions",
    description: "Australian employers often use the STAR method (Situation, Task, Action, Result) to assess candidates. Prepare examples that demonstrate your skills and experience."
  },
  {
    title: "Be Ready to Discuss Visa Status",
    description: "Be prepared to clearly explain your current visa status, work rights, and any sponsorship requirements."
  },
  {
    title: "Show Cultural Fit",
    description: "Australians value teamwork, initiative, and a positive attitude. Demonstrate how you embody these qualities."
  },
  {
    title: "Ask Thoughtful Questions",
    description: "Prepare questions about the company, team culture, growth opportunities, and expectations for the role."
  }
];

const JobListingCard = ({ job }: { job: any }) => {
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const handleSaveJob = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Job removed from saved list" : "Job saved to your list",
      description: saved ? "You can add it again anytime." : "You can view all saved jobs in your profile."
    });
  };
  
  const handleApply = () => {
    toast({
      title: "Application initiated",
      description: "You're being redirected to complete your application."
    });
  };
  
  return (
    <Card className={`mb-4 overflow-hidden ${job.match >= 90 ? 'border-movesync-blue' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building className="h-3.5 w-3.5 mr-1" /> {job.company} · 
              <MapPin className="h-3.5 w-3.5 mx-1" /> {job.location}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSaveJob}>
            {saved ? <Star className="h-5 w-5 text-yellow-500" /> : <StarOff className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Badge className="bg-movesync-blue mr-2">{job.match}% Match</Badge>
            <Badge variant="outline">{job.type}</Badge>
            {job.visa && <Badge variant="outline" className="ml-2">{job.visa}</Badge>}
          </div>
          <div className="text-right font-medium">{job.salary}</div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
        
        {expanded && (
          <div className="mt-4 space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-1">Requirements</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Benefits</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {job.benefits.map((benefit: string, index: number) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <Button 
          variant="link" 
          className="p-0 h-auto text-sm" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-sm text-muted-foreground">Posted {job.postedDate}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-3.5 w-3.5 mr-1" /> View
          </Button>
          <Button size="sm" onClick={handleApply}>Apply Now</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const JobSearch = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [sponsorshipOnly, setSponsorshipOnly] = useState(true);
  const [sortBy, setSortBy] = useState('match');
  
  // Filter jobs based on search criteria
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = searchTerm ? 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      
    const matchesLocation = location ? 
      job.location.toLowerCase().includes(location.toLowerCase()) : true;
      
    const matchesIndustry = industry ? 
      job.industry === industry : true;
      
    const matchesSponsorship = sponsorshipOnly ? 
      job.visa && job.visa.includes("Sponsorship") : true;
      
    return matchesSearch && matchesLocation && matchesIndustry && matchesSponsorship;
  });
  
  // Sort jobs based on selected criteria
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'match') {
      return b.match - a.match;
    } else if (sortBy === 'date') {
      // This is simplified sorting by "recency" based on the postedDate text
      if (a.postedDate.includes('day') && b.postedDate.includes('week')) return -1;
      if (a.postedDate.includes('week') && b.postedDate.includes('day')) return 1;
      // Extract the number from the string and compare
      const aTime = parseInt(a.postedDate.split(' ')[0]);
      const bTime = parseInt(b.postedDate.split(' ')[0]);
      return aTime - bTime;
    } else if (sortBy === 'salary') {
      // Extract the higher number from the salary range for comparison
      const aMax = parseInt(a.salary.split('-')[1].replace(/\D/g, ''));
      const bMax = parseInt(b.salary.split('-')[1].replace(/\D/g, ''));
      return bMax - aMax;
    }
    return 0;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Found ${filteredJobs.length} jobs matching your criteria.`
    });
  };
  
  const handleResumeUpload = () => {
    toast({
      title: "Upload resume",
      description: "Resume upload functionality would open here."
    });
  };
  
  const handleDownloadGuide = () => {
    toast({
      title: "Guide downloading",
      description: "Your comprehensive job search guide is downloading."
    });
  };

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Job Search</h1>
        <p className="text-muted-foreground">Find employment opportunities in Australia with visa sponsorship and personalized matching.</p>
        
        <Tabs defaultValue="search">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search Jobs</TabsTrigger>
            <TabsTrigger value="resume">Resume Help</TabsTrigger>
            <TabsTrigger value="interview">Interview Prep</TabsTrigger>
          </TabsList>
          
          {/* Job Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Your Perfect Role</CardTitle>
                <CardDescription>Search for jobs with visa sponsorship in Australia</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Job title, skills, or company"
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="City or region"
                        className="pl-9"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Industries</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance & Banking">Finance & Banking</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Construction & Engineering">Construction & Engineering</SelectItem>
                        <SelectItem value="Marketing & Communications">Marketing & Communications</SelectItem>
                        <SelectItem value="Creative & Design">Creative & Design</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="match">
                          <div className="flex items-center">
                            <SortDesc className="h-4 w-4 mr-2" />
                            Match Percentage
                          </div>
                        </SelectItem>
                        <SelectItem value="date">
                          <div className="flex items-center">
                            <SortAsc className="h-4 w-4 mr-2" />
                            Most Recent
                          </div>
                        </SelectItem>
                        <SelectItem value="salary">
                          <div className="flex items-center">
                            <SortDesc className="h-4 w-4 mr-2" />
                            Salary
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sponsorship"
                      checked={sponsorshipOnly}
                      onCheckedChange={setSponsorshipOnly}
                    />
                    <Label htmlFor="sponsorship">Show only jobs with visa sponsorship</Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Search className="h-4 w-4 mr-2" /> Search Jobs
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Job Matches ({sortedJobs.length})
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Bookmark className="h-3.5 w-3.5" /> Saved: 0
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-3.5 w-3.5 mr-1" /> Export
                  </Button>
                </div>
              </div>
              
              {sortedJobs.length > 0 ? (
                <div className="space-y-4">
                  {sortedJobs.map(job => (
                    <JobListingCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center">
                  <div className="text-muted-foreground mb-2">No jobs match your current filters</div>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setLocation('');
                    setIndustry('');
                  }}>
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Resume Help Tab */}
          <TabsContent value="resume" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Optimization</CardTitle>
                <CardDescription>Tailor your resume for the Australian job market</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-semibold mb-4">Tips for Australian Resumes</h3>
                    <div className="space-y-4">
                      {resumeTips.map((tip, index) => (
                        <div key={index} className="space-y-1">
                          <h4 className="font-medium text-movesync-blue">{tip.title}</h4>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Resume Analysis</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload your resume to get personalized feedback and optimization suggestions.
                      </p>
                      <Button className="w-full" onClick={handleResumeUpload}>
                        <Upload className="h-4 w-4 mr-2" /> Upload Resume
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Resume Templates</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Download Australian-style resume templates tailored for your industry.
                      </p>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="w-full mt-3">
                        <Download className="h-4 w-4 mr-2" /> Download Template
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Australian Resume Format</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">What to Include</h4>
                      <ul className="text-sm space-y-2">
                        <li><span className="font-medium">Contact Details:</span> Include phone, email, LinkedIn, and current location.</li>
                        <li><span className="font-medium">Professional Summary:</span> 3-4 sentences highlighting your experience and strengths.</li>
                        <li><span className="font-medium">Skills:</span> Relevant technical and soft skills.</li>
                        <li><span className="font-medium">Experience:</span> Recent positions with achievements and measurable results.</li>
                        <li><span className="font-medium">Education:</span> Qualifications with dates and institutions.</li>
                        <li><span className="font-medium">References:</span> Either provide names and contacts or indicate "Available upon request."</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">What to Avoid</h4>
                      <ul className="text-sm space-y-2">
                        <li><span className="font-medium">Personal Details:</span> Age, marital status, religion, or photos are not needed.</li>
                        <li><span className="font-medium">Objective Statements:</span> Use a professional summary instead.</li>
                        <li><span className="font-medium">Irrelevant Experience:</span> Focus on relevant skills and experiences.</li>
                        <li><span className="font-medium">Lengthy Text:</span> Be concise and use bullet points.</li>
                        <li><span className="font-medium">Unprofessional Email:</span> Use a simple, professional email address.</li>
                        <li><span className="font-medium">Salary Information:</span> Don't include salary expectations or history.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleDownloadGuide}>
                  <Download className="h-4 w-4 mr-2" /> Download Comprehensive Resume Guide
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Interview Prep Tab */}
          <TabsContent value="interview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Preparation</CardTitle>
                <CardDescription>Prepare for Australian job interviews with these resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Interview Tips</h3>
                    <div className="space-y-4">
                      {interviewTips.map((tip, index) => (
                        <div key={index} className="space-y-1">
                          <h4 className="font-medium text-movesync-blue">{tip.title}</h4>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Common Questions</h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium">Tell me about yourself</h5>
                          <p className="text-xs text-muted-foreground">Focus on professional experience relevant to the role, briefly mention your background and qualifications.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">Why do you want to work in Australia?</h5>
                          <p className="text-xs text-muted-foreground">Highlight professional reasons, industry opportunities, and specific interest in the Australian market.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">Describe a challenging situation and how you resolved it</h5>
                          <p className="text-xs text-muted-foreground">Use the STAR method (Situation, Task, Action, Result) to structure your response.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">What are your salary expectations?</h5>
                          <p className="text-xs text-muted-foreground">Research industry standards in Australia and provide a realistic range based on your experience.</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-3">
                        <Download className="h-4 w-4 mr-2" /> Full Question Guide
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Interview Practice</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Practice for your interviews with our AI-powered simulation tool.
                      </p>
                      <Button className="w-full">
                        Start Interview Simulation
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Australian Workplace Culture</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Communication Style</h4>
                      <ul className="text-sm space-y-1">
                        <li>Direct but respectful communication</li>
                        <li>Informal language and humor</li>
                        <li>Less hierarchical than many cultures</li>
                        <li>Use of Australian slang and expressions</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Work Expectations</h4>
                      <ul className="text-sm space-y-1">
                        <li>Strong work-life balance valued</li>
                        <li>Initiative and problem-solving</li>
                        <li>Teamwork and collaboration</li>
                        <li>Punctuality and reliability</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Social Norms</h4>
                      <ul className="text-sm space-y-1">
                        <li>Team activities and after-work socializing</li>
                        <li>Casual Friday dress codes</li>
                        <li>Office celebrations and traditions</li>
                        <li>Inclusive environment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleDownloadGuide}>
                  <Download className="h-4 w-4 mr-2" /> Download Interview Success Kit
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default JobSearch;
