import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function PinModal({ isOpen, onClose, onSubmit, rarity }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pin);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-effect cyber-border rounded-xl p-6 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Enter PIN</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-700/50 rounded-lg">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            maxLength="4"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
              setError('');
            }}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 mb-4 text-center text-2xl tracking-widest"
            placeholder="****"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={pin.length !== 4}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Unlock
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}