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
import { Fragment, JSX, useEffect, useState } from 'react';

// Firebase
import { fetchToken } from '@/config/firebase.config';
import { useFCMForegroundMessages } from '@/hooks/useFCMForegroundMessages';

const HomeView = (): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);

  // Handle foreground FCM messages (when app is open)
  useFCMForegroundMessages();

  const { data, isLoading } = useGetFavoriteCandidateQuery({
    skip: (page - 1) * 10,
    take: 10,
    search,
  });

  // Fetch FCM token on mount
  useEffect(() => {
    const initializeFCM = async () => {
      try {
        // Step 1: Register service worker first
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('✅ Service Worker registered:', registration);

          // Wait for service worker to be ready
          await navigator.serviceWorker.ready;
          console.log('✅ Service Worker is ready');
        }

        // Step 2: Request notification permission
        const permission = await Notification.requestPermission();
        console.log('📢 Notification permission:', permission);

        if (permission === 'granted') {
          // Step 3: Fetch FCM token
          const token = await fetchToken();
          if (token) {
            console.log('✅ FCM token fetched successfully');
          } else {
            console.warn('⚠️ No FCM token received');
          }
        } else {
          console.log('❌ Notification permission denied');
        }
      } catch (error) {
        console.error('❌ Error initializing FCM:', error);
      }
    };

    initializeFCM();
  }, []);

  const { candidates, meta_data } = data?.data || {};

  const candidate = candidates?.map((item) => ({
    name: item.first_name + ' ' + item.last_name,
    about: item?.organization_name,
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

      {isLoading ? (
        <div className="w-full self-center h-[40dvh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Fragment>
          <Filters />

          <Heading text="Top Recruits" width="medium" size="31" />

          <SearchInput searchTerm={search} setSearchTerm={setSearch} />

          {meta_data?.total === 0 ? (
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
        </Fragment>
      )}

      <Pagination totalPages={meta_data?.skip || 0} setPage={setPage} />
    </div>
  );
};

export default HomeView;
