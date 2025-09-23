// Icons
import changePasswordColored from 'public/icons/sidebar/change-password-colored.svg';
import changePassword from 'public/icons/sidebar/change-password.svg';
import logout from 'public/icons/sidebar/logout.svg';
import privacyPolicyColored from 'public/icons/sidebar/privacy-policy-colored.svg';
import privacyPolicy from 'public/icons/sidebar/privacy-policy.svg';
import profileColored from 'public/icons/sidebar/profile-colored.svg';
import profile from 'public/icons/sidebar/profile.svg';
import subscriptionColored from 'public/icons/sidebar/subscription-colored.svg';
import subscription from 'public/icons/sidebar/subscription.svg';
import termsConditionsColored from 'public/icons/sidebar/terms-conditions-colored.svg';
import termsConditions from 'public/icons/sidebar/terms-conditions.svg';

// Enum
import { PROFILE_ENUM } from '@/enum/profile.enum';

// Type
import { StaticImageData } from 'next/image';

type ProfileSidebarType = {
  label: PROFILE_ENUM;
  icon: StaticImageData;
  coloredIcon: StaticImageData;
};

const { CHANGE_PASSWORD, LOGOUT, PRIVACY_POLICY, PROFILE, SUBSCRIPTION, TERMS_CONDITIONS } =
  PROFILE_ENUM;

export const sidebar: Array<ProfileSidebarType> = [
  { icon: profile, coloredIcon: profileColored, label: PROFILE },
  { icon: subscription, coloredIcon: subscriptionColored, label: SUBSCRIPTION },
  { icon: changePassword, coloredIcon: changePasswordColored, label: CHANGE_PASSWORD },
  { icon: privacyPolicy, coloredIcon: privacyPolicyColored, label: PRIVACY_POLICY },
  { icon: termsConditions, coloredIcon: termsConditionsColored, label: TERMS_CONDITIONS },
  { icon: logout, label: LOGOUT, coloredIcon: logout },
];
