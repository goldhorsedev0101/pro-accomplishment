// Types
import { FormData } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';
import { FC } from 'react';

// Components
import Image from 'next/image';
import Box from '../../box';
import Document from '../../studets-details/document';
import Items from '../../studets-details/items';
import Links from '../../studets-details/links';
import Media from '../../studets-details/media';
import Note from '../../studets-details/note';

// Util
import { formatToMDYYYY, formatToYYYY } from '@/utils/date-format';

// Icons
import book from 'public/icons/book.svg';
import calender from 'public/icons/calendar.svg';
import cup from 'public/icons/cup.svg';
import person from 'public/icons/percentage.svg';

interface IProps {
  form_data?: FormData;
}

const AcademicsDetailsModal: FC<IProps> = ({ form_data }) => {
  return (
    <div className="flex flex-col gap-y-4 font-quicksand">
      {(form_data?.name || form_data?.academic_year_started || form_data?.academic_year_ended) && (
        <Box className="!border-none !p-3 !gap-2">
          <div className="flex items-center justify-between">
            <p className="text-heading font-medium ">{form_data?.name}</p>
            <p className="py-0.5 px-1.5 rounded-sm text-neutral-grey-80 text-sm bg-green-light">
              {formatToYYYY(form_data?.academic_year_started ?? '')} -{' '}
              {formatToYYYY(form_data?.academic_year_ended ?? '')}
            </p>
          </div>

          <p className="text-neutral-grey-80 text-sm">{form_data?.school_or_institution}</p>
        </Box>
      )}

      {(form_data?.title_or_award || form_data?.region) && (
        <Box className="!border-none !p-3 !gap-2">
          <div className="flex items-center gap-x-1">
            <Image alt="title/award" src={cup} width={20} height={20} />
            <p className="text-heading font-medium">Title / Award</p>
          </div>
          <p className="text-heading text-sm">
            {form_data?.title_or_award} {form_data?.region && '- ' + form_data?.region}
          </p>
        </Box>
      )}

      {(form_data?.academic_semester ||
        form_data?.date ||
        form_data?.class ||
        form_data?.standardized_test_score) && (
        <Items
          gpa={form_data?.grade_or_gpa as string}
          label="My Academic Details"
          items={[
            { icon: calender, label: 'Date', value: formatToMDYYYY(form_data?.date ?? '') },
            { icon: calender, label: 'Academic Semester', value: form_data?.academic_semester },
            { icon: book, label: 'Class', value: form_data?.class },
            {
              icon: person,
              label: 'Standardized Test Scores',
              value: form_data?.standardized_test_score + '%',
            },
          ]}
        />
      )}

      {(form_data?.team_name || form_data?.opposing_team) && (
        <Box className="!border-none !p-3 !gap-2">
          <p className="text-heading font-medium">Team</p>

          {form_data?.team_name && (
            <div className="flex items-center justify-between">
              <p className="text-neutral-grey-80 text-sm">Team</p>
              <p className="text-heading text-sm font-medium">{form_data?.team_name}</p>
            </div>
          )}

          {form_data?.opposing_team && (
            <div className="flex items-center justify-between">
              <p className="text-neutral-grey-80 text-sm">Opposing Team</p>
              <p className="text-heading text-sm font-medium">{form_data?.opposing_team}</p>
            </div>
          )}
        </Box>
      )}

      {form_data?.transcript_urls && form_data?.transcript_urls?.length > 0 && (
        <Document title="Transcripts" certificate_urls={form_data?.transcript_urls} />
      )}

      {form_data?.diploma_or_award_urls && form_data?.diploma_or_award_urls?.length > 0 && (
        <Document title="Diplomas/Awards" certificate_urls={form_data?.diploma_or_award_urls} />
      )}

      {form_data?.project_media_urls && form_data?.project_media_urls?.length > 0 && (
        <Media media_urls={form_data?.project_media_urls} title="Projects" />
      )}

      {form_data?.link && <Links link={form_data?.link} />}
      {form_data?.notes && <Note note={form_data?.notes} />}
    </div>
  );
};

export default AcademicsDetailsModal;
