// Icons
import start from 'public/icons/magic-star.svg';

// Components
import Image from 'next/image';
import Box from '../../box';
import Heading from '../../heading';

// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC, JSX } from 'react';

// Utils
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Skills from '../../studets-details/skills';

interface IProps {
  form_data?: FormData;
}

const TalentsCard: FC<IProps> = ({ form_data }): JSX.Element => {
  const { date, name } = form_data || {};

  return (
    <Box className="shadow-sm w-full !gap-y-3 !text-start">
      <div className="flex items-center gap-x-3">
        <div className="w-10 h-9 rounded-full bg-neutral-grey-10 flex items-center justify-center">
          <Image src={start} alt="start" className="min-w-6 min-h-6" />
        </div>
        <div className="flex items-center w-full justify-between gap-x-2">
          <Heading
            className="!text-base !text-heading font-quicksand break-all"
            text={name ?? ''}
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-100 min-w-fit font-normal text-sm">
            {formatToDDMMMYYYY(date ?? '')}
          </p>
        </div>
      </div>

      {form_data?.skill_required && form_data?.skill_required?.length > 0 && (
        <Skills skills={form_data?.skill_required} title="" />
      )}
    </Box>
  );
};

export default TalentsCard;
