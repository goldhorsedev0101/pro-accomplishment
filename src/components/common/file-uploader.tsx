'use client';

// React & next Imports
import { FC } from 'react';
import toast from 'react-hot-toast';

// Dropzone Imports
import Dropzone from 'react-dropzone';

// Formik Imports
import { FormikValues } from 'formik';
import Image from 'next/image';

import camera from '@/../public/icons/camera.svg';
import gallery from '@/../public/icons/gallery.svg';

interface IProps {
  setFieldValue: FormikValues['setFieldValue'];
  value: string | null;
  name: string;
}

const FileUploader: FC<IProps> = ({ name, setFieldValue }) => {
  const handleImageUpload = async (newFiles: File[]): Promise<void> => {
    const file = newFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      //   const response = (await POST(URL.POST_KNEE, formData)) as {
      //     url: string;
      //   };

      setFieldValue(name, file.name);
    } catch (error) {
      console.log('🚀 ~ handleImageUpload ~ error:', error);
      toast.error('Image upload failed!', {
        position: 'top-right',
      });
    }
  };

  return (
    <Dropzone
      onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles)}
      accept={{
        'image/jpeg': [],
        'image/png': [],
        'image/pdf': [],
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className="relative rounded-full h-[130px] w-[130px] flex items-center justify-center cursor-pointer bg-[#F4F5F8] self-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Image src={gallery} alt="Gallery" sizes="56" />
          <Image src={camera} alt="Camera" sizes="36" className="absolute bottom-0 right-0" />
        </div>
      )}
    </Dropzone>
  );
};

export default FileUploader;
