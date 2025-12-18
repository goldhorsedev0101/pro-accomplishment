// Icons
import locationIcon from 'public/icons/location.svg';
import school from 'public/icons/school.svg';
import { TiStar } from 'react-icons/ti';

// Constant
import Routes from '@/constants/routes';

// Components
import Image from 'next/image';
import Link from 'next/link';

// Types
import { StaticImageData } from 'next/image';
import { JSX } from 'react';

interface IProps {
  profile: string | StaticImageData;
  location: string;
  grade: string;
  about: string;
  name: string;
  gpa: number;
  id: string;
}

const StudentCard = ({ location, profile, grade, about, name, gpa, id }: IProps): JSX.Element => {
  const { studentDetail: participantDetail } = Routes;

  return (
    <Link
      href={participantDetail('en', id)}
      className="shadow-sm border border-neutral-grey-10 bg-white rounded-lg p-3.5 w-full flex gap-x-2"
    >
      <div className="flex gap-x-3">
        <Image
          src={profile}
          alt="profile"
          width={66}
          height={68}
          className="rounded-lg w-[66px] h-[66px] min-w-[66px] min-h-[66px] max-w-[66px] max-h-[66px]"
        />
      </div>

      <div className="w-full flex flex-col gap-y-1">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-[#0E0F0C] font-medium text-base break-all ">{name}</h3>
          {gpa && (
            <div className="flex items-center h-fit">
              <TiStar className="text-yellow" size={20} />
              <p className="text-black text-sm font-normal">
                GPA<span className="font-medium"> {gpa}</span>
              </p>
            </div>
          )}
        </div>
        <p className="text-neutral-grey-100 text-sm break-all ">{about}</p>
        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-1">
            <Image src={school} alt="school" width={20} height={20} />
            <p className="text-sm font-normal text-neutral-grey-80">{grade}</p>
          </div>
          <div className="flex items-center gap-x-1">
            <Image src={locationIcon} alt="location" width={18} height={18} />
            <p className="text-sm font-normal text-neutral-grey-80">{location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
