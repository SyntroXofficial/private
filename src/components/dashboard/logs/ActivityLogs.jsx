import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon,
  ArrowPathIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { useActivityLogs } from '../../../hooks/useActivityLogs';

export default function ActivityLogs() {
  const { logs, refreshLogs } = useActivityLogs();
  const [filter, setFilter] = useState('all');

  const getLogTypeStyle = (type) => {
    switch (type) {
      case 'security':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'user':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'system':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Activity Logs</h2>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-black/30 rounded-lg text-white border border-white/10"
          >
            <option value="all">All Logs</option>
            <option value="security">Security</option>
            <option value="user">User Activity</option>
            <option value="system">System</option>
          </select>
          <button
            onClick={refreshLogs}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            title="Refresh Logs"
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {logs
          .filter(log => filter === 'all' || log.type === filter)
          .map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-black/30 rounded-lg border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm border ${getLogTypeStyle(log.type)}`}>
                    {log.type}
                  </div>
                  <div>
                    <p className="text-white">{log.message}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                      <ClockIcon className="h-4 w-4" />
                      <span>{log.timestamp}</span>
                      {log.user && (
                        <>
                          <span>•</span>
                          <span>{log.user}</span>
                        </>
                      )}
                      {log.ip && (
                        <>
                          <span>•</span>
                          <span>IP: {log.ip}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {log.severity === 'high' && (
                  <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm border border-red-500/30">
                    High Priority
                  </div>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}