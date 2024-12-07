import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validation';
import { EnvelopeIcon, LockClosedIcon, UserIcon, ChatBubbleBottomCenterTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function SignupForm() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    discordId: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username) {
      setError('Username is required');
      return;
    }

    if (!formData.discordId) {
      setError('Discord ID is required');
      return;
    }

    // Validate Discord ID format (17-18 digits)
    const discordIdRegex = /^\d{17,18}$/;
    if (!discordIdRegex.test(formData.discordId)) {
      setError('Invalid Discord ID format. Must be 17-18 digits');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      return;
    }

    const result = signup(formData);
    if (!result.success) {
      setError(result.error || 'Signup failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers for Discord ID
    if (name === 'discordId' && value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto"
    >
      <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Create Account</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="Choose a username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="discordId" className="block text-sm font-medium text-gray-300 mb-1">
              Discord ID (17-18 digits)
            </label>
            <div className="relative">
              <ChatBubbleBottomCenterTextIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="discordId"
                name="discordId"
                value={formData.discordId}
                onChange={handleChange}
                maxLength="18"
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="Enter your Discord ID (numbers only)"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="your.email@provider.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg"
          >
            <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-yellow-200 text-sm font-medium">Requirements:</p>
              <ul className="text-yellow-100/80 text-sm space-y-1">
                <li>• Gmail (@gmail.com)</li>
                <li>• Hotmail (@hotmail.com)</li>
                <li>• ProtonMail (@proton.me, @protonmail.com)</li>
                <li>• Discord ID (17-18 digits)</li>
                <li>• Attention: Always use your real Discord username and ID. Using fake usernames, emails, or Discord IDs will result in disciplinary action.</li>
              </ul>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all duration-300"
        >
          Create Account
        </motion.button>
      </form>
    </motion.div>
  );
}