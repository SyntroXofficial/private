import { supabase } from '../../lib/supabase';

export const createOrUpdateUser = async (discordUser) => {
  // Check if user exists
  const { data: existingUser } = await supabase
    .from('users')
    .select()
    .eq('discord_id', discordUser.id)
    .single();

  const userData = {
    username: discordUser.username,
    email: discordUser.email,
    discord_id: discordUser.id,
    avatar: discordUser.avatar 
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` 
      : null,
    last_login: new Date().toISOString()
  };

  if (existingUser) {
    // Update existing user
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(userData)
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
      ...userData,
      role: 'member',
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (createError) throw createError;
  return { user: newUser, isNewUser: true };
};