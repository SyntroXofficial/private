import { supabase } from '../../lib/supabase';

const DISCORD_API_ENDPOINT = 'https://discord.com/api/v10';
const CLIENT_ID = '1315323672927666206';
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '';

export const getDiscordAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify email'
  });

  return `${DISCORD_API_ENDPOINT}/oauth2/authorize?${params}`;
};

export const handleDiscordAuth = async (code) => {
  try {
    // Exchange code for token
    const tokenResponse = await fetch(`${DISCORD_API_ENDPOINT}/oauth2/token`, {
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

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Discord token');
    }

    const tokenData = await tokenResponse.json();

    // Get Discord user data
    const userResponse = await fetch(`${DISCORD_API_ENDPOINT}/users/@me`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      }
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get Discord user data');
    }

    const discordUser = await userResponse.json();

    // Check if user exists in Supabase
    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('discord_id', discordUser.id)
      .single();

    if (existingUser) {
      // Update existing user
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({
          last_login: new Date().toISOString(),
          avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null
        })
        .eq('discord_id', discordUser.id)
        .select()
        .single();

      if (updateError) throw updateError;
      return { user: updatedUser, isNewUser: false };
    }

    // Create new user
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        username: discordUser.username,
        email: discordUser.email,
        discord_id: discordUser.id,
        avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null,
        role: 'member',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) throw createError;
    return { user: newUser, isNewUser: true };
  } catch (error) {
    console.error('Discord auth error:', error);
    throw error;
  }
};
