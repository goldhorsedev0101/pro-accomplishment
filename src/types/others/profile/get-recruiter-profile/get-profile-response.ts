import { SubscriptionType } from '../../subscription.type';

export interface GetProfileResponseT {
  message: string;
  data: Data;
  error: string | null;
}

export interface Data {
  subscription: SubscriptionType;
  profile_picture: null | string;
  role_position: string;
  phone_number: string;
  recruiter_id: string;
  profile_id: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  role: string;
  iso2: string;
}
