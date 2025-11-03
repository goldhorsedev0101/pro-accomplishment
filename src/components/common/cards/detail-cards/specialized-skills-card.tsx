import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import note from 'public/icons/note.svg';
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
            <p className="font-medium !text-heading font-quicksand break-all ">
              {accomplishment_name}
            </p>
          )}
          {date && (
            <p className="font-quicksand text-[var(--gray-80)] font-normal text-sm">
              {formatToDDMMYYYY(date)}
            </p>
          )}
        </div>
      </div>
      {notes && (
        <div className="flex gap-x-1.5">
          <Image src={note} alt="building" className="size-6" />
          <p className="text-neutral-grey-80 text-sm font-normal font-quicksand break-all">
            {notes}
          </p>
        </div>
      )}
    </Box>
  );
};

export default SpecializedSkillsCard;
