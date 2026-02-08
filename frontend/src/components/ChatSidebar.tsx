"use client";

import { AgentProfile } from "@/types/agent";
import { 
  User, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon, 
  FileText, 
  Shield, 
  Bell, 
  Search,
  Lock
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatSidebarProps {
  agent: AgentProfile | null;
}

export default function ChatSidebar({ agent }: ChatSidebarProps) {
  const [sections, setSections] = useState({
    chatInfo: true,
    customise: false,
    media: true,
    privacy: false
  });

  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!agent) return null;

  return (
    <div className="w-80 h-full bg-white border-l border-warmGray-200 overflow-y-auto flex flex-col items-center py-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8 px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center shadow-lg mb-4">
          <span className="text-4xl font-display font-bold text-white uppercase">
            {agent.name.charAt(0)}
          </span>
        </div>
        <h2 className="text-elderly-xl font-bold text-navy-900">{agent.name}</h2>
        <div className="flex items-center gap-1.5 text-warmGray-500 mt-2">
          <Lock className="w-3 h-3" />
          <span className="text-xs font-medium uppercase tracking-wider">End-to-end encrypted</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mb-8">
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-warmGray-100 flex items-center justify-center group-hover:bg-warmGray-200 transition-colors">
            <User className="w-5 h-5 text-navy-700" />
          </div>
          <span className="text-xs font-bold uppercase text-warmGray-600">Profile</span>
        </button>
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-warmGray-100 flex items-center justify-center group-hover:bg-warmGray-200 transition-colors">
            <Bell className="w-5 h-5 text-navy-700" />
          </div>
          <span className="text-xs font-bold uppercase text-warmGray-600">Mute</span>
        </button>
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-warmGray-100 flex items-center justify-center group-hover:bg-warmGray-200 transition-colors">
            <Search className="w-5 h-5 text-navy-700" />
          </div>
          <span className="text-xs font-bold uppercase text-warmGray-600">Search</span>
        </button>
      </div>

      {/* Collapsible Sections */}
      <div className="w-full px-4 space-y-2">
        {/* Chat Info */}
        <section className="border-b border-warmGray-100 pb-2">
          <button 
            onClick={() => toggleSection('chatInfo')}
            className="w-full flex items-center justify-between p-3 hover:bg-warmGray-50 rounded-xl transition-colors group"
          >
            <span className="text-elderly-base font-bold text-navy-800">Chat Info</span>
            {sections.chatInfo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          <AnimatePresence>
            {sections.chatInfo && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden px-3 py-2 text-elderly-sm text-navy-600 leading-relaxed"
              >
                {agent.description}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Customise Chat */}
        <section className="border-b border-warmGray-100 pb-2">
          <button 
            onClick={() => toggleSection('customise')}
            className="w-full flex items-center justify-between p-3 hover:bg-warmGray-50 rounded-xl transition-colors group"
          >
            <span className="text-elderly-base font-bold text-navy-800">Customise chat</span>
            {sections.customise ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </section>

        {/* Media and Files */}
        <section className="border-b border-warmGray-100 pb-2">
          <button 
            onClick={() => toggleSection('media')}
            className="w-full flex items-center justify-between p-3 hover:bg-warmGray-50 rounded-xl transition-colors group"
          >
            <span className="text-elderly-base font-bold text-navy-800">Media and files</span>
            {sections.media ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          <AnimatePresence>
            {sections.media && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-1 p-1"
              >
                <button className="w-full flex items-center gap-3 p-2 hover:bg-warmGray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-warmGray-100 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-warmGray-600" />
                  </div>
                  <span className="text-elderly-sm font-medium text-navy-700">Media</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-warmGray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-warmGray-100 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-warmGray-600" />
                  </div>
                  <span className="text-elderly-sm font-medium text-navy-700">Files</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Privacy & Support */}
        <section>
          <button 
            onClick={() => toggleSection('privacy')}
            className="w-full flex items-center justify-between p-3 hover:bg-warmGray-50 rounded-xl transition-colors group"
          >
            <span className="text-elderly-base font-bold text-navy-800">Privacy & support</span>
            {sections.privacy ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </section>
      </div>
    </div>
  );
}
