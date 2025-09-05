// Icons
import heart from 'public/icons/heart.svg';

// Component
import Image from 'next/image';
import Heading from './heading';

// Types
import { JSX } from 'react';

const NoData = (): JSX.Element => {
  return (
    <div className="max-w-[434px] flex flex-col items-center gap-y-6 self-center w-full">
      <Image src={heart} alt="heart" sizes="94" />
      <Heading text="No Favorite Yet" width="medium" size="22" />
      <p className="text-secondary text-lg font-normal -mt-4">
        There is not favorite student profile at the moment
      </p>
    </div>
  );
};

export default NoData;
