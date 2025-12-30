// Components
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';
import Loader from '@/components/common/loader';
import DeleteModal from '@/components/common/modals/delete-modal';
import EditProfileModal from '@/components/common/modals/edit-profile-modal';
import { GetProfileResponseT } from '@/types/others/profile/get-recruiter-profile/get-profile-response';

// Type
import { FC, Fragment, JSX } from 'react';

interface IProps {
  data?: GetProfileResponseT['data'];
  isPending: boolean;
}

const Profile: FC<IProps> = ({ data, isPending }): JSX.Element => {
  const {
    iso2,
    email,
    company,
    last_name,
    first_name,
    phone_number,
    role_position,
    profile_picture,
  } = data || {};

  const number = phone_number?.startsWith('+')
    ? phone_number
    : `${phone_number && '+' + phone_number}`;

  const info = [
    { label: 'First Name', value: first_name },
    { label: 'Last Name', value: last_name },
    { label: 'Email', value: email },
    { label: 'Phone Number', value: number },
    { label: 'Company', value: company },
    { label: 'Position', value: role_position },
  ];

  if (isPending) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Box>
        <div className="flex items-center justify-between">
          <Heading text="Profile" width="medium" size="31" />
          <EditProfileModal
            profile_picture={profile_picture as string}
            role_position={role_position}
            phone_number={phone_number}
            first_name={first_name}
            last_name={last_name}
            company={company}
            email={email}
            iso2={iso2}
          />
        </div>

        <div className="flex flex-col gap-y-3 divide-y">
          {info?.map(({ label, value }, i) => (
            <Fragment key={i}>
              {value && (
                <div className={`flex flex-col gap-y-1 pb-2`}>
                  <p className="text-base font-medium text-neutral-grey-100 capitalize">{label}</p>
                  <p className="text-base font-normal text-neutral-grey-80">{value}</p>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Box>

      <DeleteModal />
    </div>
  );
};

export default Profile;
