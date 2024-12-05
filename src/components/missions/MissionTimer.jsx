import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function MissionTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 bg-[url('/missions/backgrounds/timer-bg.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
      
      <div className="relative z-10 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <ClockIcon className="h-8 w-8 text-red-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">Weekly Reset In:</h3>
          </div>
          
          <div className="flex gap-6">
            {[
              { value: timeLeft.days, label: 'DAYS' },
              { value: timeLeft.hours, label: 'HOURS' },
              { value: timeLeft.minutes, label: 'MINUTES' },
              { value: timeLeft.seconds, label: 'SECONDS' }
            ].map((unit, index) => (
              <motion.div
                key={unit.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-black/50 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="text-3xl font-bold text-red-500">
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{unit.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}