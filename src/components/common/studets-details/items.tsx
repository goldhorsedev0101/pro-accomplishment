import Image, { StaticImageData } from 'next/image';
import calender from 'public/icons/calendar.svg';
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
}

const Items: FC<IProps> = ({ items, label, className }) => {
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
    </Box>
  );
};

export default Items;
