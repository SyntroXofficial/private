const DISCORD_API_ENDPOINT = 'https://discord.com/api/v10';

export const getDiscordToken = async (code) => {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    client_secret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'https://private-web-xyz.vercel.app',
    scope: 'email identify'
  });

  const response = await fetch(`${DISCORD_API_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get Discord token');
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
    throw new Error('Failed to get Discord user');
  }

  return response.json();
};