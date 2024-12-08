import { create } from 'zustand';
import { socketService } from '../services/socketService';
import { supabase } from '../lib/supabase';

const useDashboardStore = create((set, get) => ({
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    newUsers: 0,
    serverStatus: 'Online',
    uptime: '100%',
    responseTime: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    networkTraffic: 0,
    errorRate: 0
  },
  securityMetrics: {
    threatLevel: 'Low',
    activeThreats: 0,
    blockedAttacks: 0,
    suspiciousActivities: [],
    lastIncident: null,
    firewallStatus: 'Active',
    vpnDetections: 0,
    failedLogins: 0
  },
  userActivities: [],
  systemLogs: [],
  activeAlerts: [],
  isInitialized: false,
  isLoading: false,
  error: null,

  initialize: async () => {
    if (get().isInitialized) return;

    try {
      set({ isLoading: true });

      // Subscribe to real-time updates
      socketService.subscribe('dashboardUpdate', (data) => {
        set(state => ({
          ...state,
          stats: { ...state.stats, ...data.stats },
          securityMetrics: { ...state.securityMetrics, ...data.security }
        }));
      });

      socketService.subscribe('securityAlert', (alert) => {
        set(state => ({
          activeAlerts: [alert, ...state.activeAlerts].slice(0, 50)
        }));
      });

      socketService.subscribe('userActivity', (activity) => {
        set(state => ({
          userActivities: [activity, ...state.userActivities].slice(0, 100)
        }));
      });

      // Initial data fetch
      const [statsData, securityData, logsData] = await Promise.all([
        supabase.from('dashboard_stats').select('*').single(),
        supabase.from('security_metrics').select('*').single(),
        supabase.from('system_logs').select('*').order('created_at', { ascending: false }).limit(100)
      ]);

      set({
        stats: statsData.data || get().stats,
        securityMetrics: securityData.data || get().securityMetrics,
        systemLogs: logsData.data || [],
        isInitialized: true,
        isLoading: false
      });

    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Dashboard initialization error:', error);
    }
  },

  performAction: async (actionType, data) => {
    try {
      socketService.emitDashboardAction(actionType, data);

      // Optimistic update
      set(state => {
        switch (actionType) {
          case 'BAN_USER':
            return {
              ...state,
              stats: {
                ...state.stats,
                bannedUsers: state.stats.bannedUsers + 1,
                activeUsers: state.stats.activeUsers - 1
              }
            };
          case 'UNBAN_USER':
            return {
              ...state,
              stats: {
                ...state.stats,
                bannedUsers: state.stats.bannedUsers - 1
              }
            };
          // Add more cases as needed
          default:
            return state;
        }
      });

      // Log the action
      const logEntry = {
        type: actionType,
        data,
        timestamp: new Date().toISOString(),
        status: 'success'
      };

      await supabase.from('action_logs').insert([logEntry]);

    } catch (error) {
      set(state => ({
        ...state,
        error: `Action failed: ${error.message}`
      }));
      throw error;
    }
  },

  clearAlert: (alertId) => {
    set(state => ({
      activeAlerts: state.activeAlerts.filter(alert => alert.id !== alertId)
    }));
  },

  cleanup: () => {
    socketService.disconnect();
    set({
      isInitialized: false,
      activeAlerts: [],
      error: null
    });
  }
}));

export default useDashboardStore;