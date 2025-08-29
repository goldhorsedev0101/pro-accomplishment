import building from '@/../public/icons/building.svg';
import cup from '@/../public/icons/cup.svg';
import Image from 'next/image';
import Box from '../box';
import Heading from '../heading';

const AwardsCard = () => {
  return (
    <Box className="shadow-sm w-full !gap-y-3">
      <div className="flex items-center gap-x-3">
        <div className="w-9 h-9 rounded-full bg-yellow-light flex items-center justify-center">
          <Image src={cup} alt="cup" sizes="24" />
        </div>
        <div>
          <Heading
            className="!text-sm !text-heading font-quicksand"
            text="Perfect Attendance Award"
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-70 font-normal text-xs">2/27/2025</p>
        </div>
      </div>

      <div className="flex gap-x-2">
        <Image src={building} alt="building" sizes="16" />
        <p className="text-neutral-grey-100 text-sm font-normal font-quicksand">
          Rainbow Middle School
        </p>
      </div>
    </Box>
  );
};

export default AwardsCard;
