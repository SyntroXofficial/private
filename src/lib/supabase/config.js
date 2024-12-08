export const SUPABASE_CONFIG = {
  url: 'https://xyzcompany.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  tables: {
    users: 'users',
    profiles: 'profiles',
    presence: 'presence'
  },
  storage: {
    buckets: {
      avatars: 'avatars',
      media: 'media'
    }
  }
};