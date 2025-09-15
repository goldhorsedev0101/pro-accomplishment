// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Image from 'next/image';
import Link from 'next/link';
import Box from '../../box';

// Util

// Icons
import { formatToMDYYYY } from '@/utils/date-format';
import downloadDoc from '@/utils/download-doc';
import building from 'public/icons/building.svg';
import cup from 'public/icons/cup.svg';
import download from 'public/icons/download.svg';
import note from 'public/icons/note.svg';

interface IProps {
  form_data?: FormData;
}

const CertificationsDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.certification_title || form_data?.date_received) && (
        <Box className="!border-none !flex-row items-center !p-3 !gap-2">
          <div className="flex items-center justify-center size-9 bg-yellow-light rounded-full">
            <Image alt="title/award" src={cup} width={24} height={24} />
          </div>
          <div className="gap-x-1">
            <p className="text-heading font-medium capitalize">{form_data?.certification_title}</p>
            <p className="text-neutral-grey-70 text-sm">
              {formatToMDYYYY(form_data?.date_received ?? '')}
            </p>
          </div>
        </Box>
      )}

      {form_data?.institution && (
        <Box className="!border-none !p-3 !gap-2">
          <div className="flex items-center gap-x-1">
            <Image alt="title/award" src={building} width={20} height={20} />
            <p className="text-neutral-grey-60 text-xs">Institution</p>
          </div>
          <p className="text-neutral-grey-70 text-sm">{form_data?.institution}</p>
        </Box>
      )}

      <Box className="!border-none !p-3 !gap-2">
        <p className="text-heading font-medium">PDF/Document</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1">
            <p className="text-red font-semibold text-sm bg-[#FCDBDB] size-10 rounded-lg flex items-center justify-center">
              PDF
            </p>
            <div>
              <p className="text-neutral-grey-100 text-sm font-medium">
                {form_data?.certification_title ?? 'Certificate'}
              </p>
              <p className="text-neutral-grey-70 text-sm">782.3Kb</p>
            </div>
          </div>

          <Image
            width={24}
            height={24}
            alt="download"
            src={download}
            onClick={() =>
              downloadDoc(
                form_data?.award_certificate_urls?.[0] ?? '',
                form_data?.certification_title ?? 'Certificate',
              )
            }
            className="cursor-pointer"
          />
        </div>
      </Box>

      {form_data?.media_urls && form_data?.media_urls?.length > 0 && (
        <Box className="!border-none !p-3 !gap-2">
          <p className="text-heading font-medium">Media</p>

          <div className="flex flex-wrap gap-4">
            {form_data?.media_urls?.map((url, i) => (
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
      )}

      {form_data?.link && (
        <Box className="!border-none !p-3 !gap-2">
          <p className="text-heading font-medium">Link</p>
          <Link target="_blank" href={form_data?.link} className="text-blue text-xs">
            {form_data?.link}
          </Link>
        </Box>
      )}

      {form_data?.notes && (
        <Box className="!border-none !p-3 !gap-2">
          <div className="flex items-center gap-x-1">
            <Image alt="title/award" src={note} width={20} height={20} />
            <p className="text-heading font-medium">Notes</p>
          </div>
          <p className="text-neutral-grey-70 text-sm">{form_data?.notes}</p>
        </Box>
      )}
    </div>
  );
};

export default CertificationsDetailsModal;
