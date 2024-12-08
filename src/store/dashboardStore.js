import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useDashboardStore = create((set, get) => ({
  users: [],
  logs: [],
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    newUsers: 0,
    serverStatus: 'Online',
    uptime: '100%',
    responseTime: 0
  },
  isLoading: false,
  error: null,

  initializeDashboard: async () => {
    try {
      const [usersResponse, logsResponse] = await Promise.all([
        supabase.from('users').select('*'),
        supabase.from('logs').select('*').order('created_at', { ascending: false })
      ]);

      if (usersResponse.error) throw usersResponse.error;
      if (logsResponse.error) throw logsResponse.error;

      const activeUsers = usersResponse.data.filter(u => {
        const lastActive = new Date(u.last_active || 0);
        return Date.now() - lastActive.getTime() < 300000;
      }).length;

      const newUsers = usersResponse.data.filter(u => {
        const joinDate = new Date(u.created_at);
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return joinDate > oneDayAgo;
      }).length;

      set({
        users: usersResponse.data,
        logs: logsResponse.data,
        stats: {
          totalUsers: usersResponse.data.length,
          activeUsers,
          bannedUsers: usersResponse.data.filter(u => u.banned).length,
          newUsers,
          serverStatus: 'Online',
          uptime: '100%',
          responseTime: 0
        }
      });
    } catch (error) {
      set({ error: error.message });
    }
  },

  banUser: async (userId, reason) => {
    try {
      const [userUpdate, logInsert] = await Promise.all([
        supabase
          .from('users')
          .update({
            banned: true,
            ban_reason: reason,
            banned_at: new Date().toISOString()
          })
          .eq('id', userId)
          .select()
          .single(),
        
        supabase
          .from('logs')
          .insert([{
            type: 'security',
            severity: 'high',
            message: `User ${userId} has been banned`,
            reason,
            created_at: new Date().toISOString()
          }])
          .select()
          .single()
      ]);

      if (userUpdate.error) throw userUpdate.error;
      if (logInsert.error) throw logInsert.error;

      set(state => ({
        users: state.users.map(user =>
          user.id === userId ? userUpdate.data : user
        ),
        logs: [logInsert.data, ...state.logs],
        stats: {
          ...state.stats,
          bannedUsers: state.stats.bannedUsers + 1
        }
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  unbanUser: async (userId) => {
    try {
      const [userUpdate, logInsert] = await Promise.all([
        supabase
          .from('users')
          .update({
            banned: false,
            ban_reason: null,
            banned_at: null
          })
          .eq('id', userId)
          .select()
          .single(),
        
        supabase
          .from('logs')
          .insert([{
            type: 'security',
            severity: 'info',
            message: `User ${userId} has been unbanned`,
            created_at: new Date().toISOString()
          }])
          .select()
          .single()
      ]);

      if (userUpdate.error) throw userUpdate.error;
      if (logInsert.error) throw logInsert.error;

      set(state => ({
        users: state.users.map(user =>
          user.id === userId ? userUpdate.data : user
        ),
        logs: [logInsert.data, ...state.logs],
        stats: {
          ...state.stats,
          bannedUsers: state.stats.bannedUsers - 1
        }
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateStats: async () => {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*');

      if (error) throw error;

      const activeUsers = users.filter(u => {
        const lastActive = new Date(u.last_active || 0);
        return Date.now() - lastActive.getTime() < 300000;
      }).length;

      const newUsers = users.filter(u => {
        const joinDate = new Date(u.created_at);
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return joinDate > oneDayAgo;
      }).length;

      set(state => ({
        stats: {
          ...state.stats,
          totalUsers: users.length,
          activeUsers,
          bannedUsers: users.filter(u => u.banned).length,
          newUsers
        }
      }));
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useDashboardStore;