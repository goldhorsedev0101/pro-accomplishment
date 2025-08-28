import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
}

const Box: FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={`border border-neutral-grey-20 rounded-xl p-6 flex flex-col gap-y-6 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
