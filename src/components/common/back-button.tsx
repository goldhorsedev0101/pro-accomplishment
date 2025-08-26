'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const BackButton = () => {
  const { back } = useRouter();

  return <IoArrowBack className="text-neutral-grey-100 cursor-pointer" onClick={back} size={28} />;
};

export default BackButton;
