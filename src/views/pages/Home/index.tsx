'use client';
import header from '@/../public/img/header.png';
import profile from '@/../public/img/profile.png';
import { Filters } from '@/components/common/filters';
import Heading from '@/components/common/heading';
import NoData from '@/components/common/no-data';
import Pagination from '@/components/common/pagination';
import ParticipantCard from '@/components/common/participant-card';
import SearchInput from '@/components/common/search-input';
import Image from 'next/image';
import { useState } from 'react';

const HomeView = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  console.log('🚀 ~ HomeView ~ page:', page);
  const totalPages = 5;

  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="flex items-center justify-center">
        <Image src={header} alt="header" width={1128} height={350} />
      </div>

      <Filters />

      <Heading text="Favorite Talents" width="medium" size="31" />
      <SearchInput searchTerm={search} setSearchTerm={setSearch} />
      {totalPages <= 0 ? (
        <div className="w-full self-center h-[40dvh] flex items-center justify-center">
          <NoData />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <ParticipantCard
              about="Springfield Central High School"
              location="California"
              profile={profile}
              name="Emma Robert"
              grade="8th Grade"
              key={index}
              gpa="3.5"
            />
          ))}
        </div>
      )}

      <Pagination totalPages={Math.ceil(totalPages / 10)} setPage={setPage} />
    </div>
  );
};

export default HomeView;
