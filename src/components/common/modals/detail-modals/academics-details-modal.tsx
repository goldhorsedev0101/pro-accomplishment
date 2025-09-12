// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Image from 'next/image';
import Link from 'next/link';
import Box from '../../box';

// Util
import { formatToMDYYYY, formatToYYYY } from '@/utils/date-format';

// Icons
import calenderTick from 'public/icons/calendar-tick.svg';
import calender from 'public/icons/calendar.svg';
import cup from 'public/icons/cup.svg';
import download from 'public/icons/download.svg';
import location from 'public/icons/location-colored.svg';
import note from 'public/icons/note.svg';

interface IProps {
  form_data?: FormData;
}

const AcademicsDetailsModal: FC<IProps> = ({ form_data }) => (
  <div className="flex flex-col gap-y-4 font-quicksand">
    {(form_data?.name || form_data?.academic_year_started || form_data?.academic_year_ended) && (
      <Box className="!border-none !p-3">
        <div className="flex items-center justify-between">
          <p className="text-heading font-medium capitalize">{form_data?.name}</p>
          <p className="py-0.5 px-1.5 rounded-sm text-neutral-grey-70 text-xs bg-green-light">
            {formatToYYYY(form_data?.academic_year_started ?? '')} -{' '}
            {formatToYYYY(form_data?.academic_year_ended ?? '')}
          </p>
        </div>
        <p className="text-neutral-grey-70 text-sm">{form_data?.school_or_institution}</p>
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

    <Box className="!border-none !p-3 !gap-2">
      <p className="text-heading font-medium">PDF/Document</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <p className="text-red font-semibold text-sm bg-[#FCDBDB] size-10 rounded-lg flex items-center justify-center">
            PDF
          </p>
          <div>
            <p className="text-neutral-grey-100 text-sm font-medium">
              {form_data?.certification_title ?? 'Certificate'}
            </p>
            <p className="text-neutral-grey-70 text-sm">782.3Kb</p>
          </div>
        </div>

        <Image alt="download" src={download} width={24} height={24} />
      </div>
    </Box>

    {form_data?.media_urls && form_data?.media_urls?.length > 0 && (
      <Box className="!border-none !p-3 !gap-2">
        <p className="text-heading font-medium">Media</p>

        <div className="flex flex-wrap gap-4">
          {form_data?.media_urls?.map((url, i) => (
            <Image
              className="rounded-md"
              alt="chaseBanner"
              height={150}
              width={150}
              src={url}
              key={i}
            />
          ))}
        </div>
      </Box>
    )}

    {form_data?.link && (
      <Box className="!border-none !p-3 !gap-2">
        <p className="text-heading font-medium">Link</p>
        <Link target="_blank" href={form_data?.link} className="text-blue text-xs">
          {form_data?.link}
        </Link>
      </Box>
    )}

    {form_data?.notes && (
      <Box className="!border-none !p-3 !gap-2">
        <div className="flex items-center gap-x-1">
          <Image alt="title/award" src={note} width={20} height={20} />
          <p className="text-heading font-medium">Notes</p>
        </div>
        <p className="text-neutral-grey-70 text-sm">{form_data?.notes}</p>
      </Box>
    )}
  </div>
);

export default AcademicsDetailsModal;
