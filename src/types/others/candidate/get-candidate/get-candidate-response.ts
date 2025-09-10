export interface GetCandidateResponseT {
  message: string;
  data: Data;
  error: any;
}

export interface Data {
  meta_data: MetaData;
  candidates: Candidate[];
}

export interface MetaData {
  skip: number;
  take: number;
  total: number;
}

export interface Candidate {
  id: string;
  gpa: number;
  city: string;
  iso2: string;
  link: string;
  role: string;
  email: string;
  grade: string;
  quote: string;
  state: string;
  theme: string;
  country: string;
  last_name: string;
  created_at: string;
  first_name: string;
  profile_id: string;
  updated_at: string;
  candidate_id: string;
  phone_number: string;
  date_of_birth: string;
  profile_status: string;
  active_folio_id: string;
  cover_photo_url: string;
  organization_name: string;
  profile_photo_url: string;
  objective_for_summary: string;
  is_portfolio_shareable: boolean;
}
export interface Root {
  message: string;
  data: Data;
  error: any;
}

export interface Data {
  meta_data: MetaData;
  candidates: Candidate[];
}

export interface MetaData {
  skip: number;
  take: number;
  total: number;
}

export interface Candidate {
  id: string;
  gpa: number;
  city: string;
  iso2: string;
  link: string;
  role: string;
  email: string;
  grade: string;
  quote: string;
  state: string;
  theme: string;
  country: string;
  last_name: string;
  created_at: string;
  first_name: string;
  profile_id: string;
  updated_at: string;
  candidate_id: string;
  phone_number: string;
  date_of_birth: string;
  profile_status: string;
  active_folio_id: string;
  cover_photo_url: string;
  organization_name: string;
  profile_photo_url: string;
  objective_for_summary: string;
  is_portfolio_shareable: boolean;
}
