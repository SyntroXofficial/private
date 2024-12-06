import React from 'react';
import { motion } from 'framer-motion';

export default function HeroTitle() {
  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="text-center mb-12"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative inline-block"
        variants={titleVariants}
      >
        <h1 className="text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 animate-gradient">
          Prime Nexo
        </h1>
        <motion.div 
          className="absolute -inset-1 blur-xl bg-gradient-to-r from-violet-400/20 via-pink-400/20 to-violet-400/20"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
      
      <motion.p 
        className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
        variants={textVariants}
      >
        Your ultimate destination for premium gaming experiences. Access exclusive accounts, cloud gaming, and streaming services in one secure platform.
      </motion.p>
    </motion.div>
  );
}