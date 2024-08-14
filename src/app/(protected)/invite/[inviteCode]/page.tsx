'use server';

import { redirect } from 'next/navigation';

import { addMemberToGuild, getGuildFromInvite } from '@/lib/db/queries/guild';
import { getUser } from '@/lib/supabase/get-user';

export default async function InviteCodePage({ params }: PageProps<{ inviteCode: string }>) {
  const user = await getUser();

  if (!user) redirect('/login');

  //  check if user is already a member of the guild
  const guildExistsData = await getGuildFromInvite(params.inviteCode, user.id);

  if (guildExistsData) {
    const { guild: exisitingGuild } = guildExistsData;

    return redirect(`/channels/${exisitingGuild.id}/${exisitingGuild.defaultChannelId}`);
  }

  // add user to guild
  const newGuildData = await addMemberToGuild(params.inviteCode, user.id);

  if (newGuildData) {
    const { guild } = newGuildData;
    return redirect(`/channels/${guild.id}/${guild.defaultChannelId}`);
  }

  return <div className='center flex size-full flex-1' />;
}
