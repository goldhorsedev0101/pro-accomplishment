// Icons
import call from '@/../public/icons/call.svg';
import link from '@/../public/icons/link.svg';
import location from '@/../public/icons/location.svg';
import sms from '@/../public/icons/sms.svg';

// Type
import { StaticImageData } from 'next/image';

type IContact = Array<{ label: string; icon: StaticImageData }>;

export const contacts: IContact = [
  { icon: sms, label: 'emma@gmail.com' },
  { icon: call, label: '+1 (555) 987-6543' },
  { icon: location, label: 'Los Angeles, California' },
  { icon: link, label: 'https://docs.google.com/spreadsheets/' },
];
