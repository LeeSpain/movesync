
import { useState } from 'react';
import { Bot, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Message = {
  role: string;
  content: string;
};

type AIAssistantWidgetProps = {
  aiChatsRemaining: number;
  chatHistory: Message[];
  onSendMessage: (message: string) => void;
  onUpgrade: () => void;
};

const AIAssistantWidget = ({ 
  aiChatsRemaining, 
  chatHistory, 
  onSendMessage, 
  onUpgrade 
}: AIAssistantWidgetProps) => {
  const [chatMessage, setChatMessage] = useState("");

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || aiChatsRemaining <= 0) return;
    
    onSendMessage(chatMessage);
    setChatMessage("");
  };

  return (
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
          <Button size="lg" onClick={onUpgrade}>
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
  );
};

export default AIAssistantWidget;
