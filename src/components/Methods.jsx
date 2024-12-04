import React from 'react';
import { motion } from 'framer-motion';

export default function Methods() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-violet-400"
          >
            Coming Soon
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
}