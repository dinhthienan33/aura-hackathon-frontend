"use client";

import { useEffect, useRef, useState } from "react";
import { Send, User, Mic, Image as ImageIcon, PlusCircle, Smile, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping?: boolean;
  agentName?: string;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  isTyping,
  agentName = "Aura",
}: ChatInterfaceProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-container">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          const showAvatar = !isUser && (idx === 0 || messages[idx - 1].role === "user");

          return (
            <div
              key={msg.id || idx}
              className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {showAvatar ? (
                    <span className="text-xs font-bold text-white uppercase">{agentName.charAt(0)}</span>
                  ) : <div className="w-8 h-8" />}
                </div>
              )}
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`
                  max-w-[70%] px-4 py-2.5 rounded-2xl text-elderly-base leading-relaxed
                  ${isUser 
                    ? "bg-gradient-to-r from-aura-accent to-navy-600 text-white rounded-br-sm" 
                    : "bg-warmGray-100 text-navy-900 rounded-bl-sm border border-warmGray-200"
                  }
                `}
              >
                {msg.content}
              </motion.div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-warmGray-200 flex-shrink-0 flex items-center justify-center overflow-hidden ml-1">
                  <User className="w-4 h-4 text-warmGray-500" />
                </div>
              )}
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex items-end gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex-shrink-0" />
            <div className="bg-warmGray-100 px-4 py-3 rounded-2xl rounded-bl-sm border border-warmGray-200">
               <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-warmGray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-warmGray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-warmGray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-warmGray-100 bg-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
           <button className="p-2 text-aura-accent hover:bg-aura-accent/10 rounded-full transition-colors">
            <PlusCircle className="w-6 h-6" />
          </button>
          <button className="p-2 text-aura-accent hover:bg-aura-accent/10 rounded-full transition-colors">
            <ImageIcon className="w-6 h-6" />
          </button>
          <button className="p-2 text-aura-accent hover:bg-aura-accent/10 rounded-full transition-colors">
             <Mic className="w-6 h-6" />
          </button>
          <div className="flex-1 px-4 py-2.5 bg-warmGray-100 rounded-full flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              placeholder="Aa"
              className="flex-1 bg-transparent border-none outline-none text-elderly-base text-navy-900 placeholder:text-warmGray-400"
            />
            <button className="text-aura-accent hover:scale-110 transition-transform">
              <Smile className="w-6 h-6" />
            </button>
          </div>
          {inputText.trim() ? (
             <button 
              onClick={handleSubmit}
              className="p-2 text-aura-accent hover:bg-aura-accent/10 rounded-full transition-colors"
            >
              <Send className="w-6 h-6" />
            </button>
          ) : (
            <button className="p-2 text-aura-accent hover:bg-aura-accent/10 rounded-full transition-colors">
              <ThumbsUp className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
