import { create } from 'zustand';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  limit 
} from 'firebase/firestore';
import { db, COLLECTIONS } from '../services/firebase';

const useFeedbackStore = create((set, get) => ({
  feedbacks: [],
  isLoading: true,
  error: null,

  initialize: () => {
    try {
      const q = query(
        collection(db, COLLECTIONS.FEEDBACKS),
        orderBy('timestamp', 'desc'),
        limit(50) // Limit to last 50 feedbacks for better performance
      );

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const feedbacks = [];
          snapshot.forEach((doc) => {
            feedbacks.push({ id: doc.id, ...doc.data() });
          });
          set({ feedbacks, isLoading: false });
        },
        (error) => {
          console.error('Error fetching feedbacks:', error);
          set({ error: error.message, isLoading: false });
        }
      );

      return () => {
        unsubscribe();
        set({ feedbacks: [], isLoading: true, error: null });
      };
    } catch (error) {
      console.error('Error initializing feedback store:', error);
      set({ error: error.message, isLoading: false });
      return () => {};
    }
  },

  addFeedback: async (feedback) => {
    try {
      const feedbackData = {
        ...feedback,
        reactions: {
          '👍': 0, '❤️': 0, '🎮': 0, '🌟': 0,
          '🔥': 0, '👏': 0, '🎯': 0, '💪': 0
        },
        timestamp: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.FEEDBACKS), feedbackData);
      return { id: docRef.id, ...feedbackData };
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw error;
    }
  },

  addReaction: async (feedbackId, reaction) => {
    try {
      const feedbackRef = doc(db, COLLECTIONS.FEEDBACKS, feedbackId);
      const feedback = get().feedbacks.find(f => f.id === feedbackId);
      
      if (feedback) {
        await updateDoc(feedbackRef, {
          [`reactions.${reaction}`]: (feedback.reactions[reaction] || 0) + 1
        });
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
      throw error;
    }
  },

  cleanup: () => {
    set({ feedbacks: [], isLoading: true, error: null });
  }
}));

export default useFeedbackStore;