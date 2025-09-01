// View
import HomeView from '@/views/pages/Home';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Home - Accomplishment' };

const HomePage = (): JSX.Element => <HomeView />;

export default HomePage;
