// Components
import AcademicsDetailsModal from '@/components/common/modals/detail-modals/academics-details-modal';
import AthleticDetailsModal from '@/components/common/modals/detail-modals/athletic-details-modal';

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
      return <></>;

    case FORM_TYPE_ENUM.Certification:
      return <></>;

    case FORM_TYPE_ENUM.GelSemesterAtSea:
      return <></>;

    case FORM_TYPE_ENUM.GelStudyAbroad:
      return <></>;

    case FORM_TYPE_ENUM.Internship:
      return <></>;

    case FORM_TYPE_ENUM.Employment:
      return <></>;

    case FORM_TYPE_ENUM.Investment:
      return <></>;

    case FORM_TYPE_ENUM.Athletic:
      return <AthleticDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.Volunteer:
      return <></>;

    case FORM_TYPE_ENUM.Academic:
      return <AcademicsDetailsModal form_data={form_data} />;

    case FORM_TYPE_ENUM.GelLanguage:
      return <></>;

    case FORM_TYPE_ENUM.Talent:
      return <></>;

    case FORM_TYPE_ENUM.Award:
      return <></>;

    case FORM_TYPE_ENUM.Custom:
      return <></>;

    case FORM_TYPE_ENUM.GelTravel:
      return <></>;

    case FORM_TYPE_ENUM.Club:
      return <></>;

    case FORM_TYPE_ENUM.Tech:
      return <></>;

    case FORM_TYPE_ENUM.Art:
      return <></>;

    default:
      return <></>;
  }
};
