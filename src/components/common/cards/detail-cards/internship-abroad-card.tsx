import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToDDMMMYYYY } from '@/utils/date-format';
import Image from 'next/image';
import locationColored from 'public/icons/location-colored.svg';
import agency from 'public/pdf/agency.svg';
import internshipAbroad from 'public/pdf/internship-abroad.svg';
import { FC } from 'react';
import Box from '../../box';

interface IProps {
  form_data?: FormData;
}

const InternshipAbroadCard: FC<IProps> = ({ form_data }) => {
  const {
    accomplishment_name: title,
    date_arrived,
    date_departed,
    company,
    destination,
    internship_type,
  } = form_data || {};

  const date =
    date_arrived || date_departed
      ? `${formatToDDMMMYYYY(date_arrived || '')} - ${date_departed ? formatToDDMMMYYYY(date_departed) : 'Ongoing'}`
      : '';

  return (
    <Box>
      <Box className="!border-none !flex-row items-center justify-between !p-0 !gap-2">
        <div className="flex items-center">
          <div className="flex items-center justify-center size-9 bg-primary-20 rounded-full">
            <Image alt="title/award" src={internshipAbroad} width={24} height={24} />
          </div>
          <div className="gap-x-1">
            <p className="text-heading font-medium text-sm font-quicksand capitalize">{title}</p>
            <p className="text-neutral-grey-80 text-sm">{date}</p>
          </div>
        </div>

        {internship_type && (
          <p className="rounded-sm bg-[#FFFAF1] px-1.5 py-1 text-sm">{internship_type}</p>
        )}
      </Box>

      {location && (
        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            <Image className="size-6" alt="" src={locationColored} />
            <p className="font-quicksand font-normal text-sm text-[var(--black)]">{destination}</p>
          </div>
        </div>
      )}
      {company && (
        <div className="flex items-center gap-x-2">
          <Image className="size-6" alt="" src={agency} />
          <p className="font-quicksand font-normal text-sm text-[var(--black)]">{company}</p>
        </div>
      )}
    </Box>
  );
};

export default InternshipAbroadCard;
