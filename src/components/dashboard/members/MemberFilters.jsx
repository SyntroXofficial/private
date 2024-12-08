import React from 'react';
import { motion } from 'framer-motion';

const filters = [
  { label: 'All Members', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Banned', value: 'banned' }
];

export default function MemberFilters({ filter, onFilterChange }) {
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <motion.button
          key={f.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === f.value
              ? 'bg-red-600 text-white'
              : 'bg-black/50 text-gray-300 hover:bg-black/70'
          }`}
        >
          {f.label}
        </motion.button>
      ))}
    </div>
  );
}