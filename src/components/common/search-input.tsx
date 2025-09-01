// Types
import { Dispatch, FC, JSX, SetStateAction, useEffect, useState } from 'react';

// Icons
import { IoSearchOutline } from 'react-icons/io5';

// Hook
import { useDebounce } from 'use-debounce';

// Component
import { Input } from '../ui/input';

interface IProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchInput: FC<IProps> = ({ searchTerm, setSearchTerm }): JSX.Element => {
  const [search, setSearch] = useState<string>(searchTerm ?? '');
  const [searching] = useDebounce(search, 750);

  useEffect(() => setSearchTerm?.(searching ?? ''), [searching]);

  return (
    <div className="relative p-3 bg-white flex items-center gap-2 border border-neutral-grey-20 rounded-md w-full">
      <IoSearchOutline size={24} color="#828282" />
      <Input
        type="text"
        className="w-full text-sm !rounded-none !p-0 border-none focus:!outline-none focus:!ring-0 placeholder:text-[#828282]"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
