import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/40" />
      
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          backgroundSize: '100% 100%',
        }}
      />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: -10,
              opacity: 0
            }}
            animate={{
              y: '100vh',
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </>
  );
}