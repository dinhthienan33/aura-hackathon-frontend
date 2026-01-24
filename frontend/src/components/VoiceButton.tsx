"use client";

import { useEffect, useRef, useState } from "react";
import { VoiceButtonProps } from "@/types";
import { Mic, MicOff, Volume2 } from "lucide-react";

export default function VoiceButton({
  onVoiceStart,
  onVoiceEnd,
  onTranscript,
  isListening,
  disabled,
}: VoiceButtonProps) {
  const recognitionRef = useRef<any>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const finalTranscriptRef = useRef<string>("");

  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "vi-VN";

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (interimTranscript) {
          onTranscript(interimTranscript);
        }

        if (finalTranscript) {
          finalTranscriptRef.current += finalTranscript + " ";
          onTranscript(finalTranscriptRef.current.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          alert(
            "Vui lòng cho phép truy cập microphone để sử dụng tính năng này.",
          );
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  // Simulate audio level animation when listening
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isListening]);

  const handleClick = () => {
    if (disabled || !isSupported) return;

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Send final transcript after stopping
      setTimeout(() => {
        const transcript = finalTranscriptRef.current.trim();
        onVoiceEnd(transcript);
        finalTranscriptRef.current = ""; // Reset for next session
      }, 500);
    } else {
      // Start listening - reset transcript
      finalTranscriptRef.current = "";
      onVoiceStart();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error("Failed to start recognition:", e);
        }
      }

      // Auto-stop after 30 seconds for demo
      setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        const transcript = finalTranscriptRef.current.trim();
        onVoiceEnd(transcript);
        finalTranscriptRef.current = "";
      }, 30000);
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center">
        <div className="w-24 h-24 bg-slate-300 rounded-full flex items-center justify-center mx-auto">
          <MicOff className="w-12 h-12 text-slate-500" />
        </div>
        <p className="text-elderly-sm text-slate-500 mt-3">
          Trình duyệt không hỗ trợ nhận diện giọng nói
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Main Voice Button */}
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative
          w-24 h-24 md:w-28 md:h-28
          rounded-full
          flex items-center justify-center
          transition-all duration-300
          ${
            disabled
              ? "bg-slate-300 cursor-not-allowed"
              : isListening
                ? "bg-blue-500 mic-recording"
                : "bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-110 shadow-xl hover:shadow-2xl"
          }
        `}
        aria-label={isListening ? "Nhấn để dừng" : "Nhấn để nói"}
      >
        {/* Audio Level Rings */}
        {isListening && (
          <>
            <div
              className="absolute inset-0 rounded-full bg-blue-400 opacity-30"
              style={{
                transform: `scale(${1 + audioLevel / 200})`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute inset-0 rounded-full bg-blue-400 opacity-20"
              style={{
                transform: `scale(${1.2 + audioLevel / 150})`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </>
        )}

        {/* Icon */}
        <div className="relative z-10">
          {isListening ? (
            <Volume2 className="w-12 h-12 md:w-14 md:h-14 text-white animate-pulse" />
          ) : (
            <Mic className="w-12 h-12 md:w-14 md:h-14 text-white" />
          )}
        </div>
      </button>

      {/* Status Text */}
      <p
        className={`
        mt-4 text-elderly-lg font-semibold 
        transition-all duration-300
        ${isListening ? "text-blue-600" : "text-slate-600"}
      `}
      >
        {disabled
          ? "Đang kết nối..."
          : isListening
            ? "🎤 Đang nghe... Nhấn để dừng"
            : "🎙️ Nhấn để nói chuyện"}
      </p>

      {/* Help Text */}
      <p className="text-elderly-sm text-slate-500 mt-2 text-center max-w-[200px]">
        {isListening
          ? "Hãy nói rõ ràng và chậm rãi"
          : "Giữ microphone gần miệng khi nói"}
      </p>
    </div>
  );
}
