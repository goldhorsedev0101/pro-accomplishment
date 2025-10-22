'use client';

// Types
import { FormikValues } from 'formik';
import { FC, Fragment, JSX, useEffect, useState } from 'react';

// Toast
import toast from 'react-hot-toast';

// Dropzone
import Dropzone from 'react-dropzone';

// Component
import Image from 'next/image';

// Icons
import camera from 'public/icons/camera.svg';
import gallery from 'public/icons/gallery.svg';

// Mutation

// Loader
import { uploadProfilePicture } from '@/services/server/authService';
import { MoonLoader } from 'react-spinners';

interface IProps {
  setFieldValue: FormikValues['setFieldValue'];
  value: string | null;
  name: string;
}

const FileUploader: FC<IProps> = ({ setFieldValue, value, name }): JSX.Element => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [img, setImg] = useState<string>(value || '');

  const handleImageUpload = async (newFiles: File[]): Promise<void> => {
    setIsPending(true);
    const file = newFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB!');
      setIsPending(false);
      return;
    }

    try {
      const { data } = await uploadProfilePicture({ oldUrl: value ?? '', file });

      setImg(typeof data !== 'string' ? data?.publicUrl || '' : data);
      setIsPending(false);
    } catch (error) {
      console.log('🚀 ~ handleImageUpload ~ error:', error);
      toast.error('Image upload failed!');
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (value) setImg(value);
  }, [value]);

  useEffect(() => {
    if (img) setFieldValue(name, img);
  }, [img]);

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
          className={`relative rounded-full h-[130px] w-[130px] flex items-center justify-center cursor-pointer bg-[#F4F5F8] self-center`}
          {...getRootProps()}
        >
          {isPending ? (
            <MoonLoader color="#49909d" size={60} />
          ) : img ? (
            <Fragment>
              <input {...getInputProps()} />
              <Image
                src={img}
                alt="profile"
                className="object-cover rounded-full h-[130px] w-[130px] overflow-hidden"
                fill
              />
            </Fragment>
          ) : (
            <Fragment>
              <input {...getInputProps()} />
              <Image src={gallery} alt="Gallery" sizes="56" />
            </Fragment>
          )}
          <Image src={camera} alt="Camera" sizes="36" className="absolute bottom-0 right-0" />
        </div>
      )}
    </Dropzone>
  );
};

export default FileUploader;
