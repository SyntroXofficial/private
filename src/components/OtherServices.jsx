import React from 'react';
import { motion } from 'framer-motion';
import ServicesList from './services/ServicesList';
import ServicesHeader from './services/ServicesHeader';
import WarningMessage from './WarningMessage';

export default function OtherServices() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <ServicesHeader />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <WarningMessage />
        <ServicesList />
      </div>
    </motion.div>
  );
}