import { create } from 'zustand';
import { socketService } from '../services/socketService';
import { SOCKET_EVENTS } from '../services/socket/socketConfig';

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
      socketService.initialize();

      // Subscribe to Socket.IO real-time updates
      const dashboardUnsubscribe = socketService.subscribe(SOCKET_EVENTS.DASHBOARD_UPDATE, (data) => {
        set(state => ({
          stats: { ...state.stats, ...data.stats },
          securityMetrics: { ...state.securityMetrics, ...data.security }
        }));
      });

      // Simulate initial data
      set({
        stats: {
          totalUsers: 150,
          activeUsers: 45,
          bannedUsers: 5,
          newUsers: 12,
          serverStatus: 'Online',
          uptime: '99.9%',
          responseTime: 150,
          cpuUsage: 45,
          memoryUsage: 60,
          networkTraffic: 1024 * 1024 * 100,
          errorRate: 0.1
        },
        isInitialized: true,
        isLoading: false
      });

      // Simulate periodic updates
      const updateInterval = setInterval(() => {
        set(state => ({
          stats: {
            ...state.stats,
            cpuUsage: Math.floor(Math.random() * 20) + 35,
            memoryUsage: Math.floor(Math.random() * 15) + 55,
            responseTime: Math.floor(Math.random() * 100) + 100
          }
        }));
      }, 5000);

      return () => {
        clearInterval(updateInterval);
        dashboardUnsubscribe();
      };

    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Dashboard initialization error:', error);
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