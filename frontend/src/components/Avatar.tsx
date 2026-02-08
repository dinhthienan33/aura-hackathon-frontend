"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AvatarProps } from "@/types";
import { Headphones, MessageCircle, Volume2, Smile } from "lucide-react";

export default function Avatar({
  state,
  isSpeaking,
  isListening,
}: AvatarProps) {
  const [mouthOpen, setMouthOpen] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);

  // Lip sync animation when speaking
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setMouthOpen((prev) => !prev);
      }, 150);
      return () => clearInterval(interval);
    } else {
      setMouthOpen(false);
    }
  }, [isSpeaking]);

  // Natural blinking animation
  useEffect(() => {
    const blink = () => {
      setEyesClosed(true);
      setTimeout(() => setEyesClosed(false), 150);
    };

    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Head tilt when listening (showing attention)
  useEffect(() => {
    if (isListening) {
      setHeadTilt(-5);
    } else {
      setHeadTilt(0);
    }
  }, [isListening]);

  // Get state-specific styling with warm colors
  const getStateStyle = () => {
    switch (state) {
      case "listening":
        return "ring-4 ring-sage-400 ring-opacity-60";
      case "thinking":
        return "ring-4 ring-aura-accent ring-opacity-60";
      case "speaking":
        return "ring-4 ring-sage-500 ring-opacity-60";
      default:
        return "";
    }
  };

  // Get state label in Vietnamese with icon
  const getStateLabel = () => {
    switch (state) {
      case "listening":
        return (
          <span className="flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            Đang lắng nghe...
          </span>
        );
      case "thinking":
        return (
          <span className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Đang suy nghĩ...
          </span>
        );
      case "speaking":
        return (
          <span className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Đang nói...
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-2">
            <Smile className="w-5 h-5" />
            Sẵn sàng trò chuyện
          </span>
        );
    }
  };

  // Get state color
  const getStateBgColor = () => {
    switch (state) {
      case "listening":
        return "bg-sage-100 text-sage-700";
      case "thinking":
        return "bg-amber-100 text-amber-700";
      case "speaking":
        return "bg-sage-200 text-sage-800";
      default:
        return "bg-cream-200 text-navy-700";
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Container with warm glow */}
      <motion.div
        animate={{ rotate: headTilt }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`
          relative w-64 h-64 md:w-80 md:h-80 
          rounded-full overflow-hidden 
          bg-gradient-to-br from-cream-100 to-sage-100 
          shadow-2xl
          transition-all duration-300
          ${getStateStyle()}
          ${state === "idle" ? "animate-breathe" : ""}
        `}
        style={{
          boxShadow: `
            0 0 60px rgba(74, 124, 89, 0.2),
            0 0 100px rgba(212, 165, 116, 0.15)
          `,
        }}
      >
        {/* SVG Avatar with warmer tones */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle - Warm gradient */}
          <circle cx="100" cy="100" r="98" fill="url(#warmBgGradient)" />

          {/* Face Base - Warm skin tone */}
          <ellipse cx="100" cy="110" rx="70" ry="75" fill="#FFDFC4" />

          {/* Hair - Warm brown */}
          <path
            d="M30 90 Q30 30, 100 25 Q170 30, 170 90 Q165 70, 140 65 Q120 60, 100 60 Q80 60, 60 65 Q35 70, 30 90"
            fill="#8B7355"
          />

          {/* Left Eye */}
          <g transform="translate(65, 95)">
            <ellipse
              cx="0"
              cy="0"
              rx="12"
              ry={eyesClosed ? 2 : 15}
              fill="white"
              className="transition-all duration-150"
            />
            {!eyesClosed && (
              <>
                <circle
                  cx={isListening ? -2 : 0}
                  cy="2"
                  r="7"
                  fill="#4A3728"
                  className="transition-all duration-300"
                />
                <circle cx={isListening ? -4 : -2} cy="0" r="2" fill="white" />
              </>
            )}
          </g>

          {/* Right Eye */}
          <g transform="translate(135, 95)">
            <ellipse
              cx="0"
              cy="0"
              rx="12"
              ry={eyesClosed ? 2 : 15}
              fill="white"
              className="transition-all duration-150"
            />
            {!eyesClosed && (
              <>
                <circle
                  cx={isListening ? -2 : 0}
                  cy="2"
                  r="7"
                  fill="#4A3728"
                  className="transition-all duration-300"
                />
                <circle cx={isListening ? -4 : -2} cy="0" r="2" fill="white" />
              </>
            )}
          </g>

          {/* Eyebrows - Warm brown */}
          <path
            d="M50 78 Q65 72, 80 78"
            stroke="#6B5344"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className={isListening ? "transform -translate-y-1" : ""}
          />
          <path
            d="M120 78 Q135 72, 150 78"
            stroke="#6B5344"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className={isListening ? "transform -translate-y-1" : ""}
          />

          {/* Nose */}
          <path
            d="M100 105 Q95 120, 100 130 Q105 130, 105 125"
            stroke="#E5B89A"
            strokeWidth="2"
            fill="none"
          />

          {/* Mouth - Warm coral color */}
          <g transform="translate(100, 150)">
            {isSpeaking ? (
              // Speaking mouth - animated
              <ellipse
                cx="0"
                cy="0"
                rx="15"
                ry={mouthOpen ? 12 : 5}
                fill="#D4837A"
                className="transition-all duration-100"
              />
            ) : (
              // Warm smiling mouth
              <path
                d="M-20 0 Q0 18, 20 0"
                stroke="#D4837A"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </g>

          {/* Warm blush */}
          <circle cx="55" cy="125" r="14" fill="#FFB8A8" opacity="0.4" />
          <circle cx="145" cy="125" r="14" fill="#FFB8A8" opacity="0.4" />

          {/* Glasses with warm frame */}
          <g stroke="#5D4E37" strokeWidth="2" fill="none">
            <circle cx="65" cy="95" r="20" />
            <circle cx="135" cy="95" r="20" />
            <path d="M85 95 L115 95" />
            <path d="M45 95 L30 85" />
            <path d="M155 95 L170 85" />
          </g>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="warmBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDF8F3" />
              <stop offset="50%" stopColor="#F4F7F2" />
              <stop offset="100%" stopColor="#E8EFE4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Voice Visualizer Ring - Active when speaking/listening */}
        {(isListening || isSpeaking) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 rounded-full border-4 border-sage-400 opacity-30 animate-ping" />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: `
                  0 0 40px rgba(74, 124, 89, 0.4),
                  0 0 80px rgba(74, 124, 89, 0.2)
                `,
              }}
            />
          </motion.div>
        )}

        {/* Thinking Animation Overlay */}
        {state === "thinking" && (
          <div className="absolute top-4 right-4">
            <div className="flex space-x-1">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                className="w-3 h-3 bg-aura-accent rounded-full"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                className="w-3 h-3 bg-aura-accent rounded-full"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                className="w-3 h-3 bg-aura-accent rounded-full"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Avatar Name */}
      <h2 className="mt-6 text-elderly-2xl font-display font-bold text-navy-800">
        Aura
      </h2>

      {/* Status Label with warm colors */}
      <motion.p
        key={state}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          mt-2 text-elderly-lg px-6 py-2 rounded-warm-lg
          transition-all duration-300
          ${getStateBgColor()}
        `}
      >
        {getStateLabel()}
      </motion.p>
    </div>
  );
}
