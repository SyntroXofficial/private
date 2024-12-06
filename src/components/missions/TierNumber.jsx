import React from 'react';

export default function TierNumber({ number }) {
  return (
    <div className="absolute left-24 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-2xl font-bold text-white z-10">
      {number}
    </div>
  );
}