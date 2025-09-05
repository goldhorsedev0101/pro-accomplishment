// Icons
import briefcase from 'public/icons/briefcase.svg';
import note from 'public/icons/note.svg';

// Components
import Image from 'next/image';
import Link from 'next/link';
import Box from '../box';
import Heading from '../heading';

// Type
import { JSX } from 'react';

const EmploymentCard = (): JSX.Element => {
  const skills = ['React.js', 'TypeScript', 'Tailwind CSS'];

  return (
    <Box className="shadow-sm w-full !gap-y-3">
      <div className="flex items-start gap-x-3">
        <div className="w-9 h-9 rounded-full bg-blue-light flex items-center justify-center">
          <Image src={briefcase} alt="start" sizes="24" />
        </div>
        <div>
          <Heading
            className="!text-sm !text-heading font-quicksand"
            text="Frontend Developer"
            width="semibold"
          />
          <p className="font-quicksand text-neutral-grey-70 font-normal text-xs">Zenkoders</p>
          <p className="mt-2 text-black text-xs font-medium font-quicksand">
            12 Jan 2022 - 31 Dec 2023
          </p>
        </div>
      </div>

      <hr />

      <div className="flex gap-y-3 flex-col">
        <p className="font-medium font-quicksand text-xs text-heading">Previous Skills</p>
        <div className="flex items-center gap-x-3">
          {skills.map((skill) => (
            <p
              key={skill}
              className="bg-neutral-grey-0 p-1 rounded-md text-heading font-quicksand font-medium text-base"
            >
              {skill}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-y-3 flex-col">
        <p className="font-medium font-quicksand text-xs text-heading">Acquired Skills</p>
        <div className="flex items-center gap-x-3">
          {skills.map((skill) => (
            <p
              key={skill}
              className="bg-neutral-grey-0 p-1 rounded-md text-heading font-quicksand font-medium text-base"
            >
              {skill}
            </p>
          ))}
        </div>
      </div>

      <Link href={'#'} className="text-blue text-xs font-normal font-quicksand">
        https://docs.google.com/spreadsheets/
      </Link>

      <div className="flex gap-x-1.5">
        <Image src={note} alt="building" sizes="20" />
        <p className="text-neutral-grey-70 text-sm font-normal font-quicksand">
          Participated in weekly environmental cleanups and tree planting drives.
        </p>
      </div>
    </Box>
  );
};

export default EmploymentCard;
