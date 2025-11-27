const Routes = {
  // ====================== Auth ====================== //
  deleteCandidateAccount: '/delete-candidate-account',
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  signUp: '/sign-up',
  signIn: '/sign-in',

  // ====================== Pages ====================== //
  category: (slug: string, name?: string, isSub?: boolean) =>
    `/home/${slug}${name && `?name=${name}&isSub=${isSub}`}`,
  studentDetail: (slug: string, id: string) => `/home/${slug}/${id}`,
  profile: '/profile',
  home: '/home',
};

export default Routes;
