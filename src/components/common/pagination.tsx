import { Dispatch, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';

interface IProps {
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination({ totalPages, setPage }: IProps) {
  return (
    <div className="w-fit self-end">
      <ReactPaginate
        nextLabel=">"
        breakLabel="..."
        previousLabel="<"
        pageCount={totalPages}
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
        className="flex gap-x-2 items-center"
        activeLinkClassName="!bg-primary text-white"
        onPageChange={(data) => setPage(data.selected + 1)}
        pageLinkClassName="bg-neutral-grey-0 text-xs font-semibold text-black size-8 rounded-full flex items-center justify-center cursor-pointer"
        nextLinkClassName="bg-neutral-grey-0 text-xs font-semibold text-black size-8 rounded-full flex items-center justify-center cursor-pointer"
        previousLinkClassName="bg-neutral-grey-0 text-xs font-semibold text-black size-8 rounded-full flex items-center justify-center cursor-pointer"
      />
    </div>
  );
}
