'use client';

// Components
import BackButton from '@/components/common/back-button';
import Box from '@/components/common/box';
import AcademicsCard from '@/components/common/cards/academics-card';
import AthleticsCard from '@/components/common/cards/athletics-card';
import AwardsCard from '@/components/common/cards/awards-card';
import CertificationsCard from '@/components/common/cards/certifications-card';
import EmploymentCard from '@/components/common/cards/employment-card';
import TalentsCard from '@/components/common/cards/talents-card';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import About from './about';

// Types
import { IParams } from '@/types/params.type';
import { FC, JSX, useState } from 'react';

// Icons
import DetailsModalLayout from '@/components/common/modals/details-modal-layout';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { HiOutlineDownload } from 'react-icons/hi';

const StudentDetails: FC<IParams> = (): JSX.Element => {
  const [isFav, setIsFav] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setIsFav(!isFav)}
            className="size-12 cursor-pointer rounded-full flex items-center justify-center text-white text-2xl bg-[#0000003D]"
          >
            {isFav ? <GoHeartFill /> : <GoHeart />}
          </button>

          <Button className="h-12 rounded-lg p-6">
            <HiOutlineDownload size={20} />
            Download PDF
          </Button>
        </div>
      </div>

      <About />

      <Box className="shadow-sm !gap-y-1">
        <Heading text="Objective" width="medium" className="!text-xl" />
        <p className="font-normal text-lg !text-neutral-grey-80">
          Every accomplishment begins with the decision to try but it&apos;s the perseverance to
          finish that makes it extraordinary Every accomplishment begins with the decision to try
          but it&apos;s the perseverance to finish that makes it extraordinary
        </p>
      </Box>

      <Heading text="Accomplishment" size="22" width="medium" />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-y-6">
          <Box className="!gap-y-4 !border-none !p-0">
            <Heading text="Athletics" className="!text-lg !text-neutral-grey-60" width="medium" />
            <AthleticsCard />
          </Box>
          <Box className="!gap-y-4 !border-none !p-0">
            <Heading text="Academics" className="!text-lg !text-neutral-grey-60" width="medium" />
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <AcademicsCard key={i} />
              ))}
          </Box>
          <Box className="!gap-y-4 !border-none !p-0">
            <Heading text="Awards" className="!text-lg !text-neutral-grey-60" width="medium" />
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <AwardsCard key={i} />
              ))}
          </Box>
        </div>

        <div className="flex flex-col gap-y-6">
          <Box className="!gap-y-4 !border-none !p-0">
            <Heading
              text="Certifications"
              className="!text-lg !text-neutral-grey-60"
              width="medium"
            />
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <CertificationsCard key={i} />
              ))}
          </Box>
          <Box className="!gap-y-4 !border-none !p-0">
            <Heading text="Talents" className="!text-lg !text-neutral-grey-60" width="medium" />

            {Array(3)
              .fill(0)
              .map((_, i) => (
                <TalentsCard key={i} />
              ))}
          </Box>
          <Box className="!gap-y-4 !border-none !p-0">
            <Heading text="Employment" className="!text-lg !text-neutral-grey-60" width="medium" />
            <EmploymentCard />
          </Box>
        </div>
      </div>

      <DetailsModalLayout />
    </div>
  );
};

export default StudentDetails;
