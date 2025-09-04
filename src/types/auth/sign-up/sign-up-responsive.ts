export interface SignUpResponseT {
  error: null | string;
  message: string;
  data: Data;
}

export interface Data {
  recruiter: Recruiter;
}

export interface Recruiter {
  id: string;
  role: string;
  email: string;
  last_name: string;
  created_at: string;
  first_name: string;
  updated_at: string;
  profile_picture: null | string;
}
