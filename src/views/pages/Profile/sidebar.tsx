'use client';

// Components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

// Constant
import { sidebar } from '@/constants/profile';

// Enum
import { PROFILE_ENUM } from '@/enum/profile.enum';

// Cookie

// Router

// Types
import { useAuth } from '@/context/auth.context';
import { useFCM } from '@/context/fcm.context';
import { useSignOutMutation } from '@/services/auth/sign-out-mutation';
import { Dispatch, Fragment, JSX, ReactNode, SetStateAction } from 'react';

interface IProps {
  setActiveTab: Dispatch<SetStateAction<PROFILE_ENUM>>;
  activeTab: PROFILE_ENUM;
  children: ReactNode;
  profileId: string;
}

const Sidebar = ({ activeTab, setActiveTab, children, profileId }: IProps): JSX.Element => {
  const isActive = (label: PROFILE_ENUM) => activeTab === label;
  const { handleLogout } = useAuth();
  const { LOGOUT, PROFILE } = PROFILE_ENUM;
  const { mutateAsync } = useSignOutMutation();
  const { fcmToken } = useFCM();
  const logout = async () => {
    try {
      await mutateAsync({ fcmToken: fcmToken || '', profileId });
      handleLogout();
    } catch (error) {
      console.log('🚀 ~ logout ~ error:', error);
    }
  };

  return (
    <Tabs
      onValueChange={(v) => setActiveTab(v as PROFILE_ENUM)}
      className="w-full grid md:grid-cols-[324px_1fr] gap-x-6"
      defaultValue={PROFILE}
      value={activeTab}
    >
      <div className="w-full h-fit sticky top-[102px] self-start z-10">
        <TabsList className="flex bg-white gap-y-3 flex-col h-full items-start w-full md:max-w-[324px] border border-neutral-grey-20 rounded-xl px-4 py-6">
          {sidebar.map(({ icon, label, coloredIcon }, i) => (
            <Fragment key={i}>
              <TabsTrigger
                className={`${label !== LOGOUT && 'data-[state=active]:text-primary'} text-neutral-grey-80 text-xl font-normal data-[state=active]:shadow-none data-[state=active]:font-medium cursor-pointer capitalize`}
                value={label}
                onClick={() => {
                  if (label === LOGOUT) logout();
                }}
              >
                <Image
                  src={isActive(label) ? coloredIcon : icon}
                  alt={label}
                  width={24}
                  height={24}
                />
                {label.replace(/-/g, ' ')}
              </TabsTrigger>
              {i !== sidebar.length - 1 && <hr className="w-full" />}
            </Fragment>
          ))}
        </TabsList>
      </div>

      <div className="w-full">{children}</div>
    </Tabs>
  );
};

export default Sidebar;
