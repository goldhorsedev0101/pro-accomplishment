'use client';
// Component
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';
import Image from 'next/image';

// Constant
import { contacts } from '@/constants/contacts';

// Icons
import school from 'public/icons/school.svg';
import { PiQuotesLight } from 'react-icons/pi';
import { TiStar } from 'react-icons/ti';

// Type
import { CandidateData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import Link from 'next/link';
import { FC, JSX } from 'react';

interface IProps {
  candidate_data?: CandidateData;
}

const About: FC<IProps> = ({ candidate_data }): JSX.Element => {
  const {
    gpa,
    link,
    city,
    grade,
    email,
    quote,
    country,
    last_name,
    first_name,
    phone_number,
    organization_name,
    profile_photo_url,
  } = candidate_data || {};

  const name = first_name + ' ' + last_name;
  const address = city + ', ' + country;

  const validUrl =
    link?.startsWith('http://') || link?.startsWith('https://') ? link : `https://${link}`;

  const contact = contacts({ email, phone_number, address, link: link ?? '' });

  return (
    <Box className="shadow-sm">
      <div className="flex lg:!flex-row  gap-6 flex-col-reverse items-start justify-between">
        <div className="flex flex-col gap-y-3">
          <Heading text={name} className="text-4xl" width="medium" />

          {quote && (
            <p className="flex items-start gap-x-2">
              <PiQuotesLight size={20} className="text-primary rotate-180 min-w-5 min-h-5" />
              <span className="max-w-[634px] text-neutral-grey-80 font-normal text-lg">
                {quote}
              </span>
              <PiQuotesLight size={20} className="text-primary min-w-5 min-h-5" />
            </p>
          )}

          <div className="flex flex-wrap gap-6">
            {contact.map(({ icon, label }, i) => (
              <Link
                key={i}
                href={validUrl ?? '#'}
                rel="noopener noreferrer"
                target={label === link ? '_blank' : undefined}
                onClick={({ preventDefault }) => label !== link && preventDefault()}
                className={`flex items-center gap-x-2 ${label === link ? '!w-full' : 'w-fit !cursor-default'}`}
              >
                <Image src={icon} alt="icon" width={18} height={18} />
                <span
                  className={`truncate text-neutral-grey-100 font-normal ${label === link ? '!text-blue !w-full' : ''}`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <Image
          src={profile_photo_url ?? '/'}
          className="rounded-lg"
          alt="profile"
          height={154}
          width={154}
        />
      </div>

      <hr />

      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-1">
          <Image src={school} alt="school" width={20} height={20} />
          <p className="text-xs font-normal text-neutral-grey-100">{organization_name}</p>
        </div>

        <div className="size-1.5 rounded-full bg-[#B2B0B2]" />

        <p className="text-xs font-normal text-neutral-grey-80">{grade}</p>

        <div className="size-1.5 rounded-full bg-[#B2B0B2]" />

        {gpa && (
          <div className="flex items-center h-fit gap-x-1">
            <TiStar className="text-yellow" size={20} />
            <p className="text-black text-xs font-normal">
              GPA<span className="font-medium"> {gpa}</span>
            </p>
          </div>
        )}
      </div>
    </Box>
  );
};

export default About;
