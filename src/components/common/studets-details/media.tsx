'use client';

import { isVideoUrl } from '@/utils/is-video-url';
import Image from 'next/image';
import { FC, useState } from 'react';
import Box from '../box';
import MediaViewer from '../mediaViewer';

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
        {media_urls?.map((url, i) => {
          const isVideo = isVideoUrl(url);

          if (!isVideo) {
            return (
              <Image
                onClick={() => setSelectedImg(url)}
                className="rounded-md"
                alt="chaseBanner"
                height={150}
                width={150}
                src={url}
                key={i}
              />
            );
          } else {
            return (
              <video
                onClick={() => setSelectedImg(url)}
                width="150"
                height="150"
                src={url}
                controls
                key={i}
              />
            );
          }
        })}
      </div>

      {selectedImg && (
        <MediaViewer
          selectedMedia={selectedImg}
          isVideo={isVideoUrl(selectedImg)}
          onOpenChange={() => setSelectedImg('')}
        />
      )}
    </Box>
  );
};

export default Media;
