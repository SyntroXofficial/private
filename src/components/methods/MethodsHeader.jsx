import React from 'react';
import { motion } from 'framer-motion';

export default function MethodsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl font-bold text-red-500 mb-6">Game Methods</h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Discover various methods and techniques for gaming services. Each method is verified and regularly updated.
      </p>
    </motion.div>
  );
}