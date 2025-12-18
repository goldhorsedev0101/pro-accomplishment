import Image from 'next/image';
import noteIcon from 'public/icons/note.svg';
import { FC } from 'react';
import Box from '../box';
interface IProps {
  note: string;
}

const Note: FC<IProps> = ({ note }) => (
  <Box className="!border-none !p-3 !gap-2">
    <div className="flex items-center gap-x-1">
      <Image alt="title/award" src={noteIcon} width={20} height={20} />
      <p className="text-heading font-medium">Notes</p>
    </div>
    <p className="text-neutral-grey-80 text-sm break-all">{note}</p>
  </Box>
);

export default Note;
