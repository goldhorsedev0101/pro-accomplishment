'use client';

// Router
import { useRouter } from 'next/navigation';

// Types
import { JSX } from 'react';

// Icons
import { IoArrowBack } from 'react-icons/io5';

const BackButton = (): JSX.Element => {
  const { back } = useRouter();
  return <IoArrowBack className="text-neutral-grey-100 cursor-pointer" onClick={back} size={28} />;
};

export default BackButton;
