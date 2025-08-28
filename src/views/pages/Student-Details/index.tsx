'use client';
import link from '@/../public/icons/link.svg';
import school from '@/../public/icons/school.svg';
import profile from '@/../public/img/profile.png';
import BackButton from '@/components/common/back-button';
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { contacts } from '@/constants/contacts';
import Image from 'next/image';
import { FC, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { HiOutlineDownload } from 'react-icons/hi';
import { PiQuotesLight } from 'react-icons/pi';
import { TiStar } from 'react-icons/ti';

interface IProps {
  category: string;
  id: string;
}

const StudentDetails: FC<IProps> = () => {
  const [isFav, setIsFav] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setIsFav(!isFav)}
            className="size-12 rounded-full flex items-center justify-center text-white text-2xl bg-[#0000003D]"
          >
            {isFav ? <GoHeartFill /> : <GoHeart />}
          </button>

          <Button className="h-12 rounded-lg p-6">
            <HiOutlineDownload size={20} />
            Download PDF
          </Button>
        </div>
      </div>

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

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {contacts.map(({ icon, label }, i) => (
                <div className="flex items-center gap-x-2" key={i}>
                  <Image src={icon} alt="icon" width={18} height={18} />
                  <span
                    className={`truncate text-neutral-grey-100 font-normal ${icon === link ? '!text-blue' : ''}`}
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
    </div>
  );
};

export default StudentDetails;
