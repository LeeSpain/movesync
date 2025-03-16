
import { useState } from 'react';
import { Message, Country, aiResponses } from './types';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type ChatInterfaceProps = {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
};

const ChatInterface = ({ 
  countries, 
  selectedCountry, 
  setSelectedCountry 
}: ChatInterfaceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your MoveSync AI assistant. How can I help with your relocation today?",
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Handle country change
  const handleCountryChange = (countryId: string) => {
    const country = countries.find(c => c.id === countryId) || countries[0];
    setSelectedCountry(country);
    
    // Add a message about the country change
    const systemMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I see you're interested in relocating to ${country.name} ${country.flag}. I'll tailor my assistance for your move to ${country.name}. What specific help do you need?`,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };
  
  // Handle sending a message
  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const countryResponses = aiResponses[selectedCountry.id as keyof typeof aiResponses];
      const randomResponse = countryResponses[Math.floor(Math.random() * countryResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <ChatHeader 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
        countries={countries}
      />
      
      <ChatMessages 
        messages={messages} 
        isTyping={isTyping}
      />
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};

export default ChatInterface;
