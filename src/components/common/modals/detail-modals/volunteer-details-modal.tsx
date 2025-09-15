// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Image from 'next/image';
import Link from 'next/link';
import Box from '../../box';

// Util
import { formatToDDMMMYYYY } from '@/utils/date-format';

// Icons
import calender from 'public/icons/calendar.svg';
import download from 'public/icons/download.svg';
import note from 'public/icons/note.svg';
import heart from 'public/pdf/heart.svg';
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
        <Box className="!border-none !p-3 !gap-2">
          {form_data?.start_date && (
            <div className="flex items-center gap-x-1">
              <Image alt="title/award" src={calender} width={20} height={20} />
              <div>
                <p className="text-neutral-grey-60 text-xs">Start Date</p>
                <p className="text-neutral-grey-70 text-sm">
                  {formatToDDMMMYYYY(form_data?.start_date)}
                </p>
              </div>
            </div>
          )}

          {form_data?.end_date && (
            <div className="flex items-center gap-x-1">
              <Image alt="title/award" src={calender} width={20} height={20} />
              <div>
                <p className="text-neutral-grey-60 text-xs">End Date</p>
                <p className="text-neutral-grey-70 text-sm">
                  {formatToDDMMMYYYY(form_data?.end_date)}
                </p>
              </div>
            </div>
          )}
        </Box>
      )}

      {form_data?.previous_skills && form_data?.previous_skills?.length > 0 && (
        <Box className="!border-none !p-3 !gap-2">
          <p className="text-heading font-medium">Previous Skills</p>
          <div className="flex flex-wrap gap-2">
            {form_data?.previous_skills?.map((skill, i) => (
              <Box
                key={i}
                className="!border-none !p-2 !py-1 !bg-neutral-grey-0 !rounded-md !w-fit !gap-2"
              >
                <p className="text-heading capitalize font-medium text-sm">{skill}</p>
              </Box>
            ))}
          </div>
        </Box>
      )}

      {form_data?.acquired_skills && form_data?.acquired_skills?.length > 0 && (
        <Box className="!border-none !p-3 !gap-2">
          <p className="text-heading font-medium">Acquired Skills</p>
          <div className="flex flex-wrap gap-2">
            {form_data?.acquired_skills?.map((skill, i) => (
              <Box
                key={i}
                className="!border-none !p-2 !py-1 !bg-neutral-grey-0 !rounded-md !w-fit !gap-2"
              >
                <p className="text-heading capitalize font-medium text-sm">{skill}</p>
              </Box>
            ))}
          </div>
        </Box>
      )}

      {form_data?.favorite_part && (
        <Box className="!border-none !p-3 !gap-2">
          <div className="flex items-center gap-x-1">
            <Image alt="title/award" src={heart} width={20} height={20} />
            <p className="text-heading font-medium">Favorite Part of the Experience </p>
          </div>
          <p className="text-neutral-grey-70 text-sm">{form_data?.favorite_part}</p>
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
};

export default VolunteerDetailsModal;
