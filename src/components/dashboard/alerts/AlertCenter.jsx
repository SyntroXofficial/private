import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import useDashboardStore from '../../../store/dashboardStore';

export default function AlertCenter({ alerts = [] }) {
  const clearAlert = useDashboardStore(state => state.clearAlert);

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`p-4 rounded-lg border ${
              alert.severity === 'high'
                ? 'bg-red-500/10 border-red-500/30'
                : alert.severity === 'medium'
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : 'bg-blue-500/10 border-blue-500/30'
            }`}
          >
            <div className="flex items-start gap-4">
              <ExclamationTriangleIcon className={`h-6 w-6 flex-shrink-0 ${
                alert.severity === 'high'
                  ? 'text-red-500'
                  : alert.severity === 'medium'
                  ? 'text-yellow-500'
                  : 'text-blue-500'
              }`} />
              
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">{alert.title}</h3>
                    <p className="text-gray-300 mt-1">{alert.message}</p>
                  </div>
                  
                  <button
                    onClick={() => clearAlert(alert.id)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                
                {alert.details && (
                  <div className="mt-2 text-sm text-gray-400">
                    {alert.details}
                  </div>
                )}
                
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="text-gray-500">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                  {alert.source && (
                    <span className="text-gray-400">
                      Source: {alert.source}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}