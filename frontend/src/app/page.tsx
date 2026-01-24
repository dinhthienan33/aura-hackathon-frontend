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
import { getTTS, TextToSpeech } from "@/lib/tts";
import { useTranslation } from "@/lib/i18n";

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
    userName: "You",
    fontSize: "large",
    voiceSpeed: "normal",
    theme: "light",
    language: "en",
  });

  const t = useTranslation(settings.language);
  const ttsRef = useRef<TextToSpeech | null>(null);

  // Simulate connection status
  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize TTS
  useEffect(() => {
    ttsRef.current = getTTS();

    // Cleanup on unmount
    return () => {
      if (ttsRef.current) {
        ttsRef.current.stop();
      }
    };
  }, []);

  // Helper function to speak Aura's message
  const speakMessage = useCallback(
    async (text: string) => {
      if (!ttsRef.current) return;

      setIsSpeaking(true);
      setAuraState("speaking");

      try {
        const rate = TextToSpeech.getRateFromSetting(settings.voiceSpeed);
        const lang = settings.language === "vi" ? "vi-VN" : "en-US";

        await ttsRef.current.speak(text, {
          rate,
          lang,
          onEnd: () => {
            setIsSpeaking(false);
            setAuraState("idle");
          },
        });
      } catch (error) {
        console.error("[App] TTS error:", error);
        setIsSpeaking(false);
        setAuraState("idle");
      }
    },
    [settings.voiceSpeed, settings.language],
  );

  // Add welcome message from Aura
  useEffect(() => {
    if (!showWelcome && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        text: t.welcomeMessage.replace("{{userName}}", settings.userName),
        sender: "aura",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);

      // Speak welcome message
      setTimeout(() => {
        speakMessage(welcomeMessage.text);
      }, 500);
    }
  }, [showWelcome, settings.userName, t, speakMessage]);

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
          t.response1.replace("{{userName}}", settings.userName),
          t.response2.replace("{{userName}}", settings.userName),
          t.response3.replace("{{userName}}", settings.userName),
          t.response4.replace("{{userName}}", settings.userName),
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

        // Speak the response
        setTimeout(() => {
          speakMessage(randomResponse);
        }, 300);
      }, 1500);
    },
    [settings.userName, speakMessage],
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
    // Stop any ongoing speech
    if (ttsRef.current) {
      ttsRef.current.stop();
    }

    const sosMessage: Message = {
      id: Date.now().toString(),
      text: t.sosEmergency,
      sender: "system",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, sosMessage]);

    setTimeout(() => {
      const responseText = t.sosResponse.replace(
        "{{userName}}",
        settings.userName,
      );
      const auraResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "aura",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, auraResponse]);

      // Speak SOS response
      setTimeout(() => {
        speakMessage(responseText);
      }, 300);
    }, 500);
  }, [settings.userName, t, speakMessage]);

  const handleCloseWelcome = useCallback((name: string) => {
    setSettings((prev) => ({ ...prev, userName: name }));
    setShowWelcome(false);
  }, []);

  const handleLanguageChange = useCallback((language: "en" | "vi") => {
    setSettings((prev) => ({ ...prev, language }));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Welcome Modal */}
      {showWelcome && (
        <WelcomeModal
          onClose={handleCloseWelcome}
          language={settings.language}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {/* Header/Navbar */}
      <StatusBar
        isConnected={isConnected}
        onSettingsClick={() => setShowSettings(true)}
        language={settings.language}
      />

      {/* Hero Section - giới thiệu ngắn */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {t.welcome.replace("{{userName}}", settings.userName)} 👋
          </h2>
          <p className="text-lg text-blue-100">{t.heroSubtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar Section - Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-32">
                <h3 className="text-xl font-bold text-slate-700 mb-4 text-center">
                  {t.virtualAssistant}
                </h3>

                <div className="flex flex-col items-center">
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
                      language={settings.language}
                    />
                  </div>

                  {/* Current Transcript Display */}
                  {currentTranscript && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-2xl w-full">
                      <p className="text-base text-slate-600 italic text-center">
                        "{currentTranscript}..."
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="lg:col-span-2">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isTyping={auraState === "thinking"}
                userName={settings.userName}
                language={settings.language}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌟</span>
            <span className="font-bold text-lg">{t.appName}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">{t.appDescription}</span>
          </div>
          <div className="text-slate-400 text-sm">{t.footerCopyright}</div>
        </div>
      </footer>

      {/* SOS Button - Always visible */}
      <SOSButton onClick={handleSOSClick} language={settings.language} />

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
          language={settings.language}
        />
      )}
    </main>
  );
}
