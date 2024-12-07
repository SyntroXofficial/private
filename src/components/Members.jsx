import React from 'react';
import { motion } from 'framer-motion';
import { UserIcon, StarIcon } from '@heroicons/react/24/outline';

// Simulated members data - in a real app, this would come from your backend
const members = [
  { username: 'Andres_rios', role: 'Admin', joinDate: '2023-01-15' },
  { username: 'MarcSpector', role: 'Admin', joinDate: '2023-01-15' },
  { username: 'GamerPro123', role: 'Member', joinDate: '2023-03-20' },
  { username: 'StreamQueen', role: 'Member', joinDate: '2023-04-05' },
  { username: 'TechWizard', role: 'Member', joinDate: '2023-05-12' },
  { username: 'GameMaster64', role: 'Member', joinDate: '2023-06-18' },
  { username: 'PixelNinja', role: 'Member', joinDate: '2023-07-22' },
  { username: 'CyberHunter', role: 'Member', joinDate: '2023-08-30' }
];

export default function Members() {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-4">Community Members</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet our growing community of gamers and enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{member.username}</h3>
                    {member.role === 'Admin' && (
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-0.5 rounded-full ${
                      member.role === 'Admin' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {member.role}
                    </span>
                    <span className="text-gray-400">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}