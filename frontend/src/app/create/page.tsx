"use client";

import { useTranslation, Language } from "@/lib/i18n";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, LockKeyhole } from "lucide-react";
import CreateAgentForm from "@/components/CreateAgentForm";

export default function Create() {
  const [language] = useState<Language>("en");
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 py-8 px-4">
      {/* Header */}
      <header className="max-w-2xl mx-auto mb-8">
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
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-elderly-3xl md:text-elderly-4xl font-bold text-navy-900 mb-3">
            {t.createTitle}
          </h1>
          <p className="text-elderly-lg text-navy-600 max-w-md mx-auto">
            {t.createSubtitle}
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CreateAgentForm />
      </motion.main>

      {/* Footer */}
      <footer className="text-center mt-12 text-warmGray-500 text-elderly-sm">
        <p className="flex items-center justify-center gap-2">
          {t.secureInfo} <LockKeyhole className="w-5 h-5 text-sage-600" />
        </p>
      </footer>
    </div>
  );
}
