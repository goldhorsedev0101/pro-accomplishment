const localhost = 'http://localhost:3000';
const live = process.env.API_URL;

const isLive = false;
const baseUrl = isLive ? live : localhost;

export const URLS = {
  // =========================== Auth ===================== //
  FORGET_PASSWORD: `${baseUrl}/api/auth/forgot-password`,
  RESET_PASSWORD: `${baseUrl}/api/auth/reset-password`,
  VERIFY_OTP: `${baseUrl}/api/auth/verify-otp`,
  RESEND_OTP: `${baseUrl}/api/auth/resend-otp`,
  SIGN_IN: `${baseUrl}/api/auth/login`,
  SIGN_UP: `${baseUrl}/api/auth/signup`,

  // =========================== Image Upload ===================== //
  IMAGE_UPLOADER: `${baseUrl}/api/auth/image-uploader`,

  // =========================== Candidate ===================== //
  GET_CANDIDATES: `${baseUrl}/api/candidate/get-candidates`,

  // =========================== Category ===================== //
  GET_CATEGORIES: `${baseUrl}/api/category/get-categories`,
  GET_SUB_CATEGORIES: `${baseUrl}/api/category/get-sub-categories`,

  // =========================== Profile ===================== //
  ME: `${baseUrl}/api/me`,
  EDIT_RECRUITER_PROFILE: `${baseUrl}/api/profile/edit-recruiter-profile`,
  GET_RECRUITER_PROFILE: `${baseUrl}/api/profile/get-recruiter-profile`,

  // =========================== Folio ===================== //
  GET_CANDIDATE_FOLIO: `${baseUrl}/api/folio/get-candidate-folio`,

  // =========================== Favorite ===================== //
  TOGGLE_FAVORITE_CANDIDATE: `${baseUrl}/api/favorite/toggle-favorite-candidate`,
  GET_FAVORITE_CANDIDATES: `${baseUrl}/api/favorite/get-favorite-candidates`,
};
