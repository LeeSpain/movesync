
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChatInterface from '@/components/ai-assistant/ChatInterface';
import { Message } from '@/components/ai-assistant/types';

const CapabilitiesSection = ({ isIntersecting }: { isIntersecting: boolean }) => {
  const capabilities = [
    "Answer questions about relocating within Australia",
    "Assist international migrants with visa requirements",
    "Provide information on cost of living in Australian cities",
    "Assist with property searches and understanding neighborhoods",
    "Offer guidance on job markets and employment opportunities",
    "Help with understanding healthcare, banking, and other essential services"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assistant Capabilities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {capabilities.map((capability, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-movesync-blue">•</span>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const PremiumAIAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to your Premium AI Assistant. Whether you're moving to Australia from overseas or relocating within the country, I'm here to help with every aspect of your move. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [selectedCountry, setSelectedCountry] = useState({ id: 'australia', name: 'Australia', flag: '🇦🇺' });
  const [isIntersecting, setIsIntersecting] = useState(true);

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Your premium AI assistant helps with all aspects of your move within or to Australia.</p>
        
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
