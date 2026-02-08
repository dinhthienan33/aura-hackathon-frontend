"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Volume2, Brain, Database, Save, Play, Trash2 } from "lucide-react";
import Link from "next/link";

interface VoiceSettings {
  pitch: number;
  speed: number;
}

interface MemoryFact {
  id: string;
  content: string;
}

import { useTranslation, Language } from "@/lib/i18n";

export default function AgentConfigPage() {
  const [language] = useState<Language>("en");
  const t = useTranslation(language);
  
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    pitch: 50,
    speed: 50,
  });
  const [selectedPreset, setSelectedPreset] = useState("grandchild");
  const [relationshipContext, setRelationshipContext] = useState(t.defaultRelationship);
  const [memoryFacts, setMemoryFacts] = useState<MemoryFact[]>([
    { id: "1", content: t.mockFact1 || "Likes to garden" },
    { id: "2", content: t.mockFact2 || "Enjoys morning tea" },
    { id: "3", content: t.mockFact3 || "Has a grandson named Minh" },
  ]);
  const [newFact, setNewFact] = useState("");

  const presets = [
    {
      id: "grandchild",
      name: t.presetGrandchildName,
      description: t.presetGrandchildDesc,
      icon: "👶",
    },
    {
      id: "friend",
      name: t.presetFriendName,
      description: t.presetFriendDesc,
      icon: "🤝",
    },
    {
      id: "nurse",
      name: t.presetNurseName,
      description: t.presetNurseDesc,
      icon: "👩‍⚕️",
    },
  ];

  const handleAddFact = () => {
    if (newFact.trim()) {
      setMemoryFacts([
        ...memoryFacts,
        { id: Date.now().toString(), content: newFact.trim() },
      ]);
      setNewFact("");
    }
  };

  const handleDeleteFact = (id: string) => {
    setMemoryFacts(memoryFacts.filter((f) => f.id !== id));
  };

  const handlePlaySample = () => {
    alert(t.playingSample);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 py-8 px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-elderly-3xl font-bold text-navy-900 mb-2">
            {t.configTitle}
          </h1>
          <p className="text-elderly-lg text-navy-600">
            {t.configSubtitle}
          </p>
        </motion.div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Voice Palette Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-warm-2xl shadow-lg p-6"
        >
          <h2 className="font-display text-elderly-xl font-semibold text-navy-800 mb-6 flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-sage-600" />
            {t.voiceSection}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitch Slider */}
            <div>
              <label className="block text-elderly-base font-medium text-navy-700 mb-3">
                {t.voicePitch}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={voiceSettings.pitch}
                onChange={(e) =>
                  setVoiceSettings({ ...voiceSettings, pitch: Number(e.target.value) })
                }
                className="w-full h-3 bg-warmGray-200 rounded-full appearance-none cursor-pointer accent-sage-500"
              />
              <div className="flex justify-between text-elderly-sm text-warmGray-500 mt-2">
                <span>{t.voicePitchLow}</span>
                <span>{t.voicePitchHigh}</span>
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <label className="block text-elderly-base font-medium text-navy-700 mb-3">
                {t.voiceSpeedLabel}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={voiceSettings.speed}
                onChange={(e) =>
                  setVoiceSettings({ ...voiceSettings, speed: Number(e.target.value) })
                }
                className="w-full h-3 bg-warmGray-200 rounded-full appearance-none cursor-pointer accent-sage-500"
              />
              <div className="flex justify-between text-elderly-sm text-warmGray-500 mt-2">
                <span>{t.voiceSpeedSlow}</span>
                <span>{t.voiceSpeedFast}</span>
              </div>
            </div>
          </div>

          {/* Play Sample Button */}
          <button
            onClick={handlePlaySample}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-sage-500 text-white rounded-warm-xl font-medium hover:bg-sage-600 transition-colors"
          >
            <Play className="w-5 h-5" />
            {t.playSample}
          </button>
        </motion.section>

        {/* Psychology Settings Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-warm-2xl shadow-lg p-6"
        >
          <h2 className="font-display text-elderly-xl font-semibold text-navy-800 mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            {t.personalitySection}
          </h2>

          {/* Presets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={`
                  p-4 rounded-warm-xl border-2 text-left transition-all
                  ${
                    selectedPreset === preset.id
                      ? "border-sage-500 bg-sage-50"
                      : "border-warmGray-200 hover:border-warmGray-300"
                  }
                `}
              >
                <span className="text-3xl mb-2 block">{preset.icon}</span>
                <h3 className="text-elderly-lg font-semibold text-navy-800">
                  {preset.name}
                </h3>
                <p className="text-elderly-sm text-warmGray-500">{preset.description}</p>
              </button>
            ))}
          </div>

          {/* Relationship Context */}
          <div>
            <label className="block text-elderly-base font-medium text-navy-700 mb-3">
              {t.relationshipLabel}
            </label>
            <textarea
              value={relationshipContext}
              onChange={(e) => setRelationshipContext(e.target.value)}
              className="w-full px-5 py-4 text-elderly-base border-2 border-warmGray-200 rounded-warm-xl focus:border-sage-400 focus:ring-4 focus:ring-sage-100 transition-all min-h-[100px]"
              placeholder={t.relationshipPlaceholder}
            />
          </div>
        </motion.section>

        {/* Memory Management Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-warm-2xl shadow-lg p-6"
        >
          <h2 className="font-display text-elderly-xl font-semibold text-navy-800 mb-6 flex items-center gap-2">
            <Database className="w-6 h-6 text-amber-600" />
            {t.memorySection}
          </h2>

          <p className="text-elderly-base text-warmGray-500 mb-4">
            {t.memoryDesc}
          </p>

          {/* Fact List */}
          <div className="space-y-3 mb-6">
            {memoryFacts.map((fact) => (
              <div
                key={fact.id}
                className="flex items-center justify-between p-4 bg-cream-100 rounded-warm-lg"
              >
                <p className="text-elderly-base text-navy-700">{fact.content}</p>
                <button
                  onClick={() => handleDeleteFact(fact.id)}
                  className="p-2 text-warmGray-400 hover:text-aura-danger transition-colors"
                  aria-label={t.deleteLabel}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Fact */}
          <div className="flex gap-3">
            <input
              type="text"
              value={newFact}
              onChange={(e) => setNewFact(e.target.value)}
              placeholder={t.newFactPlaceholder}
              className="flex-1 px-5 py-4 text-elderly-base border-2 border-warmGray-200 rounded-warm-xl focus:border-sage-400 focus:ring-4 focus:ring-sage-100 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleAddFact()}
            />
            <button
              onClick={handleAddFact}
              className="px-6 py-4 bg-sage-500 text-white rounded-warm-xl font-medium hover:bg-sage-600 transition-colors"
            >
              {t.addFact}
            </button>
          </div>

          {/* Reset Memory Warning */}
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-warm-xl">
            <p className="text-elderly-base text-red-700 mb-3">
              {t.resetMemoryWarning}
            </p>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-warm-lg text-elderly-sm font-medium hover:bg-red-200 transition-colors">
              {t.resetMemoryAction}
            </button>
          </div>
        </motion.section>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button className="px-10 py-5 bg-navy-700 text-white rounded-warm-xl text-elderly-xl font-bold hover:bg-navy-800 transition-colors shadow-lg flex items-center gap-3 mx-auto">
            <Save className="w-6 h-6" />
            {t.saveChanges}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
