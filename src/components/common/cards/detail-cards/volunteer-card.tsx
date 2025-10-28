import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import Link from 'next/link';
import building from 'public/icons/building.svg';
import linkIcon from 'public/icons/link.svg';
import note from 'public/icons/note.svg';
import info from 'public/pdf/info.svg';
import { FC } from 'react';
import Box from '../../box';
import Skills from '../../studets-details/skills';

interface IProps {
  form_data?: FormData;
}

const VolunteerCard: FC<IProps> = ({ form_data }) => {
  const {
    volunteer_title: title,
    start_date,
    end_date,
    previous_skills,
    acquired_skills,
    company: organization,
    link,
    notes: doc,
  } = form_data || {};

  const startDate = start_date ? formatToDDMMMYYYY(start_date) : '';
  const endDate = end_date ? formatToDDMMMYYYY(end_date) : 'Ongoing';

  const validUrl =
    link?.startsWith('http://') || link?.startsWith('https://') ? link : `https://${link}`;

  return (
    <Box className="!gap-y-3">
      <div className="flex items-start gap-x-3">
        <div className="w-9 h-9 rounded-full bg-[var(--primary-10)] flex items-center justify-center">
          <Image src={info} alt="info" className="size-6" />
        </div>
        <div>
          {title && (
            <p className="font-medium !text-heading font-quicksand break-all capitalize">{title}</p>
          )}
          {(startDate || endDate) && (
            <p className="font-quicksand text-[var(--gray-80)] font-normal text-sm break-all">
              {startDate}
              {startDate && endDate ? ' - ' : ''}
              {endDate}
            </p>
          )}
        </div>
      </div>

      {organization && (
        <div className="flex gap-x-1.5 items-center">
          <Image src={building} alt="building" className="size-6" />
          <p className="text-[var(--gray-80)] capitalize text-sm font-normal font-quicksand break-all">
            {organization}
          </p>
        </div>
      )}

      {previous_skills &&
        acquired_skills &&
        (previous_skills?.length > 0 || acquired_skills?.length > 0) && (
          <hr className="border border-[var(--gray-10)]" />
        )}

      {previous_skills && previous_skills?.length > 0 && (
        <Skills skills={previous_skills} title="Previous Skills" />
      )}

      {acquired_skills && acquired_skills?.length > 0 && (
        <Skills skills={acquired_skills} title="Acquired Skills" />
      )}

      {link && (
        <div className="flex items-center gap-x-2 pl-3">
          <Image src={linkIcon} className="size-6" alt="" />
          <Link
            href={validUrl}
            className="text-[var(--blue)] text-sm font-normal font-quicksand break-all"
          >
            {link}
          </Link>
        </div>
      )}

      {doc && (
        <div className="flex gap-x-1.5 items-start pl-3">
          <Image src={note} alt="note" className="size-6" />
          <p className="text-[var(--gray-80)] text-sm font-normal font-quicksand break-all">
            {doc}
          </p>
        </div>
      )}
    </Box>
  );
};

export default VolunteerCard;
