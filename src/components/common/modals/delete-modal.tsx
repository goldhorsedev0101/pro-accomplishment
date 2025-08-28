'use client';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModal from './basic-modal';

const DeleteModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteText, setDeleteText] = useState<string>('');

  const handleDeleteAccount = () => {
    if (deleteText === 'Accomplishment') {
      setIsOpen(false);
      setDeleteText('');
      toast.success('Account Deleted successfully');
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
