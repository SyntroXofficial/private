import { useState, useEffect } from 'react';
import { feedbackStore } from '../store/feedbackStore';

export function useFeedbackStore() {
  const [feedbacks, setFeedbacks] = useState(() => feedbackStore.getFeedbacks());

  useEffect(() => {
    const unsubscribe = feedbackStore.subscribe(updatedFeedbacks => {
      setFeedbacks(updatedFeedbacks);
    });

    return () => unsubscribe();
  }, []);

  const addFeedback = (feedback) => {
    return feedbackStore.addFeedback(feedback);
  };

  const addReaction = (feedbackId, reaction) => {
    feedbackStore.addReaction(feedbackId, reaction);
  };

  return {
    feedbacks,
    addFeedback,
    addReaction
  };
}