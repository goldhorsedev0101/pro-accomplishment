import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const EntrepreneurshipCard: FC<IProps> = ({ form_data }) => {
  const { venture_name: title, started_date, completion_date } = form_data || {};
  const date =
    started_date || completion_date
      ? `${formatToDDMMMYYYY(started_date || '')} - ${completion_date ? formatToDDMMMYYYY(completion_date) : 'Ongoing'}`
      : 'Ongoing';

  return (
    <Box className="w-full !gap-y-3">
      <div>
        {title && <p className="font-medium !text-heading font-quicksand break-all ">{title}</p>}
        {date && (
          <p className="font-quicksand text-[var(--gray-80)] font-normal text-sm break-all">
            {date}
          </p>
        )}
      </div>
    </Box>
  );
};

export default EntrepreneurshipCard;
