'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Label } from './label';

interface IProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
}

function Input({ className, type, label, error, required, ...props }: IProps) {
  const [isOpen, setIsOpen] = React.useState<'password' | 'text'>(
    type === 'password' ? 'password' : 'text',
  );

  return (
    <div className="flex flex-col relative w-full">
      <Label className="text-sm flex gap-0.5 font-normal" htmlFor={label}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <input
        id={label}
        type={isOpen}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 !py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-xs',
          className,
        )}
        {...props}
      />

      {error && <span className="text-destructive text-sm font-normal">{error}</span>}

      {type === 'password' && (
        <span
          onClick={() => setIsOpen(isOpen === 'text' ? 'password' : 'text')}
          className="text-neutral-grey-50 cursor-pointer w-fit absolute right-3 top-11 -translate-y-1/2"
        >
          {isOpen == 'password' ? <AiOutlineEye size={25} /> : <AiOutlineEyeInvisible size={25} />}
        </span>
      )}
    </div>
  );
}

export { Input };
