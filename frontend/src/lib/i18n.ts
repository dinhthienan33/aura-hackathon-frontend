export type Language = "en" | "vi";

export interface Translations {
  // Header
  appName: string;
  appDescription: string;
  home: string;
  guide: string;
  settings: string;
  connected: string;
  disconnected: string;

  // Hero
  welcome: string;
  heroSubtitle: string;

  // Avatar section
  virtualAssistant: string;
  ready: string;
  listening: string;
  thinking: string;
  speaking: string;
  clickToSpeak: string;
  clickToStop: string;
  speakClearly: string;
  keepMicClose: string;

  // Chat
  chatTitle: string;
  chatSubtitle: string;
  inputPlaceholder: string;
  sendButton: string;
  emptyStateGreeting: string;
  emptyStateMessage: string;

  // Messages
  welcomeMessage: string;
  response1: string;
  response2: string;
  response3: string;
  response4: string;

  // SOS
  sosButton: string;
  sosConfirmTitle: string;
  sosConfirmMessage: string;
  sosCallingTitle: string;
  sosCallingMessage: string;
  sosCallNow: string;
  sosCancel: string;
  sosCancelCall: string;
  sosHelpText: string;
  sosEmergency: string;
  sosResponse: string;

  // Settings
  settingsTitle: string;
  userName: string;
  userNamePlaceholder: string;
  fontSize: string;
  fontNormal: string;
  fontLarge: string;
  fontExtraLarge: string;
  voiceSpeed: string;
  voiceSlow: string;
  voiceNormal: string;
  voiceFast: string;
  theme: string;
  themeLight: string;
  themeDark: string;
  language: string;
  languageEnglish: string;
  languageVietnamese: string;
  emergencyContact: string;
  emergencyContactInfo: string;
  emergencyContactNumber: string;
  done: string;

  // Welcome Modal
  welcomeTitle: string;
  welcomeSubtitle: string;
  getStarted: string;
  whatCanAuraDo: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  continue: string;
  whatsYourName: string;
  namePrompt: string;
  back: string;
  startNow: string;

  // Footer
  footerCopyright: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appName: "Aura",
    appDescription: "AI Companion for Elderly Care",
    home: "Home",
    guide: "Guide",
    settings: "Settings",
    connected: "Connected",
    disconnected: "Disconnected",

    // Hero
    welcome: "Welcome to Aura!",
    heroSubtitle: "Start chatting - Aura is always ready to listen",

    // Avatar section
    virtualAssistant: "Your Virtual Assistant",
    ready: "😊 Ready to chat",
    listening: "🎧 Listening...",
    thinking: "💭 Thinking...",
    speaking: "💬 Speaking...",
    clickToSpeak: "🎙️ Click to speak",
    clickToStop: "🎤 Listening... Click to stop",
    speakClearly: "Speak clearly and slowly",
    keepMicClose: "Keep microphone close when speaking",

    // Chat
    chatTitle: "💬 Chat with Aura",
    chatSubtitle: "Aura is always here to listen and chat with {{userName}}",
    inputPlaceholder: "Type your message...",
    sendButton: "Send",
    emptyStateGreeting: "👋",
    emptyStateMessage: 'Say "Hello" to start chatting!',

    // Messages
    welcomeMessage:
      "Hello! I'm Aura, your companion. How are you feeling today? I'm always here to listen and chat with you. 💙",
    response1:
      "I understand. That sounds very meaningful. Would you like to tell me more?",
    response2: "Thank you for sharing with me. I'm happy to listen to you.",
    response3:
      "That's right! I'm always here with you. We can talk about anything you want.",
    response4:
      "I remember last time you mentioned your family. How is everyone doing lately?",

    // SOS
    sosButton: "SOS",
    sosConfirmTitle: "Confirm Emergency Call?",
    sosConfirmMessage: "Aura will notify your family that you need assistance.",
    sosCallingTitle: "Calling for help...",
    sosCallingMessage: "Contacting your family in",
    sosCallNow: "Call Now",
    sosCancel: "Cancel",
    sosCancelCall: "Cancel Call",
    sosHelpText: "Use only when you truly need help",
    sosEmergency: "🆘 EMERGENCY ASSISTANCE REQUEST",
    sosResponse:
      "I've received your request for help. I'm contacting your family right now. Can you tell me what you need help with?",

    // Settings
    settingsTitle: "⚙️ Settings",
    userName: "Your Name",
    userNamePlaceholder: "Enter your name",
    fontSize: "Font Size",
    fontNormal: "Normal",
    fontLarge: "Large",
    fontExtraLarge: "Extra Large",
    voiceSpeed: "Aura's Speaking Speed",
    voiceSlow: "Slow 🐢",
    voiceNormal: "Normal",
    voiceFast: "Fast 🐇",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    language: "Language",
    languageEnglish: "English",
    languageVietnamese: "Tiếng Việt",
    emergencyContact: "Emergency Contact",
    emergencyContactInfo:
      "When you press SOS, your family will be notified immediately.",
    emergencyContactNumber: "Family: 0912 345 678",
    done: "Done",

    // Welcome Modal
    welcomeTitle: "Hello!",
    welcomeSubtitle:
      "Welcome to Aura - your companion always ready to listen and chat with you.",
    getStarted: "Let's Start ✨",
    whatCanAuraDo: "How Aura Can Help You",
    feature1Title: "Friendly Conversations",
    feature1Desc: "Aura is always ready to listen to your stories",
    feature2Title: "Remember Memories",
    feature2Desc: "Aura remembers what you tell and will check in",
    feature3Title: "Always By Your Side",
    feature3Desc: "Press SOS when needed, Aura will call your family",
    continue: "Continue →",
    whatsYourName: "What's your name?",
    namePrompt: "Aura would like to call you by name",
    back: "← Back",
    startNow: "Start! 🎉",

    // Footer
    footerCopyright: "© 2026 Aura Project - Designed for Elderly Care",
  },

  vi: {
    // Header
    appName: "Aura",
    appDescription: "Người bạn AI đồng hành cho người cao tuổi",
    home: "Trang chủ",
    guide: "Hướng dẫn",
    settings: "Cài đặt",
    connected: "Đã kết nối",
    disconnected: "Mất kết nối",

    // Hero
    welcome: "Chào mừng đến với Aura!",
    heroSubtitle: "Hãy bắt đầu trò chuyện - Aura luôn sẵn sàng lắng nghe bạn",

    // Avatar section
    virtualAssistant: "Trợ lý ảo của bạn",
    ready: "😊 Sẵn sàng trò chuyện",
    listening: "🎧 Đang lắng nghe...",
    thinking: "💭 Đang suy nghĩ...",
    speaking: "💬 Đang nói...",
    clickToSpeak: "🎙️ Nhấn để nói chuyện",
    clickToStop: "🎤 Đang nghe... Nhấn để dừng",
    speakClearly: "Hãy nói rõ ràng và chậm rãi",
    keepMicClose: "Giữ microphone gần miệng khi nói",

    // Chat
    chatTitle: "💬 Trò chuyện cùng Aura",
    chatSubtitle: "Aura luôn lắng nghe và đồng hành cùng {{userName}}",
    inputPlaceholder: "Nhập tin nhắn của bạn...",
    sendButton: "Gửi",
    emptyStateGreeting: "👋",
    emptyStateMessage: 'Hãy nói "Xin chào" để bắt đầu trò chuyện!',

    // Messages
    welcomeMessage:
      "Xin chào! Tôi là Aura, người bạn đồng hành của bạn. Hôm nay bạn cảm thấy thế nào? Tôi luôn ở đây để lắng nghe và trò chuyện cùng bạn. 💙",
    response1:
      "Tôi hiểu. Điều đó nghe có vẻ rất ý nghĩa. Bạn có muốn kể thêm cho tôi nghe không?",
    response2: "Cảm ơn đã chia sẻ với tôi. Tôi rất vui được lắng nghe bạn.",
    response3:
      "Đúng vậy! Tôi luôn ở đây cùng bạn. Chúng ta có thể nói chuyện về bất cứ điều gì bạn muốn.",
    response4:
      "Tôi nhớ lần trước bạn có kể về gia đình mình. Gần đây mọi người thế nào rồi?",

    // SOS
    sosButton: "SOS",
    sosConfirmTitle: "Xác nhận gọi trợ giúp?",
    sosConfirmMessage:
      "Aura sẽ thông báo đến người thân của bạn rằng bạn cần được hỗ trợ.",
    sosCallingTitle: "Đang gọi trợ giúp...",
    sosCallingMessage: "Đang liên hệ người thân trong",
    sosCallNow: "Gọi ngay",
    sosCancel: "Hủy bỏ",
    sosCancelCall: "Hủy cuộc gọi",
    sosHelpText: "Chỉ sử dụng khi bạn thực sự cần trợ giúp",
    sosEmergency: "🆘 YÊU CẦU HỖ TRỢ KHẨN CẤP",
    sosResponse:
      "Tôi đã nhận được yêu cầu hỗ trợ của bạn. Tôi đang liên hệ với người thân của bạn ngay. Bạn có thể cho tôi biết bạn cần giúp đỡ gì không?",

    // Settings
    settingsTitle: "⚙️ Cài đặt",
    userName: "Tên của bạn",
    userNamePlaceholder: "Nhập tên của bạn",
    fontSize: "Cỡ chữ",
    fontNormal: "Vừa",
    fontLarge: "Lớn",
    fontExtraLarge: "Rất lớn",
    voiceSpeed: "Tốc độ nói của Aura",
    voiceSlow: "Chậm 🐢",
    voiceNormal: "Bình thường",
    voiceFast: "Nhanh 🐇",
    theme: "Giao diện",
    themeLight: "Sáng",
    themeDark: "Tối",
    language: "Ngôn ngữ",
    languageEnglish: "English",
    languageVietnamese: "Tiếng Việt",
    emergencyContact: "Liên hệ khẩn cấp",
    emergencyContactInfo:
      "Khi bạn nhấn nút SOS, người thân sẽ được thông báo ngay lập tức.",
    emergencyContactNumber: "Người thân: 0912 345 678",
    done: "Hoàn tất",

    // Welcome Modal
    welcomeTitle: "Xin chào!",
    welcomeSubtitle:
      "Chào mừng bạn đến với Aura - người bạn đồng hành luôn sẵn sàng lắng nghe và trò chuyện cùng bạn.",
    getStarted: "Bắt đầu nào ✨",
    whatCanAuraDo: "Aura có thể giúp bạn",
    feature1Title: "Trò chuyện thân thiện",
    feature1Desc: "Aura luôn sẵn sàng lắng nghe câu chuyện của bạn",
    feature2Title: "Ghi nhớ kỷ niệm",
    feature2Desc: "Aura nhớ những gì bạn kể và sẽ hỏi thăm",
    feature3Title: "Luôn bên bạn",
    feature3Desc: "Nhấn SOS khi cần, Aura sẽ gọi người thân giúp bạn",
    continue: "Tiếp tục →",
    whatsYourName: "Bạn tên gì ạ?",
    namePrompt: "Aura muốn được gọi bạn bằng tên thân mật",
    back: "← Quay lại",
    startNow: "Bắt đầu! 🎉",

    // Footer
    footerCopyright:
      "© 2026 Aura Project - Thiết kế cho Chăm sóc Người cao tuổi",
  },
};

export function useTranslation(language: Language): Translations {
  return translations[language];
}
