import { create } from 'zustand';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
  where 
} from 'firebase/firestore';
import { db } from '../services/firebase';

const useDashboardStore = create((set, get) => ({
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    newUsers: 0,
    serverStatus: 'Online',
    uptime: '0%',
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
  isLoading: true,
  error: null,

  initialize: async () => {
    if (get().isInitialized) return;

    try {
      // Subscribe to stats updates
      const statsRef = doc(db, 'system', 'stats');
      const statsUnsubscribe = onSnapshot(statsRef, (doc) => {
        if (doc.exists()) {
          set(state => ({
            stats: { ...state.stats, ...doc.data() }
          }));
        }
      });

      // Subscribe to security metrics
      const securityRef = doc(db, 'system', 'security');
      const securityUnsubscribe = onSnapshot(securityRef, (doc) => {
        if (doc.exists()) {
          set(state => ({
            securityMetrics: { ...state.securityMetrics, ...doc.data() }
          }));
        }
      });

      // Subscribe to user activities
      const activitiesQuery = query(
        collection(db, 'activities'),
        orderBy('timestamp', 'desc')
      );
      const activitiesUnsubscribe = onSnapshot(activitiesQuery, (snapshot) => {
        const activities = [];
        snapshot.forEach((doc) => {
          activities.push({ id: doc.id, ...doc.data() });
        });
        set({ userActivities: activities });
      });

      // Subscribe to system logs
      const logsQuery = query(
        collection(db, 'systemLogs'),
        orderBy('timestamp', 'desc')
      );
      const logsUnsubscribe = onSnapshot(logsQuery, (snapshot) => {
        const logs = [];
        snapshot.forEach((doc) => {
          logs.push({ id: doc.id, ...doc.data() });
        });
        set({ systemLogs: logs });
      });

      // Subscribe to active alerts
      const alertsQuery = query(
        collection(db, 'alerts'),
        where('active', '==', true)
      );
      const alertsUnsubscribe = onSnapshot(alertsQuery, (snapshot) => {
        const alerts = [];
        snapshot.forEach((doc) => {
          alerts.push({ id: doc.id, ...doc.data() });
        });
        set({ activeAlerts: alerts });
      });

      set({ 
        isInitialized: true, 
        isLoading: false 
      });

      return () => {
        statsUnsubscribe();
        securityUnsubscribe();
        activitiesUnsubscribe();
        logsUnsubscribe();
        alertsUnsubscribe();
      };
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      console.error('Dashboard initialization error:', error);
    }
  },

  clearAlert: async (alertId) => {
    try {
      const alertRef = doc(db, 'alerts', alertId);
      await updateDoc(alertRef, {
        active: false,
        resolvedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error clearing alert:', error);
      throw error;
    }
  },

  cleanup: () => {
    set({
      isInitialized: false,
      activeAlerts: [],
      error: null
    });
  }
}));

export default useDashboardStore;