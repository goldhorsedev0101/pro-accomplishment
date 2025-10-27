import { FormikValues } from 'formik';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface IProps {
  setIso2?: (iso2: string) => void;
  setFieldValue?: FormikValues['setFieldValue'];
  containerClass?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  touched?: boolean;
  error?: string;
  iso2?: string;
  value: string;
  label: string;
  name: string;
}

const PhoneNumberInput = ({
  setIso2,
  setFieldValue,
  value,
  name,
  placeholder,
  className,
  label,
  error,
  touched,
  iso2,
  required,
}: IProps) => {
  const isError = error && touched;

  return (
    <label className={`flex flex-col w-full -mb-4`} htmlFor={name}>
      {label && (
        <span className={`text-sm`}>
          {label} {required && <span className="text-destructive"> *</span>}
        </span>
      )}

      <PhoneInput
        containerStyle={{ borderColor: '#E9EDEE', borderRadius: '4px' }}
        containerClass={`${`!border w-full !border-[#E9EDEE] !rounded-md p-1 !min-w-[10px] !font-medium selection:bg-primary !placeholder:text-sm selection:text-primary-foreground ${className} border`}`}
        inputClass={`!text-black !min-w-[150px] sm:!w-[380px] !w-full !border-none !bg-transparent border disabled:opacity-55`}
        buttonClass="!border-none !ml-2 !p-0 !bg-transparent !text-black"
        country={iso2 ?? 'us'}
        value={value}
        onChange={(phone, data: CountryData) => {
          setIso2?.(data?.countryCode || '');
          setFieldValue(name, phone);
        }}
        placeholder={placeholder}
      />

      {error && <span className="text-destructive text-sm font-normal pb-2">{error}</span>}
    </label>
  );
};

export default PhoneNumberInput;
