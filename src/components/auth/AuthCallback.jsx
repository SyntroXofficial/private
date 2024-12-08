import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { handleDiscordAuth } from '../../services/discord/auth';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        console.error('Discord auth error:', error, errorDescription);
        toast.error(errorDescription || 'Authentication failed');
        navigate('/auth');
        return;
      }

      if (!code) {
        toast.error('No authentication code received');
        navigate('/auth');
        return;
      }

      try {
        const { user, isNewUser } = await handleDiscordAuth(code);
        await login(user);

        toast.success(isNewUser ? 'Account created successfully!' : 'Welcome back!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Auth error:', error);
        toast.error('Failed to authenticate with Discord');
        navigate('/auth');
      }
    };

    handleAuth();
  }, [location, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
        <p className="text-gray-400">Authenticating with Discord...</p>
      </motion.div>
    </div>
  );
}