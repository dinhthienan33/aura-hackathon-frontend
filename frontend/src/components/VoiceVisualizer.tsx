"use client";

import { useEffect, useState, useRef } from "react";

interface VoiceVisualizerProps {
  isActive: boolean;
  audioLevel?: number;
  size?: "sm" | "md" | "lg";
  color?: "sage" | "accent" | "danger";
}

export default function VoiceVisualizer({
  isActive,
  audioLevel = 0,
  size = "lg",
  color = "sage",
}: VoiceVisualizerProps) {
  const [bars, setBars] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const animationRef = useRef<number>();

  // Size configurations
  const sizeConfig = {
    sm: { container: "w-24 h-24", bar: "w-1", gap: "gap-1" },
    md: { container: "w-32 h-32", bar: "w-1.5", gap: "gap-1.5" },
    lg: { container: "w-48 h-48", bar: "w-2", gap: "gap-2" },
  };

  // Color configurations
  const colorConfig = {
    sage: {
      gradient: "from-sage-400 to-sage-600",
      glow: "rgba(74, 124, 89, 0.5)",
    },
    accent: {
      gradient: "from-amber-400 to-amber-600",
      glow: "rgba(212, 165, 116, 0.5)",
    },
    danger: {
      gradient: "from-red-500 to-red-700",
      glow: "rgba(193, 18, 31, 0.5)",
    },
  };

  // Simulate audio visualization
  useEffect(() => {
    if (isActive) {
      const animate = () => {
        setBars((prev) =>
          prev.map(() => {
            const base = audioLevel > 0 ? audioLevel / 100 : Math.random();
            return Math.max(0.15, Math.min(1, base * (0.5 + Math.random() * 0.5)));
          })
        );
        animationRef.current = requestAnimationFrame(animate);
      };
      
      const slowDown = setInterval(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 100);

      return () => {
        clearInterval(slowDown);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      setBars([0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]);
    }
  }, [isActive, audioLevel]);

  return (
    <div
      className={`
        ${sizeConfig[size].container}
        relative flex items-center justify-center
        rounded-full
        transition-all duration-300
        ${isActive ? "voice-glow" : ""}
      `}
      style={{
        boxShadow: isActive
          ? `0 0 40px ${colorConfig[color].glow}, 0 0 80px ${colorConfig[color].glow}`
          : "none",
      }}
    >
      {/* Outer ring animation */}
      {isActive && (
        <>
          <div
            className={`
              absolute inset-0 rounded-full border-4 border-${color}-400
              animate-ping opacity-30
            `}
          />
          <div
            className={`
              absolute inset-2 rounded-full border-2 border-${color}-300
              animate-pulse opacity-50
            `}
          />
        </>
      )}

      {/* Center visualization */}
      <div
        className={`
          relative z-10
          flex items-end justify-center
          ${sizeConfig[size].gap}
          h-1/2
        `}
      >
        {bars.map((height, index) => (
          <div
            key={index}
            className={`
              ${sizeConfig[size].bar}
              rounded-full
              bg-gradient-to-t ${colorConfig[color].gradient}
              transition-all duration-100 ease-out
            `}
            style={{
              height: `${height * 100}%`,
              minHeight: "4px",
              opacity: isActive ? 0.9 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Inner glow overlay */}
      {isActive && (
        <div
          className={`
            absolute inset-4 rounded-full
            bg-gradient-radial from-white/20 to-transparent
            pointer-events-none
          `}
        />
      )}
    </div>
  );
}
