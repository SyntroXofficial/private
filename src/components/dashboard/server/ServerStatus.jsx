import React from 'react';
import { motion } from 'framer-motion';
import { 
  ServerIcon, 
  CpuChipIcon, 
  CircleStackIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useServerStatus } from '../../../hooks/useServerStatus';

export default function ServerStatus() {
  const { status } = useServerStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Server Status</h2>
        <div className={`px-3 py-1 rounded-full ${
          status.health === 'Healthy' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {status.health}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CpuChipIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">CPU Usage</p>
              <p className="text-lg font-semibold text-white">{status.cpu}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CircleStackIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Memory Usage</p>
              <p className="text-lg font-semibold text-white">{status.memory}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <ServerIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Uptime</p>
              <p className="text-lg font-semibold text-white">{status.uptime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Traffic</p>
              <p className="text-lg font-semibold text-white">{status.traffic}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-sm text-yellow-400">
          Last Incident: {status.lastIncident || 'No recent incidents'}
        </p>
      </div>
    </motion.div>
  );
}