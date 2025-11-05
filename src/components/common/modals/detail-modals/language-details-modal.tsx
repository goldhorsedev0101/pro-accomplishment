// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Box from '../../box';
import Document from '../../studets-details/document';
import Items from '../../studets-details/items';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';

// Util
import { formatToMDYYYY } from '@/utils/date-format';

// Icons
import book from 'public/icons/book.svg';

interface IProps {
  form_data?: FormData;
}

const LanguageDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.accomplishment_name || form_data?.date) && (
        <Box className="!border-none !p-3 !gap-1">
          {form_data?.accomplishment_name && (
            <p className="text-heading font-medium ">{form_data?.accomplishment_name}</p>
          )}
          {form_data?.date && (
            <p className="text-neutral-grey-80 text-sm">{formatToMDYYYY(form_data?.date)}</p>
          )}
        </Box>
      )}

      {form_data?.language && (
        <Box className="!border-none !p-3 !gap-1">
          <p className="text-heading font-medium ">Language</p>
          <p className="text-neutral-grey-80 text-sm">{form_data?.language}</p>
        </Box>
      )}

      {form_data?.years_of_study && (
        <Items
          items={[
            { icon: book, label: 'Years of Study', value: form_data?.years_of_study.toString() },
          ]}
        />
      )}

      {form_data?.ap_score && (
        <Box className="!border-none !flex-row justify-between !p-3 items-center !gap-1 text-neutral-grey-100 font-medium ">
          <p>AP Score</p>
          <p className="text-lg">{form_data?.ap_score}</p>
        </Box>
      )}

      {form_data?.institution && (
        <Box className="!border-none !p-3 !gap-1">
          <p className="text-heading font-medium ">Institution or Schools of Study</p>
          <p className="text-neutral-grey-80 text-sm">{form_data?.institution}</p>
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

export default LanguageDetailsModal;
