
import { useRef, useEffect } from 'react';
import { Message } from './types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

type ChatMessagesProps = {
  messages: Message[];
  isTyping: boolean;
};

const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div 
      ref={messagesContainerRef}
      className="p-4 h-96 overflow-y-auto"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default ChatMessages;
