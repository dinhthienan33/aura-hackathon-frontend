export interface Message {
  id: string;
  text: string;
  sender: "user" | "aura" | "system";
  timestamp: Date;
}

export type AuraState = "idle" | "listening" | "thinking" | "speaking";

export interface Settings {
  userName: string;
  fontSize: "normal" | "large" | "extra-large";
  voiceSpeed: "slow" | "normal" | "fast";
  theme: "light" | "dark";
}

export interface AvatarProps {
  state: AuraState;
  isSpeaking: boolean;
  isListening: boolean;
}

export interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping: boolean;
  userName: string;
}

export interface SOSButtonProps {
  onClick: () => void;
}

export interface VoiceButtonProps {
  onVoiceStart: () => void;
  onVoiceEnd: (transcript: string) => void;
  onTranscript: (transcript: string) => void;
  isListening: boolean;
  disabled?: boolean;
}

export interface StatusBarProps {
  isConnected: boolean;
  onSettingsClick: () => void;
}

export interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onClose: () => void;
}

export interface WelcomeModalProps {
  onClose: (name: string) => void;
}
