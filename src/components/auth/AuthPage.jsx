import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if there's a signup parameter in the URL
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'signup') {
      setIsLogin(false);
    }
  }, [location]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            {isLogin
              ? 'Sign in to access your account and continue your journey'
              : 'Join our community and unlock exclusive features'}
          </p>
        </motion.div>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="text-center mt-8">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}