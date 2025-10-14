// Icons
import briefcase from 'public/icons/briefcase.svg';
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
          <Image src={briefcase} alt="start" sizes="24" />
        </div>
        <div>
          <Heading
            className="!text-sm !text-heading font-quicksand !break-all"
            text={form_data?.job_title ?? 'N/A'}
            width="semibold"
          />
          <p className="font-quicksand text-neutral-grey-70 font-normal text-xs break-all">
            {form_data?.company}
          </p>
          <p className="mt-2 text-black text-xs font-medium font-quicksand">
            {formatToDDMMMYYYY(form_data?.start_date ?? '')} -{' '}
            {!form_data?.end_date ? 'Ongoing' : formatToDDMMMYYYY(form_data?.end_date ?? '')}
          </p>
        </div>
      </div>

      {((form_data?.previous_skills?.length || 0) > 0 ||
        (form_data?.acquired_skills?.length || 0) > 0) && <hr />}

      {(form_data?.previous_skills?.length || 0) > 0 && (
        <div className="flex gap-y-3 flex-col">
          <p className="font-medium font-quicksand text-xs text-heading">Previous Skills</p>
          <div className="flex items-center gap-x-3">
            {form_data?.previous_skills?.map((skill) => (
              <p
                key={skill}
                className="bg-neutral-grey-0 p-1 rounded-md text-heading font-quicksand font-medium text-base"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
      )}

      {(form_data?.acquired_skills?.length || 0) > 0 && (
        <div className="flex gap-y-3 flex-col">
          <p className="font-medium font-quicksand text-xs text-heading">Acquired Skills</p>
          <div className="flex items-center gap-x-3">
            {form_data?.acquired_skills?.map((skill) => (
              <p
                key={skill}
                className="bg-neutral-grey-0 p-1 rounded-md text-heading font-quicksand font-medium text-base"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
      )}

      {form_data?.link && (
        <Link href={validUrl} className="text-blue text-xs font-normal font-quicksand">
          {form_data?.link}
        </Link>
      )}

      {form_data?.notes && (
        <div className="flex gap-x-1.5">
          <Image src={note} alt="building" sizes="20" />
          <p className="text-neutral-grey-70 text-sm font-normal font-quicksand">
            {form_data?.notes}
          </p>
        </div>
      )}
    </Box>
  );
};

export default EmploymentCard;
