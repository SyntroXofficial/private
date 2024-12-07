import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardContent from './dashboard/DashboardContent';
import DashboardAuth from './dashboard/DashboardAuth';

export default function Dashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      {!isAuthorized ? (
        <DashboardAuth onAuthorized={() => setIsAuthorized(true)} />
      ) : (
        <DashboardContent />
      )}
    </motion.div>
  );
}