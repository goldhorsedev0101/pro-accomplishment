export interface SubscriptionType {
  id: string;
  status: string;
  platform: string;
  auto_renew: boolean;
  created_at: string;
  profile_id: string;
  start_date: string;
  updated_at: string;
  product_type: string;
  renewal_count: number;
  transaction_id: string;
  last_renewal_at: string;
  has_acknowledged: boolean;
  transaction_date: number;
  current_period_end: string;
  cancel_at_period_end: boolean;
  apple_subscription_log_id: string;
  google_subscription_log_id: string;
  stripe_subscription_log_id: string;
}
