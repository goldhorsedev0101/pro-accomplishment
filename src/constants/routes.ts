const Routes = {
  // ====================== Auth ====================== //
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  signUp: '/sign-up',
  signIn: '/sign-in',

  // ====================== Pages ====================== //
  participantDetail: (slug: string, id: string) => `/${slug}/${id}`,
  category: (slug: string) => `/${slug}`,
  profile: '/profile',
  home: '/',
};

export default Routes;
