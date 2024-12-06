import React from 'react';
import { motion } from 'framer-motion';

export default function MissionProgress({ mission }) {
  const progress = (mission.progress / mission.requirement) * 100;
  
  return (
    <div className="space-y-2">
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-red-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">
          Progress: {mission.progress}/{mission.requirement} {mission.unit}
        </span>
        <span className="text-gray-400">
          {progress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}