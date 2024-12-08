import { create } from 'zustand';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const useFeedbackStore = create((set, get) => ({
  feedbacks: [],
  isLoading: false,
  error: null,
  unsubscribe: null,

  fetchFeedbacks: async () => {
    set({ isLoading: true });
    try {
      const q = query(collection(db, 'feedbacks'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const feedbacks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      set({ feedbacks, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Error fetching feedbacks:', error);
    }
  },

  addFeedback: async (feedback) => {
    try {
      const docRef = await addDoc(collection(db, 'feedbacks'), {
        ...feedback,
        reactions: {
          '👍': 0, '❤️': 0, '🎮': 0, '🌟': 0,
          '🔥': 0, '👏': 0, '🎯': 0, '💪': 0
        },
        timestamp: serverTimestamp()
      });

      const newFeedback = {
        id: docRef.id,
        ...feedback,
        reactions: {
          '👍': 0, '❤️': 0, '🎮': 0, '🌟': 0,
          '🔥': 0, '👏': 0, '🎯': 0, '💪': 0
        },
        timestamp: new Date().toISOString()
      };

      set(state => ({
        feedbacks: [newFeedback, ...state.feedbacks]
      }));

      return newFeedback;
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw error;
    }
  },

  addReaction: async (feedbackId, reaction) => {
    try {
      const feedbackRef = doc(db, 'feedbacks', feedbackId);
      await updateDoc(feedbackRef, {
        [`reactions.${reaction}`]: get().feedbacks.find(f => f.id === feedbackId).reactions[reaction] + 1
      });

      set(state => ({
        feedbacks: state.feedbacks.map(feedback => {
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
        })
      }));
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  },

  initializeRealtime: () => {
    const q = query(collection(db, 'feedbacks'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          set(state => ({
            feedbacks: [
              { id: change.doc.id, ...change.doc.data() },
              ...state.feedbacks.filter(f => f.id !== change.doc.id)
            ]
          }));
        }
        if (change.type === 'modified') {
          set(state => ({
            feedbacks: state.feedbacks.map(feedback =>
              feedback.id === change.doc.id
                ? { id: change.doc.id, ...change.doc.data() }
                : feedback
            )
          }));
        }
        if (change.type === 'removed') {
          set(state => ({
            feedbacks: state.feedbacks.filter(f => f.id !== change.doc.id)
          }));
        }
      });
    });

    set({ unsubscribe });
    return () => {
      if (get().unsubscribe) {
        get().unsubscribe();
      }
    };
  }
}));

export default useFeedbackStore;