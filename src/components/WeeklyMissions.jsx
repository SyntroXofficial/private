import React from 'react';
import { motion } from 'framer-motion';
import MissionsList from './missions/MissionsList';
import MissionHeader from './missions/MissionHeader';
import MissionCategories from './missions/MissionCategories';
import { missions } from '../data/missions';

export default function WeeklyMissions() {
  return (
    <div className="min-h-screen bg-black">
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-20"
        style={{ 
          backgroundImage: 'url(/backgrounds/los-santos.jpg)',
          backgroundBlendMode: 'overlay' 
        }}
      />
      
      <div className="relative z-10 pt-16">
        <MissionHeader />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 glass-effect p-8 rounded-xl"
          >
            <h2 className="text-4xl font-bold text-red-500 mb-4">CONTACT MISSIONS</h2>
            <p className="text-xl text-gray-300 max-w-3xl">
              Keep tabs on everyone worth knowing in the gaming world and all the action they can
              throw your way.
            </p>
            <p className="text-gray-400 mt-2">
              Each set of contact missions below has tiers of challenges. Complete each
              tier to unlock the next and earn unique rewards.
            </p>
          </motion.div>
          
          <div className="space-y-12">
            <MissionsList missions={missions} />
            <MissionCategories />
          </div>
        </div>
      </div>
    </div>
  );
}