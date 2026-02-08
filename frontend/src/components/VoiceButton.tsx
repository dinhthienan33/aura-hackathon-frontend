"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VoiceButtonProps } from "@/types";
import { Mic, Square } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function VoiceButton({
  onVoiceStart,
  onVoiceEnd,
  isListening,
  disabled,
  language,
}: VoiceButtonProps) {
  const t = useTranslation(language);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isSupported, setIsSupported] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.navigator.mediaDevices) {
      setIsSupported(false);
    }
  }, []);

  // Audio level simulation for visual feedback
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(30 + Math.random() * 70);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isListening]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        onVoiceEnd(blob);
        chunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      onVoiceStart();
      
      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    } catch (err) {
      console.error("Failed to start recording:", err);
      alert(t.micAccessDenied);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      
      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate([30, 50, 30]);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !isSupported) return;

    // Create ripple effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }

    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center">
        <div className="w-28 h-28 bg-warmGray-200 rounded-full flex items-center justify-center mx-auto">
          <Mic className="w-12 h-12 text-warmGray-400" />
        </div>
        <p className="text-elderly-base text-warmGray-500 mt-4">
          {t.browserNotSupported}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Giant Microphone Button */}
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
        whileTap={{ scale: 0.95 }}
        className={`
          relative overflow-hidden
          w-28 h-28 md:w-32 md:h-32
          rounded-full
          flex items-center justify-center
          transition-all duration-300
          shadow-2xl
          ${
            disabled
              ? "bg-warmGray-300 cursor-not-allowed"
              : isListening
                ? "bg-gradient-to-br from-aura-danger to-red-700"
                : "bg-gradient-to-br from-sage-400 to-sage-600 hover:from-sage-500 hover:to-sage-700"
          }
        `}
        style={{
          boxShadow: isListening
            ? `0 0 0 ${audioLevel / 5}px rgba(193, 18, 31, 0.3), 0 8px 32px rgba(193, 18, 31, 0.4)`
            : "0 8px 32px rgba(74, 124, 89, 0.3)",
        }}
        aria-label={isListening ? t.stopRecording : t.startSpeaking}
      >
        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute rounded-full bg-white/40 pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Audio level visualization */}
        {isListening && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,${audioLevel / 200}) 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Icon */}
        <div className="relative z-10">
          {isListening ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg"
            />
          ) : (
            <Mic className="w-12 h-12 md:w-14 md:h-14 text-white" />
          )}
        </div>

        {/* Pulsing ring when recording */}
        {isListening && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full border-4 border-white/30"
            />
          </>
        )}
      </motion.button>

      {/* Label */}
      <motion.p
        key={isListening ? "recording" : "idle"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          mt-4 text-elderly-lg font-medium
          ${isListening ? "text-aura-danger" : "text-navy-700"}
        `}
      >
        {isListening ? t.recordingLabel : t.pressToSpeak}
      </motion.p>

      {/* Hint text */}
      <p className="mt-1 text-elderly-sm text-warmGray-500">
        {isListening ? t.pressToStop : t.stayStillHint}
      </p>
    </div>
  );
}
