import React from 'react';
import { motion } from 'framer-motion';
import { FilmIcon, TvIcon, RssIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: FilmIcon,
    title: 'Movies',
    description: 'Access a vast library of movies from various sources'
  },
  {
    icon: TvIcon,
    title: 'TV Shows',
    description: 'Stream your favorite TV series and shows'
  },
  {
    icon: RssIcon,
    title: 'Add-ons',
    description: 'Enhance your experience with community add-ons'
  }
];

export default function Stremio() {
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
          <h1 className="text-5xl font-bold text-violet-400 mb-6">Stremio Streaming</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enhance your Stremio experience with our curated collection of add-ons and streaming sources.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect cyber-border p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-violet-400 mb-4">About Stremio</h3>
            <p className="text-gray-300 mb-6">
              Stremio is a modern media center that's a one-stop solution for your video entertainment. Watch everything you want in one place.
            </p>
            <a 
              href="https://stremio-addons.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
            >
              Browse Add-ons
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect cyber-border p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-violet-400 mb-4">Getting Started</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">1</span>
                <span className="text-gray-300">Download and install Stremio</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">2</span>
                <span className="text-gray-300">Visit the add-ons catalog</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">3</span>
                <span className="text-gray-300">Install your preferred add-ons</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">4</span>
                <span className="text-gray-300">Start streaming your content</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="feature-card text-center"
            >
              <feature.icon className="h-12 w-12 text-violet-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-violet-300 mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}