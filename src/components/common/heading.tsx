// Types
import { FC, JSX } from 'react';

interface IProps {
  text?: string;
  className?: string;
  width?: 'semibold' | 'medium';
  size?: '32' | '31' | '28' | '22';
}

const Heading: FC<IProps> = ({ text, size = '32', width = 'semibold', className }): JSX.Element => (
  <h2
    style={{ fontSize: `var(--text-size-${size})` }}
    className={`font-${width} text-neutral-grey-100  ${className}`}
  >
    {text}
  </h2>
);

export default Heading;
