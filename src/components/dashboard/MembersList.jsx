import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, ClipboardDocumentIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function MembersList() {
  const [members, setMembers] = useState([]);
  const [copiedField, setCopiedField] = useState(null);
  const [showPassword, setShowPassword] = useState({});

  useEffect(() => {
    // Get members from localStorage
    const storedAuth = localStorage.getItem('prime_nexo_auth');
    if (storedAuth) {
      try {
        const { user } = JSON.parse(storedAuth);
        if (user) {
          setMembers([{
            username: user.username,
            email: user.email,
            password: user.password || '••••••••',
            discordId: user.discordId,
            ip: window.location.hostname,
            joinDate: user.joinDate,
            lastActive: 'Now'
          }]);
        }
      } catch (error) {
        console.error('Error loading members:', error);
      }
    }
  }, []);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const togglePasswordVisibility = (index) => {
    setShowPassword(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Member Details</h2>
        <div className="px-3 py-1 bg-red-500/20 rounded-full text-red-400 text-sm">
          {members.length} Members
        </div>
      </div>

      <div className="space-y-6">
        {members.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect p-6 rounded-xl space-y-4"
          >
            {/* User Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-700">
              <UserCircleIcon className="h-12 w-12 text-gray-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{member.username}</h3>
                <p className="text-sm text-gray-400">
                  Joined {new Date(member.joinDate).toLocaleDateString()} • Last active {member.lastActive}
                </p>
              </div>
            </div>

            {/* Member Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm text-gray-400">Email</label>
                <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                  <span className="text-gray-300">{member.email}</span>
                  <button
                    onClick={() => copyToClipboard(member.email, `email-${index}`)}
                    className="p-1 hover:bg-gray-700/50 rounded"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4 text-gray-400" />
                  </button>
                  {copiedField === `email-${index}` && (
                    <span className="text-xs text-green-500">Copied!</span>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm text-gray-400">Password</label>
                <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                  <span className="text-gray-300">
                    {showPassword[index] ? member.password : '••••••••'}
                  </span>
                  <button
                    onClick={() => togglePasswordVisibility(index)}
                    className="p-1 hover:bg-gray-700/50 rounded"
                  >
                    {showPassword[index] ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(member.password, `password-${index}`)}
                    className="p-1 hover:bg-gray-700/50 rounded"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4 text-gray-400" />
                  </button>
                  {copiedField === `password-${index}` && (
                    <span className="text-xs text-green-500">Copied!</span>
                  )}
                </div>
              </div>

              {/* Discord ID */}
              <div className="space-y-1">
                <label className="text-sm text-gray-400">Discord ID</label>
                <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                  <span className="text-gray-300">{member.discordId}</span>
                  <button
                    onClick={() => copyToClipboard(member.discordId, `discord-${index}`)}
                    className="p-1 hover:bg-gray-700/50 rounded"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4 text-gray-400" />
                  </button>
                  {copiedField === `discord-${index}` && (
                    <span className="text-xs text-green-500">Copied!</span>
                  )}
                </div>
              </div>

              {/* IP Address */}
              <div className="space-y-1">
                <label className="text-sm text-gray-400">IP Address</label>
                <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                  <span className="text-gray-300">{member.ip}</span>
                  <button
                    onClick={() => copyToClipboard(member.ip, `ip-${index}`)}
                    className="p-1 hover:bg-gray-700/50 rounded"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4 text-gray-400" />
                  </button>
                  {copiedField === `ip-${index}` && (
                    <span className="text-xs text-green-500">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}