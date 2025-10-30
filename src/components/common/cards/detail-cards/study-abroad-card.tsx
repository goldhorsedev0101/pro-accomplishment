import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import building from 'public/icons/building.svg';
import teacherBlue from 'public/pdf/teacher-blue.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const StudyAbroadCard: FC<IProps> = ({ form_data }) => {
  const {
    accomplishment_name: title,
    date_arrived,
    date_departed,
    destination,
    institution,
  } = form_data || {};

  const date = `${date_arrived && formatToDDMMMYYYY(date_arrived)} ${date_departed && '- ' + formatToDDMMMYYYY(date_departed)}`;

  return (
    <Box className="w-full !gap-y-3">
      {title && (
        <p className="font-medium !text-heading font-quicksand break-all capitalize">{title}</p>
      )}

      <div className="flex items-center gap-x-3">
        <Image src={teacherBlue} alt="teacher" className="size-6" />
        <div>
          {destination && (
            <p className="font-medium text-[var(--heading)] font-quicksand">{destination}</p>
          )}
          {date && (
            <p className="font-quicksand text-[var(--gray-80)] font-normal text-sm break-all">
              {date}
            </p>
          )}
        </div>
      </div>

      {institution && (
        <div className="flex gap-x-2 items-center">
          <Image src={building} alt="building" className="size-6" />
          <p className="text-[var(--gray-80)] text-sm font-normal font-quicksand capitalize">
            {institution}
          </p>
        </div>
      )}
    </Box>
  );
};

export default StudyAbroadCard;
