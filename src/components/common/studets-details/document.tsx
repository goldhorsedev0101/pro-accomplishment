import downloadDoc from '@/utils/download-doc';
import Image from 'next/image';
import download from 'public/icons/download.svg';
import { FC } from 'react';
import Box from '../box';

interface IProps {
  certificate_urls: string[];
  title?: string;
}

const Document: FC<IProps> = ({ certificate_urls, title }) => {
  const getFileNameFromUrl = (url: string): string => {
    try {
      const cleanUrl = url.split('?')[0].split('#')[0];
      const fileName = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);
      return fileName;
    } catch {
      return '';
    }
  };

  return (
    <Box className="!border-none !p-3 !gap-2">
      <p className="text-heading font-medium">{title || 'PDF / Document'}</p>

      {certificate_urls.map((url, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <p className="text-red font-semibold text-sm bg-[#FCDBDB] size-10 min-w-10 rounded-lg flex items-center justify-center">
              PDF
            </p>
            <div>
              <p className="text-neutral-grey-100 text-sm font-medium break-all line-clamp-1">
                {getFileNameFromUrl(url) ?? 'Certificate'}
              </p>
              <p className="text-neutral-grey-70 text-sm">782.3Kb</p>
            </div>
          </div>

          <Image
            width={24}
            height={24}
            alt="download"
            src={download}
            onClick={() => downloadDoc(url, getFileNameFromUrl(url))}
            className="cursor-pointer"
          />
        </div>
      ))}
    </Box>
  );
};

export default Document;
