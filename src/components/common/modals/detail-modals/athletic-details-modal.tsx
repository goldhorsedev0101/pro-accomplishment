// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Image from 'next/image';
import Box from '../../box';
import Document from '../../studets-details/document';
import Items from '../../studets-details/items';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';

// Util
import { formatToMDYYYY } from '@/utils/date-format';

// Icons
import calenderTick from 'public/icons/calendar-tick.svg';
import calender from 'public/icons/calendar.svg';
import cup from 'public/icons/cup.svg';
import groupUser1 from 'public/icons/group-user-1.svg';
import groupUser from 'public/icons/group-user.svg';
import location from 'public/icons/location-colored.svg';

interface IProps {
  form_data?: FormData;
}

const AthleticDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {form_data?.name && (
        <Box className="!border-none !p-3 !flex-row justify-between">
          <p className="text-heading font-medium break-all">{form_data?.name}</p>
          {form_data.region && (
            <p
              className={`font-quicksand capitalize text-black font-normal h-fit text-sm rounded-sm py-0.5 px-1.5  ${form_data?.region === 'state' ? 'bg-[#D3EEE2]' : 'bg-[#E7D3EE]'} `}
            >
              {form_data.region}
            </p>
          )}
        </Box>
      )}

      {(form_data?.title_or_award || form_data?.region) && (
        <Box className="!border-none !p-3 !gap-2">
          <div className="flex items-center gap-x-1">
            <Image alt="title/award" src={cup} width={20} height={20} />
            <p className="text-heading font-medium">Title / Award</p>
          </div>
          <p className="text-heading text-sm">{form_data?.title_or_award}</p>
        </Box>
      )}

      {(form_data?.event_name || form_data?.date || form_data?.location) && (
        <Items
          label="Event Details"
          items={[
            { icon: calenderTick, label: 'Event Name', value: form_data?.event_name },
            { icon: calender, label: 'Date', value: formatToMDYYYY(form_data?.date ?? '') },
            { icon: location, label: 'Location', value: form_data?.location },
          ]}
        />
      )}

      {(form_data?.team_name || form_data?.opposing_team) && (
        <Items
          label="Team"
          items={[
            { icon: groupUser1, label: 'Team', value: form_data?.team_name },
            { icon: groupUser, label: 'Opposing Team', value: form_data?.opposing_team },
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

export default AthleticDetailsModal;
