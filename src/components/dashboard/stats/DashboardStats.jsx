import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  UserMinusIcon,
  UserPlusIcon,
  ServerIcon
} from '@heroicons/react/24/outline';

export default function DashboardStats({ stats }) {
  const statItems = [
    {
      icon: UserGroupIcon,
      label: 'Total Users',
      value: stats.totalUsers,
      subValue: `${stats.activeUsers} active`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: UserMinusIcon,
      label: 'Banned Users',
      value: stats.bannedUsers,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20'
    },
    {
      icon: UserPlusIcon,
      label: 'New Users',
      value: stats.newUsers,
      subValue: 'Last 24h',
      color: 'text-green-500',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: ServerIcon,
      label: 'Server Status',
      value: stats.serverStatus,
      subValue: `${stats.uptime} uptime`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20'
    }
  ];

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-black/30"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <span className="text-sm text-gray-400">{item.label}</span>
            </div>
            
            <div className="text-xl font-bold text-white">
              {item.value}
            </div>
            
            {item.subValue && (
              <div className="text-sm text-gray-400 mt-1">
                {item.subValue}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}