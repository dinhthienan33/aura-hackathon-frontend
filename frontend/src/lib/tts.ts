/**
 * Text-to-Speech utilities using Web Speech API
 */

/**
 * Emoji to text mapping for different languages
 */
const emojiTranslations: Record<string, { en: string; vi: string }> = {
  "💙": { en: "blue heart", vi: "trái tim xanh dương" },
  "❤️": { en: "red heart", vi: "trái tim đỏ" },
  "💚": { en: "green heart", vi: "trái tim xanh lá" },
  "💛": { en: "yellow heart", vi: "trái tim vàng" },
  "💜": { en: "purple heart", vi: "trái tim tím" },
  "🖤": { en: "black heart", vi: "trái tim đen" },
  "🤍": { en: "white heart", vi: "trái tim trắng" },
  "🤎": { en: "brown heart", vi: "trái tim nâu" },
  "🧡": { en: "orange heart", vi: "trái tim cam" },
  "😊": { en: "smiling face", vi: "mặt cười" },
  "😀": { en: "grinning face", vi: "mặt cười toe" },
  "😃": { en: "smiling face with open mouth", vi: "mặt cười rộng" },
  "😄": { en: "smiling face with smiling eyes", vi: "mặt cười vui vẻ" },
  "😁": { en: "beaming face", vi: "mặt cười tươi" },
  "😅": { en: "grinning face with sweat", vi: "mặt cười ngượng" },
  "😂": { en: "laughing", vi: "cười lăn" },
  "🤣": { en: "rolling on the floor laughing", vi: "cười ngất" },
  "😭": { en: "crying", vi: "khóc" },
  "😢": { en: "crying face", vi: "mặt khóc" },
  "😔": { en: "sad", vi: "buồn" },
  "😞": { en: "disappointed", vi: "thất vọng" },
  "😟": { en: "worried", vi: "lo lắng" },
  "😥": { en: "sad but relieved", vi: "buồn nhẹ nhõm" },
  "👋": { en: "waving hand", vi: "vẫy tay" },
  "👍": { en: "thumbs up", vi: "thích" },
  "👎": { en: "thumbs down", vi: "không thích" },
  "🙏": { en: "folded hands", vi: "cảm ơn" },
  "👏": { en: "clapping hands", vi: "vỗ tay" },
  "🎉": { en: "party popper", vi: "pháo hoa" },
  "🎊": { en: "confetti ball", vi: "bóng confetti" },
  "✨": { en: "sparkles", vi: "lấp lánh" },
  "⭐": { en: "star", vi: "ngôi sao" },
  "🌟": { en: "glowing star", vi: "ngôi sao sáng" },
  "💫": { en: "dizzy", vi: "chóng mặt" },
  "🔥": { en: "fire", vi: "lửa" },
  "💧": { en: "droplet", vi: "giọt nước" },
  "💦": { en: "sweat droplets", vi: "giọt mồ hôi" },
  "☀️": { en: "sun", vi: "mặt trời" },
  "🌙": { en: "crescent moon", vi: "trăng khuyết" },
  "⚡": { en: "lightning", vi: "tia chớp" },
  "🌈": { en: "rainbow", vi: "cầu vồng" },
  "🎵": { en: "musical note", vi: "nốt nhạc" },
  "🎶": { en: "musical notes", vi: "nốt nhạc" },
  "🔔": { en: "bell", vi: "chuông" },
  "🔕": { en: "bell with slash", vi: "tắt chuông" },
  "📱": { en: "mobile phone", vi: "điện thoại" },
  "📞": { en: "telephone", vi: "điện thoại" },
  "☎️": { en: "telephone", vi: "điện thoại bàn" },
  "💬": { en: "speech balloon", vi: "bong bóng chat" },
  "💭": { en: "thought balloon", vi: "bong bóng suy nghĩ" },
  "🗨️": { en: "speech bubble", vi: "bong bóng nói" },
  "🏠": { en: "house", vi: "ngôi nhà" },
  "🏡": { en: "house with garden", vi: "nhà có vườn" },
  "🎂": { en: "birthday cake", vi: "bánh sinh nhật" },
  "🍰": { en: "cake", vi: "bánh ngọt" },
  "☕": { en: "coffee", vi: "cà phê" },
  "🍵": { en: "tea", vi: "trà" },
  "🎓": { en: "graduation cap", vi: "mũ tốt nghiệp" },
  "📚": { en: "books", vi: "sách" },
  "📖": { en: "open book", vi: "sách mở" },
  "✏️": { en: "pencil", vi: "bút chì" },
  "✒️": { en: "pen", vi: "bút mực" },
  "🆘": { en: "SOS button", vi: "nút SOS" },
  "🚨": { en: "police car light", vi: "đèn cảnh báo" },
  "⚠️": { en: "warning", vi: "cảnh báo" },
  "🎙️": { en: "microphone", vi: "micro" },
  "🎤": { en: "microphone", vi: "micro" },
  "🎧": { en: "headphone", vi: "tai nghe" },
  "🎨": { en: "artist palette", vi: "bảng màu" },
};

/**
 * Convert emojis to text based on language
 */
function convertEmojisToText(text: string, lang: "en-US" | "vi-VN"): string {
  const language = lang === "vi-VN" ? "vi" : "en";
  let result = text;

  // Replace each emoji with its text translation
  for (const [emoji, translations] of Object.entries(emojiTranslations)) {
    const replacement = translations[language];
    result = result.split(emoji).join(` ${replacement} `);
  }

  // Remove any remaining emojis that we don't have translations for
  result = result
    .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // Emoticons
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // Misc Symbols and Pictographs
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // Transport and Map
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "") // Flags
    .replace(/[\u{2600}-\u{26FF}]/gu, "") // Misc symbols
    .replace(/[\u{2700}-\u{27BF}]/gu, "") // Dingbats
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "") // Supplemental Symbols and Pictographs
    .replace(/[\u{1FA00}-\u{1FA6F}]/gu, "") // Chess Symbols
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, "") // Symbols and Pictographs Extended-A
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  return result;
}

export class TextToSpeech {
  private synthesis: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.synthesis = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices() {
    if (!this.synthesis) return;

    const setVoice = () => {
      const voices = this.synthesis!.getVoices();

      // Tìm giọng tiếng Việt
      let vietnameseVoice = voices.find((v) => v.lang.includes("vi-VN"));

      // Fallback sang các giọng nữ mượt mà nếu không có tiếng Việt
      if (!vietnameseVoice) {
        vietnameseVoice =
          voices.find(
            (v) => v.name.includes("Google") && v.name.includes("Female"),
          ) || voices.find((v) => v.name.includes("Female"));
      }

      this.voice = vietnameseVoice || voices[0];
      console.log("[TTS] Selected voice:", this.voice?.name);
    };

    // Load voices
    if (this.synthesis.getVoices().length > 0) {
      setVoice();
    } else {
      this.synthesis.addEventListener("voiceschanged", setVoice);
    }
  }

  /**
   * Speak text with customizable options
   */
  speak(
    text: string,
    options: {
      rate?: number; // 0.5 - 2.0
      pitch?: number; // 0 - 2
      volume?: number; // 0 - 1
      lang?: string; // Language code (e.g., 'en-US', 'vi-VN')
      onStart?: () => void;
      onEnd?: () => void;
      onBoundary?: (event: SpeechSynthesisEvent) => void;
    } = {},
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error("Speech synthesis not supported"));
        return;
      }

      // Stop any ongoing speech
      this.stop();

      // Convert emojis to text based on language
      const lang = (options.lang || "en-US") as "en-US" | "vi-VN";
      const textWithEmojis = convertEmojisToText(text, lang);
      const utterance = new SpeechSynthesisUtterance(textWithEmojis);

      // Set voice
      if (this.voice) {
        utterance.voice = this.voice;
      }

      // Set parameters
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;
      utterance.lang = options.lang || "en-US";

      // Event handlers
      utterance.onstart = () => {
        console.log("[TTS] Started speaking");
        options.onStart?.();
      };

      utterance.onend = () => {
        console.log("[TTS] Finished speaking");
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        console.error("[TTS] Error:", event.error);
        reject(event);
      };

      utterance.onboundary = (event) => {
        // Called for each word boundary - useful for lip sync
        options.onBoundary?.(event);
      };

      this.currentUtterance = utterance;
      this.synthesis.speak(utterance);
    });
  }

  /**
   * Stop current speech
   */
  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Pause current speech
   */
  pause() {
    if (this.synthesis) {
      this.synthesis.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synthesis?.speaking || false;
  }

  /**
   * Get speech rate based on user settings
   */
  static getRateFromSetting(speed: "slow" | "normal" | "fast"): number {
    switch (speed) {
      case "slow":
        return 0.75;
      case "fast":
        return 1.3;
      default:
        return 1.0;
    }
  }
}

// Singleton instance
let ttsInstance: TextToSpeech | null = null;

export function getTTS(): TextToSpeech {
  if (!ttsInstance) {
    ttsInstance = new TextToSpeech();
  }
  return ttsInstance;
}
