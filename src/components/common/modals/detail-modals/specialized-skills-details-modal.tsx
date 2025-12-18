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
import { formatToMDYYYY } from '@/utils/date-format';

// Icon
import ranking from 'public/pdf/ranking.svg';

interface IProps {
  form_data?: FormData;
}

const SpecializedSkillsDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.accomplishment_name || form_data?.date) && (
        <Box className="!border-none !flex-row !p-3 !gap-2">
          <Image alt="title/award" src={ranking} width={24} height={24} />
          <div className="gap-x-1">
            <p className="text-heading font-medium ">{form_data?.accomplishment_name}</p>
            <p className="text-neutral-grey-80 text-sm">{formatToMDYYYY(form_data?.date ?? '')}</p>
          </div>
        </Box>
      )}

      {form_data?.document_urls && form_data?.document_urls?.length > 0 && (
        <Document certificate_urls={form_data?.document_urls} />
      )}

      {form_data?.media_urls && form_data?.media_urls?.length > 0 && (
        <Media media_urls={form_data?.media_urls} />
      )}

      {form_data?.link && <Links link={form_data?.link} />}

      {form_data?.notes && <Note note={form_data?.notes} />}
    </div>
  );
};

export default SpecializedSkillsDetailsModal;
