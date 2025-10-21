// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Image from 'next/image';
import Box from '../../box';
import Document from '../../studets-details/document';
import FavoritePart from '../../studets-details/favorite-part';
import Items from '../../studets-details/items';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';
import Skills from '../../studets-details/skills';

// Util
import { formatToDDMMMYYYY } from '@/utils/date-format';

// Icons
import info from 'public/pdf/info.svg';

interface IProps {
  form_data?: FormData;
}

const VolunteerDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.volunteer_title || form_data?.company) && (
        <Box className="!border-none !flex-row items-center !p-3 !gap-2">
          <div className="flex items-center justify-center size-9 bg-green-light rounded-full">
            <Image alt="title/award" src={info} width={24} height={24} />
          </div>
          <div className="gap-x-1">
            <p className="text-heading font-medium capitalize">{form_data?.volunteer_title}</p>
            <p className="text-neutral-grey-70 text-sm">{form_data?.company}</p>
          </div>
        </Box>
      )}

      {(form_data?.start_date || form_data?.end_date) && (
        <Items
          items={[
            { label: 'Start Date', value: formatToDDMMMYYYY(form_data?.start_date ?? '') },
            {
              label: 'End Date',
              value: form_data?.end_date ? formatToDDMMMYYYY(form_data?.end_date ?? '') : 'Ongoing',
            },
          ]}
        />
      )}

      {form_data?.previous_skills && form_data?.previous_skills?.length > 0 && (
        <Skills skills={form_data?.previous_skills} title="Previous Skills" />
      )}

      {form_data?.acquired_skills && form_data?.acquired_skills?.length > 0 && (
        <Skills skills={form_data?.acquired_skills} title="Acquired Skills" />
      )}

      {form_data?.favorite_part && <FavoritePart favorite_part={form_data?.favorite_part} />}

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

export default VolunteerDetailsModal;
