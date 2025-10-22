'use client';

// Icons
import header from 'public/img/header.png';

// Components
import StudentCard from '@/components/common/cards/student-card';
import { Filters } from '@/components/common/filters';
import Heading from '@/components/common/heading';
import Loader from '@/components/common/loader';
import NoData from '@/components/common/no-data';
import Pagination from '@/components/common/pagination';
import SearchInput from '@/components/common/search-input';
import Image from 'next/image';

// Types
import { useGetFavoriteCandidateQuery } from '@/services/others/favorite/get-favorite-candidate';
import { JSX, useState } from 'react';

const HomeView = (): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);

  const { data, isPending } = useGetFavoriteCandidateQuery({
    skip: (page - 1) * 10,
    take: 10,
    search,
  });

  const { candidates, meta_data } = data?.data || {};

  const candidate = candidates?.map((item) => ({
    name: item.first_name + ' ' + item.last_name,
    about: item?.objective_for_summary,
    category: item.organization_name,
    profile: item.profile_photo_url,
    location: item.country,
    id: item.candidate_id,
    grade: item.grade,
    gpa: item.gpa,
  }));

  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="flex items-center justify-center">
        <Image src={header} alt="header" width={1128} height={350} />
      </div>

      <Filters />

      <Heading text="Favorite Talents" width="medium" size="31" />

      <SearchInput searchTerm={search} setSearchTerm={setSearch} />

      {isPending ? (
        <div className="w-full self-center h-[40dvh] flex items-center justify-center">
          <Loader />
        </div>
      ) : meta_data?.total || 0 == 0 ? (
        <div className="w-full self-center h-[40dvh] flex items-center justify-center">
          <NoData />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {candidate?.map((items, index) => (
            <StudentCard key={index} {...items} />
          ))}
        </div>
      )}

      <Pagination totalPages={meta_data?.skip || 0} setPage={setPage} />
    </div>
  );
};

export default HomeView;
