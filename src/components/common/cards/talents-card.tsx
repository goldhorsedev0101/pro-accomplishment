import start from '@/../public/icons/magic-star.svg';
import Image from 'next/image';
import Box from '../box';
import Heading from '../heading';

const TalentsCard = () => {
  const actress = ['Memorization', 'Stage Presence', 'Acting'];

  return (
    <Box className="shadow-sm w-full !gap-y-3">
      <div className="flex items-center gap-x-3">
        <div className="w-9 h-9 rounded-full bg-neutral-grey-10 flex items-center justify-center">
          <Image src={start} alt="start" sizes="24" />
        </div>
        <div className="flex items-center w-full justify-between">
          <Heading
            className="!text-sm !text-heading font-quicksand"
            text="Actress"
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-100 font-normal text-sm">2/27/2025</p>
        </div>
      </div>

      <div className="flex gap-x-3 items-center">
        {actress.map((item, i) => (
          <p key={i} className="text-neutral-grey-100 text-sm font-normal">
            {item}
          </p>
        ))}
      </div>
    </Box>
  );
};

export default TalentsCard;
