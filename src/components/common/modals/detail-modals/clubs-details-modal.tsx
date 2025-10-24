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
import location from 'public/icons/location-colored.svg';
import bill from 'public/pdf/bill.svg';
import start from 'public/pdf/magic-star.svg';
import board from 'public/pdf/menu-board.svg';

interface IProps {
  form_data?: FormData;
}

const ClubsDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.club_name || form_data?.date_joined) && (
        <Box className="!border-none !p-3 !gap-2">
          {form_data?.club_name && (
            <p className="text-heading font-medium capitalize">{form_data?.club_name}</p>
          )}
          {form_data?.date_joined && (
            <p className="text-neutral-grey-80 text-sm">
              {formatToDDMMYYYY(form_data?.date_joined)}
            </p>
          )}
        </Box>
      )}

      {(form_data?.membership_number ||
        form_data?.location ||
        form_data?.club_events ||
        form_data?.club_volunteer) && (
        <Items
          label="Event Details"
          items={[
            {
              icon: bill,
              label: 'Membership or Troup Number',
              value: form_data?.membership_number,
            },
            { icon: location, label: 'Location', value: form_data?.location },
            { icon: board, label: 'Club Events', value: form_data?.club_events },
            {
              icon: start,
              label: 'Club Volunteer/Service',
              value: form_data?.club_volunteer,
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

export default ClubsDetailsModal;
