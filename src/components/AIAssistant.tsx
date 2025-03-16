import { useState, useRef, useEffect } from 'react';
import { Bot, Mic, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  
  // Predefined responses from AI assistant
  const aiResponses = [
    "I can help you search for apartments in Barcelona within your budget. Would you like to specify any preferred neighborhoods or amenities?",
    "Based on your job profile as a software engineer, I've found 15 potential opportunities in Barcelona. Would you like me to share more details?",
    "Your visa eligibility looks promising! As a citizen from your country, you'll need these 5 documents for your visa application. I can help you prepare them.",
    "I've analyzed the cost of living in Barcelona. For your lifestyle, expect to spend around €2,500 monthly. Would you like a detailed breakdown?",
    "I can connect you with local services like internet providers, healthcare options, and banking in Barcelona. Which would you like to explore first?"
  ];
  
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
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
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
          <p className="text-movesync-gray-dark text-lg">
            Experience conversational AI that guides you through every step of your relocation journey, 
            providing personalized assistance 24/7.
          </p>
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
                  <p className="text-sm text-white/80">Always online</p>
                </div>
              </div>
              <button 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                <X size={18} />
              </button>
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
                    placeholder="Type your message..."
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
              Speak naturally with your AI assistant, which understands context and provides human-like responses.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Personalized Guidance</h3>
            <p className="text-movesync-gray-dark">
              Receive tailored advice based on your unique relocation needs, preferences, and constraints.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
            <p className="text-movesync-gray-dark">
              Get instant support any time of day, with consistent quality and no waiting times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
