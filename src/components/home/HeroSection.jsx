import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 relative hero-gradient">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/40"></div>
      <div className="glass-effect cyber-border max-w-5xl mx-auto p-12 rounded-2xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <ShieldCheckIcon className="h-16 w-16 text-violet-400" />
            <SparklesIcon className="h-12 w-12 text-pink-400" />
          </div>
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
            Prime Nexo
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <StarIcon className="h-5 w-5 text-violet-400" />
            <span className="text-violet-400 text-lg font-semibold">Premium Gaming Hub</span>
            <StarIcon className="h-5 w-5 text-violet-400" />
          </div>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Your ultimate destination for premium gaming experiences. Access exclusive accounts, cloud gaming, and streaming services in one secure platform.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            to="/accounts" 
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            Browse Accounts
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/geforce-now" 
            className="w-full sm:w-auto px-6 py-2 border border-violet-500/50 rounded-lg hover:bg-violet-900/20 transition-all duration-300 text-violet-400"
          >
            Cloud Gaming
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-12 border-t border-violet-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Secure Access', value: '256-bit' },
              { label: 'Active Users', value: '10,000+' },
              { label: 'Success Rate', value: '99.9%' },
              { label: 'Support', value: '24/7' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-violet-400 mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}