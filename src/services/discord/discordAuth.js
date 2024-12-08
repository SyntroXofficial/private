const DISCORD_API_ENDPOINT = 'https://discord.com/api/v10';

export const getDiscordAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    redirect_uri: `${window.location.origin}/auth/discord/callback`,
    response_type: 'code',
    scope: 'identify email'
  });

  return `${DISCORD_API_ENDPOINT}/oauth2/authorize?${params.toString()}`;
};

export const getDiscordUserData = async (code) => {
  try {
    // Exchange code for token
    const tokenResponse = await fetch(`${DISCORD_API_ENDPOINT}/oauth2/token`, {
      method: 'POST',
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        client_secret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${window.location.origin}/auth/discord/callback`
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const tokenData = await tokenResponse.json();

    // Get user data
    const userResponse = await fetch(`${DISCORD_API_ENDPOINT}/users/@me`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      }
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get user data');
    }

    const userData = await userResponse.json();

    return {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : null
    };
  } catch (error) {
    console.error('Error in Discord authentication:', error);
    throw error;
  }
};