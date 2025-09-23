const localhost = 'http://localhost:3000';
const live = process.env.API_URL;

const isLive = false;
const baseUrl = isLive ? live + '/api' : localhost + '/api';

export const URLS = {
  // =========================== Auth ===================== //
  FORGET_PASSWORD: `${baseUrl}/auth/forgot-password`,
  RESET_PASSWORD: `${baseUrl}/auth/reset-password`,
  VERIFY_OTP: `${baseUrl}/auth/verify-otp`,
  RESEND_OTP: `${baseUrl}/auth/resend-otp`,
  SIGN_IN: `${baseUrl}/auth/login`,
  SIGN_UP: `${baseUrl}/auth/signup`,

  // =========================== Image Upload ===================== //
  IMAGE_UPLOADER: `${baseUrl}/auth/image-uploader`,

  // =========================== Candidate ===================== //
  GET_CANDIDATES: `${baseUrl}/candidate/get-candidates`,

  // =========================== Category ===================== //
  GET_CATEGORIES: `${baseUrl}/category/get-categories`,
  GET_SUB_CATEGORIES: `${baseUrl}/category/get-sub-categories`,

  // =========================== Profile ===================== //
  ME: `${baseUrl}/me`,
  EDIT_RECRUITER_PROFILE: `${baseUrl}/profile/edit-recruiter-profile`,
  GET_RECRUITER_PROFILE: `${baseUrl}/profile/get-recruiter-profile`,

  // =========================== Folio ===================== //
  GET_CANDIDATE_FOLIO: `${baseUrl}/folio/get-candidate-folio`,

  // =========================== Favorite ===================== //
  TOGGLE_FAVORITE_CANDIDATE: `${baseUrl}/favorite/toggle-favorite-candidate`,
  GET_FAVORITE_CANDIDATES: `${baseUrl}/favorite/get-favorite-candidates`,
};
