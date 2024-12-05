import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CloudArrowUpIcon, FilmIcon } from '@heroicons/react/24/outline';

export default function OtherServices() {
  const services = [
    {
      icon: CloudArrowUpIcon,
      title: 'GeForce NOW',
      description: 'Cloud gaming platform powered by NVIDIA. Play your favorite games on any device.',
      path: '/geforce-now'
    },
    {
      icon: FilmIcon,
      title: 'Stremio',
      description: 'Stream movies, TV shows, and more with our enhanced Stremio service.',
      path: '/stremio'
    }
  ];

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
          <h1 className="text-5xl font-bold text-red-500 mb-6">Other Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our additional gaming and entertainment services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.path}>
                <div className="glass-effect cyber-border p-8 rounded-xl h-full hover:scale-[1.02] transition-transform duration-300">
                  <service.icon className="h-16 w-16 text-red-500 mb-6" />
                  <h2 className="text-2xl font-bold text-red-400 mb-4">{service.title}</h2>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}