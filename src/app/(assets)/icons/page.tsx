import agency from 'public/pdf/agency.svg';
import airplane from 'public/pdf/airplane.svg';
import bill from 'public/pdf/bill.svg';
import info from 'public/pdf/info.svg';
import internshipAbroad from 'public/pdf/internship-abroad.svg';
import internships from 'public/pdf/internships.svg';
import language from 'public/pdf/language.svg';
import mobileProgramming from 'public/pdf/mobile-programming.svg';
import quote from 'public/pdf/quote.svg';
import ranking from 'public/pdf/ranking.svg';
import routing from 'public/pdf/routing.svg';
import star from 'public/pdf/star.svg';
import teacherBlue from 'public/pdf/teacher-blue.svg';
import Image from 'next/image';

const icons = [
  internshipAbroad,
  mobileProgramming,
  internships,
  teacherBlue,
  airplane,
  language,
  ranking,
  routing,
  agency,
  quote,
  bill,
  info,
  star,
];

const Page = () => {
  return (
    <div className="flex items-center gap-6">
      {icons.map((icon, i) => (
        <Image key={i} src={icon} alt="icon" width={24} height={24} />
      ))}
    </div>
  );
};

export default Page;
