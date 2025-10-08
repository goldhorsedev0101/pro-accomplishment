import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToMDYYYY } from '@/utils/date-format';
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
          <p className="font-medium text-[var(--heading)] quicksand !text-sm break-all">
            {accomplishment_name}
          </p>
        )}
        {date && (
          <p className="quicksand text-[var(--gray-60)] font-normal text-xs">
            {formatToMDYYYY(date)}
          </p>
        )}
      </div>
      {notes && (
        <p className="text-[var(--gray-70)] text-xs font-normal quicksand break-all">{notes}</p>
      )}
    </Box>
  );
};

export default CustomCard;
