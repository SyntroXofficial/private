import { useState, useEffect } from 'react';
import { banService } from '../services/banService';
import { statsService } from '../services/statsService';

export function useDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    newUsers: 0,
    serverStatus: 'Online',
    uptime: '0%',
    responseTime: 0
  });

  useEffect(() => {
    // Load initial users
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);

    // Subscribe to stats updates
    const unsubscribeStats = statsService.subscribe(newStats => {
      setStats(newStats);
    });

    return () => {
      unsubscribeStats();
    };
  }, []);

  const banUser = (userId, reason) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const banEntry = banService.banUser(userId, reason, 'admin');
        return {
          ...user,
          banned: true,
          banReason: reason,
          banDate: new Date().toISOString(),
          banEntry
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    statsService.updateStats();
  };

  const unbanUser = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        banService.unbanUser(userId, 'admin');
        return {
          ...user,
          banned: false,
          banReason: null,
          banDate: null,
          banEntry: null
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    statsService.updateStats();
  };

  return {
    users,
    stats,
    banUser,
    unbanUser
  };
}