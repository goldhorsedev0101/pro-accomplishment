'use client';

// Icons
import logo from 'public/img/logo.svg';

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
        <p className="text-black font-medium sm:text-2xl block text-lg">I&rsquo;m Accomplished</p>
      </Link>

      <Link href={profile} className="flex items-center gap-2">
        {profile_picture && (
          <Image
            className="rounded-full w-10 h-10 object-cover"
            src={profile_picture}
            alt="avatar"
            height={40}
            width={40}
          />
        )}
        <p className="text-black font-medium text-base ">
          {first_name} {last_name}
        </p>
      </Link>
    </div>
  );
};

export default Navbar;
