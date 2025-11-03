// Icons
import building from 'public/icons/building.svg';
import start from 'public/icons/medal-star.svg';

// Components
import Image from 'next/image';
import Box from '../../box';
import Heading from '../../heading';

// Type
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMYYYY } from '@/utils/date-format';
import { FC } from 'react';

interface IProps {
  form_data?: FormData;
}

const CertificationsCard: FC<IProps> = ({ form_data }) => {
  const { certification_title, date_received, institution } = form_data || {};

  return (
    <Box className="shadow-sm w-full !gap-y-3 !text-start">
      <div className="flex items-center gap-x-3">
        <div className="w-9 h-9 rounded-full bg-purple-light flex items-center justify-center">
          <Image src={start} alt="start" className="size-6" />
        </div>
        <div>
          <Heading
            className="!text-base !text-heading font-quicksand !break-all"
            text={certification_title ?? 'N/A'}
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-80 font-normal text-sm">
            {formatToDDMMYYYY(date_received ?? '')}
          </p>
        </div>
      </div>

      {institution && (
        <div className="flex gap-x-2">
          <Image src={building} alt="building" className="size-6" />
          <p className="text-neutral-grey-80 text-sm font-normal font-quicksand ">{institution}</p>
        </div>
      )}
    </Box>
  );
};

export default CertificationsCard;
