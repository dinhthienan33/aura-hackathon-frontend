/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Warm & Minimalist Color Palette for Elderly Care
      colors: {
        // Primary warm tones
        cream: {
          50: "#FFFEFB",
          100: "#FDF8F3",
          200: "#FAF5EF",
          300: "#F5EDE3",
          400: "#EDE1D3",
          500: "#E5D5C3",
        },
        // Sage Green - calming accent
        sage: {
          50: "#F4F7F2",
          100: "#E8EFE4",
          200: "#D1DFC9",
          300: "#B5CBAA",
          400: "#9CAF88",
          500: "#7D9970",
          600: "#637A59",
          700: "#4A5C43",
        },
        // Deep Navy - trustworthy text
        navy: {
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#829AB1",
          500: "#627D98",
          600: "#486581",
          700: "#334E68",
          800: "#243B53",
          900: "#1E3A5F",
          950: "#102A43",
        },
        // Warm supporting colors
        warmGray: {
          50: "#FAF9F7",
          100: "#F5F3F0",
          200: "#E8E4DE",
          300: "#D6D0C7",
          400: "#B8AFA2",
          500: "#9A8F7F",
        },
        // Semantic colors (elderly-friendly high contrast)
        aura: {
          primary: "#4A7C59",    // Sage green - primary actions
          secondary: "#1E3A5F",  // Navy - secondary actions
          accent: "#D4A574",     // Warm amber accent
          success: "#2D6A4F",    // Deep green - positive
          warning: "#E9C46A",    // Warm yellow - caution
          danger: "#C1121F",     // Clear red - emergency
          light: "#FDF8F3",      // Cream background
          dark: "#1E3A5F",       // Navy text
        },
      },
      // Typography - Inter/Lexend with elderly-friendly sizes
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Lexend", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Elderly-friendly minimum 20px base
        "elderly-sm": ["1.125rem", { lineHeight: "1.75rem" }],   // 18px
        "elderly-base": ["1.25rem", { lineHeight: "2rem" }],     // 20px - minimum
        "elderly-lg": ["1.5rem", { lineHeight: "2.25rem" }],     // 24px
        "elderly-xl": ["1.875rem", { lineHeight: "2.5rem" }],    // 30px
        "elderly-2xl": ["2.25rem", { lineHeight: "2.75rem" }],   // 36px
        "elderly-3xl": ["3rem", { lineHeight: "3.5rem" }],       // 48px
        "elderly-4xl": ["3.75rem", { lineHeight: "4rem" }],      // 60px
      },
      // Animations for warm, friendly UI
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "blink": "blink 4s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "lip-sync": "lipSync 0.15s ease-in-out infinite",
        // New warm animations
        "voice-glow": "voiceGlow 1.5s ease-in-out infinite",
        "ripple": "ripple 0.6s ease-out",
        "red-alert": "redAlert 1s ease-in-out infinite",
        "gentle-fade": "gentleFade 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "warm-pulse": "warmPulse 2s ease-in-out infinite",
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
        // Voice visualizer glow
        voiceGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(74, 124, 89, 0.3), 0 0 40px rgba(74, 124, 89, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(74, 124, 89, 0.5), 0 0 80px rgba(74, 124, 89, 0.3)",
          },
        },
        // Button ripple effect
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        // Emergency red alert
        redAlert: {
          "0%, 100%": { 
            boxShadow: "inset 0 0 0 4px rgba(193, 18, 31, 0.3)",
            borderColor: "rgba(193, 18, 31, 0.5)",
          },
          "50%": { 
            boxShadow: "inset 0 0 0 4px rgba(193, 18, 31, 0.7)",
            borderColor: "rgba(193, 18, 31, 1)",
          },
        },
        // Gentle fade in
        gentleFade: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Slide up animation
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Warm pulse for active states
        warmPulse: {
          "0%, 100%": { 
            boxShadow: "0 0 0 0 rgba(212, 165, 116, 0.4)",
          },
          "50%": { 
            boxShadow: "0 0 0 15px rgba(212, 165, 116, 0)",
          },
        },
      },
      // Spacing for larger touch targets
      spacing: {
        "touch-min": "48px",  // Minimum touch target size
        "touch-lg": "64px",   // Large touch target
        "touch-xl": "80px",   // Extra large for primary actions
      },
      // Border radius for friendly, rounded UI
      borderRadius: {
        "warm": "1rem",
        "warm-lg": "1.5rem",
        "warm-xl": "2rem",
        "warm-2xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
