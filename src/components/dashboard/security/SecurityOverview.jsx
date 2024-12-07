import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, ExclamationTriangleIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function SecurityOverview({ stats }) {
  const getSecurityLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Security Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-effect p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-400">Security Level</p>
              <p className={`text-xl font-bold ${getSecurityLevelColor(stats.securityLevel)}`}>
                {stats.securityLevel}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-effect p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-400">Threats Blocked</p>
              <p className="text-xl font-bold text-white">{stats.threatsBlocked}</p>
            </div>
          </div>
        </div>

        <div className="glass-effect p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <GlobeAltIcon className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-400">Active Sessions</p>
              <p className="text-xl font-bold text-white">{stats.activeSessions}</p>
            </div>
          </div>
        </div>

        <div className="glass-effect p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <ClockIcon className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-400">Last Attack</p>
              <p className="text-xl font-bold text-white">{stats.lastAttack || 'None'}</p>
            </div>
          </div>
        </div>
      </div>

      {stats.activeThreats > 0 && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Active Threats Detected!</p>
              <p className="text-sm text-gray-300">
                {stats.activeThreats} potential security {stats.activeThreats === 1 ? 'threat' : 'threats'} detected. 
                Immediate attention required.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}