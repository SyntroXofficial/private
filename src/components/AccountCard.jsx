import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardDocumentIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { RARITY_CONFIGS } from '../utils/rarityConfig';
import PinModal from './PinModal';

export default function AccountCard({ account }) {
  const [copied, setCopied] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const rarityConfig = RARITY_CONFIGS[account.rarity];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePinSubmit = (pin) => {
    if (pin === rarityConfig.pin) {
      setShowCredentials(true);
      setShowPinModal(false);
    } else {
      // Handle incorrect PIN
      setShowPinModal(false);
    }
  };

  const handleCredentialsClick = () => {
    if (rarityConfig.requiresPin && !showCredentials) {
      setShowPinModal(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className={`glass-effect cyber-border rounded-xl overflow-hidden ${rarityConfig.borderColor}`}
      >
        <div className="relative">
          <img 
            src={account.imageUrl} 
            alt={account.game} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{account.game}</h3>
          <span className={`absolute top-4 right-4 px-4 py-1.5 rounded-full ${rarityConfig.bgColor} ${rarityConfig.color} text-sm font-bold tracking-wider shadow-lg border ${rarityConfig.borderColor}`}>
            {rarityConfig.label}
          </span>
        </div>
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {account.description.split('\n').map((line, index) => (
              <p key={index} className="text-gray-300 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                {line}
              </p>
            ))}
          </div>
          <div className="space-y-2 mb-6">
            {account.features.map((feature, index) => (
              <span 
                key={index}
                className="inline-block mr-2 mb-2 px-3 py-1 bg-violet-600/30 rounded-full text-sm text-violet-300 border border-violet-500/30"
              >
                {feature}
              </span>
            ))}
          </div>
          <div className="space-y-4">
            {(!rarityConfig.requiresPin || showCredentials) ? (
              <>
                <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                  <span className="text-gray-300">Username:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-100">{account.username}</span>
                    <button 
                      onClick={() => copyToClipboard(account.username, 'username')}
                      className="p-1.5 hover:bg-violet-600/50 rounded-lg transition-all duration-300"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 text-violet-400" />
                    </button>
                    {copied === 'username' && (
                      <span className="text-xs text-green-400">Copied!</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                  <span className="text-gray-300">Password:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-100">{account.password}</span>
                    <button 
                      onClick={() => copyToClipboard(account.password, 'password')}
                      className="p-1.5 hover:bg-violet-600/50 rounded-lg transition-all duration-300"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 text-violet-400" />
                    </button>
                    {copied === 'password' && (
                      <span className="text-xs text-green-400">Copied!</span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={handleCredentialsClick}
                className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 ${rarityConfig.bgColor} ${rarityConfig.color} transition-all duration-300 hover:opacity-80`}
              >
                <LockClosedIcon className="h-5 w-5" />
                <span>Enter PIN to View</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSubmit={handlePinSubmit}
        rarity={account.rarity}
      />
    </>
  );
}