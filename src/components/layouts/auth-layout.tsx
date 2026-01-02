// Types
import { JSX, ReactNode } from 'react';

import Image from 'next/image';
import authImg from 'public/img/auth.svg';
import logo from 'public/img/logo.svg';

const AuthLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="h-screen overflow-x-hidden w-screen grid lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6">
      {/* Section 1 - Logo */}
      <div className="lg:col-span-1 hidden lg:block xl:col-span-3 bg-[#FFFAF1] w-full h-full relative">
        <Image
          src={logo}
          alt="Logo"
          width={89}
          height={89}
          className="absolute top-8 left-8 z-10"
        />
        <p className="absolute top-[130px] left-8 text-neutral-grey-100 text-4xl leading-14 z-10">
          Accomplish <br /> Showcase <br /> Connect
        </p>

        <Image
          alt="auth"
          width={823}
          height={644}
          src={authImg}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>

      {/* Section 2 - Sign In Form */}
      <div className="flex justify-center items-center px-12 w-full xl:col-span-2 2xl:col-span-3 max-h-screen overflow-y-auto py-20">
        <div className="max-w-[454px] w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
