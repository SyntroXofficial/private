import React from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import MissionProgress from './MissionProgress';
import MissionReward from './MissionReward';

export default function MissionCard({ mission, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl glass-effect border border-white/10"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 group-hover:opacity-30"
        style={{ 
          backgroundImage: `url(${mission.background})`,
          backgroundBlendMode: 'overlay'
        }}
      />
      
      <div className="relative p-6 group hover:bg-black/80 transition-colors duration-300">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg bg-black/50">
            <motion.img 
              src={mission.image} 
              alt={mission.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                {mission.title}
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

            <p className="text-gray-300 mb-4">{mission.description}</p>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <ClockIcon className="h-4 w-4" />
              <span>Required: {mission.requirement} {mission.unit}</span>
            </div>

            <MissionProgress mission={mission} />
          </div>

          <MissionReward reward={mission.reward} />
        </div>
      </div>
    </motion.div>
  );
}