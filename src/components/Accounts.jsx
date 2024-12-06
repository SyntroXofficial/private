import React from 'react';
import { motion } from 'framer-motion';
import ServiceCategory from './services/ServiceCategory';
import { services } from '../data/services';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { sortServicesByRarity } from '../utils/sortServices';

export default function Accounts() {
  const sortedServices = services.map(category => sortServicesByRarity(category));

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
          <h1 className="text-5xl font-bold text-red-500 mb-6">Available Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Browse our collection of premium accounts and services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/90 border border-yellow-500/30 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-500 mb-2">Service Availability Notice</h3>
              <p className="text-gray-300">
                Due to the large number of services we offer and their dynamic nature, 
                stock status may not always be up-to-date in real-time. We're doing our 
                best to maintain accurate availability information, but please understand 
                that the actual status might vary. We appreciate your patience and 
                understanding as we work to keep this information as current as possible.
                If the links do not work they will get fixed soon, just contact the staff.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-12">
          {sortedServices.map((category, index) => (
            <ServiceCategory key={index} category={category} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}