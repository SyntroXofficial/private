import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function PinModal({ isOpen, onClose, onSubmit, rarity, error: externalError }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pin);
    
    if (externalError) {
      setError(externalError);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: isShaking ? [-10, 10, -10, 10, 0] : 0,
            rotate: isSuccess ? [0, 5, -5, 0] : 0,
          }}
          transition={{ 
            duration: isShaking ? 0.4 : isSuccess ? 0.5 : 0.2,
            type: isShaking || isSuccess ? "spring" : "tween"
          }}
          className={`glass-effect cyber-border rounded-xl p-6 max-w-md w-full ${
            isSuccess ? 'border-green-500' : error ? 'border-red-500' : ''
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Enter PIN</h3>
            <button 
              onClick={() => {
                onClose();
                setPin('');
                setError('');
                setIsSuccess(false);
              }} 
              className="p-1 hover:bg-gray-700/50 rounded-lg"
            >
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
                setIsSuccess(false);
              }}
              className={`w-full bg-gray-800/50 border rounded-lg px-4 py-2 mb-4 text-center text-2xl tracking-widest ${
                error ? 'border-red-500' : isSuccess ? 'border-green-500' : 'border-gray-700'
              }`}
              placeholder="****"
              autoFocus
            />
            <AnimatePresence>
              {(error || externalError) && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm mb-4 text-center"
                >
                  {error || externalError}
                </motion.p>
              )}
            </AnimatePresence>
            <button
              type="submit"
              disabled={pin.length !== 4}
              className={`w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed ${
                isSuccess ? 'bg-green-600 hover:bg-green-700' : ''
              }`}
            >
              {isSuccess ? 'Success!' : 'Unlock'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}