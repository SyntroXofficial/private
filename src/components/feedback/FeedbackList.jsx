import React from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import useFeedbackStore from '../../store/feedbackStore';

const REACTIONS = [
  { emoji: '👍', tooltip: 'Like' },
  { emoji: '❤️', tooltip: 'Love' },
  { emoji: '🎮', tooltip: 'Gaming' },
  { emoji: '🌟', tooltip: 'Amazing' },
  { emoji: '🔥', tooltip: 'Hot' },
  { emoji: '👏', tooltip: 'Applause' },
  { emoji: '🎯', tooltip: 'On Point' },
  { emoji: '💪', tooltip: 'Strong' }
];

export default function FeedbackList({ feedbacks }) {
  const addReaction = useFeedbackStore(state => state.addReaction);

  const handleReaction = async (feedbackId, emoji) => {
    try {
      await addReaction(feedbackId, emoji);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-red-500 mb-6">Community Feedback</h2>
      <div className="space-y-6">
        {feedbacks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No feedback yet. Be the first to share your thoughts!
          </div>
        ) : (
          feedbacks.map(feedback => (
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
                    <span className="font-semibold text-white">{feedback.username}</span>
                    <span className="text-gray-300">
                      {new Date(feedback.timestamp?.toDate()).toLocaleString()}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400 border border-red-500/30">
                      {feedback.type.toUpperCase()}
                    </span>
                    {feedback.accountName && (
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {feedback.accountName}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-200 mb-4">{feedback.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {REACTIONS.map(({ emoji, tooltip }) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(feedback.id, emoji)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 hover:bg-black/50 transition-colors group relative"
                        title={tooltip}
                      >
                        <span className="group-hover:scale-110 transition-transform">
                          {emoji}
                        </span>
                        <span className="text-sm text-gray-400">
                          {feedback.reactions?.[emoji] || 0}
                        </span>
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {tooltip}
                        </span>
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