"use client";

import { motion } from "framer-motion";
import { ArrowLeft, User, Heart, Phone, Calendar, Pill, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useTranslation, Language } from "@/lib/i18n";
import { useState } from "react";

export default function ProfilePage() {
  const [language] = useState<Language>("en");
  const t = useTranslation(language);

  const USER_PROFILE = {
    name: t.mockProfileName,
    age: 72,
    birthdate: "15/08/1952",
    milestones: [
      { label: t.mockMilestone1, date: "12/01/1970" },
      { label: t.mockMilestone2, date: "15/08/2012" },
    ],
    healthNotes: [
      { icon: "👂", text: t.mockHealth1 },
      { icon: "💊", text: t.mockHealth2 },
      { icon: "🦴", text: t.mockHealth3 },
    ],
    emergencyContacts: [
      { name: t.mockEmergency1, phone: "0901234567", priority: 1 },
      { name: t.mockEmergency2, phone: "0907654321", priority: 2 },
      { name: t.mockEmergency3, phone: "0912345678", priority: 3 },
    ],
    moodData: [
      { day: language === "en" ? "Mon" : "T2", score: 8 },
      { day: language === "en" ? "Tue" : "T3", score: 7 },
      { day: language === "en" ? "Wed" : "T4", score: 9 },
      { day: language === "en" ? "Thu" : "T5", score: 6 },
      { day: language === "en" ? "Fri" : "T6", score: 8 },
      { day: language === "en" ? "Sat" : "T7", score: 9 },
      { day: language === "en" ? "Sun" : "CN", score: 8 },
    ],
    topics: [t.mockTopic1, t.mockTopic2, t.mockTopic3, t.mockTopic4, t.mockTopic5],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 py-8 px-4">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-8">
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
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-display text-elderly-3xl font-bold text-navy-900 mb-2">
            {USER_PROFILE.name}
          </h1>
          <p className="text-elderly-lg text-navy-600">
            {USER_PROFILE.age} {t.ageYears} • {t.bornOn} {USER_PROFILE.birthdate}
          </p>
        </motion.div>
      </header>

      {/* Main Content - 3 Columns */}
      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: Identity & Health */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-warm-2xl shadow-lg p-6"
        >
          <h2 className="font-display text-elderly-xl font-semibold text-navy-800 mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500" />
            {t.profilePersonalTitle}
          </h2>

          {/* Milestones */}
          <div className="mb-6">
            <h3 className="text-elderly-base font-medium text-warmGray-500 mb-3">
              {t.profileImportantDates}
            </h3>
            <div className="space-y-3">
              {USER_PROFILE.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-cream-100 rounded-warm-lg"
                >
                  <Calendar className="w-5 h-5 text-sage-600" />
                  <div>
                    <p className="text-elderly-base font-medium text-navy-800">
                      {milestone.label}
                    </p>
                    <p className="text-elderly-sm text-warmGray-500">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Notes */}
          <div>
            <h3 className="text-elderly-base font-medium text-warmGray-500 mb-3 flex items-center gap-2">
              <Pill className="w-5 h-5" />
              {t.profileHealthNotes}
            </h3>
            <div className="space-y-2">
              {USER_PROFILE.healthNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-warm-lg"
                >
                  <span className="text-xl">{note.icon}</span>
                  <p className="text-elderly-base text-amber-800">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 2: Emotional Map */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-warm-2xl shadow-lg p-6"
        >
          <h2 className="font-display text-elderly-xl font-semibold text-navy-800 mb-6 font-display">
            📊 {t.profileMoodTitle}
          </h2>

          {/* Mood Chart */}
          <div className="mb-6">
            <div className="flex items-end justify-between h-32 gap-2">
              {USER_PROFILE.moodData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-sage-400 to-sage-300 rounded-t-lg transition-all"
                    style={{ height: `${item.score * 10}%` }}
                  />
                  <span className="text-elderly-sm text-warmGray-500">{item.day}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-elderly-sm text-warmGray-500 mt-4">
              {t.profileAverageScore}: <span className="font-bold text-sage-600">7.9/10</span> 😊
            </p>
          </div>

          {/* Key Topics */}
          <div>
            <h3 className="text-elderly-base font-medium text-warmGray-500 mb-3">
              💬 {t.profileCommonTopics}
            </h3>
            <div className="flex flex-wrap gap-2">
              {USER_PROFILE.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-elderly-base font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 3: Emergency Contacts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-warm-2xl shadow-lg p-6"
        >
          <h2 className="font-display text-elderly-xl font-semibold text-navy-800 mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6 text-aura-danger" />
            {t.profileEmergencyContacts}
          </h2>

          <div className="space-y-4">
            {USER_PROFILE.emergencyContacts.map((contact, idx) => (
              <div
                key={idx}
                className={`
                  p-4 rounded-warm-xl border-2 transition-all
                  ${idx === 0 ? "border-aura-danger bg-red-50" : "border-warmGray-200 bg-white"}
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-elderly-sm bg-warmGray-200 text-warmGray-600 px-2 py-0.5 rounded">
                        {t.priorityLabel} #{contact.priority}
                      </span>
                      <p className="text-elderly-lg font-semibold text-navy-800">
                        {contact.name}
                      </p>
                    </div>
                    <p className="text-elderly-base text-warmGray-500">{contact.phone}</p>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center
                      ${idx === 0 ? "bg-aura-danger" : "bg-sage-500"}
                      text-white hover:scale-110 transition-transform
                    `}
                  >
                    <Phone className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Alert Settings */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-warm-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-elderly-base font-medium text-amber-800">
                  {t.profileEmergencyNotify}
                </p>
                <p className="text-elderly-sm text-amber-700">
                  {t.profileEmergencyDesc}
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Edit Button */}
      <div className="max-w-5xl mx-auto mt-8 text-center">
        <button className="px-8 py-4 bg-navy-700 text-white rounded-warm-xl text-elderly-lg font-medium hover:bg-navy-800 transition-colors">
          {t.profileEditInfo}
        </button>
      </div>
    </div>
  );
}
