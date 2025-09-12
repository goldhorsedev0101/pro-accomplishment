// Components
import AcademicsCard from '@/components/common/cards/detail-cards/academics-card';
import ArtCard from '@/components/common/cards/detail-cards/art-card';
import AthleticsCard from '@/components/common/cards/detail-cards/athletics-card';
import AwardsCard from '@/components/common/cards/detail-cards/awards-card';
import CertificationsCard from '@/components/common/cards/detail-cards/certifications-card';
import ClubsCard from '@/components/common/cards/detail-cards/clubs-card';
import CustomCard from '@/components/common/cards/detail-cards/custom-card';
import EmploymentCard from '@/components/common/cards/detail-cards/employment-card';
import EntrepreneurshipCard from '@/components/common/cards/detail-cards/entrepreneurship-card';
import InternshipAbroadCard from '@/components/common/cards/detail-cards/internship-abroad-card';
import InternshipsCard from '@/components/common/cards/detail-cards/internships-card';
import InvestingCard from '@/components/common/cards/detail-cards/investing-card';
import LanguageCard from '@/components/common/cards/detail-cards/language-card';
import SemesterAtSeaCard from '@/components/common/cards/detail-cards/semester-at-sea-card';
import SpecializedSkillsCard from '@/components/common/cards/detail-cards/specialized-skills-card';
import StudyAbroadCard from '@/components/common/cards/detail-cards/study-abroad-card';
import TalentsCard from '@/components/common/cards/detail-cards/talents-card';
import TechCard from '@/components/common/cards/detail-cards/tech-card';
import TravelCard from '@/components/common/cards/detail-cards/travel-card';
import VolunteerCard from '@/components/common/cards/detail-cards/volunteer-card';

// Enum
import { FORM_TYPE_ENUM } from '@/enum/form-type.enum';

// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { JSX } from 'react';

interface IProps {
  form_type?: FORM_TYPE_ENUM | string;
  form_data?: FormData;
}

export const Cards = ({ form_type, form_data }: IProps): JSX.Element => {
  switch (form_type) {
    case FORM_TYPE_ENUM.SpecializedSkill:
      return <SpecializedSkillsCard form_data={form_data} />;

    case FORM_TYPE_ENUM.GelInternshipAbroad:
      return <InternshipAbroadCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Entrepreneurship:
      return <EntrepreneurshipCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Certification:
      return <CertificationsCard form_data={form_data} />;

    case FORM_TYPE_ENUM.GelSemesterAtSea:
      return <SemesterAtSeaCard form_data={form_data} />;

    case FORM_TYPE_ENUM.GelStudyAbroad:
      return <StudyAbroadCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Internship:
      return <InternshipsCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Employment:
      return <EmploymentCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Investment:
      return <InvestingCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Athletic:
      return <AthleticsCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Volunteer:
      return <VolunteerCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Academic:
      return <AcademicsCard form_data={form_data} />;

    case FORM_TYPE_ENUM.GelLanguage:
      return <LanguageCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Talent:
      return <TalentsCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Award:
      return <AwardsCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Custom:
      return <CustomCard form_data={form_data} />;

    case FORM_TYPE_ENUM.GelTravel:
      return <TravelCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Club:
      return <ClubsCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Tech:
      return <TechCard form_data={form_data} />;

    case FORM_TYPE_ENUM.Art:
      return <ArtCard form_data={form_data} />;

    default:
      return <></>;
  }
};
