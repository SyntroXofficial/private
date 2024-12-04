import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, GlobeAltIcon, CubeIcon, SparklesIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Secure Access',
    description: 'Advanced security measures to protect your gaming accounts with 256-bit encryption'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Support',
    description: 'Access to games from different regions and platforms with 24/7 customer support'
  },
  {
    icon: CubeIcon,
    title: 'Premium Content',
    description: 'Exclusive access to rare items, DLCs, and premium in-game features'
  },
  {
    icon: SparklesIcon,
    title: 'Instant Access',
    description: 'Quick and easy access to your favorite games with automatic activation'
  },
  {
    icon: UserGroupIcon,
    title: 'Community',
    description: 'Join a thriving community of gamers and share experiences'
  },
  {
    icon: ClockIcon,
    title: 'Regular Updates',
    description: 'New accounts and features added daily to ensure the best gaming experience'
  }
];

export default function Features() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-violet-400 mb-4">Why Choose Prime Nexo?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Experience gaming like never before with our premium features and services</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="feature-card"
            >
              <feature.icon className="h-12 w-12 text-violet-400 mb-4" />
              <h3 className="text-xl font-semibold text-violet-300 mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}