import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function CustomPhoneInput() {
  return (
    <PhoneInput
      country={'us'}
      value={''}
      onChange={(e) => {
        console.log('🚀 ~ phone:', e);
      }}
      inputProps={{
        name: 'phoneNumber',
      }}
      containerClass="w-full border border-[#DCDFE4] rounded-md overflow-hidden"
      buttonClass="!h-[42px] !bg-white !border-r-2 !border-y-0 !border-l-0 flex items-center justify-center px-2"
      inputClass="!h-[42px] !w-full !pl-[70px] !border-none focus:ring-0 focus:outline-none"
      inputStyle={{
        fontFamily: 'Archivo Narrow, sans-serif',
      }}
      dropdownStyle={{
        zIndex: 1000,
      }}
      enableSearch={true}
    />
  );
}
