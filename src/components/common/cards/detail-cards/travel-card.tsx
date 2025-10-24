import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import airplane from 'public/pdf/airplane.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const TravelCard: FC<IProps> = ({ form_data }) => {
  const { accomplishment_name: title, date_arrived, date_departed, destination } = form_data || {};
  const date =
    date_arrived && date_departed
      ? `${formatToDDMMMYYYY(date_arrived)} - ${formatToDDMMMYYYY(date_departed)}`
      : '';

  return (
    <Box className="w-full !gap-y-3">
      {title && (
        <p className="font-medium text-heading font-quicksand text-sm break-all">{title}</p>
      )}
      <div className="flex items-center gap-x-3">
        <Image src={airplane} alt="airplane" className="size-6" />
        <div>
          {destination && (
            <p className="font-medium text-[var(--heading)] font-quicksand !text-sm break-all">
              {destination}
            </p>
          )}
          {date && (
            <p className="font-quicksand text-[var(--gray-80)] font-normal text-sm">{date}</p>
          )}
        </div>
      </div>
    </Box>
  );
};

export default TravelCard;
