const BUCKET_URL = 'https://qjavrutwzqkikcaxrjjk.supabase.co/storage/v1/object';

export const getGuildIcon = (iconPath: string) => {
  if (iconPath.startsWith('guild_icons')) return `${BUCKET_URL}/public/${iconPath}`;

  return `${BUCKET_URL}/public/guild_icons/${iconPath}`;
};
