import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-8"
        >
          <div className="flex items-center gap-6 mb-8">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
                <span className="text-3xl text-red-500">{user.username[0]}</span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Discord ID: {user.discordId}</p>
                <p className="text-gray-400">Email: {user.email}</p>
                <p className="text-gray-400">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h2 className="text-lg font-semibold text-yellow-500 mb-2">Account Status</h2>
              <p className="text-gray-300">Your account is verified and active.</p>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">Discord Integration</h2>
              <p className="text-gray-300">Your Discord account is successfully linked.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}