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

// Icons
import calenderTick from 'public/icons/calendar-tick.svg';
import calender from 'public/icons/calendar.svg';
import cup from 'public/icons/cup.svg';
import location from 'public/icons/location-colored.svg';

interface IProps {
  form_data?: FormData;
}

const AthleticDetailsModal: FC<IProps> = ({ form_data }) => (
  <div className="flex flex-col gap-y-4 font-quicksand">
    {form_data?.name && (
      <Box className="!border-none !p-3 !flex-row justify-between">
        <p className="text-heading font-medium capitalize">{form_data?.name}</p>
        <p className="py-0.5 px-1.5 rounded-sm text-black text-sm bg-[#E7D3EE]">National</p>
      </Box>
    )}

    {(form_data?.title_or_award || form_data?.region) && (
      <Box className="!border-none !p-3 !gap-2">
        <div className="flex items-center gap-x-1">
          <Image alt="title/award" src={cup} width={20} height={20} />
          <p className="text-heading font-medium">Title / Award</p>
        </div>
        <p className="text-heading text-sm">
          {form_data?.title_or_award} {form_data?.region && '- ' + form_data?.region}
        </p>
      </Box>
    )}

    {(form_data?.event_name || form_data?.date || form_data?.location) && (
      <Box className="!border-none !p-3 !gap-2">
        <p className="text-heading font-medium">Event Details</p>

        {form_data?.event_name && (
          <div className="flex items-center gap-x-1">
            <Image alt="title/award" src={calenderTick} width={20} height={20} />
            <div>
              <p className="text-neutral-grey-60 text-xs">Event Name</p>
              <p className="text-neutral-grey-70 text-sm">{form_data?.event_name}</p>
            </div>
          </div>
        )}

        {form_data?.date && (
          <div className="flex items-center gap-x-1">
            <Image alt="title/award" src={calender} width={20} height={20} />
            <div>
              <p className="text-neutral-grey-60 text-xs">Date</p>
              <p className="text-neutral-grey-70 text-sm">{formatToMDYYYY(form_data?.date)}</p>
            </div>
          </div>
        )}

        {form_data?.location && (
          <div className="flex items-center gap-x-1">
            <Image alt="title/award" src={location} width={20} height={20} />
            <div>
              <p className="text-neutral-grey-60 text-xs">Location</p>
              <p className="text-neutral-grey-70 text-sm">{form_data?.location}</p>
            </div>
          </div>
        )}
      </Box>
    )}

    {(form_data?.team_name || form_data?.opposing_team) && (
      <Box className="!border-none !p-3 !gap-2">
        <p className="text-heading font-medium">Team</p>

        {form_data?.team_name && (
          <div className="flex items-center justify-between">
            <p className="text-neutral-grey-70 text-sm">Team</p>
            <p className="text-heading text-sm font-medium">{form_data?.team_name}</p>
          </div>
        )}

        {form_data?.opposing_team && (
          <div className="flex items-center justify-between">
            <p className="text-neutral-grey-70 text-sm">Opposing Team</p>
            <p className="text-heading text-sm font-medium">{form_data?.opposing_team}</p>
          </div>
        )}
      </Box>
    )}

    {form_data?.certificate_urls && form_data?.certificate_urls?.length > 0 && (
      <Document
        certificate_urls={form_data?.certificate_urls}
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

export default AthleticDetailsModal;
