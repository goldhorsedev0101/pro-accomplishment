export interface ToggleFavoriteResponseT {
  error: null | string;
  message: string;
  data: Data;
}

export interface Data {
  candidate_id: string;
  is_favorited: boolean;
  recruiter_id: string;
  shared_folio_id: string;
}
