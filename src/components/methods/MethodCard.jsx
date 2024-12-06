import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';
import PinModal from '../PinModal';
import MethodContent from './MethodContent';

export default function MethodCard({ method }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [error, setError] = useState('');
  const rarityConfig = RARITY_CONFIGS[method.rarity];
  const glowStyle = RARITY_GLOW[method.rarity];

  const handlePinSubmit = (pin) => {
    if (pin === method.pin) {
      setIsUnlocked(true);
      setShowPinModal(false);
      setError('');
    } else {
      setError('Incorrect PIN');
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-effect rounded-xl overflow-hidden h-full"
        style={{
          boxShadow: glowStyle.boxShadow,
          animation: `${glowStyle.animation} 3s ease-in-out infinite`
        }}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{method.title}</h3>
            <div className={`
              px-3 py-1 rounded-full ${rarityConfig.bgColor} ${rarityConfig.textColor}
              text-sm font-bold tracking-wider shadow-lg border ${rarityConfig.borderColor}
            `}>
              {rarityConfig.label}
            </div>
          </div>

          <div className="flex-grow">
            {isUnlocked ? (
              <MethodContent method={method} />
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPinModal(true)}
                className={`w-full px-4 py-3 rounded-lg text-white transition-all duration-300 flex items-center justify-center gap-2 ${rarityConfig.bgColor} hover:brightness-110`}
                style={{
                  boxShadow: `0 0 20px ${rarityConfig.glowColor}40`
                }}
              >
                View Method
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      <PinModal
        isOpen={showPinModal}
        onClose={() => {
          setShowPinModal(false);
          setError('');
        }}
        onSubmit={handlePinSubmit}
        rarity={method.rarity}
        error={error}
      />
    </>
  );
}