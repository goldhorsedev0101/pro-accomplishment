// View
import ProfileView from '@/views/pages/Profile';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Profile - Accomplishment' };

const ProfilePage = (): JSX.Element => <ProfileView />;

export default ProfilePage;
