// Icons
import calendar from 'public/icons/calendar-tick.svg';
import cup from 'public/icons/cup.svg';
import locationIcon from 'public/icons/location-colored.svg';

// Components
import Image from 'next/image';
import Box from '../../box';
import Heading from '../../heading';

// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC, JSX } from 'react';

// Utils
import { formatToMDYYYY } from '@/utils/date-format';

interface IProps {
  form_data?: FormData;
}

const AthleticsCard: FC<IProps> = ({ form_data }): JSX.Element => {
  const { date, title_or_award, location, event_name, name, region } = form_data || {};

  return (
    <Box className="shadow-sm !text-start">
      <div className="flex justify-between items-start">
        <div>
          <Heading className="!text-base font-quicksand" text={name ?? ''} width="medium" />
          <p className="font-quicksand text-neutral-grey-60 font-normal text-sm">
            {formatToMDYYYY(date || '')}
          </p>
        </div>
        <p className="font-quicksand text-black font-normal text-sm rounded-sm py-0.5 px-1.5 bg-primary-0">
          State
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image alt="" src={calendar} sizes="20" />
          <p className="font-quicksand font-normal text-sm text-neutral-grey-70">{region}</p>
        </div>

        <div className="flex items-center gap-x-2">
          <Image alt="" src={locationIcon} sizes="20" />
          <p className="font-quicksand font-normal text-sm text-neutral-grey-70">{location}</p>
        </div>
      </div>

      <hr className="-my-2" />

      <div className="flex items-center gap-x-2">
        <Image alt="" src={cup} sizes="20" />
        <p className="font-quicksand font-normal text-sm text-neutral-grey-100">
          {title_or_award} - {event_name}
        </p>
      </div>
    </Box>
  );
};

export default AthleticsCard;
