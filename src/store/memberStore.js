import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { socketService } from '../services/socketService';

const useMemberStore = create((set, get) => ({
  members: [],
  onlineUsers: new Set(),
  isLoading: false,
  error: null,

  initializeRealtime: () => {
    // Subscribe to real-time database changes
    const channel = supabase
      .channel('members')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'members' },
        payload => {
          const { new: newMember, old: oldMember, eventType } = payload;
          
          switch (eventType) {
            case 'INSERT':
              set(state => ({
                members: [...state.members, newMember]
              }));
              break;
            case 'UPDATE':
              set(state => ({
                members: state.members.map(member =>
                  member.id === oldMember.id ? newMember : member
                )
              }));
              break;
            case 'DELETE':
              set(state => ({
                members: state.members.filter(member => member.id !== oldMember.id)
              }));
              break;
          }
        }
      )
      .subscribe();

    // Subscribe to online status updates via WebSocket
    const unsubscribeSocket = socketService.subscribe('memberStatus', ({ userId, status }) => {
      set(state => {
        const newOnlineUsers = new Set(state.onlineUsers);
        if (status) {
          newOnlineUsers.add(userId);
        } else {
          newOnlineUsers.delete(userId);
        }
        return { onlineUsers: newOnlineUsers };
      });
    });

    // Return cleanup function that handles both subscriptions
    return () => {
      channel.unsubscribe();
      if (unsubscribeSocket) {
        unsubscribeSocket();
      }
    };
  },

  fetchMembers: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ members: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  banMember: async (memberId, reason) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .update({
          banned: true,
          banReason: reason,
          banDate: new Date().toISOString()
        })
        .eq('id', memberId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        members: state.members.map(member =>
          member.id === memberId ? data : member
        )
      }));

      // Emit ban event via WebSocket
      socketService.emit('memberBanned', {
        memberId,
        reason,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error banning member:', error);
      throw error;
    }
  },

  unbanMember: async (memberId) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .update({
          banned: false,
          banReason: null,
          banDate: null
        })
        .eq('id', memberId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        members: state.members.map(member =>
          member.id === memberId ? data : member
        )
      }));

      // Emit unban event via WebSocket
      socketService.emit('memberUnbanned', {
        memberId,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error unbanning member:', error);
      throw error;
    }
  }
}));

export default useMemberStore;