// Components
import Image from 'next/image';
import Box from '../box';
import Heading from '../heading';

// Icons
import book from 'public/icons/book.svg';
import percentage from 'public/icons/percentage.svg';
import teacher from 'public/icons/teacher.svg';

// Types
import { JSX } from 'react';

const AcademicsCard = (): JSX.Element => {
  const data = [
    { icon: book, label: 'Math' },
    { icon: percentage, label: '95%' },
    { icon: teacher, label: 'Grade/GPA 3.8' },
  ];

  return (
    <Box className="shadow-sm w-full !gap-y-3">
      <div className="flex justify-between items-start">
        <div>
          <Heading
            className="!text-sm font-quicksand"
            text="Canada Wide Science Fair 2024"
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-60 font-normal text-sm">
            Rainbow Middle School
          </p>
        </div>
        <p className="font-quicksand text-neutral-grey-70 font-normal text-sm rounded-sm py-0.5 px-1.5 bg-green-light">
          State
        </p>
      </div>

      <div className="flex justify-between items-center w-full">
        {data.map(({ icon, label }, i) => (
          <div key={i} className="flex gap-x-1">
            <Image src={icon} alt={label} sizes="16" />
            <p className="text-neutral-grey-100 text-sm font-normal font-quicksand">{label}</p>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default AcademicsCard;
