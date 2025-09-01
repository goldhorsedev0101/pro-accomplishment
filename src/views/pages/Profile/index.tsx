'use client';

// Components
import { TabsContent } from '@/components/ui/tabs';
import ChangePassword from './change-password';
import PrivacyPolicy from './privacy-policy';
import Profile from './profile';
import Sidebar from './sidebar';
import Subscription from './subscription';
import TermsConditions from './terms-conditions';

// Enum
import { PROFILE_ENUM } from '@/enum/profile-enum';

// Types
import { JSX, useState } from 'react';

const ProfileView = (): JSX.Element => {
  const { PROFILE, SUBSCRIPTION, CHANGE_PASSWORD, PRIVACY_POLICY, TERMS_CONDITIONS, LOGOUT } =
    PROFILE_ENUM;

  const [activeTab, setActiveTab] = useState<PROFILE_ENUM>(PROFILE);

  return (
    <div className="flex items-start gap-x-6 w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabsContent value={PROFILE}>
          <Profile />
        </TabsContent>

        <TabsContent value={SUBSCRIPTION}>
          <Subscription />
        </TabsContent>

        <TabsContent value={CHANGE_PASSWORD}>
          <ChangePassword />
        </TabsContent>

        <TabsContent value={PRIVACY_POLICY}>
          <PrivacyPolicy />
        </TabsContent>

        <TabsContent value={TERMS_CONDITIONS}>
          <TermsConditions />
        </TabsContent>

        <TabsContent value={LOGOUT}>
          <Profile />
        </TabsContent>
      </Sidebar>
    </div>
  );
};

export default ProfileView;
