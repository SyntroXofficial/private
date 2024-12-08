import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline';
import useUserStore from '../store/userStore';

export default function Members() {
  const { users, onlineUsers, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
          <div className="mt-4 inline-block px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
            <span className="text-white font-bold">
              {users.length} Members • {onlineUsers.size} Online
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  {member.profilePic ? (
                    <img
                      src={member.profilePic}
                      alt={member.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-red-500" />
                    </div>
                  )}
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
                    onlineUsers.has(member.id) ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{member.username}</h3>
                    {member.role === 'Owner' && (
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    Discord ID: {member.discordId}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className={`px-2 py-0.5 rounded-full ${
                      member.role === 'Owner' 
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {member.role}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {member.lastActive}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Joined {new Date(member.joinDate).toLocaleDateString()}
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