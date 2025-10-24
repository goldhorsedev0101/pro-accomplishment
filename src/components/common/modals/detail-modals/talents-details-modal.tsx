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
import Skills from '../../studets-details/skills';

// Utils
import { formatToDDMMMYYYY } from '@/utils/date-format';

// Icons
import magicStar from 'public/icons/magic-star.svg';

interface IProps {
  form_data?: FormData;
}

const TalentsDetailsModal: FC<IProps> = ({ form_data }) => {
  console.log('🚀 ~ TalentsDetailsModal ~ form_data:', form_data);
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.name || form_data?.date) && (
        <Box className="!border-none !flex-row items-center !p-3 !gap-2">
          <div className="flex items-center justify-center size-9 bg-neutral-grey-10 rounded-full">
            <Image alt="title/award" src={magicStar} width={24} height={24} />
          </div>
          <div className="gap-x-1 flex items-center justify-between w-full">
            <p className="text-heading font-medium capitalize">{form_data?.name}</p>
            <p className="text-neutral-grey-80 text-sm">
              {formatToDDMMMYYYY(form_data?.date ?? '')}
            </p>
          </div>
        </Box>
      )}

      {form_data?.skill_required && form_data?.skill_required?.length > 0 && (
        <Skills skills={form_data?.skill_required} title="Skills Required" />
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

export default TalentsDetailsModal;
