import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { socketService } from '../services/socketService';

export const useFeedbackStore = create((set, get) => ({
  feedbacks: [],
  isLoading: false,
  error: null,

  initializeRealtime: () => {
    // Subscribe to real-time database changes
    const feedbackSubscription = supabase
      .channel('feedbacks')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'feedbacks' },
        payload => {
          const { new: newFeedback, old: oldFeedback, eventType } = payload;
          
          switch (eventType) {
            case 'INSERT':
              set(state => ({
                feedbacks: [newFeedback, ...state.feedbacks]
              }));
              break;
            case 'UPDATE':
              set(state => ({
                feedbacks: state.feedbacks.map(feedback =>
                  feedback.id === oldFeedback.id ? newFeedback : feedback
                )
              }));
              break;
            case 'DELETE':
              set(state => ({
                feedbacks: state.feedbacks.filter(feedback => 
                  feedback.id !== oldFeedback.id
                )
              }));
              break;
          }
        }
      )
      .subscribe();

    // Subscribe to real-time socket updates for reactions
    socketService.subscribeFeedbackUpdates(update => {
      if (update.type === 'reaction') {
        set(state => ({
          feedbacks: state.feedbacks.map(feedback =>
            feedback.id === update.feedbackId
              ? { ...feedback, reactions: update.reactions }
              : feedback
          )
        }));
      }
    });

    return () => {
      feedbackSubscription.unsubscribe();
      socketService.unsubscribeFeedbackUpdates();
    };
  },

  fetchFeedbacks: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ feedbacks: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addFeedback: async (feedback) => {
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .insert([{
          ...feedback,
          reactions: {},
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Emit socket event for real-time updates
      socketService.emitFeedbackUpdate({
        type: 'new',
        feedback: data
      });

      return data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  addReaction: async (feedbackId, reaction) => {
    try {
      const feedback = get().feedbacks.find(f => f.id === feedbackId);
      if (!feedback) return;

      const updatedReactions = {
        ...feedback.reactions,
        [reaction]: (feedback.reactions[reaction] || 0) + 1
      };

      const { data, error } = await supabase
        .from('feedbacks')
        .update({ reactions: updatedReactions })
        .eq('id', feedbackId)
        .select()
        .single();

      if (error) throw error;

      // Emit socket event for real-time updates
      socketService.emitFeedbackUpdate({
        type: 'reaction',
        feedbackId,
        reactions: updatedReactions
      });

    } catch (error) {
      set({ error: error.message });
    }
  }
}));