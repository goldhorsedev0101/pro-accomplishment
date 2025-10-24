import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import note from 'public/icons/note.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const InvestingCard: FC<IProps> = ({ form_data }) => {
  const { accomplishment_name: title, date, notes, investment_type } = form_data || {};

  return (
    <Box className="w-full !gap-y-3">
      <div>
        {title && (
          <p className="!text-sm font-medium !text-heading font-quicksand break-all capitalize">
            {title}
          </p>
        )}
        {date && (
          <p className="font-quicksand flex items-center justify-between text-[var(--gray-60)] font-normal text-xs">
            {investment_type && <span>{investment_type}</span>}
            <span>{formatToDDMMYYYY(date)}</span>
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

export default InvestingCard;
