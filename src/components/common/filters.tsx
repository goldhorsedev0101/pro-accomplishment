'use client';

// Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';

// Constants
import Routes from '@/constants/routes';

// Types
import { useGetCategoriesQuery } from '@/services/others/categories/get-categories-query';
import { JSX } from 'react';

type Item = {
  id: string;
  name: string;
  icon_url: string;
  has_sub_categories?: boolean;
};

export function Filters(): JSX.Element {
  const { data } = useGetCategoriesQuery();
  const { data: categories } = data || {};
  const { category } = Routes;

  function sortAlphabetically(items: Item[]): Item[] {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="px-6 sm:px-10 md:px-20">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {sortAlphabetically(categories).map(
            ({ icon_url, id, name, has_sub_categories }, index) => (
              <CarouselItem
                key={index}
                className="pl-1 h-[250px] basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 flex items-center justify-center"
              >
                <Link
                  href={category(id, name, has_sub_categories)}
                  className="relative cursor-pointer border border-neutral-grey-20 !w-[110px] !h-[110px] rounded-full flex items-center justify-center"
                >
                  <Image src={icon_url} alt={name} width={49} height={49} />
                  <p className="absolute text-center top-32 w-[150px] text-neutral-grey-100 font-medium text-base">
                    {name}
                  </p>
                </Link>
              </CarouselItem>
            ),
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
