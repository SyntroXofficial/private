import { getDiscordToken, getDiscordUser } from '../auth/discordService';
import { createOrUpdateUser } from '../auth/userService';

const CLIENT_ID = '1315323672927666206';
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '';

export const getDiscordAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify email'
  });

  return `https://discord.com/api/v10/oauth2/authorize?${params}`;
};

export const handleDiscordAuth = async (code) => {
  try {
    // Get Discord token
    const tokenData = await getDiscordToken(code);
    if (!tokenData.access_token) {
      throw new Error('No access token received from Discord');
    }

    // Get Discord user data
    const discordUser = await getDiscordUser(tokenData.access_token);
    if (!discordUser.id) {
      throw new Error('Invalid Discord user data received');
    }

    // Create or update user in database
    const { user, isNewUser } = await createOrUpdateUser(discordUser);
    if (!user) {
      throw new Error('Failed to create or update user');
    }

    return { user, isNewUser };
  } catch (error) {
    console.error('Discord auth error:', error);
    throw error;
  }
};