import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from './stats/DashboardStats';
import SecurityOverview from './security/SecurityOverview';
import ActivityMonitor from './activity/ActivityMonitor';
import SystemHealth from './system/SystemHealth';
import AlertCenter from './alerts/AlertCenter';
import MemberList from './members/MemberList';
import useDashboardStore from '../../store/dashboardStore';

export default function DashboardContent() {
  const { 
    initialize, 
    cleanup,
    stats,
    securityMetrics,
    userActivities,
    activeAlerts,
    isLoading,
    error 
  } = useDashboardStore();

  useEffect(() => {
    initialize();
    return () => cleanup();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading dashboard: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {activeAlerts.length > 0 && (
        <AlertCenter alerts={activeAlerts} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardStats stats={stats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SecurityOverview metrics={securityMetrics} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <MemberList />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <ActivityMonitor activities={userActivities} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SystemHealth
            cpuUsage={stats.cpuUsage}
            memoryUsage={stats.memoryUsage}
            networkTraffic={stats.networkTraffic}
            errorRate={stats.errorRate}
          />
        </motion.div>
      </div>
    </div>
  );
}