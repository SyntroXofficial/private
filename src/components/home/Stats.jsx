import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, GlobeAltIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const stats = [
  { 
    icon: UserGroupIcon,
    number: '10,000+', 
    label: 'Active Users',
    description: 'Trusted by gamers worldwide'
  },
  { 
    icon: GlobeAltIcon,
    number: '50+', 
    label: 'Premium Games',
    description: 'Extensive game library'
  },
  { 
    icon: ClockIcon,
    number: '24/7', 
    label: 'Support',
    description: 'Always here to help'
  },
  { 
    icon: ShieldCheckIcon,
    number: '99.9%', 
    label: 'Success Rate',
    description: 'Reliable service'
  }
];

export default function Stats() {
  return (
    <div className="py-24 bg-gradient-to-b from-black/40 to-black/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-violet-400 mb-4">Our Impact</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Growing stronger with our community every day</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="stats-card text-center"
            >
              <stat.icon className="h-12 w-12 text-violet-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-violet-400 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}