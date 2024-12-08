import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDiscordToken, getDiscordUser } from '../services/discord/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('prime_nexo_auth');
    if (storedAuth) {
      try {
        const { user, isAuthenticated } = JSON.parse(storedAuth);
        if (user && isAuthenticated) {
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('prime_nexo_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (code) => {
    try {
      // Exchange code for token
      const tokenData = await getDiscordToken(code);
      
      // Get user data from Discord
      const discordUser = await getDiscordUser(tokenData.access_token);
      
      // Create or update user document in Firestore
      const userRef = doc(db, 'users', discordUser.id);
      const userSnap = await getDoc(userRef);
      
      const userData = {
        username: discordUser.username,
        email: discordUser.email,
        discordId: discordUser.id,
        avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null,
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (!userSnap.exists()) {
        userData.createdAt = serverTimestamp();
        userData.role = 'Member';
      }

      await setDoc(userRef, userData, { merge: true });

      // Update local state
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store auth data
      localStorage.setItem('prime_nexo_auth', JSON.stringify({
        user: userData,
        isAuthenticated: true
      }));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('prime_nexo_auth');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout
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