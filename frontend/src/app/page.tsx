"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Users, Book, Heart, Phone, Settings, Sparkles } from "lucide-react";
import { useTranslation, Language } from "@/lib/i18n";

export default function Home() {
  const [language] = useState<Language>("en");
  const t = useTranslation(language);

  const navItems = [
    {
      href: "/chat",
      icon: MessageCircle,
      title: t.homeChatTitle,
      description: t.homeChatDesc,
      color: "bg-sage-500",
      hoverColor: "hover:bg-sage-600",
    },
    {
      href: "/agents",
      icon: Users,
      title: "My Agents",
      description: "Manage and talk to your AI companions",
      color: "bg-navy-700",
      hoverColor: "hover:bg-navy-800",
    },
    {
      href: "/memory",
      icon: Book,
      title: t.homeMemoryTitle,
      description: t.homeMemoryDesc,
      color: "bg-aura-accent",
      hoverColor: "hover:bg-amber-600",
    },
    {
      href: "/profile",
      icon: Heart,
      title: t.homeProfileTitle,
      description: t.homeProfileDesc,
      color: "bg-rose-500",
      hoverColor: "hover:bg-rose-600",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center shadow-2xl avatar-glow">
            <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
          </div>
        </motion.div>

        <h1 className="font-display text-elderly-4xl md:text-6xl font-bold text-navy-900 mb-4">
          {t.appName.toUpperCase()}
        </h1>
        <p className="text-elderly-lg md:text-elderly-xl text-navy-700 max-w-lg mx-auto leading-relaxed whitespace-pre-line">
          {t.appDescription.split(" AI ")[0]} AI <br className="hidden md:inline" />
          <span className="text-sage-600 font-semibold">{t.ready}</span>
        </p>
      </motion.div>

      {/* Navigation Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl"
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
            className="h-full"
          >
            <Link
              href={item.href}
              className={`
                block p-6 md:p-8 rounded-warm-xl
                ${item.color} ${item.hoverColor}
                text-white
                transition-all duration-300
                hover:scale-105 hover:shadow-2xl
                active:scale-98
                card-warm
                h-full flex flex-col justify-between
              `}
            >
              <item.icon className="w-10 h-10 md:w-12 md:h-12 mb-4" />
              <h2 className="font-display text-elderly-xl md:text-elderly-2xl font-bold mb-1">
                {item.title}
              </h2>
              <p className="text-elderly-sm opacity-90 hidden md:block">
                {item.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-10 flex gap-4"
      >
        <Link
          href="/agent-config"
          className="flex items-center gap-2 px-6 py-3 rounded-warm-lg bg-warmGray-100 text-navy-700 hover:bg-warmGray-200 transition-all duration-200 text-elderly-base"
        >
          <Settings className="w-5 h-5" />
          <span>{t.configLabel}</span>
        </Link>
      </motion.div>

      {/* Emergency SOS - Fixed Position */}
      <Link
        href="tel:115"
        className="fixed bottom-6 right-6 z-50 w-20 h-20 md:w-24 md:h-24 rounded-full bg-aura-danger text-white flex flex-col items-center justify-center shadow-2xl sos-pulse hover:scale-110 transition-transform"
      >
        <Phone className="w-8 h-8 md:w-10 md:h-10" />
        <span className="text-sm font-bold mt-1">{t.sosButton}</span>
      </Link>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12 text-center text-warmGray-500 text-elderly-sm"
      >
        <p className="flex items-center justify-center gap-2">
          {t.designedForElderly}
        </p>
      </motion.footer>
    </main>
  );
}
