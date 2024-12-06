import React from 'react';
import { motion } from 'framer-motion';
import BattlePassTier from './BattlePassTier';
import { missions } from '../../data/missions';

export default function BattlePassTiers() {
  return (
    <div className="space-y-8">
      {missions.map((mission, index) => (
        <BattlePassTier
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