import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import note from 'public/icons/note.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const ArtCard: FC<IProps> = ({ form_data }) => {
  const { accomplishment_name, date, notes } = form_data || {};

  return (
    <Box className="w-full !gap-y-3">
      <div>
        {accomplishment_name && (
          <p className="font-medium !text-heading font-quicksand break-all capitalize">
            {accomplishment_name}
          </p>
        )}

        {date && (
          <p className="font-quicksand text-[var(--gray-80)] font-normal text-sm">
            {formatToDDMMYYYY(date)}
          </p>
        )}
      </div>

      {notes && (
        <div className="flex gap-x-2 items-start">
          <Image src={note} alt="note" className="size-6" />
          <p className="text-[var(--gray-80)] text-sm font-normal font-quicksand break-all line-clamp-2">
            {notes}
          </p>
        </div>
      )}
    </Box>
  );
};

export default ArtCard;
