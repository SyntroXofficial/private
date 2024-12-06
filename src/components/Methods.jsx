import React from 'react';
import { motion } from 'framer-motion';
import MethodsList from './methods/MethodsList';
import MethodsHeader from './methods/MethodsHeader';

export default function Methods() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="h-[30vh] relative flex items-center justify-center mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-bold mb-4 text-red-500"
          >
            Game Methods
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-400 leading-relaxed"
          >
            Discover Various Gaming Methods and Techniques
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <MethodsList />
      </div>
    </motion.div>
  );
}