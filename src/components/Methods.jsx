import React from 'react';
import { motion } from 'framer-motion';
import MethodCard from './methods/MethodCard';
import { methods } from '../data/methods';

export default function Methods() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-red-500 mb-6">Game Methods</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover various methods and techniques for gaming services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {methods.map((method) => (
            <MethodCard key={method.id} method={method} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}