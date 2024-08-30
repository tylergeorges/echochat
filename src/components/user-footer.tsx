
'use client'

import type { User } from '@/lib/db/schema/users';


import { ProfileDropdown } from '@/components/profile-dropdown';

interface UserFooterProps {
     user: User;
};

export const UserFooter = ({ user }: UserFooterProps) => {
    return(
        <div className="absolute bottom-0 h-[52px] w-full gap-1 bg-background-tertiary/50 px-2 transition horizontal center-v">
        <ProfileDropdown user={user}/>
      </div>
    )
};