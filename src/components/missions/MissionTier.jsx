import React from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon, CheckIcon } from '@heroicons/react/24/outline';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';

export default function MissionTier({ mission, index, isFirst, isLast }) {
  const rarityConfig = RARITY_CONFIGS[mission.reward.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {!isFirst && (
        <div className="absolute top-0 left-[39px] w-0.5 h-8 -translate-y-8 bg-gray-800" />
      )}
      {!isLast && (
        <div className="absolute bottom-0 left-[39px] w-0.5 h-8 translate-y-8 bg-gray-800" />
      )}
      
      <div className="relative flex items-stretch bg-black/60 rounded-lg overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />
        
        <div className="relative flex items-center gap-6 p-6">
          <div className="w-20 h-20 rounded-lg bg-black/60 p-4 flex items-center justify-center">
            <img src={mission.icon} alt="" className="w-12 h-12" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-2xl font-bold text-white">
                TIER {mission.tier}: {mission.title}
              </h3>
              {mission.locked ? (
                <div className="flex items-center gap-2 text-red-500">
                  <LockClosedIcon className="h-5 w-5" />
                  <span className="text-sm font-bold">LOCKED</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckIcon className="h-5 w-5" />
                  <span className="text-sm font-bold">AVAILABLE</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-400 mb-4">{mission.description}</p>
            
            <div className="flex items-center gap-4">
              <div className={`
                px-4 py-1.5 rounded-md ${rarityConfig.bgColor} ${rarityConfig.textColor}
                text-sm font-bold tracking-wider
              `}>
                {rarityConfig.label} REWARD
              </div>
              <div className="text-gray-500 text-sm">
                Required: {
                  mission.unit === 'combined'
                    ? `${mission.requirement.invites} invites & ${mission.requirement.time} min`
                    : `${mission.requirement} ${mission.unit}`
                }
              </div>
            </div>
          </div>
        </div>

        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity group-hover:opacity-20"
          style={{ backgroundImage: `url(${mission.background})` }}
        />
      </div>
    </motion.div>
  );
}