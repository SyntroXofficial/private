import { create } from 'zustand';
import { getFeedbacksFromStorage, saveFeedbacksToStorage } from './storage';

const useFeedbackStore = create((set) => ({
  feedbacks: [],
  isLoading: false,
  error: null,

  initialize: () => {
    try {
      const storedFeedbacks = getFeedbacksFromStorage();
      set({ feedbacks: storedFeedbacks, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
    return () => {}; // Cleanup function
  },

  fetchFeedbacks: () => {
    set({ isLoading: true });
    try {
      const storedFeedbacks = getFeedbacksFromStorage();
      set({ feedbacks: storedFeedbacks, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addFeedback: (feedback) => {
    const newFeedback = {
      id: Date.now().toString(),
      ...feedback,
      reactions: {
        '👍': 0, '❤️': 0, '🎮': 0, '🌟': 0,
        '🔥': 0, '👏': 0, '🎯': 0, '💪': 0
      },
      timestamp: new Date().toISOString()
    };

    set(state => {
      const updatedFeedbacks = [newFeedback, ...state.feedbacks];
      saveFeedbacksToStorage(updatedFeedbacks);
      return { feedbacks: updatedFeedbacks };
    });

    return newFeedback;
  },

  addReaction: (feedbackId, reaction) => {
    set(state => {
      const updatedFeedbacks = state.feedbacks.map(feedback => {
        if (feedback.id === feedbackId) {
          return {
            ...feedback,
            reactions: {
              ...feedback.reactions,
              [reaction]: (feedback.reactions[reaction] || 0) + 1
            }
          };
        }
        return feedback;
      });

      saveFeedbacksToStorage(updatedFeedbacks);
      return { feedbacks: updatedFeedbacks };
    });
  }
}));

export default useFeedbackStore;