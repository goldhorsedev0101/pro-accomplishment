import header from '@/../public/img/header.png';
import { Filters } from '@/components/common/filters';
import Heading from '@/components/common/heading';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="flex items-center justify-center">
        <Image src={header} alt="header" width={1128} height={350} />
      </div>

      <Filters />

      <Heading text="Favorite Talents" width="medium" size="31" />
    </div>
  );
}
