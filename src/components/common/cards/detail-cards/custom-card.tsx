import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import note from 'public/icons/note.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const CustomCard: FC<IProps> = ({ form_data }) => {
  const { accomplishment_name, date, notes } = form_data || {};

  return (
    <Box className="w-full !gap-y-3">
      <div>
        {accomplishment_name && (
          <p className="!text-sm font-medium !text-heading font-quicksand break-all capitalize">
            {accomplishment_name}
          </p>
        )}
        {date && (
          <p className="font-quicksand text-[var(--gray-60)] font-normal text-xs">
            {formatToDDMMYYYY(date)}
          </p>
        )}
      </div>
      {notes && (
        <div className="flex gap-x-1.5">
          <Image src={note} alt="building" sizes="20" />
          <p className="text-neutral-grey-70 text-sm font-normal font-quicksand">{notes}</p>
        </div>
      )}
    </Box>
  );
};

export default CustomCard;
