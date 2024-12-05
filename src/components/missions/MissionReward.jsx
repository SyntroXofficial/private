import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

const RARITY_CONFIGS = {
  common: {
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-900',
    borderColor: 'border-gray-400',
    glowColor: '#ffffff'
  },
  rare: {
    bgColor: 'bg-blue-200',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-400',
    glowColor: '#3b82f6'
  },
  epic: {
    bgColor: 'bg-purple-200',
    textColor: 'text-purple-900',
    borderColor: 'border-purple-400',
    glowColor: '#8b5cf6'
  },
  legendary: {
    bgColor: 'bg-yellow-200',
    textColor: 'text-yellow-900',
    borderColor: 'border-yellow-400',
    glowColor: '#eab308'
  },
  mythic: {
    bgColor: 'bg-red-200',
    textColor: 'text-red-900',
    borderColor: 'border-red-400',
    glowColor: '#ef4444'
  }
};

export default function MissionReward({ reward }) {
  const rarityConfig = RARITY_CONFIGS[reward.rarity.toLowerCase()] || RARITY_CONFIGS.common;
  
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
    >
      <div className={`
        px-4 py-3 rounded-xl ${rarityConfig.bgColor} ${rarityConfig.textColor}
        flex flex-col items-center gap-2 shadow-lg border ${rarityConfig.borderColor}
      `}>
        <SparklesIcon className="h-5 w-5" />
        <span className="font-bold tracking-wider text-sm whitespace-nowrap">{reward.title}</span>
      </div>
      <motion.div
        className="absolute inset-0 blur-xl"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          background: `radial-gradient(circle, ${rarityConfig.glowColor}20 0%, transparent 70%)`
        }}
      />
    </motion.div>
  );
}