'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import Box from '../box';
import ImageViewer from '../imageViewer';

interface IProps {
  media_urls: string[];
  title?: string;
}

const Media: FC<IProps> = ({ media_urls, title }) => {
  const [selectedImg, setSelectedImg] = useState<string>('');

  return (
    <Box className="!border-none !p-3 !gap-2">
      <p className="text-heading font-medium">{title || 'Media'}</p>

      <div className="flex flex-wrap gap-4">
        {media_urls?.map((url, i) => (
          <Image
            onClick={() => setSelectedImg(url)}
            className="rounded-md"
            alt="chaseBanner"
            height={150}
            width={150}
            src={url}
            key={i}
          />
        ))}
      </div>

      {selectedImg && (
        <ImageViewer onOpenChange={() => setSelectedImg('')} selectedImage={selectedImg} />
      )}
    </Box>
  );
};

export default Media;
