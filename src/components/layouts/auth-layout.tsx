import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-x-hidden w-screen grid lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {/* Section 1 - Logo */}
      <div className="lg:col-span-2 bg-[url(/assets/img/auth.png)] bg-cover bg-no-repeat hidden lg:block xl:col-span-3" />

      {/* Section 2 - Sign In Form */}
      <div className="flex justify-center items-center px-12 w-full xl:col-span-2 2xl:col-span-3">
        <div className="max-w-[454px] w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
