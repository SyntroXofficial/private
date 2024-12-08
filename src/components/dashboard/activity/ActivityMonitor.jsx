import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  UserIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const getActivityIcon = (type) => {
  switch (type) {
    case 'user':
      return UserIcon;
    case 'security':
      return ShieldCheckIcon;
    case 'alert':
      return ExclamationTriangleIcon;
    default:
      return UserIcon;
  }
};

const getActivityColor = (type) => {
  switch (type) {
    case 'user':
      return 'text-blue-400';
    case 'security':
      return 'text-green-400';
    case 'alert':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

export default function ActivityMonitor({ activities = [] }) {
  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Activity Monitor</h2>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No recent activities</p>
        ) : (
          activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);
            
            return (
              <motion.div
                key={activity.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-black/30 rounded-lg"
              >
                <div className={`p-2 rounded-lg bg-black/20 ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{activity.message}</p>
                    <span className="text-sm text-gray-400">
                      {format(new Date(activity.timestamp), 'HH:mm:ss')}
                    </span>
                  </div>
                  
                  {activity.details && (
                    <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
                  )}
                  
                  {activity.user && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-500">by</span>
                      <span className="text-sm text-gray-300">{activity.user}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}