import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function UserProfile() {
  const { user } = useAuth();
  const [profilePicUrl, setProfilePicUrl] = useState(user?.profilePic || '');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const handleUpdateProfilePic = () => {
    if (!profilePicUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    // Here you would typically update the profile pic in your backend
    // For now, we'll just update the local state
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-8"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="relative group">
              {profilePicUrl ? (
                <img
                  src={profilePicUrl}
                  alt={user?.username}
                  className="w-24 h-24 rounded-full object-cover"
                  onError={() => {
                    setProfilePicUrl('');
                    setError('Invalid image URL');
                  }}
                />
              ) : (
                <UserCircleIcon className="w-24 h-24 text-gray-400" />
              )}
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="text-white text-sm">Change</span>
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{user?.username}</h1>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  user?.role === 'Owner'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {user?.role || 'Member'}
                </span>
                <span className="text-gray-400">Member since {new Date(user?.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  value={profilePicUrl}
                  onChange={(e) => setProfilePicUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  placeholder="Enter image URL"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateProfilePic}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError('');
                    setProfilePicUrl(user?.profilePic || '');
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Discord ID
              </label>
              <p className="text-white">{user?.discordId || 'Not set'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <p className="text-white">{user?.email}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}