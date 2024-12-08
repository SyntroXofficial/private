import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardAuth from './DashboardAuth';
import DashboardContent from './DashboardContent';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { user } = useAuth();

  if (!user) {
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
    <div className="min-h-screen pt-24">
      {!isAuthorized ? (
        <DashboardAuth onAuthorized={() => setIsAuthorized(true)} />
      ) : (
        <DashboardContent />
      )}
    </div>
  );
}