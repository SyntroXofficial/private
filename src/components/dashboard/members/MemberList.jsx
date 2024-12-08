import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MemberActions from './MemberActions';
import MemberFilters from './MemberFilters';
import MemberStats from './MemberStats';
import useMemberStore from '../../../store/memberStore';

export default function MemberList() {
  const { members, onlineUsers, fetchMembers, initializeRealtime } = useMemberStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMembers();
    const cleanup = initializeRealtime();
    return cleanup;
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = (
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.discordId.includes(searchTerm)
    );

    if (filter === 'all') return matchesSearch;
    if (filter === 'online') return matchesSearch && onlineUsers.has(member.id);
    if (filter === 'banned') return matchesSearch && member.banned;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <MemberStats members={members} onlineUsers={onlineUsers} />
      
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <MemberFilters filter={filter} onFilterChange={setFilter} />
      </div>

      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {member.profilePic ? (
                    <img
                      src={member.profilePic}
                      alt={member.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-12 h-12 text-gray-400" />
                  )}
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
                    onlineUsers.has(member.id) ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{member.username}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      member.role === 'Owner'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : member.role === 'Admin'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Discord ID: {member.discordId}
                  </div>
                  <div className="text-sm text-gray-400">
                    Joined {new Date(member.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <MemberActions member={member} />
            </div>

            {member.banned && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <div>
                    <p className="text-sm text-red-400 font-medium">Ban Information:</p>
                    <p className="text-sm text-gray-300">Reason: {member.banReason}</p>
                    <p className="text-sm text-gray-400">
                      Banned on: {new Date(member.banDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}