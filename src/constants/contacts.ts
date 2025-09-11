// Icons
import call from 'public/icons/call.svg';
import linkIcon from 'public/icons/link.svg';
import location from 'public/icons/location.svg';
import sms from 'public/icons/sms.svg';

// Type
import { StaticImageData } from 'next/image';

type IContact = Array<{ label?: string; icon: StaticImageData }>;

export const contacts = ({
  link,
  email,
  phone_number,
  address,
}: {
  link?: string;
  email?: string;
  phone_number?: string;
  address?: string;
}): IContact => [
  { icon: sms, label: email },
  { icon: call, label: phone_number },
  { icon: location, label: address },
  { icon: linkIcon, label: link },
];
