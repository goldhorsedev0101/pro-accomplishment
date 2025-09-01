const baseUrl = 'http://localhost:3000';

export const URLS = {
  // =========================== Auth ===================== //
  FORGET_PASSWORD: `${baseUrl}/auth/forget-password`,
  RESET_PASSWORD: `${baseUrl}/auth/reset-password`,
  VERIFY_EMAIL: `${baseUrl}/auth/verify-email`,
  RESEND_OTP: `${baseUrl}/auth/resend-otp`,
  SIGN_IN: `${baseUrl}/auth/sign-in`,
  SIGN_UP: `${baseUrl}/auth/sign-up`,
};
