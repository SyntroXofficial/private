import { supabase } from './client';

export const updateUserStatus = async (userId, isOnline) => {
  const { error } = await supabase
    .from('user_status')
    .upsert({
      user_id: userId,
      is_online: isOnline,
      last_seen: new Date().toISOString()
    });

  if (error) throw error;
};

export const trackPresence = (channelName) => {
  return supabase.channel(channelName)
    .on('presence', { event: 'sync' }, () => {
      // Handle presence sync
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      // Handle user join
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      // Handle user leave
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await supabase.channel(channelName).track({
          online_at: new Date().toISOString()
        });
      }
    });
};