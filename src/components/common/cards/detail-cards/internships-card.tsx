import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import Link from 'next/link';
import note from 'public/icons/note.svg';
import internships from 'public/pdf/internships.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const InternshipsCard: FC<IProps> = ({ form_data }) => {
  const {
    accomplishment_name: title,
    start_date,
    end_date,
    previous_skills,
    acquired_skills,
    company: organization,
    link,
    notes: doc,
  } = form_data || {};
  const startDate = start_date ? formatToDDMMMYYYY(start_date) : '';
  const endDate = end_date ? formatToDDMMMYYYY(end_date) : '';

  return (
    <Box className="!gap-y-3">
      <div className="flex items-start gap-x-3">
        <div className="w-9 h-9 rounded-full bg-[var(--primary-20)] flex items-center justify-center">
          <Image src={internships} alt="internship" className="size-6" />
        </div>
        <div>
          {title && (
            <p className="font-medium text-[var(--heading)] quicksand !text-sm break-all">
              {title}
            </p>
          )}
          {organization && (
            <p className="quicksand text-[var(--gray-70)] font-normal text-xs break-all">
              {organization}
            </p>
          )}
          {(startDate || endDate) && (
            <p className="mt-2 text-[var(--black)] text-xs font-medium quicksand">
              {startDate}
              {startDate && endDate ? ' - ' : ''}
              {endDate}
            </p>
          )}
        </div>
      </div>
      {previous_skills &&
        acquired_skills &&
        (previous_skills?.length > 0 || acquired_skills?.length > 0) && (
          <hr className="border border-[var(--gray-10)]" />
        )}
      {previous_skills && previous_skills?.length > 0 && (
        <div className="flex gap-y-3 flex-col">
          <p className="font-medium quicksand text-xs text-[var(--heading)]">Previous Skills</p>
          <div className="flex items-center gap-x-3">
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
          <div className="flex items-center gap-x-3">
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
        <Link href={link} className="text-[var(--blue)] text-xs font-normal quicksand">
          {link}
        </Link>
      )}
      {doc && (
        <div className="flex gap-x-1.5 items-start">
          <Image src={note} alt="note" className="size-5" />
          <p className="text-[var(--gray-70)] text-sm font-normal quicksand">{doc}</p>
        </div>
      )}
    </Box>
  );
};

export default InternshipsCard;
