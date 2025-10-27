// Components
import Image from 'next/image';
import Box from '../../box';
import Heading from '../../heading';

// Icons
import book from 'public/icons/book.svg';
import percentage from 'public/icons/percentage.svg';
import teacher from 'public/icons/teacher.svg';

// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { formatToYYYY } from '@/utils/date-format';
import { FC, Fragment, JSX } from 'react';

interface IProps {
  form_data?: FormData;
}

const AcademicsCard: FC<IProps> = ({ form_data }): JSX.Element => {
  const data = [
    { icon: book, label: form_data?.class },
    {
      icon: percentage,
      label: form_data?.standardized_test_score ? form_data?.standardized_test_score + '%' : '',
    },
    { icon: teacher, label: form_data?.grade_or_gpa ? 'Grade/GPA ' + form_data?.grade_or_gpa : '' },
  ];

  const startYear = formatToYYYY(form_data?.academic_year_started ?? '');
  const endYear = formatToYYYY(form_data?.academic_year_ended ?? '');

  return (
    <Box className="shadow-sm w-full !gap-y-3 !text-start">
      <div className="flex justify-between items-start">
        <div>
          <Heading
            className="!text-base font-quicksand !text-heading break-all"
            text={form_data?.name || ''}
            width="medium"
          />
          <p className="font-quicksand text-neutral-grey-80 font-normal text-sm break-all">
            {form_data?.school_or_institution || ''}
          </p>
        </div>

        {startYear && (
          <p className="font-quicksand text-neutral-grey-80 font-normal text-sm rounded-sm py-0.5 px-1.5 bg-green-light">
            {startYear === endYear ? startYear : `${startYear} - ${endYear}`}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-3">
        {data.map(({ icon, label }, i) => (
          <Fragment key={i}>
            {label && (
              <div
                className={`flex gap-x-1 items-center ${i == 1 ? 'justify-center' : i == 2 && 'justify-end'}`}
              >
                <Image src={icon} alt={label ?? ''} className="size-6" />
                <p className="text-neutral-grey-100 text-sm font-normal font-quicksand">{label}</p>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Box>
  );
};

export default AcademicsCard;
