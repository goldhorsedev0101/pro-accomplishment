'use client';
import profile from '@/../public/img/profile.png';
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import StudentCard from '@/components/common/cards/student-card';
import SearchInput from '@/components/common/search-input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FC, useState } from 'react';

interface IProps {
  category: string;
}

const CategoryView: FC<IProps> = ({ category }) => {
  const [search, setSearch] = useState('');
  const [subCategory, setSubCategory] = useState<string>();

  const title = category.replaceAll('%20', ' ');

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-x-2">
        <BackButton />
        <Heading text={title} width="medium" size="28" />
      </div>

      <div className="flex items-center gap-x-3 w-full">
        <SearchInput searchTerm={search} setSearchTerm={setSearch} />

        <Select onValueChange={setSubCategory} value={subCategory}>
          <SelectTrigger className="w-full h-10 py-6 max-w-[200px] text-neutral-grey-100">
            <SelectValue placeholder="Sub-Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">One</SelectItem>
            <SelectItem value="2">Two</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <StudentCard
            about="Springfield Central High School"
            location="California"
            id={index.toString()}
            name="Emma Robert"
            grade="8th Grade"
            profile={profile}
            category={title}
            key={index}
            gpa="3.5"
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryView;
