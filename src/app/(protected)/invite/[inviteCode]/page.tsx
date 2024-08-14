'use server';

import { redirect } from 'next/navigation';

import { addMemberToGuild, getGuildFromInvite } from '@/lib/db/queries/guild';
import { getUser } from '@/lib/supabase/get-user';

export default async function InviteCodePage({ params }: PageProps<{ inviteCode: string }>) {
  const user = await getUser();

  if (!user) redirect('/login');

  const guildExistsData = await getGuildFromInvite(params.inviteCode, user.id);

  if (guildExistsData) {
    const { guild: exisitingGuild } = guildExistsData;

    return redirect(`/channels/${exisitingGuild.id}/${exisitingGuild.defaultChannelId}`);
  }

  const newGuildData = await addMemberToGuild(params.inviteCode, user.id);
  console.log('newGuildData ', newGuildData);

  if (newGuildData) {
    const { guild } = newGuildData;
    return redirect(`/channels/${guild.id}/${guild.defaultChannelId}`);
  }

  return (
    <div className="flex size-full flex-1 center">
      <div className="max-w-lg">
        <h1 className="font text-xl font-medium">Click a channel on the left </h1>
      </div>
    </div>
  );
}
