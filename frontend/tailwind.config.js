/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elderly-friendly color palette - high contrast, warm tones
        aura: {
          primary: "#2563eb", // Blue - calming, trustworthy
          secondary: "#7c3aed", // Purple - friendly
          warm: "#f59e0b", // Warm orange
          success: "#10b981", // Green - positive
          danger: "#dc2626", // Red - emergency
          light: "#f8fafc",
          dark: "#1e293b",
        },
      },
      fontSize: {
        // Larger font sizes for elderly readability
        "elderly-sm": "1.125rem", // 18px
        "elderly-base": "1.25rem", // 20px
        "elderly-lg": "1.5rem", // 24px
        "elderly-xl": "1.875rem", // 30px
        "elderly-2xl": "2.25rem", // 36px
        "elderly-3xl": "3rem", // 48px
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        float: "float 3s ease-in-out infinite",
        blink: "blink 4s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "lip-sync": "lipSync 0.15s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 90%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.1)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        lipSync: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.7)" },
        },
      },
    },
  },
  plugins: [],
};
