const Routes = {
  // ====================== Auth ====================== //
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  signUp: '/sign-up',
  signIn: '/sign-in',

  // ====================== Pages ====================== //
  category: (slug: string, name?: string) => `/home/${slug}${name && `?name=${name}`}`,
  studentDetail: (slug: string, id: string) => `/home/${slug}/${id}`,
  profile: '/profile',
  home: '/home',
};

export default Routes;
