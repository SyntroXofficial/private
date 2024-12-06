import React from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import MissionProgress from './MissionProgress';
import MissionReward from './MissionReward';
import TierNumber from './TierNumber';

export default function BattlePassTier({ mission, index, isFirst, isLast }) {
  const rarityConfig = RARITY_CONFIGS[mission.reward.rarity.toLowerCase()];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <TierNumber number={index + 1} />
      
      {!isFirst && (
        <div className="absolute top-0 left-[7.5rem] w-0.5 h-1/2 -translate-y-1/2 bg-gray-800" />
      )}
      {!isLast && (
        <div className="absolute bottom-0 left-[7.5rem] w-0.5 h-1/2 translate-y-1/2 bg-gray-800" />
      )}
      
      <div className="relative ml-32 flex items-stretch bg-black/60 rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300">
        <div className="w-64 h-48 overflow-hidden">
          <img 
            src={mission.image} 
            alt={mission.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-2xl font-bold text-white">
              {mission.title}
            </h3>
            {mission.locked ? (
              <div className="flex items-center gap-2 text-red-500">
                <LockClosedIcon className="h-5 w-5" />
                <span className="text-sm font-bold">LOCKED (Level {mission.level})</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-500">
                <CheckIcon className="h-5 w-5" />
                <span className="text-sm font-bold">AVAILABLE</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-400 mb-4">{mission.description}</p>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`
              px-4 py-1.5 rounded-md ${rarityConfig.bgColor} ${rarityConfig.textColor}
              text-sm font-bold tracking-wider
            `}>
              {rarityConfig.label} REWARD
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <SparklesIcon className="h-4 w-4 text-yellow-500" />
              <span>{mission.xp} XP</span>
            </div>
            <div className="text-gray-500 text-sm">
              Required: {mission.requirement} {mission.unit}
            </div>
          </div>

          <MissionProgress mission={mission} />
        </div>

        <MissionReward mission={mission} rarityConfig={rarityConfig} />
      </div>
    </motion.div>
  );
}