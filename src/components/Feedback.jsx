import React from 'react';
import { motion } from 'framer-motion';
import FeedbackForm from './feedback/FeedbackForm';
import FeedbackHeader from './feedback/FeedbackHeader';
import FeedbackWarning from './feedback/FeedbackWarning';
import FeedbackList from './feedback/FeedbackList';
import { useFeedbackStore } from '../hooks/useFeedbackStore';

export default function Feedback() {
  const { fetchFeedbacks } = useFeedbackStore();

  React.useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <FeedbackHeader />
        <FeedbackWarning />
        <FeedbackForm />
        <FeedbackList />
      </div>
    </motion.div>
  );
}