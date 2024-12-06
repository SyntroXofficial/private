import React from 'react';
import { motion } from 'framer-motion';
import MissionCard from './MissionCard';

export default function MissionsList({ missions }) {
  return (
    <div className="space-y-6 mb-12">
      {missions.map((mission, index) => (
        <MissionCard 
          key={mission.id}
          mission={mission}
          index={index}
          isFirst={index === 0}
          isLast={index === missions.length - 1}
        />
      ))}
    </div>
  );
}