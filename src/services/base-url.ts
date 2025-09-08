const localhost = 'http://localhost:3000/api';
const live = process.env.API_URL;

const isLive = true;
const baseUrl = isLive ? live : localhost;

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

  // =========================== Profile ===================== //
  ME: `${baseUrl}/me`,
};
