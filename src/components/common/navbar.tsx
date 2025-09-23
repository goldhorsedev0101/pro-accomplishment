'use client';

// Icons
import avatar from 'public/img/avatar.png';
import logo from 'public/img/logo.png';

// Constant
import Routes from '@/constants/routes';

// Component
import Image from 'next/image';
import Link from 'next/link';

// Types
import { useGetProfileQuery } from '@/services/others/profile/get-recruiter-profile';
import { JSX } from 'react';

const Navbar = (): JSX.Element => {
  const { profile, home } = Routes;

  const { data } = useGetProfileQuery();
  const { first_name, last_name, profile_picture } = data?.data || {};

  return (
    <div className="border-b-[#DCE0E5] border-b h-[90px] flex items-center justify-between px-6 sm:px-10 md:px-20">
      <Link href={home} className="flex items-center gap-2">
        <Image src={logo} alt="avatar" width={43} height={42} />
        <p className="text-black font-medium text-2xl hidden sm:block">Achievement Tracker</p>
      </Link>

      <Link href={profile} className="flex items-center gap-2" onClick={() => {}}>
        <Image src={profile_picture ?? avatar} alt="avatar" width={40} height={40} />
        <p className="text-black font-medium text-base">
          {first_name} {last_name}
        </p>
      </Link>
    </div>
  );
};

export default Navbar;
