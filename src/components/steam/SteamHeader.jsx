import React from 'react';
import { motion } from 'framer-motion';
import { steamAccounts } from '../../data/steamAccounts';

export default function SteamHeader() {
  const accountCount = steamAccounts.length;

  return (
    <div className="h-[30vh] relative flex items-center justify-center mb-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl font-bold mb-4 text-red-500"
        >
          Steam Accounts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-gray-400 leading-relaxed"
        >
          Unlock Premium Gaming Experiences with Our Curated Collection
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 inline-block px-6 py-2 bg-gradient-to-r from-red-500/20 via-black/40 to-red-500/20 border border-red-500/30 rounded-lg"
        >
          <span className="text-white font-bold">
            {accountCount} Premium Accounts Available
          </span>
        </motion.div>
      </div>
    </div>
  );
}