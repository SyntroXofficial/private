import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  ShieldCheckIcon,
  ServerIcon,
  ClockIcon,
  UserMinusIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { useStats } from '../../../hooks/useStats';

export default function DashboardStats() {
  const { stats } = useStats();

  const statItems = [
    {
      icon: UserGroupIcon,
      label: 'Total Users',
      value: stats.totalUsers,
      change: `${stats.activeUsers} Active`
    },
    {
      icon: ShieldCheckIcon,
      label: 'Active Accounts',
      value: stats.activeAccounts,
      change: 'Current'
    },
    {
      icon: ServerIcon,
      label: 'Server Status',
      value: stats.serverStatus,
      change: stats.uptime
    },
    {
      icon: ClockIcon,
      label: 'Response Time',
      value: `${stats.responseTime}ms`,
      change: 'Average'
    },
    {
      icon: UserMinusIcon,
      label: 'Banned Users',
      value: stats.bannedUsers,
      change: 'Total'
    },
    {
      icon: UserPlusIcon,
      label: 'New Users',
      value: stats.newUsers,
      change: 'Last 24h'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <stat.icon className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-green-500">{stat.change}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}