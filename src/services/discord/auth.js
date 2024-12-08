import { supabase } from '../../lib/supabase';

const DISCORD_API_ENDPOINT = 'https://discord.com/api/v10';
const CLIENT_ID = '1315323672927666206';
const REDIRECT_URI = 'https://private-web-xyz.vercel.app/auth/callback';

export const getDiscordAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify email'
  });

  return `${DISCORD_API_ENDPOINT}/oauth2/authorize?${params}`;
};

export const getDiscordToken = async (code) => {
  try {
    const response = await fetch(`${DISCORD_API_ENDPOINT}/oauth2/token`, {
      method: 'POST',
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        scope: 'identify email'
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to get Discord token');
    }

    return response.json();
  } catch (error) {
    console.error('Discord token error:', error);
    throw error;
  }
};

export const getDiscordUser = async (accessToken) => {
  try {
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
  } catch (error) {
    console.error('Discord user error:', error);
    throw error;
  }
};

export const handleDiscordAuth = async (code) => {
  try {
    // Get Discord token
    const tokenData = await getDiscordToken(code);
    
    // Get Discord user data
    const discordUser = await getDiscordUser(tokenData.access_token);

    // Check if user exists in Supabase
    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('discord_id', discordUser.id)
      .single();

    if (existingUser) {
      // Update existing user's last login
      await supabase
        .from('users')
        .update({
          last_login: new Date().toISOString(),
          avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null
        })
        .eq('discord_id', discordUser.id);

      return { user: existingUser, isNewUser: false };
    }

    // Create new user
    const { data: newUser, error } = await supabase
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

    if (error) throw error;

    return { user: newUser, isNewUser: true };
  } catch (error) {
    console.error('Discord auth error:', error);
    throw error;
  }
};