
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Calendar, ChevronRight, CheckCircle, PlusCircle, Briefcase, 
  Home, CreditCard, Globe, Map, AlertCircle, Search, ArrowRight, BarChart3, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

// Placeholder data for the premium dashboard
const upcomingTasks = [
  { id: 1, title: "Complete visa application", dueDate: "Today", priority: "high", completed: false },
  { id: 2, title: "Virtual property tour", dueDate: "Tomorrow", priority: "medium", completed: false },
  { id: 3, title: "Review lease agreement", dueDate: "In 2 days", priority: "high", completed: false },
  { id: 4, title: "Set up bank account", dueDate: "In 3 days", priority: "medium", completed: false },
  { id: 5, title: "Schedule moving service", dueDate: "In 5 days", priority: "low", completed: false },
];

const recentProperties = [
  { 
    id: 1, 
    title: "Modern 2BR Apartment",
    location: "Sydney CBD",
    price: "$650/week",
    match: 92,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop"
  },
  { 
    id: 2, 
    title: "Spacious 3BR House",
    location: "Melbourne, Richmond",
    price: "$750/week",
    match: 88,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop"
  },
  { 
    id: 3, 
    title: "Studio with Harbour Views",
    location: "Sydney, Kirribilli",
    price: "$520/week",
    match: 85,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop"
  }
];

const visaSteps = [
  { id: 1, title: "Application submitted", completed: true, date: "June 10, 2023" },
  { id: 2, title: "Documents received", completed: true, date: "June 15, 2023" },
  { id: 3, title: "Background check", completed: true, date: "June 25, 2023" },
  { id: 4, title: "Application under review", completed: false, inProgress: true, date: "Est. July 10, 2023" },
  { id: 5, title: "Decision", completed: false, date: "Est. July 25, 2023" }
];

const jobOpportunities = [
  { id: 1, title: "Senior Software Engineer", company: "TechSydney", location: "Sydney CBD", match: 95, salary: "$120K-$150K" },
  { id: 2, title: "UX Designer", company: "CreativeOz", location: "Melbourne", match: 90, salary: "$90K-$110K" },
  { id: 3, title: "Marketing Manager", company: "Aussie Brands", location: "Brisbane", match: 85, salary: "$85K-$100K" },
];

const PremiumDashboard = () => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: "Welcome to your premium AI assistant! I'm here to help with every aspect of your move to Australia. What can I assist you with today?" }
  ]);
  const [progressPercentage, setProgressPercentage] = useState(65);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: chatMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `Here's detailed information about ${chatMessage} for your move to Australia. Is there anything specific you'd like to know more about?`;
      setChatHistory([...chatHistory, { role: 'user', content: chatMessage }, { role: 'assistant', content: aiResponse }]);
    }, 1000);
    
    setChatMessage("");
  };

  const handleTaskComplete = (taskId: number) => {
    // In a real app, you would update the task status in the database
    // Here we'll just increment the progress percentage
    setProgressPercentage(Math.min(progressPercentage + 5, 100));
  };

  return (
    <DashboardLayout isPremium={true} userName="Alex Smith" progressPercentage={progressPercentage}>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-movesync-blue to-movesync-blue-light text-white overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome Back, Alex!</h2>
                <p className="max-w-2xl mb-4">
                  Your premium relocation journey to Australia is progressing well. 
                  You've completed {progressPercentage}% of your relocation tasks.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 hover:bg-white/30">Visa: In Progress</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Housing: 3 Matches</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Moving Date: Aug 15</Badge>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" /> Priority Action Required
                </h3>
                <p className="text-sm mb-3">
                  Your visa application needs additional documents before July 5th.
                </p>
                <Button size="sm" className="bg-white text-movesync-blue hover:bg-gray-100">
                  Review Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Section - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Assistant Preview */}
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-movesync-blue" />
                AI Relocation Assistant
              </CardTitle>
              <CardDescription>
                Your 24/7 personal assistant for any relocation questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 rounded-lg p-4 h-32 mb-4 overflow-y-auto space-y-4">
                {chatHistory.slice(-2).map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-movesync-blue text-white rounded-tr-none' 
                          : 'bg-white border border-gray-200 rounded-tl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything about your move to Australia..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button type="submit" disabled={!chatMessage.trim()}>
                  Send
                </Button>
              </form>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full">
                Open Full AI Conversation
              </Button>
            </CardFooter>
          </Card>

          {/* Task Management */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <span>Priority Tasks</span>
                <Badge>{upcomingTasks.length}</Badge>
              </CardTitle>
              <CardDescription>Your upcoming relocation tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-52 overflow-y-auto">
                {upcomingTasks.slice(0, 4).map(task => (
                  <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="mt-0.5 h-5 w-5 text-movesync-gray hover:text-movesync-blue"
                      onClick={() => handleTaskComplete(task.id)}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={
                            task.priority === 'high' 
                              ? 'bg-red-50 text-red-700 border-red-200' 
                              : task.priority === 'medium' 
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-green-50 text-green-700 border-green-200'
                          }
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-movesync-gray">{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                See All
              </Button>
              <Button size="sm" className="flex-1">
                <PlusCircle className="h-4 w-4 mr-1" /> Add Task
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Feature Tabs */}
        <Tabs defaultValue="property" className="w-full">
          <TabsList className="w-full justify-start mb-4 bg-transparent space-x-2 h-auto overflow-x-auto p-0 flex-wrap">
            <TabsTrigger value="property" className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2">
              <Home className="h-4 w-4 mr-2" /> Property Search
            </TabsTrigger>
            <TabsTrigger value="visa" className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2">
              <Globe className="h-4 w-4 mr-2" /> Visa Status
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2">
              <Briefcase className="h-4 w-4 mr-2" /> Job Opportunities
            </TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2">
              <CreditCard className="h-4 w-4 mr-2" /> Cost of Living
            </TabsTrigger>
          </TabsList>
          
          {/* Property Search Tab */}
          <TabsContent value="property" className="mt-0 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Your Top Property Matches</h3>
              <Button>
                <Search className="h-4 w-4 mr-2" /> New Search
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map(property => (
                <Card key={property.id} className="overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${property.image})` }}
                  >
                    <div className="p-2">
                      <Badge className="bg-movesync-blue">
                        {property.match}% Match
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg">{property.title}</h4>
                    <div className="flex justify-between items-center mt-1 mb-3">
                      <span className="text-movesync-gray-dark">{property.location}</span>
                      <span className="font-medium">{property.price}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Details</Button>
                      <Button size="sm" className="flex-1">Book Tour</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                View All Property Matches <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          {/* Visa Status Tab */}
          <TabsContent value="visa" className="mt-0 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Skilled Worker Visa Application</h3>
                <p className="text-movesync-gray">Application ID: AUSC-2023-78945612</p>
              </div>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">In Progress</Badge>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Estimated Processing Time</h4>
                      <p className="text-sm text-movesync-gray">Based on current application volume</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">45-60 days</p>
                      <p className="text-sm text-movesync-gray">Started: June 10, 2023</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Application Timeline</h4>
                    <div className="space-y-4">
                      {visaSteps.map((step, index) => (
                        <div key={step.id} className="flex items-start">
                          <div className="mr-3 flex flex-col items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              step.completed ? 'bg-green-500 text-white' : 
                              step.inProgress ? 'bg-amber-500 text-white' : 
                              'bg-gray-200'
                            }`}>
                              {step.completed ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : step.inProgress ? (
                                <Clock className="h-4 w-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            {index < visaSteps.length - 1 && (
                              <div className={`w-0.5 h-12 ${
                                step.completed ? 'bg-green-500' : 'bg-gray-200'
                              }`}></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${
                              step.completed ? 'text-green-600' : 
                              step.inProgress ? 'text-amber-600' : 
                              'text-movesync-gray'
                            }`}>
                              {step.title}
                            </p>
                            <p className="text-sm text-movesync-gray">{step.date}</p>
                            {step.inProgress && (
                              <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                                <p className="text-amber-800 font-medium">Action Required</p>
                                <p className="text-amber-700">Please submit additional financial documents by July 5, 2023.</p>
                                <Button size="sm" className="mt-2 bg-amber-600 hover:bg-amber-700">
                                  Upload Documents
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center gap-4">
              <Button variant="outline">
                <Bot className="h-4 w-4 mr-2" /> Ask AI About Your Visa
              </Button>
              <Button>
                View All Documents
              </Button>
            </div>
          </TabsContent>
          
          {/* Job Opportunities Tab */}
          <TabsContent value="jobs" className="mt-0 space-y-4">
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
              {jobOpportunities.map(job => (
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
          </TabsContent>
          
          {/* Cost of Living Tab */}
          <TabsContent value="costs" className="mt-0 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Australia Cost of Living Analysis</h3>
                <p className="text-movesync-gray">Personalized for your lifestyle in Sydney</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-movesync-gray">Compare with:</span>
                <select className="border border-gray-200 rounded-md px-2 py-1 text-sm">
                  <option>Melbourne</option>
                  <option>Brisbane</option>
                  <option>Perth</option>
                  <option>Adelaide</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Monthly Budget</CardTitle>
                  <CardDescription>Based on your preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$4,250 AUD</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Housing (40%)</span>
                        <span>$1,700</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Food (20%)</span>
                        <span>$850</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Transportation (15%)</span>
                        <span>$640</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Utilities (10%)</span>
                        <span>$425</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Entertainment (10%)</span>
                        <span>$425</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Miscellaneous (5%)</span>
                        <span>$210</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Sydney Cost Insights</CardTitle>
                  <CardDescription>Live data from local sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-movesync-gray mb-1 text-sm">Average 1BR Apartment</div>
                      <div className="font-semibold">$500-650/week</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-movesync-gray mb-1 text-sm">Monthly Transit Pass</div>
                      <div className="font-semibold">$217 AUD</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-movesync-gray mb-1 text-sm">Meal at Restaurant</div>
                      <div className="font-semibold">$20-35 AUD</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-movesync-gray mb-1 text-sm">Monthly Utilities</div>
                      <div className="font-semibold">$200-300 AUD</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-movesync-gray mb-1 text-sm">Internet</div>
                      <div className="font-semibold">$70-100 AUD</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-movesync-gray mb-1 text-sm">Gym Membership</div>
                      <div className="font-semibold">$60-100 AUD</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">AI Cost-Saving Tips</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <p>Consider suburbs like Marrickville or Newtown for more affordable housing with good transport links.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <p>An Opal card offers fare caps and discounts for public transportation.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <p>Weekend markets like Paddy's Market offer fresh produce at lower prices than major supermarkets.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    <Bot className="h-4 w-4 mr-2" /> Ask AI for Detailed Cost Breakdown
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PremiumDashboard;
