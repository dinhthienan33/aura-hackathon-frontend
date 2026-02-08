"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smile, BookOpen, Clock, Award } from "lucide-react";

interface PersonaCardProps {
  selectedPersonas: string[];
  onSelectionChange: (personas: string[]) => void;
}

interface Persona {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const PERSONAS: Persona[] = [
  {
    id: "cheerful",
    name: "Cheerful",
    nameVi: "Vui vẻ",
    description: "Luôn lạc quan, hay kể chuyện vui, động viên tinh thần",
    icon: Smile,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "wise",
    name: "Wise",
    nameVi: "Thông thái",
    description: "Chia sẻ kinh nghiệm, lời khuyên sâu sắc, kiến thức rộng",
    icon: BookOpen,
    color: "from-sage-400 to-sage-600",
  },
  {
    id: "nostalgic",
    name: "Nostalgic",
    nameVi: "Hoài cổ",
    description: "Thích nhớ về quá khứ, kể chuyện xưa, tình cảm sâu lắng",
    icon: Clock,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: "caring",
    name: "Caring",
    nameVi: "Chu đáo",
    description: "Quan tâm sức khỏe, nhắc nhở uống thuốc, hỏi thăm thường xuyên",
    icon: Award,
    color: "from-rose-400 to-rose-600",
  },
];

import { useTranslation, Language } from "@/lib/i18n";

export default function PersonaCard({
  selectedPersonas,
  onSelectionChange,
}: PersonaCardProps) {
  const [language] = useState<Language>("en");
  const t = useTranslation(language);

  const PERSONAS = [
    {
      id: "cheerful",
      name: t.personaCheerfulName,
      description: t.personaCheerfulDesc,
      icon: Smile,
      color: "from-amber-400 to-orange-500",
    },
    {
      id: "wise",
      name: t.personaWiseName,
      description: t.personaWiseDesc,
      icon: BookOpen,
      color: "from-sage-400 to-sage-600",
    },
    {
      id: "nostalgic",
      name: t.personaNostalgicName,
      description: t.personaNostalgicDesc,
      icon: Clock,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "caring",
      name: t.personaCaringName,
      description: t.personaCaringDesc,
      icon: Award,
      color: "from-rose-400 to-rose-600",
    },
  ];

  const togglePersona = (id: string) => {
    if (selectedPersonas.includes(id)) {
      onSelectionChange(selectedPersonas.filter((p) => p !== id));
    } else {
      onSelectionChange([...selectedPersonas, id]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display text-elderly-xl font-semibold text-navy-800">
        {t.personaTitle}
      </h3>
      <p className="text-elderly-base text-warmGray-500">
        {t.personaSubtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {PERSONAS.map((persona) => {
          const isSelected = selectedPersonas.includes(persona.id);
          const Icon = persona.icon;

          return (
            <motion.button
              key={persona.id}
              onClick={() => togglePersona(persona.id)}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-warm-xl text-left
                border-2 transition-all duration-300
                ${
                  isSelected
                    ? "border-sage-500 bg-sage-50 shadow-lg"
                    : "border-warmGray-200 bg-white hover:border-warmGray-300 hover:shadow-md"
                }
              `}
            >
              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-sage-500 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={`
                  w-14 h-14 rounded-warm-lg flex items-center justify-center mb-4
                  bg-gradient-to-br ${persona.color}
                `}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h4 className="font-display text-elderly-lg font-semibold text-navy-800 mb-1">
                {persona.name}
              </h4>
              <p className="text-elderly-sm text-warmGray-500 leading-relaxed">
                {persona.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Selected summary */}
      {selectedPersonas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-sage-50 rounded-warm-lg border border-sage-200"
        >
          <p className="text-elderly-base text-sage-700">
            <span className="font-semibold">{t.selectedLabel}: </span>
            {selectedPersonas
              .map((id) => PERSONAS.find((p) => p.id === id)?.name)
              .join(", ")}
          </p>
        </motion.div>
      )}
    </div>
  );
}
