import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function BanConfirmationModal({ isOpen, onClose, onConfirm, username }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      setError('Please provide a reason for the ban');
      return;
    }

    onConfirm(reason);
    setReason('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-black/95 rounded-lg p-6 max-w-md w-full border border-red-500/30"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-red-500">Confirm Ban</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-white/70 hover:text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-medium">Warning:</p>
                <p className="text-gray-300">
                  You are about to ban user <span className="font-semibold text-white">{username}</span>. 
                  This action will:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Block their IP address</li>
                  <li>• Prevent access from their current device</li>
                  <li>• Log their browser fingerprint</li>
                  <li>• Record this action in the security logs</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Ban Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  setError('');
                }}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="Enter the reason for this ban..."
                rows="3"
              />
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
              >
                Confirm Ban
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}