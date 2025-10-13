import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import building from 'public/icons/building.svg';
import routing from 'public/pdf/routing.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const SemesterAtSeaCard: FC<IProps> = ({ form_data }) => {
  const {
    accomplishment_name: title,
    date_arrived,
    date_departed,
    travel_path: destination,
    institution,
  } = form_data || {};
  const date =
    date_arrived && date_departed
      ? `${formatToDDMMMYYYY(date_arrived)} - ${formatToDDMMMYYYY(date_departed)}`
      : '';

  return (
    <Box className="w-full !gap-y-3">
      {title && <p className="font-semibold text-[var(--heading)] quicksand break-all">{title}</p>}
      {(destination || date) && (
        <div className="flex items-center gap-x-3">
          <Image src={routing} alt="routing" className="size-6" />
          <div>
            {destination && (
              <p className="font-medium text-[var(--heading)] quicksand !text-sm break-all">
                {destination}
              </p>
            )}
            {date && (
              <p className="quicksand text-[var(--gray-60)] font-normal text-xs break-all">
                {date}
              </p>
            )}
          </div>
        </div>
      )}
      {institution && (
        <div className="flex gap-x-2 items-center">
          <Image src={building} alt="building" className="size-4" />
          <p className="text-[var(--black)] text-sm font-normal quicksand">{institution}</p>
        </div>
      )}
    </Box>
  );
};

export default SemesterAtSeaCard;
