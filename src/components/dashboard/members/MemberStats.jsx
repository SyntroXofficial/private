import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, UserIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

export default function MemberStats({ members, onlineUsers }) {
  const stats = [
    {
      icon: UserGroupIcon,
      label: 'Total Members',
      value: members.length,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: UserIcon,
      label: 'Online',
      value: onlineUsers.size,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: ShieldExclamationIcon,
      label: 'Banned',
      value: members.filter(m => m.banned).length,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}