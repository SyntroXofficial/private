import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const STORAGE_KEY = 'prime_nexo_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Load auth state from localStorage on initial mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEY);
    if (storedAuth) {
      const { user, isAuthenticated } = JSON.parse(storedAuth);
      setUser(user);
      setIsAuthenticated(isAuthenticated);
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, isAuthenticated }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, isAuthenticated]);

  const login = (credentials) => {
    if (credentials.email && credentials.password) {
      const userData = {
        email: credentials.email,
        username: credentials.email.split('@')[0],
        profilePic: '',
        joinDate: new Date().toISOString(),
        role: 'Member'
      };
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/');
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (userData) => {
    if (userData.email && userData.password && userData.username) {
      const newUser = {
        email: userData.email,
        username: userData.username,
        profilePic: '',
        joinDate: new Date().toISOString(),
        role: 'Member',
        discordId: userData.discordId
      };
      setUser(newUser);
      setIsAuthenticated(true);
      navigate('/');
      return { success: true };
    }
    return { success: false, error: 'Invalid user data' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY);
    navigate('/');
  };

  const updateProfilePic = (url) => {
    if (user) {
      const updatedUser = { ...user, profilePic: url };
      setUser(updatedUser);
      // This will trigger the useEffect that saves to localStorage
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      signup,
      updateProfilePic 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;