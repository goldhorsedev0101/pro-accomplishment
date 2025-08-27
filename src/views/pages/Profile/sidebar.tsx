import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sidebar } from '@/constants/profile';
import { PROFILE_ENUM } from '@/enum/profile-enum';
import Image from 'next/image';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';

interface IProps {
  activeTab: PROFILE_ENUM;
  setActiveTab: Dispatch<SetStateAction<PROFILE_ENUM>>;
  children: ReactNode;
}

const Sidebar = ({ activeTab, setActiveTab, children }: IProps) => {
  const isActive = (label: PROFILE_ENUM) => activeTab === label;

  return (
    <Tabs
      onValueChange={(v) => setActiveTab(v as PROFILE_ENUM)}
      defaultValue={PROFILE_ENUM.PROFILE}
      className="w-full flex !flex-row items-start gap-x-6"
      value={activeTab}
    >
      <TabsList className="flex bg-white gap-y-3 flex-col h-full items-start w-full max-w-[324px] border border-neutral-grey-20 rounded-xl px-4 py-6">
        {sidebar.map(({ icon, label, coloredIcon }, i) => (
          <Fragment key={i}>
            <TabsTrigger
              className={
                'data-[state=active]:text-primary text-neutral-grey-80 text-xl font-normal data-[state=active]:shadow-none data-[state=active]:font-medium capitalize cursor-pointer'
              }
              value={label}
            >
              <Image
                src={isActive(label as PROFILE_ENUM) ? coloredIcon : icon}
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

      {children}
    </Tabs>
  );
};

export default Sidebar;
