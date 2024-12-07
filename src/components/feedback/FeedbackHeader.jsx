import React from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

export default function FeedbackHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="flex justify-center mb-6">
        <ChatBubbleBottomCenterTextIcon className="h-16 w-16 text-red-500" />
      </div>
      <h1 className="text-4xl font-bold text-red-500 mb-4">Feedback & Support</h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Help us improve by sharing your experience. Report issues, suggest new accounts, or provide general feedback.
      </p>
    </motion.div>
  );
}