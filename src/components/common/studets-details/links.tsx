import Link from 'next/link';
import { FC } from 'react';
import Box from '../box';

interface IProps {
  link: string;
}

const Links: FC<IProps> = ({ link }) => {
  const validUrl =
    link?.startsWith('http://') || link?.startsWith('https://') ? link : `https://${link}`;

  return (
    <Box className="!border-none !p-3 !gap-2">
      <p className="text-heading font-medium">Link</p>
      <Link target="_blank" href={validUrl} className="text-blue text-sm">
        {link}
      </Link>
    </Box>
  );
};

export default Links;
