import { FC, JSX } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

interface IProps {
  width?: string;
}

const Loader: FC<IProps> = ({ width = '200' }): JSX.Element => {
  return <InfinitySpin width={width} color="#49909d" />;
};

export default Loader;
