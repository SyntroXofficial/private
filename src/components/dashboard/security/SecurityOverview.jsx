import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function SecurityOverview({ metrics }) {
  const getThreatLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-red-500 bg-red-500/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'low':
        return 'text-green-500 bg-green-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };

  const securityItems = [
    {
      icon: ShieldCheckIcon,
      label: 'Threat Level',
      value: metrics.threatLevel,
      colorClass: getThreatLevelColor(metrics.threatLevel)
    },
    {
      icon: ExclamationTriangleIcon,
      label: 'Active Threats',
      value: metrics.activeThreats,
      colorClass: 'text-yellow-500 bg-yellow-500/20'
    },
    {
      icon: LockClosedIcon,
      label: 'Blocked Attacks',
      value: metrics.blockedAttacks,
      colorClass: 'text-green-500 bg-green-500/20'
    },
    {
      icon: GlobeAltIcon,
      label: 'VPN Detections',
      value: metrics.vpnDetections,
      colorClass: 'text-blue-500 bg-blue-500/20'
    }
  ];

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Security Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {securityItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-black/30"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${item.colorClass}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-sm text-gray-400">{item.label}</span>
            </div>
            <div className="text-xl font-bold text-white">
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>

      {metrics.lastIncident && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-red-400 font-medium">Last Security Incident</p>
              <p className="text-sm text-gray-300 mt-1">{metrics.lastIncident}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}