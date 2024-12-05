import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';
import MethodPin from './MethodPin';
import MethodContent from './MethodContent';

export default function MethodCard({ method }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const rarityConfig = RARITY_CONFIGS[method.rarity];
  const glowStyle = RARITY_GLOW[method.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-effect rounded-xl overflow-hidden"
      style={{
        boxShadow: glowStyle.boxShadow,
        animation: `${glowStyle.animation} 3s ease-in-out infinite`
      }}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{method.title}</h2>
          <div className={`
            px-4 py-1.5 rounded-full ${rarityConfig.bgColor} ${rarityConfig.textColor}
            text-sm font-bold tracking-wider shadow-lg border ${rarityConfig.borderColor}
          `}>
            {rarityConfig.label}
          </div>
        </div>

        {isUnlocked ? (
          <MethodContent method={method} />
        ) : (
          <MethodPin method={method} onUnlock={() => setIsUnlocked(true)} />
        )}
      </div>
    </motion.div>
  );
}