// Components
import AcademicsDetailsModal from '@/components/common/modals/detail-modals/academics-details-modal';
import ArtDetailsModal from '@/components/common/modals/detail-modals/art-details-modal';
import AthleticDetailsModal from '@/components/common/modals/detail-modals/athletic-details-modal';
import AwardsDetailsModal from '@/components/common/modals/detail-modals/awards-details-modal';
import CertificationsDetailsModal from '@/components/common/modals/detail-modals/certifications-details-modal';
import ClubsDetailsModal from '@/components/common/modals/detail-modals/clubs-details-modal';
import EmploymentDetailsModal from '@/components/common/modals/detail-modals/employment-details-modal';
import EntrepreneurshipDetailsModal from '@/components/common/modals/detail-modals/entrepreneurship-details-modal';
import InternshipsDetailsModal from '@/components/common/modals/detail-modals/internships-details-modal';
import InvestingDetailsModal from '@/components/common/modals/detail-modals/investing-details-modal';
import TalentsDetailsModal from '@/components/common/modals/detail-modals/talents-details-modal';
import TechDetailsModal from '@/components/common/modals/detail-modals/tech-details-modal';
import VolunteerDetailsModal from '@/components/common/modals/detail-modals/volunteer-details-modal';

// Enum
import { FORM_TYPE_ENUM } from '@/enum/form-type.enum';

// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { JSX } from 'react';

interface IProps {
  form_type?: FORM_TYPE_ENUM | string;
  form_data?: FormData;
}

export const Modals = ({ form_type, form_data }: IProps): JSX.Element => {
  switch (form_type) {
    case FORM_TYPE_ENUM.SpecializedSkill:
      return <></>;

    case FORM_TYPE_ENUM.GelInternshipAbroad:
      return <></>;

    case FORM_TYPE_ENUM.Entrepreneurship:
      return <EntrepreneurshipDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Certification:
      return <CertificationsDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.GelSemesterAtSea:
      return <></>;

    case FORM_TYPE_ENUM.GelStudyAbroad:
      return <></>;

    case FORM_TYPE_ENUM.Internship:
      return <InternshipsDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Employment:
      return <EmploymentDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Investment:
      return <InvestingDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Athletic:
      return <AthleticDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Volunteer:
      return <VolunteerDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Academic:
      return <AcademicsDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.GelLanguage:
      return <></>;

    case FORM_TYPE_ENUM.Talent:
      return <TalentsDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Award:
      return <AwardsDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Custom:
      return <></>;

    case FORM_TYPE_ENUM.GelTravel:
      return <></>;

    case FORM_TYPE_ENUM.Club:
      return <ClubsDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Tech:
      return <TechDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Art:
      return <ArtDetailsModal form_data={form_data} />;

    default:
      return <></>;
  }
};
