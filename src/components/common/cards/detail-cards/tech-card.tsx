import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToMMMMDYYYY } from '@/utils/date-format';
import Image from 'next/image';
import mobileProgramming from 'public/pdf/mobile-programming.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const TechCard: FC<IProps> = ({ form_data }) => {
  const { accomplishment_name, date } = form_data || {};

  return (
    <Box className="w-full !gap-y-3">
      <div className="flex items-center gap-x-3">
        <Image src={mobileProgramming} alt="star" className="size-6" />
        <div>
          {accomplishment_name && (
            <p className="!text-sm font-medium !text-heading font-quicksand break-all capitalize">
              {accomplishment_name}
            </p>
          )}
          {date && (
            <p className="font-quicksand text-[var(--gray-70)] font-normal text-xs break-all">
              {formatToMMMMDYYYY(date)}
            </p>
          )}
        </div>
      </div>
    </Box>
  );
};

export default TechCard;
