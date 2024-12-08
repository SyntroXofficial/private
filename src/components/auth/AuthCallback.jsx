import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        try {
          const result = await login(code);
          if (result.success) {
            navigate('/dashboard');
          } else {
            navigate('/auth', { 
              state: { error: result.error || 'Authentication failed' }
            });
          }
        } catch (error) {
          console.error('Auth error:', error);
          navigate('/auth', { 
            state: { error: 'Failed to authenticate with Discord' }
          });
        }
      } else {
        navigate('/auth', { 
          state: { error: 'No authentication code received' }
        });
      }
    };

    handleCallback();
  }, [location, login, navigate]);

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
