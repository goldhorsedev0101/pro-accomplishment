import locationIcon from '@/../public/icons/location.svg';
import school from '@/../public/icons/school.svg';
import Image, { StaticImageData } from 'next/image';
import { TiStar } from 'react-icons/ti';

interface IProps {
  profile: string | StaticImageData;
  location: string;
  grade: string;
  about: string;
  name: string;
  gpa: string;
}

const ParticipantCard = ({ profile, about, gpa, grade, location, name }: IProps) => {
  return (
    <div className="shadow-sm border border-neutral-grey-10 bg-white rounded-lg p-3.5 w-full flex gap-x-2 justify-between">
      <div className="flex gap-x-3">
        <Image src={profile} alt="profile" width={66} height={68} />
        <div className="flex flex-col gap-y-1">
          <h3 className="text-[#0E0F0C] font-medium text-base">{name}</h3>
          <p className="text-neutral-grey-100 text-xs">{about}</p>
          <div className="flex items-center gap-x-3">
            <div className="flex items-center gap-x-1">
              <Image src={school} alt="school" width={20} height={20} />
              <p className="text-xs font-normal text-neutral-grey-60">{grade}</p>
            </div>
            <div className="flex items-center gap-x-1">
              <Image src={locationIcon} alt="location" width={18} height={18} />
              <p className="text-xs font-normal text-neutral-grey-60">{location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center h-fit gap-x-1">
        <TiStar className="text-yellow" size={20} />
        <p className="text-black text-xs font-normal">
          GPA<span className="font-medium"> {gpa}</span>
        </p>
      </div>
    </div>
  );
};

export default ParticipantCard;
