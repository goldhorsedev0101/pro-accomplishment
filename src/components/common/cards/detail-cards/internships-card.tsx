import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import Link from 'next/link';
import note from 'public/icons/note.svg';
import internships from 'public/pdf/internships.svg';
import { FC } from 'react';
import Box from '../../box';
import Skills from '../../studets-details/skills';

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
  const endDate = end_date ? formatToDDMMMYYYY(end_date) : 'Ongoing';

  const validUrl =
    link?.startsWith('http://') || link?.startsWith('https://') ? link : `https://${link}`;

  return (
    <Box className="!gap-y-3">
      <div className="flex items-start gap-x-3">
        <div className="w-9 h-9 rounded-full bg-[var(--primary-20)] flex items-center justify-center">
          <Image src={internships} alt="internship" className="size-6" />
        </div>
        <div className="flex w-full justify-between">
          <div className="w-full">
            {title && (
              <p className="font-medium text-[var(--heading)] quicksand !text-sm break-all">
                {title}
              </p>
            )}

            {organization && (
              <p className="!text-sm font-medium !text-heading font-quicksand break-all">
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
          {form_data?.internship_type && (
            <p className="rounded-sm bg-[#FFFAF1] px-1.5 py-1 text-sm">
              {form_data?.internship_type}
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
        <Skills skills={previous_skills} title="Previous Skills" />
      )}

      {acquired_skills && acquired_skills?.length > 0 && (
        <Skills skills={acquired_skills} title="Acquired Skills" />
      )}

      {link && (
        <Link href={validUrl} className="text-[var(--blue)] text-xs font-normal quicksand">
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
