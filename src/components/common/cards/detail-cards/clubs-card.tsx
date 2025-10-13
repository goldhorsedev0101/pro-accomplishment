import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToMDYYYY } from '@/utils/date-format';
import locationColored from 'public/icons/location-colored.svg';
import bill from 'public/pdf/bill.svg';
import { FC } from 'react';
import Image from 'next/image';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const ClubsCard: FC<IProps> = ({ form_data }) => {
  const { club_name: title, date_joined, membership_number: tag, location } = form_data || {};

  return (
    <Box>
      <div>
        {title && <p className="font-medium quicksand text-[var(--heading)] break-all">{title}</p>}
        {date_joined && (
          <p className="quicksand text-[var(--gray-70)] font-normal text-sm">
            {formatToMDYYYY(date_joined)}
          </p>
        )}
      </div>
      {(tag || location) && (
        <div className="space-y-2">
          {tag && (
            <div className="flex items-center gap-x-2">
              <Image className="size-5" alt="" src={bill} />
              <p className="quicksand font-normal text-sm text-[var(--heading)]">{tag}</p>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-x-2">
              <Image className="size-5" alt="" src={locationColored} />
              <p className="quicksand font-normal text-sm text-[var(--heading)]">{location}</p>
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default ClubsCard;
