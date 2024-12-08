import { supabase } from './client';

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