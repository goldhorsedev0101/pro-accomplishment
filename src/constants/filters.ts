// Icons
import academics from '@/../public/icons/academics.svg';
import athletics from '@/../public/icons/athletics.svg';
import awards from '@/../public/icons/awards.svg';
import certificate from '@/../public/icons/certificate.svg';
import employment from '@/../public/icons/employment.svg';
import entrepreneurship from '@/../public/icons/entrepreneurship.svg';
import internships from '@/../public/icons/internships.svg';
import talents from '@/../public/icons/talents.svg';

import { StaticImageData } from 'next/image';

type IFilters = Array<{ label: string; icon: StaticImageData }>;

const filters: IFilters = [
  { icon: academics, label: 'Academics' },
  { icon: athletics, label: 'Athletics' },
  { icon: awards, label: 'Awards' },
  { icon: certificate, label: 'Certificate' },
  { icon: talents, label: 'Talents' },
  { icon: employment, label: 'Employment' },
  { icon: internships, label: 'Internships' },
  { icon: entrepreneurship, label: 'Entrepreneurship' },
];

export { filters };
