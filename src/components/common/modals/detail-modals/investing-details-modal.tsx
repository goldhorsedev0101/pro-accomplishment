// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Box from '../../box';
import Document from '../../studets-details/document';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';

// Util
import { formatToDDMMYYYY } from '@/utils/date-format';

interface IProps {
  form_data?: FormData;
}

const InvestingDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.accomplishment_name || form_data?.date || form_data?.investment_type) && (
        <Box className="!border-none !p-3 !gap-2">
          <p className="text-heading font-medium capitalize">{form_data?.accomplishment_name}</p>
          <div className="gap-x-1 flex items-center justify-between">
            <p className="text-neutral-grey-80 text-sm capitalize">{form_data?.investment_type}</p>
            <p className="text-neutral-grey-80 text-sm">
              {formatToDDMMYYYY(form_data?.date ?? '')}
            </p>
          </div>
        </Box>
      )}

      {form_data?.document_urls && form_data?.document_urls?.length > 0 && (
        <Document certificate_urls={form_data?.document_urls} />
      )}

      {form_data?.media_urls && form_data?.media_urls?.length > 0 && (
        <Media media_urls={form_data?.media_urls} />
      )}

      {form_data?.link && <Links link={form_data?.link} />}
      {form_data?.notes && <Note note={form_data?.notes} />}
    </div>
  );
};

export default InvestingDetailsModal;
