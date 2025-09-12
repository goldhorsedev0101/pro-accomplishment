import { Cards } from '@/constants/cards';
import { Modals } from '@/constants/modals';
import { Accomplishment } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC, Fragment } from 'react';
import Box from '../box';
import Heading from '../heading';
import DetailsModalLayout from '../modals/details-modal-layout';

interface IProps {
  accomplishments?: Array<Accomplishment>;
}

const RenderCards: FC<IProps> = ({ accomplishments }) => {
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

          <DetailsModalLayout trigger={Cards({ ...item })}>
            {Modals({ ...item })}
          </DetailsModalLayout>
        </Box>
      ))}
    </Fragment>
  );
};

export default RenderCards;
