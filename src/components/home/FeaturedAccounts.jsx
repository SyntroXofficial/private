import React from 'react';
import { motion } from 'framer-motion';
import { RARITY_GLOW } from '../../utils/glowStyles';

const accounts = [
  {
    id: 1,
    title: 'S.T.A.L.K.E.R. 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1643320/header.jpg',
    rarity: 'mythic',
    features: ['Full Game Access', 'Early Access Content', 'Special Edition Items']
  },
  {
    id: 2,
    title: 'Mortal Kombat 1',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg',
    rarity: 'mythic',
    features: ['All Characters', 'Premium Skins', 'Online Access']
  },
  {
    id: 3,
    title: 'Hitman World of Assassination',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1659040/header.jpg',
    rarity: 'legendary',
    features: ['Complete Trilogy', 'All DLC Locations', 'Bonus Missions']
  },
  {
    id: 4,
    title: 'Dead Island 2',
    image: 'https://cdn.wccftech.com/wp-content/uploads/2023/02/DI2.jpeg',
    rarity: 'legendary',
    features: ['Full Game Access', 'All Characters', 'Multiplayer Access']
  },
  {
    id: 5,
    title: 'Need for Speed Unbound',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1846380/header.jpg',
    rarity: 'legendary',
    features: ['All Cars Unlocked', 'Premium Customization', 'Online Features']
  },
  {
    id: 6,
    title: 'Cyberpunk 2077',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    rarity: 'legendary',
    features: ['Full Game Access', 'All DLCs', 'Level 50 Character']
  }
];

const RARITY_STYLES = {
  legendary: {
    badge: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    glow: RARITY_GLOW.legendary.boxShadow,
    animation: RARITY_GLOW.legendary.animation,
    dotColor: 'bg-yellow-500'
  },
  epic: {
    badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    glow: RARITY_GLOW.epic.boxShadow,
    animation: RARITY_GLOW.epic.animation,
    dotColor: 'bg-purple-500'
  },
  mythic: {
    badge: 'bg-red-500/20 text-red-300 border border-red-500/30',
    glow: RARITY_GLOW.mythic.boxShadow,
    animation: RARITY_GLOW.mythic.animation,
    dotColor: 'bg-red-500'
  }
};

export default function FeaturedAccounts() {
  return (
    <div className="bg-black/60">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Latest Releases
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            Check out our newest premium accounts
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              style={{
                boxShadow: RARITY_STYLES[account.rarity].glow,
                animation: `${RARITY_STYLES[account.rarity].animation} 3s ease-in-out infinite`
              }}
            >
              <div className="relative h-48">
                <img
                  src={account.image}
                  alt={account.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white mb-2">{account.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${RARITY_STYLES[account.rarity].badge}`}>
                    {account.rarity.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {account.features.map((feature, i) => (
                    <li key={i} className="text-gray-400 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${RARITY_STYLES[account.rarity].dotColor}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}