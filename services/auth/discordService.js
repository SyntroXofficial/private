import { supabase } from '../../lib/supabase';

const DISCORD_API_ENDPOINT = 'https://discord.com/api/v10';
const CLIENT_ID = '1315323672927666206';
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '';

export const getDiscordToken = async (code) => {
  const response = await fetch(`${DISCORD_API_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error_description || 'Failed to get Discord token');
  }

  return response.json();
};

export const getDiscordUser = async (accessToken) => {
  const response = await fetch(`${DISCORD_API_ENDPOINT}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get Discord user data');
  }

  return response.json();
};

export const createSupabaseSession = async (discordUser) => {
  const { data: authData, error: authError } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      queryParams: {
        access_token: discordUser.access_token,
        expires_in: discordUser.expires_in
      }
    }
  });

  if (authError) throw authError;
  return authData;
};