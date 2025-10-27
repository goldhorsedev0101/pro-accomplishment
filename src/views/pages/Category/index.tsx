'use client';

// Component
import BackButton from '@/components/common/back-button';
import StudentCard from '@/components/common/cards/student-card';
import Heading from '@/components/common/heading';
import Loader from '@/components/common/loader';
import NoData from '@/components/common/no-data';
import SearchInput from '@/components/common/search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Types
import { IParams } from '@/types/params.type';
import { FC, JSX, useState } from 'react';

import students from 'public/icons/students.svg';

// Queries
import { useGetCandidateQuery } from '@/services/others/candidate/get-candidate-query';
import { useGetSubCategoriesQuery } from '@/services/others/categories/get-sub-categories-query';

const CategoryView: FC<IParams & { name: string; isSub: boolean }> = ({
  category,
  isSub,
  name,
}): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subCategoryId, setSubCategoryId] = useState<string | undefined>(undefined);

  const { data: subCategories, isPending: isSubCategoriesPending } = useGetSubCategoriesQuery({
    categoryId: category === 'all' ? undefined : category,
    isSub,
  });

  const { data: candidate, isPending: isCandidatePending } = useGetCandidateQuery({
    subCategoryId: subCategoryId === 'all' ? undefined : subCategoryId,
    categoryId: category === 'all' ? undefined : category,
    searchTerm,
  });

  const { candidates, meta_data } = candidate?.data || {};

  const data = candidates?.map((item) => ({
    name: item.first_name + ' ' + item.last_name,
    about: item?.organization_name,
    category: item.organization_name,
    profile: item.profile_photo_url,
    location: item.country,
    id: item.candidate_id,
    grade: item.grade,
    gpa: item.gpa,
  }));

  const subCategoriesData = subCategories?.data.map(({ id, name }) => ({ id, name }));
  const items = subCategoriesData && [{ id: 'all', name: 'All' }, ...subCategoriesData];

  const title = name.replaceAll('%20', ' ');

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-x-2">
        <BackButton />
        <Heading text={title} width="medium" size="28" />
      </div>

      <div className="flex items-center gap-x-3 w-full">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {isSub && (
          <Select onValueChange={setSubCategoryId} value={subCategoryId}>
            <SelectTrigger className="w-full h-10 py-6 max-w-[200px] text-neutral-grey-100">
              <SelectValue placeholder="Sub-Category" />
            </SelectTrigger>
            <SelectContent className="max-h-[400px]">
              {isSubCategoriesPending ? (
                <Loader width="150" />
              ) : (items?.length || 0) > 0 ? (
                items?.map(({ id, name }, i) => (
                  <SelectItem key={i} value={id}>
                    {name}
                  </SelectItem>
                ))
              ) : (
                <span className="text-xs px-5">No Sub Categories Available</span>
              )}
            </SelectContent>
          </Select>
        )}
      </div>

      {isCandidatePending ? (
        <div className="w-full self-center h-[40dvh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (meta_data?.total || 0) <= 0 ? (
        <div className="w-full self-center h-[40dvh] flex items-center justify-center">
          <NoData
            img={students}
            title="No Students Found"
            description="Once students are added, their profiles and achievements will appear here"
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.map((items, index) => (
            <StudentCard key={index} {...items} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryView;
