export interface GetProfileResponseT {
  message: string;
  data: Data;
  error: string | null;
}

export interface Data {
  profile_picture: null | string;
  recruiter_id: string;
  profile_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
