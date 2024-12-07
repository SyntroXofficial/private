import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldExclamationIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useModTools } from '../../../hooks/useModTools';

export default function ModeratorTools() {
  const { 
    reports,
    announcements,
    handleReport,
    createAnnouncement
  } = useModTools();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Moderator Tools</h2>
        <ShieldExclamationIcon className="h-6 w-6 text-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Active Reports</h3>
            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
              {reports.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 bg-black/30 rounded-lg border border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">{report.type}</p>
                    <p className="text-sm text-gray-400">{report.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <ChatBubbleLeftIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">
                        Reported by {report.reporter} - {report.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReport(report.id, 'resolve')}
                      className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleReport(report.id, 'dismiss')}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Announcements</h3>
            <button
              onClick={() => createAnnouncement()}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              New Announcement
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 bg-black/30 rounded-lg border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <BellIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{announcement.title}</p>
                    <p className="text-sm text-gray-400">{announcement.content}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">
                        Posted by {announcement.author} - {announcement.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}