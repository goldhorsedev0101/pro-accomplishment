import Image from 'next/image';
import heart from 'public/pdf/heart.svg';
import { FC } from 'react';
import Box from '../box';

const FavoritePart: FC<{ favorite_part: string }> = ({ favorite_part }) => {
  return (
    <Box className="!border-none !p-3 !gap-2">
      <div className="flex items-center gap-x-1">
        <Image alt="title/award" src={heart} width={20} height={20} />
        <p className="text-heading font-medium">Favorite Part of the Experience </p>
      </div>
      <p className="text-neutral-grey-70 text-sm break-all">{favorite_part}</p>
    </Box>
  );
};

export default FavoritePart;
