import React from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';

export default function MissionReward({ mission, rarityConfig }) {
  return (
    <div className="w-48 p-6 flex items-center justify-center bg-black/40">
      <div className={`
        w-24 h-24 rounded-xl ${rarityConfig.bgColor} ${rarityConfig.borderColor}
        border-2 flex items-center justify-center relative
      `}>
        {mission.completed ? (
          <span className={`text-4xl font-bold ${rarityConfig.textColor}`}>
            {mission.reward.code}
          </span>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <LockClosedIcon className={`h-8 w-8 ${rarityConfig.textColor}`} />
            <span className={`text-sm font-bold ${rarityConfig.textColor}`}>
              LOCKED
            </span>
          </div>
        )}
      </div>
    </div>
  );
}