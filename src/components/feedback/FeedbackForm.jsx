import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, LightBulbIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import useFeedbackStore from '../../store/feedbackStore';

const FEEDBACK_TYPES = [
  { id: 'issue', label: 'Report Issue', icon: ExclamationTriangleIcon, color: 'text-yellow-500' },
  { id: 'suggestion', label: 'Suggestion', icon: LightBulbIcon, color: 'text-blue-500' },
  { id: 'general', label: 'General Feedback', icon: ChatBubbleLeftIcon, color: 'text-green-500' }
];

export default function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState('');
  const [accountName, setAccountName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const addFeedback = useFeedbackStore(state => state.addFeedback);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedbackType || !message || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await addFeedback({
        type: feedbackType,
        accountName: accountName.trim(),
        message: message.trim(),
        username: user?.username || 'Anonymous'
      });

      setSubmitted(true);
      setFeedbackType('');
      setAccountName('');
      setMessage('');
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            {user?.username || 'Anonymous'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEEDBACK_TYPES.map(({ id, label, icon: Icon, color }) => (
            <motion.button
              key={id}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFeedbackType(id)}
              className={`p-4 rounded-lg border ${
                feedbackType === id
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/10 hover:border-white/20'
              } transition-all duration-300`}
            >
              <Icon className={`h-6 w-6 ${color} mx-auto mb-2`} />
              <span className="text-white">{label}</span>
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="accountName" className="block text-gray-300">
            Account/Service Name (Optional)
          </label>
          <input
            type="text"
            id="accountName"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            placeholder="e.g., Steam Account, Netflix Account"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-gray-300">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            placeholder="Describe your feedback, issue, or suggestion..."
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!feedbackType || !message || isSubmitting}
          className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </motion.button>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-green-500"
          >
            Thank you for your feedback!
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}