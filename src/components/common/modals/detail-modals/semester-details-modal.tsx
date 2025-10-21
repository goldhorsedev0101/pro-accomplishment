// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Box from '../../box';
import Document from '../../studets-details/document';
import Items from '../../studets-details/items';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';

// Util
import { formatToDDMMYYYY } from '@/utils/date-format';

// Icons
import building from 'public/icons/building.svg';
import heart from 'public/pdf/heart.svg';
import routing from 'public/pdf/routing.svg';

interface IProps {
  form_data?: FormData;
}

const SemesterDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.accomplishment_name || form_data?.date) && (
        <Box className="!border-none !p-3 !gap-1">
          {form_data?.accomplishment_name && (
            <p className="text-heading font-medium capitalize">{form_data?.accomplishment_name}</p>
          )}
          {form_data?.date && (
            <p className="text-neutral-grey-70 text-sm">{formatToDDMMYYYY(form_data?.date)}</p>
          )}
        </Box>
      )}

      {form_data?.travel_path && (
        <Items
          label="Travel Path"
          className="!gap-x-2 !text-neutral-grey-100"
          items={[{ icon: routing, value: form_data?.travel_path }]}
        />
      )}

      {form_data?.institution && (
        <Items
          label="Institution"
          className="!gap-x-2 !text-neutral-grey-100"
          items={[{ icon: building, value: form_data?.institution }]}
        />
      )}

      {(form_data?.date_arrived || form_data?.date_departed) && (
        <Items
          items={[
            { label: 'Date Arrived', value: formatToDDMMYYYY(form_data?.date_arrived ?? '') },
            { label: 'Date Departed', value: formatToDDMMYYYY(form_data?.date_departed ?? '') },
          ]}
        />
      )}

      {form_data?.favorite_moments && (
        <Items
          items={[
            {
              icon: heart,
              label: 'Favorite Moments',
              value: form_data?.favorite_moments,
            },
          ]}
        />
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

export default SemesterDetailsModal;
