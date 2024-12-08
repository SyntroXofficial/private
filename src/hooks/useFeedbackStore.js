import { create } from 'zustand';

export const useFeedbackStore = create((set) => ({
  feedbacks: [],
  isLoading: false,
  error: null,

  fetchFeedbacks: () => {
    // Simulate fetching feedbacks
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    set({ feedbacks: storedFeedbacks });
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
      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
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

      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
      return { feedbacks: updatedFeedbacks };
    });
  }
}));