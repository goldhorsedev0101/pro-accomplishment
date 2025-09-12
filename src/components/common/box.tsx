// Types
import { FC, JSX, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
}

const Box: FC<IProps> = ({ children, className }): JSX.Element => {
  return (
    <div
      className={`border !h-fit bg-white border-neutral-grey-20 rounded-xl p-6 flex flex-col gap-y-6 w-full !text-start ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
