
import { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ChatMessage = {
  role: string;
  content: string;
};

type AIAssistantCardProps = {
  initialMessages: ChatMessage[];
};

const AIAssistantCard = ({ initialMessages }: AIAssistantCardProps) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialMessages);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: chatMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `Here's detailed information about ${chatMessage} for your move within or to Australia. Is there anything specific you'd like to know more about?`;
      setChatHistory([...chatHistory, { role: 'user', content: chatMessage }, { role: 'assistant', content: aiResponse }]);
    }, 1000);
    
    setChatMessage("");
  };

  return (
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
            placeholder="Ask me anything about your move within or to Australia..."
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
  );
};

export default AIAssistantCard;
