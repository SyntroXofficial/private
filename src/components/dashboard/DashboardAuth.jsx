import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline';

const DASHBOARD_PIN = '673492815047236';
const DASHBOARD_PASSWORD = '8@Tz!3YwL#q2RpN';

export default function DashboardAuth({ onAuthorized }) {
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (pin === DASHBOARD_PIN && password === DASHBOARD_PASSWORD) {
      onAuthorized();
    } else {
      setError('Invalid PIN or password');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: isShaking ? [-10, 10, -10, 10, 0] : 0
        }}
        transition={{ 
          duration: isShaking ? 0.4 : 0.2,
          type: isShaking ? "spring" : "tween"
        }}
        className="glass-effect rounded-xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Dashboard Access</h2>
          <p className="text-gray-400">Enter PIN and password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              PIN
            </label>
            <div className="relative">
              <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="Enter PIN"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all duration-300"
          >
            Access Dashboard
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}