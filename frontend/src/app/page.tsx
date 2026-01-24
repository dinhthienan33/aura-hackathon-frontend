"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Avatar from "@/components/Avatar";
import ChatInterface from "@/components/ChatInterface";
import SOSButton from "@/components/SOSButton";
import VoiceButton from "@/components/VoiceButton";
import StatusBar from "@/components/StatusBar";
import SettingsPanel from "@/components/SettingsPanel";
import WelcomeModal from "@/components/WelcomeModal";
import { Message, AuraState, Settings } from "@/types";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [auraState, setAuraState] = useState<AuraState>("idle");
  const [settings, setSettings] = useState<Settings>({
    userName: "Bạn",
    fontSize: "large",
    voiceSpeed: "normal",
    theme: "light",
  });

  // Simulate connection status
  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Add welcome message from Aura
  useEffect(() => {
    if (!showWelcome && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        text: `Xin chào ${settings.userName}! Tôi là Aura, người bạn đồng hành của bạn. Hôm nay bạn cảm thấy thế nào? Tôi luôn ở đây để lắng nghe và trò chuyện cùng bạn. 💙`,
        sender: "aura",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setIsSpeaking(true);
      setAuraState("speaking");
      setTimeout(() => {
        setIsSpeaking(false);
        setAuraState("idle");
      }, 4000);
    }
  }, [showWelcome, settings.userName]);

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setAuraState("thinking");

      // Simulate Aura's response (will be replaced with actual API call)
      setTimeout(() => {
        const responses = [
          `Tôi hiểu ${settings.userName} ạ. Điều đó nghe có vẻ rất ý nghĩa. Bạn có muốn kể thêm cho tôi nghe không?`,
          `Cảm ơn ${settings.userName} đã chia sẻ với tôi. Tôi rất vui được lắng nghe bạn.`,
          `Đúng vậy ${settings.userName}! Tôi luôn ở đây cùng bạn. Chúng ta có thể nói chuyện về bất cứ điều gì bạn muốn.`,
          `Tôi nhớ lần trước ${settings.userName} có kể về gia đình mình. Gần đây mọi người thế nào rồi ạ?`,
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        const auraMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "aura",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, auraMessage]);
        setAuraState("speaking");
        setIsSpeaking(true);

        setTimeout(() => {
          setIsSpeaking(false);
          setAuraState("idle");
        }, 3000);
      }, 1500);
    },
    [settings.userName],
  );

  const handleVoiceStart = useCallback(() => {
    setIsListening(true);
    setAuraState("listening");
    setCurrentTranscript("");
  }, []);

  const handleVoiceEnd = useCallback(
    (transcript: string) => {
      setIsListening(false);
      setCurrentTranscript("");
      if (transcript) {
        handleSendMessage(transcript);
      } else {
        setAuraState("idle");
      }
    },
    [handleSendMessage],
  );

  const handleVoiceTranscript = useCallback((transcript: string) => {
    setCurrentTranscript(transcript);
  }, []);

  const handleSOSClick = useCallback(() => {
    const sosMessage: Message = {
      id: Date.now().toString(),
      text: "🆘 YÊU CẦU HỖ TRỢ KHẨN CẤP",
      sender: "system",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, sosMessage]);

    setTimeout(() => {
      const auraResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `${settings.userName} ơi, tôi đã nhận được yêu cầu hỗ trợ của bạn. Tôi đang liên hệ với người thân của bạn ngay. Bạn có thể cho tôi biết bạn cần giúp đỡ gì không?`,
        sender: "aura",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, auraResponse]);
      setAuraState("speaking");
      setIsSpeaking(true);

      setTimeout(() => {
        setIsSpeaking(false);
        setAuraState("idle");
      }, 4000);
    }, 500);
  }, [settings.userName]);

  const handleCloseWelcome = useCallback((name: string) => {
    setSettings((prev) => ({ ...prev, userName: name }));
    setShowWelcome(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Welcome Modal */}
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}

      {/* Status Bar */}
      <StatusBar
        isConnected={isConnected}
        onSettingsClick={() => setShowSettings(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full">
        {/* Avatar Section */}
        <div className="lg:w-1/3 flex flex-col items-center justify-center">
          <Avatar
            state={auraState}
            isSpeaking={isSpeaking}
            isListening={isListening}
          />

          {/* Voice Button */}
          <div className="mt-6">
            <VoiceButton
              onVoiceStart={handleVoiceStart}
              onVoiceEnd={handleVoiceEnd}
              onTranscript={handleVoiceTranscript}
              isListening={isListening}
              disabled={!isConnected}
            />
          </div>

          {/* Current Transcript Display */}
          {currentTranscript && (
            <div className="mt-4 p-4 bg-white rounded-2xl shadow-lg max-w-sm">
              <p className="text-elderly-base text-slate-600 italic">
                "{currentTranscript}..."
              </p>
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className="lg:w-2/3 flex flex-col">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={auraState === "thinking"}
            userName={settings.userName}
          />
        </div>
      </div>

      {/* SOS Button - Always visible */}
      <SOSButton onClick={handleSOSClick} />

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </main>
  );
}
