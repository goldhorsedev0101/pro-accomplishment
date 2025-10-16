import { Cards } from '@/constants/cards';
import { Modals } from '@/constants/modals';
import { Accomplishment } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC, Fragment } from 'react';
import DetailsModalLayout from '../modals/details-modal-layout';

interface IProps {
  accomplishments?: Array<Accomplishment>;
}

const RenderCards: FC<IProps> = ({ accomplishments }) => {
  return (
    <Fragment>
      {accomplishments?.map((item, i) => {
        const isGlobal = item.category_name === 'Global Experience and Languages';

        return (
          <DetailsModalLayout
            key={i}
            trigger={Cards({ ...item })}
            title={isGlobal ? (item.sub_category_name ?? item.category_name) : item.category_name}
          >
            {Modals({ ...item })}
          </DetailsModalLayout>
        );
      })}
    </Fragment>
  );
};

export default RenderCards;
