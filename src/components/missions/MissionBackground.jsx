import React from 'react';
import { motion } from 'framer-motion';

export default function MissionBackground({ mission }) {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mission.background})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
    </motion.div>
  );
}