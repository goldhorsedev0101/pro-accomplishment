'use client';

// Components
import BackButton from '@/components/common/back-button';
import Box from '@/components/common/box';
import RenderCards from '@/components/common/cards/render-cards';
import Heading from '@/components/common/heading';
import Loader from '@/components/common/loader';
import { Button } from '@/components/ui/button';
import About from './about';

// Types
import { IParams } from '@/types/params.type';
import { FC, JSX, useState } from 'react';

// Icons
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { HiOutlineDownload } from 'react-icons/hi';

// Mutation
import { useToggleFavoriteCandidateMutation } from '@/services/others/favorite/toggle-favorite-candidate';
import { useGetCandidateFolioQuery } from '@/services/others/folio/get-candidate-folio';

const StudentDetails: FC<IParams> = ({ id }): JSX.Element => {
  const { data, isPending } = useGetCandidateFolioQuery({ candidateId: id ?? '' });
  const { mutateAsync: toggle } = useToggleFavoriteCandidateMutation();
  const { accomplishments, candidate_data } = data?.data || {};
  const [isFav, setIsFav] = useState<boolean>(false);

  const handleToggle = async () => {
    await toggle({ candidateId: id || '' });
    setIsFav(!isFav);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[60dvh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <div className="flex items-center gap-x-2">
          <button
            onClick={handleToggle}
            className="size-12 cursor-pointer rounded-full flex items-center justify-center text-white text-2xl bg-[#0000003D]"
          >
            {isFav ? <GoHeartFill color="#49909d" /> : <GoHeart />}
          </button>

          <Button className="h-12 rounded-lg p-6">
            <HiOutlineDownload size={20} />
            Download PDF
          </Button>
        </div>
      </div>

      <About candidate_data={candidate_data} />

      {candidate_data?.objective_for_summary && (
        <Box className="shadow-sm !gap-y-1">
          <Heading text="Objective" width="medium" className="!text-xl" />
          <p className="font-normal text-lg !text-neutral-grey-80">
            {candidate_data?.objective_for_summary}
          </p>
        </Box>
      )}

      <Heading text="Accomplishment" size="22" width="medium" />

      <div className="grid md:grid-cols-2 h-fit gap-6">
        <RenderCards accomplishments={accomplishments} />
      </div>
    </div>
  );
};

export default StudentDetails;
