
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UpgradeBanner from '@/components/dashboard/UpgradeBanner';
import RelocationProgress from '@/components/dashboard/RelocationProgress';
import RecentSearches from '@/components/dashboard/RecentSearches';
import QuickActions from '@/components/dashboard/QuickActions';
import AIAssistantWidget from '@/components/dashboard/AIAssistantWidget';
import PremiumFeaturesPreview from '@/components/dashboard/PremiumFeaturesPreview';

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
  const { user, upgradeToPremium } = useAuth();
  const { toast } = useToast();
  const [aiChatsRemaining, setAiChatsRemaining] = useState(5);
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: "Hi there! I'm your MoveSync AI assistant. How can I help with your relocation today? You have 5 free questions remaining." }
  ]);

  const handleChatSubmit = (message: string) => {
    if (!message.trim() || aiChatsRemaining <= 0) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse;
      if (aiChatsRemaining > 1) {
        aiResponse = `Here's some information about ${message}. You have ${aiChatsRemaining - 1} free questions remaining.`;
      } else {
        aiResponse = "This is your last free question! To continue receiving AI assistance, please upgrade to the Premium plan.";
      }
      setChatHistory([...chatHistory, { role: 'user', content: message }, { role: 'assistant', content: aiResponse }]);
      setAiChatsRemaining(aiChatsRemaining - 1);
    }, 1000);
  };

  const handleUpgrade = () => {
    // Show toast notification
    toast({
      title: "Initiating upgrade",
      description: "Taking you to checkout...",
    });
    
    // We don't actually upgrade immediately, we'll do that after successful checkout
  };

  // Handle feature button clicks
  const handleFeatureClick = (feature: string) => {
    if (feature === 'property') {
      navigate('/dashboard/free/property');
    } else if (feature === 'visa') {
      navigate('/dashboard/free/visa');
    } else if (feature === 'cost') {
      navigate('/dashboard/free/cost-living');
    } else {
      // For premium-only features
      toast({
        title: "Premium Feature",
        description: "This feature is only available with the Premium plan.",
        action: (
          <Button variant="default" size="sm" onClick={() => navigate('/checkout')}>Upgrade</Button>
        ),
      });
    }
  };

  return (
    <DashboardLayout isPremium={false} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 30}>
      {/* Upgrade Banner */}
      <UpgradeBanner onUpgrade={handleUpgrade} />

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Relocation Progress */}
        <RelocationProgress 
          progressPercentage={user?.progressPercentage || 30} 
          tasks={upcomingTasks} 
        />

        {/* Recent Searches */}
        <RecentSearches searches={recentSearches} />

        {/* Quick Links */}
        <QuickActions onFeatureClick={handleFeatureClick} />
      </div>

      {/* AI Assistant (Limited) */}
      <AIAssistantWidget 
        aiChatsRemaining={aiChatsRemaining}
        chatHistory={chatHistory}
        onSendMessage={handleChatSubmit}
        onUpgrade={handleUpgrade}
      />

      {/* Premium Features Preview */}
      <PremiumFeaturesPreview onUpgrade={handleUpgrade} />
    </DashboardLayout>
  );
};

export default FreeDashboard;
