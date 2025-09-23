import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToMDYYYY } from '@/utils/date-format';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const InvestingCard: FC<IProps> = ({ form_data }) => {
  const { accomplishment_name: title, date, notes } = form_data || {};

  return (
    <Box className="w-full !gap-y-3">
      <div>
        {title && <p className="font-medium text-[var(--heading)] quicksand !text-sm">{title}</p>}
        {date && (
          <p className="quicksand flex items-center justify-between text-[var(--gray-60)] font-normal text-xs">
            <span>Stocks</span>
            <span>{formatToMDYYYY(date)}</span>
          </p>
        )}
      </div>
      {notes && (
        <p className="text-[var(--gray-80)] text-xs font-normal quicksand break-all line-clamp-2">
          {notes}
        </p>
      )}
    </Box>
  );
};

export default InvestingCard;
