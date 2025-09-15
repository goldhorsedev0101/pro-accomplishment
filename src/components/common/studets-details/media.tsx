import Image from 'next/image';
import { FC } from 'react';
import Box from '../box';

interface IProps {
  media_urls: string[];
}

const Media: FC<IProps> = ({ media_urls }) => {
  return (
    <Box className="!border-none !p-3 !gap-2">
      <p className="text-heading font-medium">Media</p>

      <div className="flex flex-wrap gap-4">
        {media_urls?.map((url, i) => (
          <Image
            className="rounded-md"
            alt="chaseBanner"
            height={150}
            width={150}
            src={url}
            key={i}
          />
        ))}
      </div>
    </Box>
  );
};

export default Media;
