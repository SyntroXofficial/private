import React from 'react';
import { motion } from 'framer-motion';
import BattlePassHeader from './missions/BattlePassHeader';
import BattlePassTiers from './missions/BattlePassTiers';
import BattlePassProgress from './missions/BattlePassProgress';

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
        <BattlePassHeader />
        <BattlePassProgress />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-red-500 mb-4">ACTIVE MISSIONS</h2>
            <p className="text-xl text-gray-300">
              Complete missions to gain experience and unlock exclusive rewards.
            </p>
          </motion.div>
          
          <BattlePassTiers />
        </div>
      </div>
    </div>
  );
}