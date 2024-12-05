import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/missions';

export default function MissionCategories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            relative overflow-hidden rounded-xl cursor-pointer
            transition-all duration-300 hover:scale-105 group
            ${category.active ? 'ring-2 ring-red-500' : ''}
          `}
        >
          <img 
            src={category.image} 
            alt={category.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white text-center mb-2">
              {category.title}
            </h3>
            <p className="text-sm text-gray-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {category.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}