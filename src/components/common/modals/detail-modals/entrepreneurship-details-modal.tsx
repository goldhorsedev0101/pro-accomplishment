// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Box from '../../box';
import Document from '../../studets-details/document';
import FavoritePart from '../../studets-details/favorite-part';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';

// Util
import { formatToDDMMMYYYY } from '@/utils/date-format';

// Icons
import Items from '../../studets-details/items';
import Skills from '../../studets-details/skills';

interface IProps {
  form_data?: FormData;
}

const EntrepreneurshipDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {form_data?.venture_name && (
        <Box className="!border-none !flex-row items-center !p-3 !gap-2">
          <p className="text-heading font-medium capitalize">{form_data?.venture_name}</p>
        </Box>
      )}

      {(form_data?.started_date || form_data?.completion_date) && (
        <Items
          items={[
            { label: 'Started Date', value: formatToDDMMMYYYY(form_data?.started_date ?? '') },
            {
              label: 'Completion Date',
              value: formatToDDMMMYYYY(form_data?.completion_date ?? ''),
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

export default EntrepreneurshipDetailsModal;
