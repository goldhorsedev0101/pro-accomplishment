import { FORM_TYPE_ENUM } from '@/enum/form-type.enum';
import {
  Accomplishment,
  FormData,
} from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC, Fragment } from 'react';
import Box from '../box';
import Heading from '../heading';
import DetailsModalLayout from '../modals/details-modal-layout';
import AcademicsCard from './academics-card';
import AthleticsCard from './athletics-card';
import AwardsCard from './awards-card';
import CertificationsCard from './certifications-card';
import EmploymentCard from './employment-card';
import TalentsCard from './talents-card';

interface IProps {
  accomplishments?: Array<Accomplishment>;
}

const RenderCards: FC<IProps> = ({ accomplishments }) => {
  const renderCard = (form_type: FORM_TYPE_ENUM, form_data: FormData) => {
    switch (form_type) {
      case FORM_TYPE_ENUM.Athletic:
        return <AthleticsCard form_data={form_data} />;

      case FORM_TYPE_ENUM.Academic:
        return <AcademicsCard form_data={form_data} />;

      case FORM_TYPE_ENUM.Award:
        return <AwardsCard form_data={form_data} />;

      case FORM_TYPE_ENUM.Certification:
        return <CertificationsCard />;

      case FORM_TYPE_ENUM.Employment:
        return <EmploymentCard />;

      case FORM_TYPE_ENUM.Talent:
        return <TalentsCard />;

      case FORM_TYPE_ENUM.Custom:
        return;

      case FORM_TYPE_ENUM.SpecializedSkill:
        return;

      case FORM_TYPE_ENUM.Art:
        return;

      case FORM_TYPE_ENUM.Club:
        return;

      case FORM_TYPE_ENUM.Tech:
        return;

      case FORM_TYPE_ENUM.Entrepreneurship:
        return;

      case FORM_TYPE_ENUM.Investment:
        return;

      case FORM_TYPE_ENUM.GelTravel:
        return;

      case FORM_TYPE_ENUM.GelStudyAbroad:
        return;

      case FORM_TYPE_ENUM.GelSemesterAtSea:
        return;

      case FORM_TYPE_ENUM.GelInternshipAbroad:
        return;

      case FORM_TYPE_ENUM.Volunteer:
        return;

      case FORM_TYPE_ENUM.Internship:
        return;

      case FORM_TYPE_ENUM.GelLanguage:
        return;

      default:
        return form_type;
    }
  };

  return (
    <Fragment>
      {accomplishments?.map((item, i) => (
        <Box className="!gap-y-4 !border-none !p-0" key={i}>
          {item.header && (
            <Heading
              className="!text-lg !text-neutral-grey-60"
              text={item.category_name}
              width="medium"
            />
          )}

          <DetailsModalLayout trigger={renderCard(item.form_type, item.form_data)}>
            <></>
          </DetailsModalLayout>
        </Box>
      ))}
    </Fragment>
  );
};

export default RenderCards;
