import Image, { StaticImageData } from 'next/image';
import calender from 'public/icons/calendar.svg';
import teacher from 'public/icons/teacher.svg';
import { FC } from 'react';
import Box from '../box';

interface Items {
  icon?: StaticImageData;
  value?: string | null;
  label?: string;
}

interface IProps {
  items: Array<Items>;
  className?: string;
  label?: string;
  gpa?: string;
}

const Items: FC<IProps> = ({ items, label, className, gpa }) => {
  return (
    <Box className="!border-none !p-3 !gap-2">
      {label && <p className="text-heading font-medium">{label}</p>}
      {items.map(({ icon = calender, label, value }, i) => {
        if (!value) return null;

        return (
          <div className={`flex items-center gap-x-1 ${className}`} key={i}>
            <Image alt={value} src={icon} width={20} height={20} />
            <div>
              {label && <p className="text-neutral-grey-60 text-xs">{label}</p>}
              <p className={`text-neutral-grey-70 text-sm ${className}`}>{value}</p>
            </div>
          </div>
        );
      })}

      {gpa && (
        <div className={`flex items-center gap-x-1 justify-between`}>
          <div className="flex items-center gap-x-2">
            <Image alt={''} src={teacher} width={20} height={20} />
            <p className="text-heading font-medium text-sm">Grade/GPA</p>
          </div>
          <p className={`text-neutral-grey-100 font-semibold`}>{gpa}</p>
        </div>
      )}
    </Box>
  );
};

export default Items;
