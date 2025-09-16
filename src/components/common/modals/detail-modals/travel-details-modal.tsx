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
import { formatToMDYYYY } from '@/utils/date-format';

// Icons
import location from 'public/icons/location-colored.svg';
import bill from 'public/pdf/bill.svg';
import heart from 'public/pdf/heart.svg';

interface IProps {
  form_data?: FormData;
}

const TravelDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.accomplishment_name || form_data?.date) && (
        <Box className="!border-none !p-3 !gap-1">
          {form_data?.accomplishment_name && (
            <p className="text-heading font-medium capitalize">{form_data?.accomplishment_name}</p>
          )}
          {form_data?.date && (
            <p className="text-neutral-grey-70 text-sm">{formatToMDYYYY(form_data?.date)}</p>
          )}
        </Box>
      )}

      {(form_data?.destination || form_data?.date_arrived || form_data?.date_departed) && (
        <Items
          items={[
            { icon: location, label: 'Destination', value: form_data?.destination },
            { label: 'Date Arrived', value: formatToMDYYYY(form_data?.date_arrived ?? '') },
            { label: 'Date Departed', value: formatToMDYYYY(form_data?.date_departed ?? '') },
          ]}
        />
      )}

      {(form_data?.travel_companions || form_data?.favorite_moments) && (
        <Items
          items={[
            { icon: bill, label: 'Travel Companions', value: form_data?.travel_companions },
            { icon: heart, label: 'Favorite Moments', value: form_data?.favorite_moments },
          ]}
        />
      )}

      {form_data?.document_urls && form_data?.document_urls?.length > 0 && (
        <Document
          certificate_urls={form_data?.document_urls}
          certification_title={form_data?.certification_title}
        />
      )}

      {form_data?.media_urls && form_data?.media_urls?.length > 0 && (
        <Media media_urls={form_data?.media_urls} />
      )}

      {form_data?.link && <Links link={form_data?.link} />}
      {form_data?.notes && <Note note={form_data?.notes} />}
    </div>
  );
};

export default TravelDetailsModal;
