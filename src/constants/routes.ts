const Routes = {
  // ====================== Auth ====================== //
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  signUp: '/sign-up',
  signIn: '/sign-in',

  // ====================== Pages ====================== //
  studentDetail: (slug: string, id: string) => `/home/${slug}/${id}`,
  category: (slug: string) => `/home/${slug}`,
  profile: '/profile',
  home: '/home',
};

export default Routes;
