"use client";

import { motion } from "framer-motion";

interface RelationshipSelectorProps {
  selectedRelationship: string;
  onSelectionChange: (relationship: string) => void;
}

interface Relationship {
  id: string;
  auraTitle: string;
  userTitle: string;
  greeting: string;
  description: string;
}

const RELATIONSHIPS: Relationship[] = [
  {
    id: "grandchild_grandparent",
    auraTitle: "Cháu",
    userTitle: "Ông/Bà",
    greeting: "Con chào Ông/Bà ạ!",
    description: "Aura đóng vai cháu, nói chuyện kính trọng, lễ phép",
  },
  {
    id: "child_parent",
    auraTitle: "Con",
    userTitle: "Bố/Mẹ",
    greeting: "Con chào Bố/Mẹ!",
    description: "Aura đóng vai con, quan tâm chăm sóc như con cái",
  },
  {
    id: "friend",
    auraTitle: "Bạn",
    userTitle: "Bạn",
    greeting: "Chào bạn!",
    description: "Aura là bạn đồng hành, nói chuyện ngang hàng, thân mật",
  },
  {
    id: "caregiver",
    auraTitle: "Aura",
    userTitle: "Ông/Bà",
    greeting: "Aura xin chào ông/bà!",
    description: "Aura là người chăm sóc chuyên nghiệp, chu đáo",
  },
];

import { useTranslation, Language } from "@/lib/i18n";
import { useState } from "react";

export default function RelationshipSelector({
  selectedRelationship,
  onSelectionChange,
}: RelationshipSelectorProps) {
  const [language] = useState<Language>("en");
  const t = useTranslation(language);

  const RELATIONSHIPS = [
    {
      id: "grandchild_grandparent",
      auraTitle: t.relGrandchildTitle,
      userTitle: t.relGrandchildUser,
      greeting: t.relGrandchildGreeting,
      description: t.relGrandchildDesc,
    },
    {
      id: "child_parent",
      auraTitle: t.relChildTitle,
      userTitle: t.relChildUser,
      greeting: t.relChildGreeting,
      description: t.relChildDesc,
    },
    {
      id: "friend",
      auraTitle: t.relFriendTitle,
      userTitle: t.relFriendUser,
      greeting: t.relFriendGreeting,
      description: t.relFriendDesc,
    },
    {
      id: "caregiver",
      auraTitle: t.relCaregiverTitle,
      userTitle: t.relCaregiverUser,
      greeting: t.relCaregiverGreeting,
      description: t.relCaregiverDesc,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-display text-elderly-xl font-semibold text-navy-800">
        {t.relationshipTitle}
      </h3>
      <p className="text-elderly-base text-warmGray-500">
        {t.relationshipSubtitle}
      </p>

      <div className="grid grid-cols-1 gap-3 mt-6">
        {RELATIONSHIPS.map((relationship) => {
          const isSelected = selectedRelationship === relationship.id;

          return (
            <motion.button
              key={relationship.id}
              onClick={() => onSelectionChange(relationship.id)}
              whileTap={{ scale: 0.99 }}
              className={`
                relative p-5 rounded-warm-xl text-left
                border-2 transition-all duration-300
                ${
                  isSelected
                    ? "border-sage-500 bg-sage-50 shadow-lg"
                    : "border-warmGray-200 bg-white hover:border-warmGray-300 hover:shadow-md"
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Radio indicator */}
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? "border-sage-500 bg-sage-500" : "border-warmGray-300"}
                  `}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 bg-white rounded-full"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 bg-sage-100 text-sage-700 text-elderly-sm font-semibold rounded-warm">
                      {t.auraRoleLabel}: "{relationship.auraTitle}"
                    </span>
                    <span className="text-warmGray-400">↔</span>
                    <span className="px-3 py-1 bg-navy-100 text-navy-700 text-elderly-sm font-semibold rounded-warm">
                      {t.userRoleLabel}: "{relationship.userTitle}"
                    </span>
                  </div>
                  <p className="text-elderly-sm text-warmGray-500">
                    {relationship.description}
                  </p>
                </div>
              </div>

              {/* Sample greeting */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-3 bg-cream-100 rounded-warm-lg"
                >
                  <p className="text-elderly-base text-navy-700 italic">
                    💬 "{relationship.greeting}"
                  </p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
