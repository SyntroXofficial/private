import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
            navigate('/auth', { state: { error: 'Authentication failed' } });
          }
        } catch (error) {
          console.error('Auth error:', error);
          navigate('/auth', { state: { error: 'Authentication failed' } });
        }
      } else {
        navigate('/auth');
      }
    };

    handleCallback();
  }, [location, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
}