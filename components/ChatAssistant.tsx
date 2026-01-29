
import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, initChat } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "- Welcome to the world!\n\n- I'm Ingine, Rohit's AI assistant.\n\n- Type 'help' for info.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await sendMessage(input);
    const aiMessage: ChatMessage = { role: 'model', text: aiResponse || '...', timestamp: new Date() };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-6 z-[100] flex flex-col items-start w-[90vw] md:w-[450px]">
      <div className="w-full max-h-[400px] mb-4 bg-black/80 border-4 border-[#535355] p-4 flex flex-col text-xl overflow-hidden backdrop-blur-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
          <span className="text-yellow-400 font-bold">INGINE (Rohit's AI assistant.)</span>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-500">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((m, idx) => (
            <div key={idx} className="flex gap-2">
              <span className={m.role === 'user' ? 'text-white whitespace-nowrap' : 'text-teal-400 font-bold whitespace-nowrap'}>
                {m.role === 'user' ? '<You>' : '[Ingine]'}
              </span>
              <span className="text-white drop-shadow-[1px_1px_#000] whitespace-pre-wrap">
                {m.text}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="text-yellow-400 italic">- Ingine is thinking...</div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <span className="text-white">&gt;</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Press Enter to talk..."
            className="flex-1 bg-transparent border-none text-white outline-none focus:ring-0 placeholder-white/40"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;
