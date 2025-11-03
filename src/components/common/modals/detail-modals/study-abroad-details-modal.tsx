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
import location from 'public/icons/location-colored.svg';
import airplane from 'public/pdf/airplane-square.svg';

interface IProps {
  form_data?: FormData;
}

const StudyAbroadDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.accomplishment_name || form_data?.date) && (
        <Box className="!border-none !p-3 !gap-1">
          {form_data?.accomplishment_name && (
            <p className="text-heading font-medium ">{form_data?.accomplishment_name}</p>
          )}
          {form_data?.date && (
            <p className="text-neutral-grey-80 text-sm">{formatToDDMMYYYY(form_data?.date)}</p>
          )}
        </Box>
      )}

      {form_data?.destination && (
        <Items
          label="Destination"
          className="!gap-x-2 !text-neutral-grey-100"
          items={[{ icon: location, value: form_data?.destination }]}
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

      {form_data?.additional_travel_locations && (
        <Items
          items={[
            {
              icon: airplane,
              label: 'Additional Travel Locations?',
              value: form_data?.additional_travel_locations,
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

export default StudyAbroadDetailsModal;
