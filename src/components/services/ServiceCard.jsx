import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';
import ServiceLink from './ServiceLink';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'inStock':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case 'outOfStock':
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    case 'unknown':
      return <QuestionMarkCircleIcon className="h-5 w-5 text-yellow-500" />;
    default:
      return null;
  }
};

const StatusText = ({ status }) => {
  switch (status) {
    case 'inStock':
      return '✅ In Stock';
    case 'outOfStock':
      return '❌ Out of Stock';
    case 'unknown':
      return '❔ Unknown';
    default:
      return '';
  }
};

export default function ServiceCard({ service }) {
  const rarityConfig = RARITY_CONFIGS[service.rarity];
  const glowStyle = RARITY_GLOW[service.rarity];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-effect rounded-xl overflow-hidden"
      style={{
        boxShadow: glowStyle.boxShadow,
        animation: `${glowStyle.animation} 3s ease-in-out infinite`
      }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{service.name}</h3>
          <StatusIcon status={service.status} />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status:</span>
            <span className="text-gray-200">
              <StatusText status={service.status} />
            </span>
          </div>
          
          <div className={`inline-block px-4 py-1.5 rounded-full ${rarityConfig.bgColor} ${rarityConfig.textColor} text-sm font-bold tracking-wider shadow-lg border ${rarityConfig.borderColor}`}>
            {rarityConfig.label}
          </div>

          <ServiceLink service={service} />
        </div>
      </div>
    </motion.div>
  );
}