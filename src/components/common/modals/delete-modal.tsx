'use client';

// Components
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import BasicModal from './basic-modal';

// Types
import { JSX, useState } from 'react';

// Toast
import Routes from '@/constants/routes';
import { useDeleteProfileMutation } from '@/services/others/profile/delete-recruiter-profile';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const DeleteModal = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteText, setDeleteText] = useState<string>('');
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { mutateAsync, isPending } = useDeleteProfileMutation();

  const handleDeleteAccount = async () => {
    if (deleteText === 'Accomplishment') {
      const res = await mutateAsync(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get-profile'], refetchType: 'all' });
          toast.success('Profile Deleted successfully');
        },
      });

      if (res) {
        setIsOpen(false);
        setDeleteText('');
        deleteCookie('accessToken');
        push(Routes.signIn);
      }
    } else toast.error('Invalid input');
  };

  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={{
        className: 'text-red font-medium text-base cursor-pointer w-fit',
        child: 'Delete Account',
      }}
      title={{
        title: 'Are you sure you want to delete your account?',
        className: 'text-center',
      }}
      footer={
        <div className="flex flex-col gap-y-3 w-full">
          <p className="text-neutral-grey-100 font-medium text-center select-none">
            Type “Accomplishment” to confirm
          </p>
          <Input
            value={deleteText}
            className="w-full h-14 rounded-xl bg-white"
            onChange={(e) => setDeleteText(e.target.value)}
          />
          <DialogClose asChild>
            <Button
              disabled={isPending}
              variant={'destructive'}
              onClick={handleDeleteAccount}
              className="w-full bg-red h-14 rounded-xl"
            >
              Delete
            </Button>
          </DialogClose>
        </div>
      }
    />
  );
};

export default DeleteModal;
