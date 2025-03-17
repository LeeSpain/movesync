
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

// Import custom components
import WelcomeBanner from '@/components/premium-dashboard/WelcomeBanner';
import AIAssistantCard from '@/components/premium-dashboard/AIAssistantCard';
import PriorityTasksCard from '@/components/premium-dashboard/PriorityTasksCard';
import DashboardTabs from '@/components/premium-dashboard/DashboardTabs';

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
  const { user } = useAuth();
  const [progressPercentage, setProgressPercentage] = useState(user?.progressPercentage || 65);
  const [initialChatHistory] = useState([
    { role: 'assistant', content: "Welcome to your premium AI assistant! I'm here to help with every aspect of your move within or to Australia. Our system continuously scans the web for the latest properties, jobs, and relocation information - updated daily just for you. What can I assist you with today?" }
  ]);

  const handleTaskComplete = (taskId: number) => {
    // In a real app, you would update the task status in the database
    // Here we'll just increment the progress percentage
    setProgressPercentage(Math.min(progressPercentage + 5, 100));
  };

  const handleTabNavigation = (tab: string) => {
    // In a real app, we would navigate to the tab-specific page
    // Here we'll just log it for demonstration
    console.log(`Navigating to ${tab} tab`);
  };

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "Alex"} progressPercentage={progressPercentage}>
      {/* Welcome Banner */}
      <WelcomeBanner userName="Alex" progressPercentage={progressPercentage} />

      {/* Top Section - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* AI Assistant Preview */}
        <AIAssistantCard initialMessages={initialChatHistory} />

        {/* Task Management */}
        <PriorityTasksCard tasks={upcomingTasks} onTaskComplete={handleTaskComplete} />
      </div>

      {/* Feature Tabs */}
      <div className="mt-6">
        <DashboardTabs 
          properties={recentProperties} 
          visaSteps={visaSteps} 
          jobs={jobOpportunities} 
          onTabChange={handleTabNavigation} 
        />
      </div>
    </DashboardLayout>
  );
};

export default PremiumDashboard;
