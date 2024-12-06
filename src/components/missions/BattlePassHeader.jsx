import React from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function BattlePassHeader() {
  return (
    <div className="bg-black/80 border-b border-white/10 sticky top-16 z-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-2"
            >
              WEEKLY MISSIONS
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <ClockIcon className="h-5 w-5" />
              <span>7 days remaining</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}