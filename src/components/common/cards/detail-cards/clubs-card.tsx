import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import locationColored from 'public/icons/location-colored.svg';
import bill from 'public/pdf/bill.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const ClubsCard: FC<IProps> = ({ form_data }) => {
  const { club_name: title, date_joined, membership_number: tag, location } = form_data || {};

  return (
    <Box>
      <div>
        {title && (
          <p className="!text-sm font-medium !text-heading font-quicksand break-all capitalize">
            {title}
          </p>
        )}
        {date_joined && (
          <p className="font-quicksand text-[var(--gray-80)] font-normal text-sm">
            {formatToDDMMYYYY(date_joined)}
          </p>
        )}
      </div>
      {(tag || location) && (
        <div className="space-y-2">
          {tag && (
            <div className="flex items-center gap-x-2">
              <Image className="size-5" alt="" src={bill} />
              <p className="font-quicksand font-normal text-sm text-[var(--gray-80)] capitalize">
                {tag}
              </p>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-x-2">
              <Image className="size-5" alt="" src={locationColored} />
              <p className="font-quicksand font-normal text-sm text-[var(--gray-80)] capitalize">
                {location}
              </p>
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default ClubsCard;
