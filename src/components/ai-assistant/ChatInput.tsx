
import { useState } from 'react';
import { Mic, Send } from 'lucide-react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  selectedCountry: { name: string };
};

const ChatInput = ({ onSendMessage, selectedCountry }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    onSendMessage(message);
    setMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-full bg-movesync-gray-light flex items-center justify-center text-movesync-gray-dark hover:bg-movesync-gray-light/70 transition-colors">
          <Mic size={20} />
        </button>
        <div className="flex-1 relative">
          <textarea 
            className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-movesync-blue/30 resize-none"
            placeholder={`Ask about relocating within or to ${selectedCountry.name}...`}
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
  );
};

export default ChatInput;
