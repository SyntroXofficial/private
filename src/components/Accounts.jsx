import React from 'react';
import { motion } from 'framer-motion';

export default function Accounts() {
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
          <h1 className="text-5xl font-bold text-violet-400 mb-6">Premium Accounts</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our collection with exclusive content.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}