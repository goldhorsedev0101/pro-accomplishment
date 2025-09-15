import downloadDoc from '@/utils/download-doc';
import Image from 'next/image';
import download from 'public/icons/download.svg';
import { FC } from 'react';
import Box from '../box';

interface IProps {
  certification_title?: string | null;
  certificate_urls: string[];
}

const Document: FC<IProps> = ({ certification_title, certificate_urls }) => {
  return (
    <Box className="!border-none !p-3 !gap-2">
      <p className="text-heading font-medium">PDF/Document</p>

      {certificate_urls.map((url, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-x-1">
            <p className="text-red font-semibold text-sm bg-[#FCDBDB] size-10 rounded-lg flex items-center justify-center">
              PDF
            </p>
            <div>
              <p className="text-neutral-grey-100 text-sm font-medium">
                {certification_title ?? 'Certificate'}
              </p>
              <p className="text-neutral-grey-70 text-sm">782.3Kb</p>
            </div>
          </div>
          <Image
            width={24}
            height={24}
            alt="download"
            src={download}
            onClick={() => downloadDoc(url, certification_title ?? `Certificate_${index}`)}
            className="cursor-pointer"
          />
        </div>
      ))}
    </Box>
  );
};

export default Document;
