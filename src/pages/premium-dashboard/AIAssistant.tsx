
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChatInterface from '@/components/ai-assistant/ChatInterface';
import { Message } from '@/components/ai-assistant/types';
import CapabilitiesSection from '@/components/ai-assistant/CapabilitiesSection';

const PremiumAIAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to your Premium AI Assistant. As your dedicated moving companion, I'm here to help with every aspect of your relocation to Australia. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [selectedCountry, setSelectedCountry] = useState({ id: 'australia', name: 'Australia', flag: '🇦🇺' });
  const [isIntersecting, setIsIntersecting] = useState(true);

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Your premium AI assistant helps with all aspects of your move to Australia.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Premium AI Chat Assistant</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ChatInterface 
                countries={[selectedCountry]}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <CapabilitiesSection isIntersecting={isIntersecting} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PremiumAIAssistant;
