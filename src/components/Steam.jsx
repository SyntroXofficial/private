import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AccountCard from './AccountCard';
import WarningMessage from './WarningMessage';
import SearchBar from './SearchBar';
import { sortByRarity } from '../utils/sortByRarity';

const accounts = [
  {
    game: 'Cyberpunk 2077',
    username: 'cyber_user',
    password: 'cp2077!',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    description: '• Full Game Access with All DLCs\n• Level 50 Character\n• Legendary Weapons & Cyberware\n• All Districts Unlocked\n• Completed Main Story\n• Rare In-Game Items',
    features: [
      { label: 'Region', value: 'Global' },
      { label: 'Platform', value: 'Steam' },
      { label: 'Rating', value: 'M (Mature)' },
      { label: 'Genre', value: 'RPG' },
      { label: 'Release', value: '2020' },
      { label: 'Playtime', value: '100+ hours' }
    ],
    rarity: 'legendary'
  },
  {
    game: 'God of War Ragnarök',
    username: 'gow_ragnarok',
    password: 'ragnarok!',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
    description: '• Complete Story Access\n• All Weapons and Armor\n• Max Level Character\n• All Realms Unlocked\n• All Side Quests Available\n• Rare Collectibles',
    features: [
      { label: 'Region', value: 'Global' },
      { label: 'Platform', value: 'Steam' },
      { label: 'Rating', value: 'M (Mature)' },
      { label: 'Genre', value: 'Action-Adventure' },
      { label: 'Release', value: '2022' },
      { label: 'Playtime', value: '40+ hours' }
    ],
    rarity: 'legendary'
  },
  {
    game: 'Resident Evil 4 Remake',
    username: 're4_remake',
    password: 're4remake!',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
    description: '• Full Game Access\n• All Weapons Unlocked\n• Infinite Ammo\n• All Costumes\n• Professional Difficulty\n• Special Modes',
    features: [
      { label: 'Region', value: 'Global' },
      { label: 'Platform', value: 'Steam' },
      { label: 'Rating', value: 'M (Mature)' },
      { label: 'Genre', value: 'Survival Horror' },
      { label: 'Release', value: '2023' },
      { label: 'Playtime', value: '50+ hours' }
    ],
    rarity: 'mythic'
  },
  {
    game: 'Elden Ring',
    username: 'elden_lord',
    password: 'eldenring!',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    description: '• Full Game Access\n• High-Level Character\n• Rare Equipment\n• All Areas Accessible\n• PvP Enabled\n• Legendary Items',
    features: [
      { label: 'Region', value: 'Global' },
      { label: 'Platform', value: 'Steam' },
      { label: 'Rating', value: 'M (Mature)' },
      { label: 'Genre', value: 'Action RPG' },
      { label: 'Release', value: '2022' },
      { label: 'Playtime', value: '150+ hours' }
    ],
    rarity: 'epic'
  },
  {
    game: 'Black Myth: Wukong',
    username: 'wukong_myth',
    password: 'wukong!',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
    description: '• Early Access\n• All Content Unlocked\n• Exclusive Items\n• Special Edition Content\n• Beta Features\n• Founder Status',
    features: [
      { label: 'Region', value: 'Global' },
      { label: 'Platform', value: 'Steam' },
      { label: 'Rating', value: 'M (Mature)' },
      { label: 'Genre', value: 'Action RPG' },
      { label: 'Release', value: '2024' },
      { label: 'Playtime', value: '40+ hours' }
    ],
    rarity: 'mythic'
  },
  {
    game: "Baldur's Gate 3",
    username: 'bg3_master',
    password: 'bg3game!',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
    description: '• Full Game Access\n• All Classes Available\n• Multiplayer Enabled\n• All Acts Unlocked\n• Rare Items\n• Special Equipment',
    features: [
      { label: 'Region', value: 'Global' },
      { label: 'Platform', value: 'Steam' },
      { label: 'Rating', value: 'M (Mature)' },
      { label: 'Genre', value: 'RPG' },
      { label: 'Release', value: '2023' },
      { label: 'Playtime', value: '100+ hours' }
    ],
    rarity: 'legendary'
  }
];

export default function Steam() {
  const [filteredAccounts, setFilteredAccounts] = useState(sortByRarity(accounts));

  const handleSearch = (searchTerm) => {
    const filtered = accounts.filter(account => 
      account.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.features.some(feature => 
        feature.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredAccounts(sortByRarity(filtered));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="h-[40vh] relative flex items-center justify-center mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-bold mb-6 text-red-500"
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
        <SearchBar onSearch={handleSearch} />
        <WarningMessage />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccounts.map((account, index) => (
            <AccountCard key={index} account={account} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}