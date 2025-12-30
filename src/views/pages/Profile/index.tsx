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
import { PROFILE_ENUM } from '@/enum/profile.enum';

// Types
import { useGetProfileQuery } from '@/services/others/profile/get-recruiter-profile';
import { JSX, useState } from 'react';

const ProfileView = (): JSX.Element => {
  const { PROFILE, SUBSCRIPTION, CHANGE_PASSWORD, PRIVACY_POLICY, TERMS_CONDITIONS, LOGOUT } =
    PROFILE_ENUM;

  const { data, isPending } = useGetProfileQuery();
  const { subscription } = data?.data || {};

  const [activeTab, setActiveTab] = useState<PROFILE_ENUM>(PROFILE);

  return (
    <div className="flex items-start gap-x-6 w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabsContent value={PROFILE}>
          <Profile data={data?.data} isPending={isPending} />
        </TabsContent>

        <TabsContent value={SUBSCRIPTION}>
          <Subscription subscription={subscription} />
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
          <Profile data={data?.data} isPending={isPending} />
        </TabsContent>
      </Sidebar>
    </div>
  );
};

export default ProfileView;
