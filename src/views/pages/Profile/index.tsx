'use client';

import { TabsContent } from '@/components/ui/tabs';
import { PROFILE_ENUM } from '@/enum/profile-enum';
import { useState } from 'react';
import Sidebar from './sidebar';

const ProfileView = () => {
  const { PROFILE } = PROFILE_ENUM;
  const [activeTab, setActiveTab] = useState<PROFILE_ENUM>(PROFILE);

  return (
    <div className="flex items-start gap-x-6 w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabsContent value={PROFILE}>Make changes to your account here.</TabsContent>
      </Sidebar>
    </div>
  );
};

export default ProfileView;
