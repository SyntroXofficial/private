import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useFeedbackStore = create((set, get) => ({
    feedbacks: [],
    isLoading: false,
    error: null,

    fetchFeedbacks: async () => {
        set({ isLoading: true });
        try {
            const { data, error } = await supabase
                .from('feedbacks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            set({ feedbacks: data, isLoading: false });

            // Subscribe to real-time changes after initial fetch
            supabase
                .channel('public:feedbacks')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'feedbacks' }, payload => {
                    console.log('Change received!', payload);
                    if (payload.eventType === 'INSERT') {
                        set(state => ({ feedbacks: [payload.new, ...state.feedbacks] }));
                    } else if (payload.eventType === 'UPDATE') {
                        set(state => ({
                            feedbacks: state.feedbacks.map(f =>
                                f.id === payload.old.id ? payload.new : f
                            )
                        }));
                    }

                    // Add logic for DELETE if needed
                })
                .subscribe()

        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    addFeedback: async (feedback) => {
        try {
            const newFeedback = {
                ...feedback,
                reactions: {
                    '👍': 0, '❤️': 0, '🎮': 0, '🌟': 0,
                    '🔥': 0, '👏': 0, '🎯': 0, '💪': 0
                },
                created_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('feedbacks')
                .insert([newFeedback])
                .select()
                .single();

            if (error) throw error;

            // No need to update state here, real-time subscription will handle it
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

            // No need to update state here, real-time subscription will handle it

        } catch (error) {
            set({ error: error.message });
        }
    }
}));

export default useFeedbackStore;