// Component
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';
import Image from 'next/image';

// Constant
import { contacts } from '@/constants/contacts';

// Icons
import link from '@/../public/icons/link.svg';
import school from '@/../public/icons/school.svg';
import profile from '@/../public/img/profile.png';
import { PiQuotesLight } from 'react-icons/pi';
import { TiStar } from 'react-icons/ti';

// Type
import { JSX } from 'react';

const About = (): JSX.Element => {
  return (
    <Box className="shadow-sm">
      <div className="flex lg:!flex-row  gap-6 flex-col-reverse items-start justify-between">
        <div className="flex flex-col gap-y-3">
          <Heading text="Emma Robert" className="text-4xl" width="medium" />

          <p className="flex items-start gap-x-2">
            <PiQuotesLight size={20} className="text-primary rotate-180 min-w-5 min-h-5" />
            <span className="max-w-[634px] text-neutral-grey-80 font-normal text-lg">
              Every accomplishment begins with the decision to try but it&lsquo;s the perseverance
              to finish that makes it extraordinary
            </span>
            <PiQuotesLight size={20} className="text-primary min-w-5 min-h-5" />
          </p>

          <div className="flex flex-wrap gap-6">
            {contacts.map(({ icon, label }, i) => (
              <div
                className={`flex items-center gap-x-2 ${icon === link ? '!w-full' : 'w-fit'}`}
                key={i}
              >
                <Image src={icon} alt="icon" width={18} height={18} />
                <span
                  className={`truncate text-neutral-grey-100 font-normal ${icon === link ? '!text-blue !w-full' : ''}`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Image src={profile} alt="profile" width={154} height={154} />
      </div>

      <hr />

      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-1">
          <Image src={school} alt="school" width={20} height={20} />
          <p className="text-xs font-normal text-neutral-grey-100">
            Springfield Central High School
          </p>
        </div>

        <div className="size-1.5 rounded-full bg-[#B2B0B2]" />

        <p className="text-xs font-normal text-neutral-grey-80">8th Grade</p>

        <div className="size-1.5 rounded-full bg-[#B2B0B2]" />

        <div className="flex items-center h-fit gap-x-1">
          <TiStar className="text-yellow" size={20} />
          <p className="text-black text-xs font-normal">
            GPA<span className="font-medium"> {3.5}</span>
          </p>
        </div>
      </div>
    </Box>
  );
};

export default About;
