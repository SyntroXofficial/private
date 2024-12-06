import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  CubeIcon, 
  SparklesIcon, 
  UserGroupIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Secure Access',
    description: 'Advanced security measures to protect your gaming accounts'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Support',
    description: 'Access to games from different regions and platforms'
  },
  {
    icon: CubeIcon,
    title: 'Premium Content',
    description: 'Exclusive access to rare items and premium features'
  },
  {
    icon: SparklesIcon,
    title: 'Instant Access',
    description: 'Quick and easy access to your favorite games'
  },
  {
    icon: UserGroupIcon,
    title: 'Community',
    description: 'Join a thriving community of gamers'
  },
  {
    icon: ClockIcon,
    title: 'Regular Updates',
    description: 'New accounts and features added daily'
  }
];

export default function Features() {
  return (
    <div className="py-24 bg-black/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Prime Nexo?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience gaming like never before with our premium features and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}