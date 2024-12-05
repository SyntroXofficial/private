import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardDocumentIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { RARITY_CONFIGS } from '../utils/rarityConfig';
import { RARITY_GLOW } from '../utils/glowStyles';
import PinModal from './PinModal';

export default function AccountCard({ account }) {
  const [copied, setCopied] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const rarityConfig = RARITY_CONFIGS[account.rarity];
  const glowStyle = RARITY_GLOW[account.rarity];

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
        className="glass-effect rounded-xl overflow-hidden"
        style={{
          boxShadow: glowStyle.boxShadow,
          animation: `${glowStyle.animation} 3s ease-in-out infinite`
        }}
      >
        <div className="relative">
          <img 
            src={account.imageUrl} 
            alt={account.game} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-4 left-4 space-y-2">
            <h3 className="text-2xl font-bold text-white">{account.game}</h3>
            <span className={`inline-block px-4 py-1.5 rounded-full ${rarityConfig.bgColor} ${rarityConfig.textColor} text-sm font-bold tracking-wider shadow-lg border ${rarityConfig.borderColor}`}>
              {rarityConfig.label}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {account.description.split('\n').map((line, index) => (
              <p key={index} className="text-gray-300 flex items-center gap-2">
                <CheckCircleIcon className={`h-5 w-5 ${rarityConfig.iconColor} flex-shrink-0`} />
                {line}
              </p>
            ))}
          </div>
          <div className="space-y-2 mb-6">
            {account.features.map((feature, index) => (
              <div 
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-400">{feature.label}:</span>
                <span className="text-white">{feature.value}</span>
              </div>
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
                      className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
                    </button>
                    {copied === 'username' && (
                      <span className={`text-xs ${rarityConfig.textAccent}`}>Copied!</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                  <span className="text-gray-300">Password:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-100">{account.password}</span>
                    <button 
                      onClick={() => copyToClipboard(account.password, 'password')}
                      className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
                    </button>
                    {copied === 'password' && (
                      <span className={`text-xs ${rarityConfig.textAccent}`}>Copied!</span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={handleCredentialsClick}
                className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 ${rarityConfig.hoverAccent}`}
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