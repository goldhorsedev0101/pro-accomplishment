// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Image from 'next/image';
import Box from '../../box';
import Document from '../../studets-details/document';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';

// Util
import { formatToDDMMYYYY } from '@/utils/date-format';

// Icons
import building from 'public/icons/building.svg';
import start from 'public/icons/medal-star.svg';

interface IProps {
  form_data?: FormData;
}

const CertificationsDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.certification_title || form_data?.date_received) && (
        <Box className="!border-none !flex-row items-center !p-3 !gap-2">
          <div className="w-9 h-9 rounded-full bg-purple-light flex items-center justify-center">
            <Image src={start} alt="start" sizes="24" />
          </div>
          <div className="gap-x-1">
            <p className="text-heading font-medium capitalize">{form_data?.certification_title}</p>
            <p className="text-neutral-grey-70 text-sm">
              {formatToDDMMYYYY(form_data?.date_received ?? '')}
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

      {form_data?.certificate_urls && form_data?.certificate_urls?.length > 0 && (
        <Document certificate_urls={form_data?.certificate_urls} />
      )}

      {form_data?.media_urls && form_data?.media_urls?.length > 0 && (
        <Media media_urls={form_data?.media_urls} />
      )}

      {form_data?.link && <Links link={form_data?.link} />}
      {form_data?.notes && <Note note={form_data?.notes} />}
    </div>
  );
};

export default CertificationsDetailsModal;
