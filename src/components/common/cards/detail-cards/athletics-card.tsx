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
import { formatToDDMMYYYY } from '@/utils/date-format';

interface IProps {
  form_data?: FormData;
}

const AthleticsCard: FC<IProps> = ({ form_data }): JSX.Element => {
  const { date, title_or_award, location, event_name, name, region } = form_data || {};

  return (
    <Box className="shadow-sm !text-start">
      <div className="flex justify-between items-start">
        <div>
          <Heading
            className="!text-sm !text-heading font-quicksand break-all"
            text={name ?? ''}
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-80 font-normal text-sm">
            {formatToDDMMYYYY(date || '')}
          </p>
        </div>
        <p
          className={`font-quicksand text-black font-normal text-sm rounded-sm py-0.5 px-1.5 capitalize ${region === 'state' ? 'bg-[#D3EEE2]' : 'bg-[#E7D3EE]'} `}
        >
          {region}
        </p>
      </div>

      {(event_name || location) && (
        <div className="space-y-2 capitalize">
          {event_name && (
            <div className="flex items-center gap-x-2">
              <Image alt="" src={calendar} className="size-6" />
              <p className="font-quicksand font-normal text-sm text-neutral-grey-80">
                {event_name}
              </p>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-x-2">
              <Image alt="" src={locationIcon} className="size-6" />
              <p className="font-quicksand font-normal text-sm text-neutral-grey-80">{location}</p>
            </div>
          )}
        </div>
      )}

      <hr className="-my-2" />

      <div className="flex items-center gap-x-2">
        <Image alt="" src={cup} className="size-6" />
        <p className="font-quicksand font-normal text-sm text-neutral-grey-100">{title_or_award}</p>
      </div>
    </Box>
  );
};

export default AthleticsCard;
