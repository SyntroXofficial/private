import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import HeroCards from './HeroCards';
import HeroTitle from './HeroTitle';
import HeroBackground from './HeroBackground';

export default function HeroSection() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 relative overflow-hidden">
      <HeroBackground />
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <HeroTitle />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link 
            to="/accounts" 
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Browse Accounts
            </motion.span>
            <motion.span
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </Link>
          <Link 
            to="/other-services" 
            className="w-full sm:w-auto px-6 py-2 border border-violet-500/50 rounded-lg hover:bg-violet-900/20 transition-all duration-300 text-violet-400"
          >
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Explore Services
            </motion.span>
          </Link>
        </motion.div>

        <HeroCards />
      </div>
    </div>
  );
}