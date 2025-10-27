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
  iso2: string;
  gpa: number;
  city: string;
  link: string | null;
  email: string;
  grade: string;
  quote: string | null;
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
  is_favorite: boolean;
  pdf_url: string;
  organization_name: string;
  profile_photo_url: string;
  objective_for_summary: string | null;
  is_portfolio_shareable: boolean;
}

export interface Accomplishment {
  header: boolean;
  form_data?: FormData;
  form_type: FORM_TYPE_ENUM | string;
  category_id: string;
  category_name: string;
  sub_category_id?: string | null;
  accomplishment_id: string;
  sub_category_name?: string | null;
}

export interface FormData {
  id: string;
  internship_title?: string | null;
  date?: string | null;
  link: string;
  name?: string | null;
  class?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  grade_or_gpa?: string | null;
  transcript_urls?: string[];
  academic_semester?: string | null;
  accomplishment_id?: string | null;
  project_media_urls?: string[];
  academic_year_ended?: string | null;
  academic_year_started?: string | null;
  diploma_or_award_urls?: string[];
  school_or_institution?: string | null;
  standardized_test_score?: number;
  media_urls?: string[];
  document_urls?: string[];
  accomplishment_name?: string | null;
  region?: string | null;
  location?: string | null;
  team_name?: string | null;
  event_name?: string | null;
  opposing_team?: string | null;
  title_or_award?: string | null;
  award_title?: string | null;
  institution?: string | null;
  date_received?: string | null;
  award_certificate_urls?: string[];
  certificate_urls?: string[];
  certification_title?: string | null;
  club_name?: string | null;
  club_events?: string | null;
  date_joined?: string | null;
  club_volunteer?: string | null;
  membership_number?: string | null;
  started_date?: string | null;
  venture_name?: string | null;
  completion_date?: string | null;
  is_still_in_progress?: boolean;
  company?: string | null;
  destination?: string | null;
  date_arrived?: string | null;
  date_departed?: string | null;
  place_of_work?: string | null;
  internship_type?: string | null;
  additional_travel_locations?: string | null;
  ap_score?: string | null;
  language?: string | null;
  years_of_study?: number;
  is_native_language?: boolean;
  travel_path?: string | null;
  favorite_moments?: string | null;
  travel_companions?: string | null;
  investment_type?: string | null;
  skill_required?: string[];
  end_date?: string | null;
  start_date?: string | null;
  favorite_part?: string | null;
  acquired_skills?: string[];
  previous_skills?: string[];
  volunteer_title?: string | null;
  job_title?: string | null;
  is_current?: boolean;
}
