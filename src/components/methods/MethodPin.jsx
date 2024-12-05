import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PinModal from '../PinModal';

export default function MethodPin({ method, onUnlock }) {
  const [showPinModal, setShowPinModal] = useState(false);

  const handlePinSubmit = (pin) => {
    setShowPinModal(false);
    onUnlock();
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => setShowPinModal(true)}
        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all duration-300 flex items-center justify-center gap-2"
      >
        <span>View Method</span>
      </motion.button>

      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSubmit={handlePinSubmit}
        rarity={method.rarity}
      />
    </>
  );
}