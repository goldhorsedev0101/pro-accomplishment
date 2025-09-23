'use client';

// Components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

// Constant
import { sidebar } from '@/constants/profile';
import Routes from '@/constants/routes';

// Enum
import { PROFILE_ENUM } from '@/enum/profile.enum';

// Cookie
import { deleteCookie } from 'cookies-next';

// Router
import { useRouter } from 'next/navigation';

// Types
import { Dispatch, Fragment, JSX, ReactNode, SetStateAction } from 'react';

interface IProps {
  setActiveTab: Dispatch<SetStateAction<PROFILE_ENUM>>;
  activeTab: PROFILE_ENUM;
  children: ReactNode;
}

const Sidebar = ({ activeTab, setActiveTab, children }: IProps): JSX.Element => {
  const isActive = (label: PROFILE_ENUM) => activeTab === label;

  const { LOGOUT, PROFILE } = PROFILE_ENUM;

  const { signIn } = Routes;
  const { push, refresh } = useRouter();

  const handleLogout = () => {
    deleteCookie('accessToken');
    push(signIn);
    refresh();
  };

  return (
    <Tabs
      onValueChange={(v) => setActiveTab(v as PROFILE_ENUM)}
      className="w-full flex md:!flex-row items-start gap-x-6"
      defaultValue={PROFILE}
      value={activeTab}
    >
      <TabsList className="flex bg-white gap-y-3 flex-col h-full items-start w-full md:max-w-[324px] border border-neutral-grey-20 rounded-xl px-4 py-6">
        {sidebar.map(({ icon, label, coloredIcon }, i) => (
          <Fragment key={i}>
            <TabsTrigger
              className={`${label !== LOGOUT && 'data-[state=active]:text-primary'} text-neutral-grey-80 text-xl font-normal data-[state=active]:shadow-none data-[state=active]:font-medium capitalize cursor-pointer`}
              value={label}
              onClick={() => {
                if (label === LOGOUT) handleLogout();
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

      <div className="w-full">{children}</div>
    </Tabs>
  );
};

export default Sidebar;
