import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (credentials) => {
    // In a real app, this would make an API call
    if (credentials.email && credentials.password) {
      const userData = {
        email: credentials.email,
        username: credentials.email.split('@')[0],
      };
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/');
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (userData) => {
    // In a real app, this would make an API call
    if (userData.email && userData.password && userData.username) {
      const newUser = {
        email: userData.email,
        username: userData.username,
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
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
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