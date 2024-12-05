import React from 'react';
import { motion } from 'framer-motion';

export default function MissionHeader() {
  return (
    <div className="bg-black/80 border-b border-white/10 sticky top-16 z-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-4"
        >
          CAREER PROGRESS
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-8 text-lg"
        >
          <button className="text-white font-bold border-b-2 border-red-500 pb-1">
            PROGRESS
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            REWARDS
          </button>
        </motion.div>
      </div>
    </div>
  );
}