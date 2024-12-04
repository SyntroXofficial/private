import React from 'react';
import { motion } from 'framer-motion';
import AccountCard from './AccountCard';
import WarningMessage from './WarningMessage';

export default function Steam() {
  const accounts = [
    {
      game: 'Cyberpunk 2077',
      username: 'cyber_user',
      password: 'cp2077!',
      imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
      description: '• Full Game Access with All DLCs\n• Level 50 Character\n• Legendary Weapons & Cyberware\n• All Districts Unlocked\n• Completed Main Story\n• Rare In-Game Items',
      features: [
        'Region: Global', 
        'Platform: Steam', 
        'Rating: M (Mature)',
        'Genre: RPG',
        'Release: 2020',
        'Playtime: 100+ hours'
      ],
      rarity: 'legendary'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="h-[40vh] relative flex items-center justify-center mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-bold mb-6 text-violet-400"
          >
            Steam Accounts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-400 mb-8 leading-relaxed"
          >
            Unlock Premium Gaming Experiences with Our Curated Collection
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <WarningMessage />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.map((account, index) => (
            <AccountCard key={index} account={account} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}