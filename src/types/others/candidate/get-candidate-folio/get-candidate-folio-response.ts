import { FORM_TYPE_ENUM } from '@/enum/form-type.enum';

export interface GetCandidateFolioResponseT {
  error: null | string;
  message: string;
  data: Data;
}

export interface Data {
  meta_data: MetaData;
  candidate_data: CandidateData;
  accomplishments: Accomplishment[];
}

export interface MetaData {
  total: number;
}

export interface CandidateData {
  gpa: number;
  city: string;
  link: string;
  email: string;
  grade: string;
  quote: string;
  state: string;
  theme: string;
  country: string;
  last_name: string;
  first_name: string;
  profile_id: string;
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

export interface Accomplishment {
  header: boolean;
  form_data: FormData;
  form_type: FORM_TYPE_ENUM;
  category_id: string;
  category_name: string;
  sub_category_id?: string;
  accomplishment_id: string;
  sub_category_name?: string;
}

export interface FormData {
  id: string;
  date?: string;
  link: string;
  name?: string;
  notes: string;
  region?: string;
  location?: string;
  team_name?: string;
  created_at: string;
  event_name?: string;
  media_urls: string[];
  updated_at: string;
  document_urls?: string[];
  opposing_team?: string;
  title_or_award?: string;
  accomplishment_id: string;
  award_title?: string;
  institution?: string;
  date_received?: string;
  award_certificate_urls?: string[];
  company?: string;
  end_date?: string;
  start_date?: string;
  favorite_part?: string;
  acquired_skills?: string[];
  previous_skills?: string[];
  volunteer_title?: string;
  is_still_in_progress?: boolean;
}
