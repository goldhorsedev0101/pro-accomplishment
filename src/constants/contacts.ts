// Icons
import call from 'public/icons/call.svg';
import linkIcon from 'public/icons/link.svg';
import location from 'public/icons/location.svg';
import sms from 'public/icons/sms.svg';

// Type
import { getDialCodeByISO } from '@/utils/iso-to-dial-code';
import { StaticImageData } from 'next/image';

type IContact = Array<{ label?: string; icon: StaticImageData }>;

export const contacts = ({
  iso,
  link,
  email,
  address,
  phone_number,
}: {
  iso: string;
  link?: string;
  email?: string;
  phone_number?: string;
  address?: string;
}): IContact => [
  { icon: sms, label: email },
  { icon: call, label: (getDialCodeByISO(iso) || '') + ' ' + phone_number },
  { icon: location, label: address },
  { icon: linkIcon, label: link },
];
