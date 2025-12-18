// Icons
import heart from 'public/icons/heart.svg';

// Component
import Image, { StaticImageData } from 'next/image';
import Heading from './heading';

// Types
import { FC, JSX } from 'react';

interface IProps {
  title?: string;
  className?: string;
  description?: string;
  img?: StaticImageData;
}

const NoData: FC<IProps> = ({
  description = 'There is no top recruit profile at the moment',
  title = 'No Favorite Yet',
  img = heart,
  className,
}): JSX.Element => {
  return (
    <div
      className={`max-w-[434px] flex flex-col items-center gap-y-6 self-center w-full ${className}`}
    >
      <Image src={img} alt="heart" sizes="94" />
      <Heading text={title} width="medium" size="22" />
      <p className="text-[#666566] text-lg font-normal -mt-4 text-center">{description}</p>
    </div>
  );
};

export default NoData;
