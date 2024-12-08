import React from 'react';
import { motion } from 'framer-motion';
import { useServerMetrics } from '../../../hooks/useServerMetrics';

export default function SystemHealth() {
  const metrics = useServerMetrics();

  const getStatusColor = (value) => {
    if (value >= 90) return 'bg-red-500/20 text-red-400';
    if (value >= 70) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-green-500/20 text-green-400';
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const systemMetrics = [
    {
      label: 'CPU Usage',
      value: `${metrics.cpu}%`,
      color: getStatusColor(metrics.cpu)
    },
    {
      label: 'Memory Usage',
      value: `${metrics.memory}%`,
      color: getStatusColor(metrics.memory)
    },
    {
      label: 'Network In',
      value: formatBytes(metrics.network.in),
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      label: 'Network Out',
      value: formatBytes(metrics.network.out),
      color: 'bg-purple-500/20 text-purple-400'
    }
  ];

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">System Health</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${metric.color}`}
          >
            <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
            <div className="text-xl font-bold">
              {metric.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-400">
            Response Time: {metrics.responseTime}ms
          </span>
        </div>
      </div>
    </div>
  );
}