
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Lock, Calendar, Bell, ArrowRight, AlertCircle, ChevronRight, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Placeholder data for demonstration
const recentSearches = [
  { id: 1, query: "Rental apartments in Sydney CBD", date: "1 day ago" },
  { id: 2, query: "Work visa requirements for Australia", date: "2 days ago" },
  { id: 3, query: "Cost of living in Melbourne", date: "3 days ago" }
];

const upcomingTasks = [
  { id: 1, title: "Start visa application", dueDate: "In 5 days", completed: false },
  { id: 2, title: "Research healthcare options", dueDate: "In 7 days", completed: false },
  { id: 3, title: "Contact potential landlords", dueDate: "In 10 days", completed: false }
];

const FreeDashboard = () => {
  const navigate = useNavigate();
  const [aiChatsRemaining, setAiChatsRemaining] = useState(5);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: "Hi there! I'm your MoveSync AI assistant. How can I help with your relocation today? You have 5 free questions remaining." }
  ]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || aiChatsRemaining <= 0) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: chatMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse;
      if (aiChatsRemaining > 1) {
        aiResponse = `Here's some information about ${chatMessage}. You have ${aiChatsRemaining - 1} free questions remaining.`;
      } else {
        aiResponse = "This is your last free question! To continue receiving AI assistance, please upgrade to the Premium plan.";
      }
      setChatHistory([...chatHistory, { role: 'user', content: chatMessage }, { role: 'assistant', content: aiResponse }]);
      setAiChatsRemaining(aiChatsRemaining - 1);
    }, 1000);
    
    setChatMessage("");
  };

  const handleUpgrade = () => {
    // In a real app, this would redirect to the payment page
    navigate('/');
  };

  return (
    <DashboardLayout isPremium={false} userName="Alex Smith" progressPercentage={30}>
      <div className="space-y-8">
        {/* Upgrade Banner */}
        <Card className="bg-gradient-to-r from-movesync-blue-light to-movesync-blue text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Welcome to Your Free Dashboard!</h2>
                <p className="max-w-2xl">
                  You're currently on the Free plan with limited access. Upgrade to Premium for unlimited AI assistance, 
                  property search, visa support, and more.
                </p>
              </div>
              <Button 
                onClick={handleUpgrade}
                className="bg-white text-movesync-blue hover:bg-gray-100 whitespace-nowrap"
              >
                Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Relocation Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Relocation Progress</CardTitle>
              <CardDescription>3 of 10 steps completed</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={30} className="h-2 mb-4" />
              <div className="space-y-2">
                {upcomingTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="block h-2 w-2 rounded-full bg-movesync-blue"></span>
                      <span>{task.title}</span>
                    </div>
                    <Badge variant="outline">{task.dueDate}</Badge>
                  </div>
                ))}
                <div className="flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-2">
                    <span className="block h-2 w-2 rounded-full bg-gray-400"></span>
                    <span>Complete packing checklist</span>
                    <Lock className="h-3 w-3" />
                  </div>
                  <Badge variant="outline">Premium Only</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full justify-between">
                View all tasks <Lock className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Searches */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Searches</CardTitle>
              <CardDescription>Your last 3 AI searches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSearches.map(search => (
                  <div key={search.id} className="flex items-start gap-3">
                    <div className="bg-movesync-gray-light p-2 rounded-full">
                      <Bot className="h-4 w-4 text-movesync-blue" />
                    </div>
                    <div>
                      <p className="font-medium">{search.query}</p>
                      <p className="text-sm text-movesync-gray">{search.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full justify-between">
                View search history <Lock className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
              <CardDescription>Common relocation tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  Start a property search <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Check visa eligibility <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Calculate cost of living <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between opacity-60">
                  Explore local services <Lock className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant (Limited) */}
        <Card className="relative overflow-hidden">
          {aiChatsRemaining === 0 && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6">
              <Lock className="h-12 w-12 text-movesync-blue mb-4" />
              <h3 className="text-xl font-bold text-center mb-2">
                You've used all your free AI assistant questions
              </h3>
              <p className="text-center text-movesync-gray-dark mb-6 max-w-md">
                Upgrade to Premium for unlimited AI assistance and access to enhanced relocation features.
              </p>
              <Button size="lg" onClick={handleUpgrade}>
                Upgrade to Premium
              </Button>
            </div>
          )}
          
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-movesync-blue" />
                AI Assistant
              </CardTitle>
              <Badge variant="outline" className={aiChatsRemaining > 1 ? "bg-green-50" : "bg-amber-50"}>
                {aiChatsRemaining} questions remaining
              </Badge>
            </div>
            <CardDescription>
              Ask me anything about your relocation to Australia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 rounded-lg p-4 h-60 mb-4 overflow-y-auto space-y-4">
              {chatHistory.map((message, index) => (
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
                placeholder="Ask about visa requirements, property search, etc."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                disabled={aiChatsRemaining <= 0}
              />
              <Button type="submit" disabled={aiChatsRemaining <= 0 || !chatMessage.trim()}>
                Send
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Premium Features Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Premium Features Preview</CardTitle>
            <CardDescription>
              See what you're missing in the free plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
                <div className="h-10 w-10 rounded-full bg-movesync-blue/10 flex items-center justify-center mb-3">
                  <Bot className="h-5 w-5 text-movesync-blue" />
                </div>
                <h3 className="font-medium mb-2">Unlimited AI Assistance</h3>
                <p className="text-sm text-movesync-gray-dark mb-4">24/7 AI support for all your relocation needs.</p>
                <Button variant="outline" size="sm" className="mt-auto" onClick={handleUpgrade}>
                  Unlock <Lock className="ml-2 h-3 w-3" />
                </Button>
              </div>
              
              <div className="border border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
                <div className="h-10 w-10 rounded-full bg-movesync-blue/10 flex items-center justify-center mb-3">
                  <Calendar className="h-5 w-5 text-movesync-blue" />
                </div>
                <h3 className="font-medium mb-2">Custom Relocation Timeline</h3>
                <p className="text-sm text-movesync-gray-dark mb-4">AI-generated personalized moving schedules.</p>
                <Button variant="outline" size="sm" className="mt-auto" onClick={handleUpgrade}>
                  Unlock <Lock className="ml-2 h-3 w-3" />
                </Button>
              </div>
              
              <div className="border border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
                <div className="h-10 w-10 rounded-full bg-movesync-blue/10 flex items-center justify-center mb-3">
                  <Bell className="h-5 w-5 text-movesync-blue" />
                </div>
                <h3 className="font-medium mb-2">Smart Notifications</h3>
                <p className="text-sm text-movesync-gray-dark mb-4">Timely alerts for critical relocation steps.</p>
                <Button variant="outline" size="sm" className="mt-auto" onClick={handleUpgrade}>
                  Unlock <Lock className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleUpgrade}>
              Upgrade to Premium for Just $99/month
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FreeDashboard;
