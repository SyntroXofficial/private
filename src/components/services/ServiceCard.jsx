import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CloudArrowUpIcon, FilmIcon, UserGroupIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const getServiceIcon = (type) => {
  switch (type) {
    case 'cloud':
      return CloudArrowUpIcon;
    case 'streaming':
      return FilmIcon;
    case 'community':
      return UserGroupIcon;
    case 'feedback':
      return ChatBubbleBottomCenterTextIcon;
    default:
      return CloudArrowUpIcon;
  }
};

export default function ServiceCard({ service, delay = 0 }) {
  const Icon = getServiceIcon(service.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link to={service.path || '#'}>
        <div className="glass-effect cyber-border p-8 rounded-xl h-full hover:scale-[1.02] transition-transform duration-300">
          <Icon className="h-16 w-16 text-red-500 mb-6" />
          <h2 className="text-2xl font-bold text-red-400 mb-4">{service.name}</h2>
          <p className="text-gray-400 mb-4">{service.description}</p>
          
          {service.stats && (
            <div className="mt-4 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full inline-block">
              {service.stats}
            </div>
          )}

          {service.members && (
            <div className="mt-4 space-y-2">
              {service.members.map((member, idx) => (
                <div key={idx} className="text-gray-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  {member}
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}