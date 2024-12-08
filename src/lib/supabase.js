import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize real-time subscriptions
supabase
  .channel('schema-db-changes')
  .on('postgres_changes', { event: '*', schema: 'public' }, payload => {
    console.log('Change received!', payload);
  })
  .subscribe();

// Helper functions for real-time updates
export const subscribeToTable = (tableName, callback) => {
  return supabase
    .channel(`${tableName}-changes`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: tableName },
      callback
    )
    .subscribe();
};

export const subscribeToUserPresence = (userId, callback) => {
  return supabase
    .channel('online-users')
    .on('presence', { event: '*' }, callback)
    .subscribe();
};

export const updateUserStatus = async (userId, isOnline) => {
  const { error } = await supabase
    .from('user_status')
    .upsert({ user_id: userId, is_online: isOnline, last_seen: new Date() });

  if (error) console.error('Error updating user status:', error);
};