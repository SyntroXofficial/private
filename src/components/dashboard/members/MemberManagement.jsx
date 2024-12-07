import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import BanConfirmationModal from '../security/BanConfirmationModal';

export default function MemberManagement({ users, onBanUser, onUnbanUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBanModal, setShowBanModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.discordId.includes(searchTerm);
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'banned') return matchesSearch && user.banned;
    if (filter === 'active') return matchesSearch && !user.banned;
    return matchesSearch;
  });

  const handleBanClick = (user) => {
    setSelectedUser(user);
    setShowBanModal(true);
  };

  const handleBanConfirm = (reason) => {
    if (selectedUser) {
      onBanUser(selectedUser.id, reason);
      setShowBanModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Member Management</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-black/30 rounded-lg text-white placeholder-gray-500 border border-white/10"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-black/30 rounded-lg text-white border border-white/10"
          >
            <option value="all">All Members</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.username}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-12 h-12 text-gray-400" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {user.username}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      user.role === 'Owner'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Discord ID: {user.discordId}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {user.role !== 'Owner' && (
                  <button
                    onClick={() => user.banned ? onUnbanUser(user.id) : handleBanClick(user)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      user.banned
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                  >
                    {user.banned ? 'Unban' : 'Ban'}
                  </button>
                )}
              </div>
            </div>

            {user.banned && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-400 font-medium">Ban Information:</p>
                    <p className="text-sm text-gray-300">
                      Reason: {user.banReason}
                    </p>
                    <p className="text-sm text-gray-400">
                      Banned on: {new Date(user.banDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <BanConfirmationModal
        isOpen={showBanModal}
        onClose={() => {
          setShowBanModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleBanConfirm}
        username={selectedUser?.username}
      />
    </motion.div>
  );
}