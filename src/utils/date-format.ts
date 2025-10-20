import dayjs from 'dayjs';

const formatToMDYYYY = (date?: string) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('M/D/YYYY');
  else return '';
};

const formatToDDMMYYYY = (date?: string) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('D/M/YYYY');
  else return '';
};

const formatToDDMMMYYYY = (date?: string) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('DD MMM YYYY');
  else return '';
};

const formatToYYYY = (date?: string) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('YYYY');
  else return '';
};

const formatToMMMMDYYYY = (date?: string) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('MMMM D, YYYY');
  else return '';
};

export { formatToDDMMMYYYY, formatToDDMMYYYY, formatToMDYYYY, formatToMMMMDYYYY, formatToYYYY };
