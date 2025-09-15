// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Image from 'next/image';
import Box from '../../box';
import Document from '../../studets-details/document';
import FavoritePart from '../../studets-details/favorite-part';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';

// Util

import { formatToDDMMMYYYY } from '@/utils/date-format';

// Icons
import calender from 'public/icons/calendar.svg';
import internships from 'public/pdf/internships.svg';
import Skills from '../../studets-details/skills';

interface IProps {
  form_data?: FormData;
}

const InternshipsDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.accomplishment_name || form_data?.company) && (
        <Box className="!border-none !flex-row items-center !p-3 !gap-2">
          <div className="flex items-center justify-center size-9 bg-primary-20 rounded-full">
            <Image alt="title/award" src={internships} width={24} height={24} />
          </div>
          <div className="gap-x-1">
            <p className="text-heading font-medium capitalize">{form_data?.accomplishment_name}</p>
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
        <Skills skills={form_data?.previous_skills} title="Previous Skills" />
      )}

      {form_data?.acquired_skills && form_data?.acquired_skills?.length > 0 && (
        <Skills skills={form_data?.acquired_skills} title="Acquired Skills" />
      )}

      {form_data?.favorite_part && <FavoritePart favorite_part={form_data?.favorite_part} />}

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
};

export default InternshipsDetailsModal;
