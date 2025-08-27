import { FC } from 'react';

interface IProps {
  text: string;
  width?: 'semibold' | 'medium';
  size?: '32' | '31' | '28' | '22';
}

const Heading: FC<IProps> = ({ text, size = '32', width = 'semibold' }) => (
  <h2
    style={{ fontSize: `var(--text-size-${size})` }}
    className={`font-${width} text-neutral-grey-100 capitalize`}
  >
    {text}
  </h2>
);

export default Heading;
