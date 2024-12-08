import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useUserStore = create((set, get) => ({
  users: [],
  onlineUsers: new Set(),
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ users: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addUser: async (user) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([user])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        users: [...state.users, data]
      }));

      return data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  updateUserProfile: async (userId, updates) => {
    try {
      if (updates.profilePic instanceof File) {
        const fileExt = updates.profilePic.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profiles')
          .upload(fileName, updates.profilePic);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('profiles')
          .getPublicUrl(fileName);

        updates.profilePic = publicUrl;
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        users: state.users.map(user =>
          user.id === userId ? { ...user, ...data } : user
        )
      }));

      return data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  setOnlineStatus: (userId, isOnline) => set(state => {
    const newOnlineUsers = new Set(state.onlineUsers);
    if (isOnline) {
      newOnlineUsers.add(userId);
    } else {
      newOnlineUsers.delete(userId);
    }
    return { onlineUsers: newOnlineUsers };
  }),
  
  getUser: (userId) => {
    const state = get();
    return state.users.find(user => user.id === userId);
  },
  
  isUserOnline: (userId) => {
    const state = get();
    return state.onlineUsers.has(userId);
  }
}));

export default useUserStore;