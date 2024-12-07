import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);

  const handleReaction = (feedbackId, reaction) => {
    setFeedbackList(prevList =>
      prevList.map(feedback => {
        if (feedback.id === feedbackId) {
          return {
            ...feedback,
            reactions: {
              ...feedback.reactions,
              [reaction]: feedback.reactions[reaction] + 1
            }
          };
        }
        return feedback;
      })
    );
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-red-500 mb-6">Community Feedback</h2>
      <div className="space-y-6">
        {feedbackList.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No feedback yet. Be the first to share your thoughts!
          </div>
        ) : (
          feedbackList.map(feedback => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-300">{new Date(feedback.timestamp).toLocaleString()}</span>
                    <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400 border border-red-500/30">
                      {feedback.type.toUpperCase()}
                    </span>
                    {feedback.account && (
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {feedback.account}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-200 mb-4">{feedback.message}</p>
                  <div className="flex gap-4">
                    {Object.entries(feedback.reactions).map(([reaction, count]) => (
                      <button
                        key={reaction}
                        onClick={() => handleReaction(feedback.id, reaction)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
                      >
                        <span>{reaction}</span>
                        <span className="text-sm text-gray-400">{count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}