import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import Link from 'next/link';
import building from 'public/icons/building.svg';
import note from 'public/icons/note.svg';
import info from 'public/pdf/info.svg';
import { FC } from 'react';
import Box from '../../box';
import Note from '../../studets-details/note';

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
            <p className="font-medium text-[var(--heading)] quicksand !text-sm break-all">
              {title}
            </p>
          )}
          {(startDate || endDate) && (
            <p className="quicksand text-[var(--gray-70)] font-normal text-xs break-all">
              {startDate}
              {startDate && endDate ? ' - ' : ''}
              {endDate}
            </p>
          )}
        </div>
      </div>

      {organization && (
        <div className="flex gap-x-1.5 items-center">
          <Image src={building} alt="building" className="size-4" />
          <p className="text-[var(--black)] text-sm font-normal quicksand break-all">
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
        <div className="flex gap-y-3 flex-col">
          <p className="font-medium quicksand text-xs text-[var(--heading)]">Previous Skills</p>
          <div className="flex items-center gap-3 flex-wrap">
            {previous_skills.map((skill) => (
              <p
                key={skill}
                className="bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
      )}

      {acquired_skills && acquired_skills?.length > 0 && (
        <div className="flex gap-y-3 flex-col">
          <p className="font-medium quicksand text-xs text-[var(--heading)]">Acquired Skills</p>
          <div className="flex items-center gap-3 flex-wrap">
            {acquired_skills.map((skill) => (
              <p
                key={skill}
                className="bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
      )}

      {link && (
        <Link href={validUrl} className="text-[var(--blue)] text-xs font-normal quicksand">
          {link}
        </Link>
      )}

      {doc && (
        <div className="flex gap-x-1.5 items-start">
          <Image src={note} alt="note" className="size-5" />
          <p className="text-[var(--gray-70)] text-sm font-normal quicksand break-all">{doc}</p>
        </div>
      )}
    </Box>
  );
};

export default VolunteerCard;
