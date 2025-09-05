// Icons
import calendar from 'public/icons/calendar-tick.svg';
import cup from 'public/icons/cup.svg';
import location from 'public/icons/location-colored.svg';

// Components
import Image from 'next/image';
import Box from '../box';
import Heading from '../heading';

// Types
import { JSX } from 'react';

const AthleticsCard = (): JSX.Element => {
  return (
    <Box className="shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <Heading
            className="!text-base font-quicksand"
            text="Chess Championship Victory"
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-60 font-normal text-sm">
            Rainbow Middle School
          </p>
        </div>
        <p className="font-quicksand text-black font-normal text-sm rounded-sm py-0.5 px-1.5 bg-primary-0">
          State
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image alt="" src={calendar} sizes="20" />
          <p className="font-quicksand font-normal text-sm text-neutral-grey-70">
            Spring Regional Soccer Championship
          </p>
        </div>

        <div className="flex items-center gap-x-2">
          <Image alt="" src={location} sizes="20" />
          <p className="font-quicksand font-normal text-sm text-neutral-grey-70">
            Spring Regional Soccer Championship
          </p>
        </div>
      </div>

      <hr className="-my-2" />

      <div className="flex items-center gap-x-2">
        <Image alt="" src={cup} sizes="20" />
        <p className="font-quicksand font-normal text-sm text-neutral-grey-100">
          Spring Regional Soccer Championship
        </p>
      </div>
    </Box>
  );
};

export default AthleticsCard;
