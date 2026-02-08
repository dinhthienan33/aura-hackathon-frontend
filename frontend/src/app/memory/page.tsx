"use client";

import { useState } from "react";
import { useTranslation, Language } from "@/lib/i18n";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Book, MessageCircle, Heart, Calendar } from "lucide-react";

interface MemoryItem {
  id: string;
  date: string;
  content: string;
  type: "insight" | "conversation" | "milestone";
  emotion: "happy" | "sad" | "neutral";
}

export default function MemoryPage() {
  const [language] = useState<Language>("en");
  const t = useTranslation(language);

  const MOCK_MEMORIES: MemoryItem[] = [
    {
      id: "1",
      date: t.mockMemory1Date,
      content: t.mockMemory1,
      type: "insight",
      emotion: "happy",
    },
    {
      id: "2",
      date: t.mockMemory2Date,
      content: t.mockMemory2,
      type: "conversation",
      emotion: "happy",
    },
    {
      id: "3",
      date: t.mockMemory3Date,
      content: t.mockMemory3,
      type: "insight",
      emotion: "neutral",
    },
    {
      id: "4",
      date: t.mockMemory4Date,
      content: t.mockMemory4,
      type: "milestone",
      emotion: "happy",
    },
  ];

  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case "happy":
        return "😊";
      case "sad":
        return "😢";
      default:
        return "😐";
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "insight":
        return "bg-amber-100 border-amber-300 text-amber-800";
      case "milestone":
        return "bg-sage-100 border-sage-300 text-sage-800";
      default:
        return "bg-white border-warmGray-200 text-navy-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "insight":
        return t.memoryInsight;
      case "milestone":
        return t.memoryMilestone;
      default:
        return t.memoryConversation;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 py-8 px-4">
      {/* Header */}
      <header className="max-w-3xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-elderly-base font-medium">{t.backToHome}</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Book className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-elderly-3xl md:text-elderly-4xl font-bold text-navy-900 mb-3">
            {t.memoryLaneTitle}
          </h1>
          <p className="text-elderly-lg text-navy-600">
            {t.memoryLaneSubtitle}
          </p>
        </motion.div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-warm-xl p-4 text-center shadow-md"
        >
          <MessageCircle className="w-8 h-8 text-sage-500 mx-auto mb-2" />
          <p className="text-elderly-2xl font-bold text-navy-800">24</p>
          <p className="text-elderly-sm text-warmGray-500">{t.statsConversations}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-warm-xl p-4 text-center shadow-md"
        >
          <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
          <p className="text-elderly-2xl font-bold text-navy-800">12</p>
          <p className="text-elderly-sm text-warmGray-500">{t.statsMemories}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-warm-xl p-4 text-center shadow-md"
        >
          <Calendar className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-elderly-2xl font-bold text-navy-800">7</p>
          <p className="text-elderly-sm text-warmGray-500">{t.statsConsecutiveDays}</p>
        </motion.div>
      </div>

      {/* Timeline */}
      <main className="max-w-3xl mx-auto">
        <h2 className="font-display text-elderly-xl font-semibold text-navy-800 mb-6">
          {t.timelineTitle}
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-warmGray-200" />

          {/* Memory items */}
          <div className="space-y-6">
            {MOCK_MEMORIES.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 w-5 h-5 bg-white border-4 border-sage-400 rounded-full" />

                {/* Memory card */}
                <div
                  className={`
                    p-5 rounded-warm-xl border-2 shadow-md
                    ${getTypeStyle(memory.type)}
                  `}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-elderly-sm font-medium opacity-70">
                      {getTypeLabel(memory.type)}
                    </span>
                    <span className="text-2xl">{getEmotionIcon(memory.emotion)}</span>
                  </div>

                  {/* Content */}
                  <p className="text-elderly-lg leading-relaxed">{memory.content}</p>

                  {/* Date */}
                  <p className="text-elderly-sm opacity-60 mt-3">{memory.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty state or load more */}
        <div className="text-center mt-8 py-8">
          <p className="text-elderly-base text-warmGray-500">
            {t.keepChattingHint}
          </p>
          <Link
            href="/chat"
            className="inline-block mt-4 px-6 py-3 bg-sage-500 text-white rounded-warm-xl font-medium hover:bg-sage-600 transition-colors"
          >
            {t.startChatting}
          </Link>
        </div>
      </main>
    </div>
  );
}
