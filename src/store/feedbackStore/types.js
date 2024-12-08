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

export interface FeedbackState {
  feedbacks: Feedback[];
  isLoading: boolean;
  error: string | null;
}

export interface FeedbackActions {
  initialize: () => () => void;
  fetchFeedbacks: () => void;
  addFeedback: (feedback: Partial<Feedback>) => Feedback;
  addReaction: (feedbackId: string, reaction: string) => void;
}

export type FeedbackStore = FeedbackState & FeedbackActions;