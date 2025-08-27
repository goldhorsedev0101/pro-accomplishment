import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { filters } from '@/constants/filters';
import Routes from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export function Filters() {
  const { category } = Routes;

  return (
    <div className="px-6 sm:px-10 md:px-20">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {filters.map(({ icon, label }, index) => (
            <CarouselItem
              key={index}
              className="pl-1 h-[200px] basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 flex items-center justify-center"
            >
              <Link
                href={category(label.toLowerCase())}
                className="relative cursor-pointer border border-neutral-grey-20 !w-[110px] !h-[110px] rounded-full flex items-center justify-center"
              >
                <Image src={icon} alt={label} />
                <p className="absolute -bottom-10 text-neutral-grey-100 font-medium text-base">
                  {label}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
