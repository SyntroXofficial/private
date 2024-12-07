// Feedback Store with localStorage persistence and event system
const STORAGE_KEY = 'prime_nexo_feedback';

class FeedbackStore {
  constructor() {
    this.feedbacks = this.loadFeedbacks();
    this.listeners = new Set();
  }

  loadFeedbacks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading feedbacks:', error);
      return [];
    }
  }

  saveFeedbacks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.feedbacks));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving feedbacks:', error);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      listener([...this.feedbacks]);
    }
  }

  addFeedback(feedback) {
    const newFeedback = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      reactions: {
        '👍': 0,
        '❤️': 0,
        '🎮': 0,
        '🌟': 0,
        '🔥': 0,
        '👏': 0,
        '🎯': 0,
        '💪': 0
      },
      ...feedback
    };
    
    this.feedbacks = [newFeedback, ...this.feedbacks];
    this.saveFeedbacks();
    return newFeedback;
  }

  getFeedbacks() {
    return [...this.feedbacks];
  }

  addReaction(feedbackId, reaction) {
    const feedback = this.feedbacks.find(f => f.id === feedbackId);
    if (feedback && feedback.reactions[reaction] !== undefined) {
      feedback.reactions[reaction]++;
      this.saveFeedbacks();
    }
  }
}

export const feedbackStore = new FeedbackStore();