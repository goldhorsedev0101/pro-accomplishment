import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToMDYYYY } from '@/utils/date-format';
import Image from 'next/image';
import ranking from 'public/pdf/ranking.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const SpecializedSkillsCard: FC<IProps> = ({ form_data }) => {
  const { accomplishment_name, date, notes } = form_data || {};

  return (
    <Box className="w-full !gap-y-3">
      <div className="flex items-center gap-x-3">
        <Image src={ranking} alt="star" className="size-6" />
        <div>
          {accomplishment_name && (
            <p className="font-medium text-[var(--heading)] quicksand !text-sm">
              {accomplishment_name}
            </p>
          )}
          {date && (
            <p className="quicksand text-[var(--gray-70)] font-normal text-xs">
              {formatToMDYYYY(date)}
            </p>
          )}
        </div>
      </div>
      {notes && (
        <p className="text-[var(--gray-70)] text-xs font-normal quicksand break-all">{notes}</p>
      )}
    </Box>
  );
};

export default SpecializedSkillsCard;
