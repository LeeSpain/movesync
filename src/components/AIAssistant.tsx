
import { useState, useRef, useEffect } from 'react';
import { Bot, Globe, Mic, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Message = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
};

type Country = {
  id: string;
  name: string;
  flag: string;
};

const countries: Country[] = [
  { id: 'spain', name: 'Spain', flag: '🇪🇸' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'usa', name: 'United States', flag: '🇺🇸' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺' },
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your MoveSync AI assistant. How can I help with your relocation today?",
      timestamp: new Date(),
    }
  ]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Predefined responses from AI assistant based on country
  const aiResponses = {
    spain: [
      "I can help you search for apartments in Barcelona within your budget. Would you like to specify any preferred neighborhoods or amenities?",
      "Based on your job profile as a software engineer, I've found 15 potential opportunities in Barcelona. Would you like me to share more details?",
      "Your visa eligibility for Spain looks promising! As a citizen from your country, you'll need these 5 documents for your visa application. I can help you prepare them.",
      "I've analyzed the cost of living in Barcelona. For your lifestyle, expect to spend around €2,500 monthly. Would you like a detailed breakdown?",
      "I can connect you with local services like internet providers, healthcare options, and banking in Barcelona. Which would you like to explore first?"
    ],
    uk: [
      "I can help you search for flats in London within your budget. Would you like to specify any preferred neighborhoods or amenities?",
      "Based on your job profile as a software engineer, I've found 20 potential opportunities in London. Would you like me to share more details?",
      "Your visa eligibility for the UK looks promising! As a citizen from your country, you'll need these specific documents for your visa application. I can help you prepare them.",
      "I've analyzed the cost of living in London. For your lifestyle, expect to spend around £3,000 monthly. Would you like a detailed breakdown?",
      "I can connect you with local services like internet providers, NHS registration, and banking in London. Which would you like to explore first?"
    ],
    usa: [
      "I can help you search for apartments in New York within your budget. Would you like to specify any preferred neighborhoods or amenities?",
      "Based on your job profile as a software engineer, I've found 25 potential opportunities in the Bay Area. Would you like me to share more details?",
      "Your visa eligibility for the US looks promising! As a citizen from your country, you'll need these specific documents for your visa application. I can help you prepare them.",
      "I've analyzed the cost of living in San Francisco. For your lifestyle, expect to spend around $4,000 monthly. Would you like a detailed breakdown?",
      "I can connect you with local services like internet providers, healthcare options, and banking in New York. Which would you like to explore first?"
    ],
    australia: [
      "I can help you search for apartments in Sydney within your budget. Would you like to specify any preferred neighborhoods or amenities?",
      "Based on your job profile as a software engineer, I've found 18 potential opportunities in Melbourne. Would you like me to share more details?",
      "Your visa eligibility for Australia looks promising! As a citizen from your country, you'll need these specific documents for your visa application. I can help you prepare them.",
      "I've analyzed the cost of living in Sydney. For your lifestyle, expect to spend around A$3,500 monthly. Would you like a detailed breakdown?",
      "I can connect you with local services like internet providers, healthcare options, and banking in Australia. Which would you like to explore first?"
    ]
  };
  
  // Handle scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Handle intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
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
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
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
  
  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section 
      id="ai-assistant" 
      className="section-spacing bg-movesync-gray-light"
      ref={sectionRef}
    >
      <div className="container-content">
        {/* Section header */}
        <div 
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="heading-lg mb-4">
            Meet Your <span className="text-gradient">AI Assistant</span>
          </h2>
          <p className="text-movesync-gray-dark text-lg mb-8">
            Experience conversational AI that guides you through every step of your relocation journey, 
            providing personalized assistance 24/7 in multiple countries and languages.
          </p>
          <div className="flex justify-center items-center gap-2">
            <Globe className="text-movesync-blue" size={24} />
            <p className="text-movesync-gray-dark font-medium">Available in 4 countries, with more coming soon!</p>
          </div>
        </div>
        
        {/* AI Assistant Demo */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between bg-movesync-blue text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-medium">MoveSync Assistant</p>
                  <div className="flex items-center gap-1 text-sm text-white/80">
                    <span>Always online</span>
                    <span className="mx-1">•</span>
                    <span>{selectedCountry.flag} {selectedCountry.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  defaultValue={selectedCountry.id}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger className="w-[180px] bg-white/10 border-none text-white hover:bg-white/20">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button 
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* Chat messages */}
            <div 
              ref={messagesContainerRef}
              className="p-4 h-96 overflow-y-auto"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`mb-4 flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      msg.role === 'assistant' 
                        ? "bg-movesync-gray-light text-movesync-black rounded-tl-none" 
                        : "bg-movesync-blue text-white rounded-tr-none"
                    )}
                  >
                    <p>{msg.content}</p>
                    <p 
                      className={cn(
                        "text-xs mt-1 text-right",
                        msg.role === 'assistant' ? "text-movesync-gray" : "text-white/70"
                      )}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-movesync-gray-light text-movesync-black rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-movesync-gray rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-movesync-gray rounded-full animate-pulse animation-delay-200"></div>
                      <div className="w-2 h-2 bg-movesync-gray rounded-full animate-pulse animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-movesync-gray-light flex items-center justify-center text-movesync-gray-dark hover:bg-movesync-gray-light/70 transition-colors">
                  <Mic size={20} />
                </button>
                <div className="flex-1 relative">
                  <textarea 
                    className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-movesync-blue/30 resize-none"
                    placeholder={`Ask about relocating to ${selectedCountry.name}...`}
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-movesync-blue text-white flex items-center justify-center hover:bg-movesync-blue-dark transition-colors"
                    onClick={handleSendMessage}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key capabilities */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-700 delay-500 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Natural Conversation</h3>
            <p className="text-movesync-gray-dark">
              Speak naturally with your AI assistant, which understands context and provides human-like responses in multiple languages.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Personalized Guidance</h3>
            <p className="text-movesync-gray-dark">
              Receive tailored advice based on your desired destination country, unique relocation needs, preferences, and constraints.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">24/7 Global Availability</h3>
            <p className="text-movesync-gray-dark">
              Get instant support for any destination country, any time of day, with consistent quality and no waiting times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
