import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { steamAccounts } from '../../data/steamAccounts';
import { RARITY_GLOW } from '../../utils/glowStyles';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { ClockIcon, TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline';

const latestReleases = steamAccounts
  .filter(account => account.rarity === 'mythic' || account.rarity === 'legendary')
  .slice(0, 6);

const FeatureIcon = ({ feature }) => {
  switch (feature.label) {
    case 'Playtime':
      return <ClockIcon className="h-4 w-4" />;
    case 'Rating':
      return <TrophyIcon className="h-4 w-4" />;
    default:
      return <SparklesIcon className="h-4 w-4" />;
  }
};

export default function LatestReleases() {
  return (
    <div className="bg-black/60 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-red-500 mb-4">Latest Releases</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Check out our newest premium game accounts with exclusive content and features
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Made by <span className="text-red-500 font-semibold">Andres_rios</span> and{' '}
            <span className="text-red-500 font-semibold">MarcSpector</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestReleases.map((game, index) => {
            const rarityConfig = RARITY_CONFIGS[game.rarity];
            const glowStyle = RARITY_GLOW[game.rarity];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                style={{
                  boxShadow: glowStyle.boxShadow,
                  animation: `${glowStyle.animation} 3s ease-in-out infinite`
                }}
              >
                <div className="relative h-48">
                  <img
                    src={game.imageUrl}
                    alt={game.game}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white mb-2">{game.game}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
                      {rarityConfig.label}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {/* Game Description */}
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {game.description.split('\n')[0].replace('• ', '')}
                    </p>
                    
                    {/* Key Features */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`h-2 w-2 rounded-full ${rarityConfig.textAccent}`} />
                        <span className="text-gray-300">{game.features.find(f => f.label === 'Genre').value}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`h-2 w-2 rounded-full ${rarityConfig.textAccent}`} />
                        <span className="text-gray-300">{game.features.find(f => f.label === 'Release').value}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ClockIcon className={`h-4 w-4 ${rarityConfig.textAccent}`} />
                        <span className="text-gray-300">{game.features.find(f => f.label === 'Playtime').value}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrophyIcon className={`h-4 w-4 ${rarityConfig.textAccent}`} />
                        <span className="text-gray-300">{game.features.find(f => f.label === 'Rating').value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/steam"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 text-white font-semibold"
          >
            View All Games
          </Link>
        </motion.div>
      </div>
    </div>
  );
}