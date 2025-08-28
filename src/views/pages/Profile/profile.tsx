import Box from '@/components/common/box';
import Heading from '@/components/common/heading';
import DeleteModal from '@/components/common/modals/delete-modal';
import EditProfileModal from '@/components/common/modals/edit-profile-modal';

const Profile = () => {
  const data = [
    { label: 'First Name', value: 'Jane' },
    { label: 'Last Name', value: 'Cooper' },
    { label: 'Email', value: 'Janecooper@gmail.com' },
  ];

  return (
    <div className="space-y-6">
      <Box>
        <div className="flex items-center justify-between">
          <Heading text="Profile" width="medium" size="31" />
          <EditProfileModal />
        </div>

        <div className="flex flex-col gap-y-3 divide-y">
          {data.map(({ label, value }, i) => (
            <div key={i} className={`flex flex-col gap-y-1 pb-2`}>
              <p className="text-base font-medium text-neutral-grey-100">{label}</p>
              <p className="text-base font-normal text-neutral-grey-70">{value}</p>
            </div>
          ))}
        </div>
      </Box>

      <DeleteModal />
    </div>
  );
};

export default Profile;
