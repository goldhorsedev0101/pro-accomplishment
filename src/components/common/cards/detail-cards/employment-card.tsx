// Icons
import briefcase from 'public/icons/briefcase.svg';
import linkIcon from 'public/icons/link.svg';
import note from 'public/icons/note.svg';

// Components
import Image from 'next/image';
import Link from 'next/link';
import Box from '../../box';
import Heading from '../../heading';

// Type
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import { FC } from 'react';
import Skills from '../../studets-details/skills';

interface IProps {
  form_data?: FormData;
}

const EmploymentCard: FC<IProps> = ({ form_data }) => {
  const { link } = form_data ?? {};

  const validUrl =
    link?.startsWith('http://') || link?.startsWith('https://') ? link : `https://${link}`;

  return (
    <Box className="shadow-sm w-full !text-start !gap-y-3">
      <div className="flex items-start gap-x-3">
        <div className="w-9 h-9 rounded-full bg-blue-light flex items-center justify-center">
          <Image src={briefcase} alt="start" className="size-6" />
        </div>
        <div>
          <Heading
            className="!text-base !text-heading font-quicksand !break-all"
            text={form_data?.job_title ?? 'N/A'}
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-80 font-normal text-sm break-all">
            {form_data?.company}
          </p>
          <p className="mt-2 text-black text-sm font-medium font-quicksand">
            {formatToDDMMMYYYY(form_data?.start_date ?? '')} -{' '}
            {!form_data?.end_date ? 'Ongoing' : formatToDDMMMYYYY(form_data?.end_date ?? '')}
          </p>
        </div>
      </div>

      {((form_data?.previous_skills?.length || 0) > 0 ||
        (form_data?.acquired_skills?.length || 0) > 0) && <hr />}

      {form_data?.previous_skills && form_data?.previous_skills?.length > 0 && (
        <Skills skills={form_data?.previous_skills} title="Previous Skills" />
      )}

      {form_data?.acquired_skills && form_data?.acquired_skills?.length > 0 && (
        <Skills skills={form_data?.acquired_skills} title="Acquired Skills" />
      )}

      {link && (
        <div className="flex items-center gap-x-2 pl-3">
          <Image src={linkIcon} className="size-6" alt="" />
          <Link href={validUrl} className="text-[var(--blue)] font-normal font-quicksand">
            {link}
          </Link>
        </div>
      )}

      {form_data?.notes && (
        <div className="flex gap-x-1.5 pl-3">
          <Image src={note} alt="building" className="size-6" />
          <p className="text-neutral-grey-80 text-sm font-normal font-quicksand">
            {form_data?.notes}
          </p>
        </div>
      )}
    </Box>
  );
};

export default EmploymentCard;
