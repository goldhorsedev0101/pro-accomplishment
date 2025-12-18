'use client';

// Components
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import BasicModal from './basic-modal';

// Types
import { Dispatch, FC, JSX, SetStateAction } from 'react';

// Toast
import Routes from '@/constants/routes';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LogoutModal: FC<IProps> = ({ isOpen, setIsOpen }): JSX.Element => {
  const { push, refresh } = useRouter();

  const handleDeleteAccount = async () => {
    toast.success('Logged out successfully');
    push(Routes.deleteCandidateAccount);
    deleteCookie('accessToken');
    setIsOpen(false);
    refresh();
  };

  const handleClose = () => {
    push(Routes.home);
    setIsOpen(false);
  };

  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={handleClose}
      trigger={{
        className: 'text-red font-medium text-base cursor-pointer w-fit',
        child: null,
      }}
      title={{
        title: 'Kindly log out of your recruiter account before deleting the candidate account.',
        className: 'text-center !text-xl mb-4',
      }}
      footer={
        <div className="grid grid-cols-2 gap-x-3 w-full">
          <DialogClose asChild>
            <Button onClick={handleDeleteAccount}>Logout</Button>
          </DialogClose>

          <Button onClick={handleClose} variant={'outline'}>
            Cancel
          </Button>
        </div>
      }
    />
  );
};

export default LogoutModal;
