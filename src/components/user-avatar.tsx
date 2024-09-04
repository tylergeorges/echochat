import type { User } from '@/lib/db/schema';

import { Avatar, AvatarImage, type AvatarVariants } from '@/components/ui/avatar';

interface UserAvatarProps {
  user: User;
  size: AvatarVariants['size'];
  className?: string;
}

export const UserAvatar = ({ user, className, size }: UserAvatarProps) => (
  <Avatar size={size} className={className}>
    <AvatarImage src={user.avatarUrl} alt={`${user.username}'s avatar`} />
  </Avatar>
);
