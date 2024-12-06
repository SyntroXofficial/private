import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, StarIcon } from '@heroicons/react/24/outline';

export default function BattlePassProgress() {
  const currentLevel = 0;
  const maxLevel = 100;
  const progress = (currentLevel / maxLevel) * 100;
  const nextLevel = currentLevel + 1;

  return (
    <div className="bg-black/60 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <TrophyIcon className="h-6 w-6 text-red-500" />
            <div className="text-2xl font-bold text-white">
              LEVEL {currentLevel}
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Progress to Level {nextLevel}</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-red-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span className="text-gray-300 font-bold">{currentLevel}/{maxLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}