// Icons
import academics from '@/../public/icons/filters/academics.svg';
import agriculture from '@/../public/icons/filters/agriculture.svg';
import arts from '@/../public/icons/filters/arts.svg';
import athletics from '@/../public/icons/filters/athletics.svg';
import awards from '@/../public/icons/filters/awards.svg';
import certificate from '@/../public/icons/filters/certificate.svg';
import club from '@/../public/icons/filters/clubs.svg';
import employment from '@/../public/icons/filters/employment.svg';
import entrepreneurship from '@/../public/icons/filters/entrepreneurship.svg';
import globalExperience from '@/../public/icons/filters/global-experience-and-languages.svg';
import internships from '@/../public/icons/filters/internships.svg';
import investing from '@/../public/icons/filters/investing.svg';
import specializedSkills from '@/../public/icons/filters/specialized-skills.svg';
import talents from '@/../public/icons/filters/talents.svg';
import tech from '@/../public/icons/filters/tech.svg';
import volunteer from '@/../public/icons/filters/volunteer.svg';

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
  { icon: volunteer, label: 'Volunteer' },
  { icon: arts, label: 'Arts' },
  { icon: club, label: 'Clubs' },
  { icon: tech, label: 'Tech' },
  { icon: investing, label: 'Investing' },
  { icon: globalExperience, label: 'Global Experience and Languages' },
  { icon: specializedSkills, label: 'Specialized Skills' },
  { icon: agriculture, label: 'Agriculture' },
];

export { filters };
