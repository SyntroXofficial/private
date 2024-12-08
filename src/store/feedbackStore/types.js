export interface Feedback {
  id: string;
  message: string;
  username: string;
  type: 'issue' | 'suggestion' | 'general';
  accountName?: string;
  timestamp: string;
  reactions: {
    [key: string]: number;
  };
}

export interface FeedbackStore {
  feedbacks: Feedback[];
  isLoading: boolean;
  error: string | null;
  fetchFeedbacks: () => void;
  addFeedback: (feedback: Partial<Feedback>) => Feedback;
  addReaction: (feedbackId: string, reaction: string) => void;
  initializeRealtime: () => () => void;
}