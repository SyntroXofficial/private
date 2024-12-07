import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function FeedbackWarning() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8"
    >
      <div className="flex items-start gap-4">
        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-2">Important Guidelines</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-yellow-400 mb-2">Prohibited Content:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                  No external links or promotions
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                  No spam or repeated submissions
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                  No personal information sharing
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                  No harassment or offensive content
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-yellow-400 mb-2">Feedback Requirements:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                  Must be clear and specific
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                  Related to our services only
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                  Constructive and solution-oriented
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                  Respectful and professional tone
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
              <p className="text-red-400 font-semibold">Warning:</p>
              <p className="text-gray-300">
                Violation of these guidelines will result in your feedback being removed and potential restriction from submitting future feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}