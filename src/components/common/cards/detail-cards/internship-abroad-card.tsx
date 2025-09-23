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
    place_of_work: location,
    company,
  } = form_data || {};
  const date =
    date_arrived && date_departed
      ? `${formatToDDMMMYYYY(date_arrived)} - ${formatToDDMMMYYYY(date_departed)}`
      : '';

  return (
    <Box>
      <div className="flex items-center gap-x-3">
        <Image src={internshipAbroad} alt="internship" className="size-6" />
        <div>
          {title && <p className="font-medium text-[var(--heading)] quicksand !text-sm">{title}</p>}
          {date && <p className="quicksand text-[var(--gray-70)] font-normal text-sm">{date}</p>}
        </div>
      </div>
      {location && (
        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            <Image className="size-5" alt="" src={locationColored} />
            <p className="quicksand font-normal text-sm text-[var(--black)]">{location}</p>
          </div>
        </div>
      )}
      {company && (
        <div className="flex items-center gap-x-2">
          <Image className="size-5" alt="" src={agency} />
          <p className="quicksand font-normal text-sm text-[var(--black)]">{company}</p>
        </div>
      )}
    </Box>
  );
};

export default InternshipAbroadCard;
