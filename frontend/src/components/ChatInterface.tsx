"use client";

import { useEffect, useRef, useState } from "react";
import { ChatInterfaceProps, Message } from "@/types";
import { Send, User } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function ChatInterface({
  messages,
  onSendMessage,
  isTyping,
  userName,
  language,
}: ChatInterfaceProps) {
  const t = useTranslation(language);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
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

  const formatTime = (date: Date) => {
    const locale = language === "vi" ? "vi-VN" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === "user";
    const isSystem = message.sender === "system";

    if (isSystem) {
      return (
        <div
          key={message.id}
          className="flex justify-center my-4 message-enter"
        >
          <div className="bg-red-100 text-red-700 px-6 py-3 rounded-2xl text-elderly-lg font-semibold animate-pulse">
            {message.text}
          </div>
        </div>
      );
    }

    return (
      <div
        key={message.id}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 message-enter`}
      >
        <div
          className={`flex items-end gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : ""}`}
        >
          {/* Avatar Icon */}
          <div
            className={`
            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
            ${isUser ? "bg-blue-500" : "bg-gradient-to-br from-purple-500 to-blue-500"}
          `}
          >
            {isUser ? (
              <User className="w-6 h-6 text-white" />
            ) : (
              <span className="text-xl">🌟</span>
            )}
          </div>

          {/* Message Bubble */}
          <div
            className={`
            px-5 py-4 rounded-3xl
            ${
              isUser
                ? "bg-blue-500 text-white rounded-br-lg"
                : "bg-white text-slate-700 rounded-bl-lg shadow-lg"
            }
          `}
          >
            <p className="text-elderly-base leading-relaxed whitespace-pre-wrap">
              {message.text}
            </p>
            <p
              className={`
              text-sm mt-2 
              ${isUser ? "text-blue-100" : "text-slate-400"}
            `}
            >
              {formatTime(message.timestamp)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
        <h3 className="text-elderly-xl font-bold text-white">{t.chatTitle}</h3>
        <p className="text-elderly-sm text-blue-100 mt-1">
          {t.chatSubtitle.replace("{{userName}}", userName)}
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 chat-container bg-gradient-to-b from-slate-50 to-white min-h-[300px] max-h-[500px]">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="text-6xl mb-4">{t.emptyStateGreeting}</div>
            <p className="text-elderly-lg text-center">{t.emptyStateMessage}</p>
          </div>
        ) : (
          <>
            {messages.map(renderMessage)}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-end gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🌟</span>
                  </div>
                  <div className="bg-white px-5 py-4 rounded-3xl rounded-bl-lg shadow-lg">
                    <div className="flex space-x-2 loading-dots">
                      <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                      <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                      <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-slate-50 border-t border-slate-200"
      >
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="
              flex-1 px-6 py-4 
              text-elderly-base
              bg-white border-2 border-slate-200 
              rounded-2xl
              focus:border-blue-400 focus:ring-4 focus:ring-blue-100
              transition-all duration-200
              placeholder:text-slate-400
            "
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="
              px-6 py-4 
              bg-blue-500 text-white 
              rounded-2xl
              hover:bg-blue-600 
              disabled:bg-slate-300 disabled:cursor-not-allowed
              transition-all duration-200
              flex items-center justify-center
              min-w-[60px]
            "
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <p className="text-sm text-slate-400 mt-2 text-center">
          {language === "vi"
            ? "Nhấn Enter hoặc nút gửi để gửi tin nhắn • Hoặc nhấn nút micro để nói"
            : "Press Enter or send button to send • Or press mic button to speak"}
        </p>
      </form>
    </div>
  );
}
