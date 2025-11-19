'use client';

// Components
import BackButton from '@/components/common/back-button';
import Box from '@/components/common/box';
import RenderCards from '@/components/common/cards/render-cards';
import Heading from '@/components/common/heading';
import Loader from '@/components/common/loader';
import NoData from '@/components/common/no-data';
import About from './about';

// Types
import { IParams } from '@/types/params.type';
import { FC, Fragment, JSX, useEffect, useState } from 'react';

// Icons
import profile from 'public/icons/profile-2user.svg';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { HiOutlineDownload } from 'react-icons/hi';

// Mutation
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useToggleFavoriteCandidateMutation } from '@/services/others/favorite/toggle-favorite-candidate';
import { useGetCandidateFolioQuery } from '@/services/others/folio/get-candidate-folio';
import { Accomplishment } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { listenToIsFolioAvailable } from '@/utils/supabase-listner';
import { PiSpinner } from 'react-icons/pi';

const StudentDetails: FC<IParams> = ({ id }): JSX.Element => {
  const { data, isPending } = useGetCandidateFolioQuery({ candidateId: id ?? '' });

  const { mutateAsync: toggle } = useToggleFavoriteCandidateMutation();
  const { accomplishments, candidate_data } = data?.data || {};

  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined);
  const [isFav, setIsFav] = useState<boolean>(candidate_data?.is_favorite || false);

  function groupByFormType(data?: Array<Accomplishment>) {
    const grouped: { [key: string]: Array<Accomplishment> } = {};

    data?.forEach((item) => {
      const formType = item.form_type;
      if (!grouped[formType]) grouped[formType] = [];
      grouped[formType].push(item);
    });

    return Object.values(grouped);
  }

  const sortByFormType = (data: Accomplishment[][]) => {
    return [...data].sort((a, b) => {
      const formTypeA = a[0]?.form_type?.toLowerCase() ?? '';
      const formTypeB = b[0]?.form_type?.toLowerCase() ?? '';
      return formTypeA.localeCompare(formTypeB);
    });
  };

  const groupedData = sortByFormType(groupByFormType(accomplishments));

  const handleToggle = async () => {
    try {
      setIsFav(!isFav);
      const res = await toggle({ candidateId: id || '' });
      if (res.error) setIsFav(!isFav);
    } catch (error) {
      setIsFav(!isFav);
      console.log('🚀 ~ handleToggle ~ error:', error);
    }
  };
  const active_folio_id = candidate_data?.active_folio_id;

  useEffect(() => {
    setIsFav(candidate_data?.is_favorite || false);
  }, [candidate_data?.is_favorite]);

  useEffect(() => {
    if (active_folio_id) {
      setPdfUrl(candidate_data?.pdf_url);

      const channel = listenToIsFolioAvailable(active_folio_id, (newVal) => setPdfUrl(newVal));

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [active_folio_id]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[60dvh]">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[60dvh]">
        <NoData
          img={profile}
          title="No Recruits Found"
          description="Once recruits are added, their profiles and accomplishments will appear here"
        />
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

          <Button
            className="h-12 rounded-lg p-6 bg-primary text-white flex items-center gap-x-1 disabled:opacity-50"
            onClick={() => window.open(pdfUrl, '_blank')}
            disabled={!pdfUrl}
          >
            {pdfUrl ? (
              <Fragment>
                <HiOutlineDownload size={20} />
                Download PDF
              </Fragment>
            ) : (
              <Fragment>
                <PiSpinner size={40} className="animate-spin" />
                Generating PDF
              </Fragment>
            )}
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

      <Heading text="Accomplishments" size="22" width="medium" />

      <div className="h-fit gap-6 md:columns-2 space-y-6">
        {groupedData?.map((group, i) => (
          <div className="!h-fit flex flex-col gap-y-6 overflow-hidden" key={i}>
            {group?.map((accomplishment, j) => (
              <RenderCards key={j} accomplishments={[accomplishment]} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;
