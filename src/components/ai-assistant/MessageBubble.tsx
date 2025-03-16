
import { cn } from '@/lib/utils';
import { Message } from './types';

type MessageBubbleProps = {
  message: Message;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div 
      className={`mb-4 flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isAssistant 
            ? "bg-movesync-gray-light text-movesync-black rounded-tl-none" 
            : "bg-movesync-blue text-white rounded-tr-none"
        )}
      >
        <p>{message.content}</p>
        <p 
          className={cn(
            "text-xs mt-1 text-right",
            isAssistant ? "text-movesync-gray" : "text-white/70"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
