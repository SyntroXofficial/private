import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  GlobeAltIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useSecurityTools } from '../../../hooks/useSecurityTools';
import BanConfirmationModal from './BanConfirmationModal';

export default function SecurityTools() {
  const { security, toggleVPNBlock, toggleIPBlock, updateSecuritySettings } = useSecurityTools();
  const [showSettings, setShowSettings] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleBanUser = (username) => {
    setSelectedUser(username);
    setShowBanModal(true);
  };

  const confirmBan = () => {
    // Implement ban logic here
    setShowBanModal(false);
    setSelectedUser(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Security Controls</h2>
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="h-6 w-6 text-red-500" />
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GlobeAltIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-semibold text-white">VPN Detection</p>
              <p className="text-sm text-gray-400">Block VPN and proxy connections</p>
            </div>
          </div>
          <button
            onClick={toggleVPNBlock}
            className={`px-4 py-2 rounded-lg ${
              security.vpnBlocking
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
          >
            {security.vpnBlocking ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NoSymbolIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-semibold text-white">IP Blocking</p>
              <p className="text-sm text-gray-400">Automatically block suspicious IPs</p>
            </div>
          </div>
          <button
            onClick={toggleIPBlock}
            className={`px-4 py-2 rounded-lg ${
              security.ipBlocking
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
          >
            {security.ipBlocking ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {showSettings && (
          <div className="p-4 bg-black/30 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Maximum Login Attempts</label>
                <input
                  type="number"
                  value={security.settings.maxLoginAttempts}
                  onChange={(e) => updateSecuritySettings({ maxLoginAttempts: parseInt(e.target.value) })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                  min="1"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ban Duration (hours)</label>
                <input
                  type="number"
                  value={security.settings.banDuration}
                  onChange={(e) => updateSecuritySettings({ banDuration: parseInt(e.target.value) })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                  min="1"
                  max="720"
                />
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-black/30 rounded-lg">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="text-sm text-yellow-500 font-medium">Security Stats</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Blocked VPNs</p>
                  <p className="text-white font-semibold">{security.blockedVPNs}</p>
                </div>
                <div>
                  <p className="text-gray-400">Blocked IPs</p>
                  <p className="text-white font-semibold">{security.blockedIPs}</p>
                </div>
                <div>
                  <p className="text-gray-400">Last Attack</p>
                  <p className="text-white font-semibold">{security.lastAttack}</p>
                </div>
                <div>
                  <p className="text-gray-400">Security Level</p>
                  <p className="text-white font-semibold">{security.securityLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BanConfirmationModal
        isOpen={showBanModal}
        onClose={() => setShowBanModal(false)}
        onConfirm={confirmBan}
        username={selectedUser}
      />
    </motion.div>
  );
}