import React from 'react';
import { motion } from 'framer-motion';
import DashboardStats from './stats/DashboardStats';
import MemberManagement from './members/MemberManagement';
import ServerStatus from './server/ServerStatus';
import SecurityTools from './security/SecurityTools';
import ActivityLogs from './logs/ActivityLogs';
import ModeratorTools from './moderator/ModeratorTools';
import { useDashboard } from '../../hooks/useDashboard';

export default function DashboardContent() {
  const { users, stats, banUser, unbanUser } = useDashboard();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-red-500 mb-4">Admin Dashboard</h1>
        <p className="text-gray-400">Comprehensive system management and monitoring</p>
      </motion.div>

      <div className="space-y-8">
        <DashboardStats stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ServerStatus />
          <SecurityTools />
        </div>
        <MemberManagement 
          users={users}
          onBanUser={banUser}
          onUnbanUser={unbanUser}
        />
        <ModeratorTools />
        <ActivityLogs />
      </div>
    </div>
  );
}