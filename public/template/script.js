const baseUrl = 'https://accomplishment-eta.vercel.app/_next/static/media';

const icons = {
  mobileProgramming: `${baseUrl}/mobile-programming.3c5819cd.svg`,
  internshipAbroad: `${baseUrl}/internship-abroad.9233ba24.svg`,
  locationColored: `${baseUrl}/location-colored.738133e0.svg`,
  calendarTick: `${baseUrl}/calendar-tick.23bbfdc7.svg`,
  teacherBlue: `${baseUrl}/teacher-blue.ff47ed09.svg`,
  internships: `${baseUrl}/internships.aaba9a79.svg`,
  percentage: `${baseUrl}/percentage.80bd85b1.svg`,
  medalStar: `${baseUrl}/medal-star.a55246c5.svg`,
  magicStar: `${baseUrl}/magic-star.db970942.svg`,
  briefcase: `${baseUrl}/briefcase.e819a4ad.svg`,
  location: `${baseUrl}/location.1c9794be.svg`,
  airplane: `${baseUrl}/airplane.a938ba93.svg`,
  language: `${baseUrl}/language.9ce26b95.svg`,
  building: `${baseUrl}/building.3f92b1f8.svg`,
  teacher: `${baseUrl}/teacher.1fcdcd2d.svg`,
  ranking: `${baseUrl}/ranking.120944be.svg`,
  routing: `${baseUrl}/routing.b47ca147.svg`,
  agency: `${baseUrl}/agency.4a0b3674.svg`,
  school: `${baseUrl}/school.f86afacd.svg`,
  quote: `${baseUrl}/quote.58b2c126.svg`,
  link: `${baseUrl}/link.c632406f.svg`,
  call: `${baseUrl}/call.a3487411.svg`,
  email: `${baseUrl}/sms.71b127fb.svg`,
  book: `${baseUrl}/book.6f5ccee5.svg`,
  note: `${baseUrl}/note.0bf9d5ba.svg`,
  bill: `${baseUrl}/bill.47881c40.svg`,
  info: `${baseUrl}/info.746f1fc8.svg`,
  star: `${baseUrl}/star.b04aaa2e.svg`,
  cup: `${baseUrl}/cup.f8281e24.svg`,
};

// ============================ Date Formatter Functions ============================ //
const formatToMDYYYY = (date) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('D/M/YYYY');
  else return '';
};

const formatToDDMMYYYY = (date) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('D/M/YYYY');
  else return '';
};

const formatToDDMMMYYYY = (date) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('DD MMM YYYY');
  else return '';
};

const formatToYYYY = (date) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('YYYY');
  else return '';
};

const formatToMMMMDYYYY = (date) => {
  if (date && dayjs(date).isValid()) return dayjs(date).format('MMMM D, YYYY');
  else return '';
};
// ============================ Date Formatter Functions End ============================ //

function getDialCodeByISO(isoCode) {
  const dialCodes = {
    AD: '+376',
    AE: '+971',
    AF: '+93',
    AG: '+1',
    AI: '+1',
    AL: '+355',
    AM: '+374',
    AO: '+244',
    AR: '+54',
    AS: '+1',
    AT: '+43',
    AU: '+61',
    AW: '+297',
    AX: '+358',
    AZ: '+994',
    BA: '+387',
    BB: '+1',
    BD: '+880',
    BE: '+32',
    BF: '+226',
    BG: '+359',
    BH: '+973',
    BI: '+257',
    BJ: '+229',
    BL: '+590',
    BM: '+1',
    BN: '+673',
    BO: '+591',
    BQ: '+599',
    BR: '+55',
    BS: '+1',
    BT: '+975',
    BW: '+267',
    BY: '+375',
    BZ: '+501',
    CA: '+1',
    CC: '+61',
    CD: '+243',
    CF: '+236',
    CG: '+242',
    CH: '+41',
    CI: '+225',
    CK: '+682',
    CL: '+56',
    CM: '+237',
    CN: '+86',
    CO: '+57',
    CR: '+506',
    CU: '+53',
    CV: '+238',
    CW: '+599',
    CX: '+61',
    CY: '+357',
    CZ: '+420',
    DE: '+49',
    DJ: '+253',
    DK: '+45',
    DM: '+1',
    DO: '+1',
    DZ: '+213',
    EC: '+593',
    EE: '+372',
    EG: '+20',
    EH: '+212',
    ER: '+291',
    ES: '+34',
    ET: '+251',
    FI: '+358',
    FJ: '+679',
    FK: '+500',
    FM: '+691',
    FO: '+298',
    FR: '+33',
    GA: '+241',
    GB: '+44',
    GD: '+1',
    GE: '+995',
    GF: '+594',
    GG: '+44',
    GH: '+233',
    GI: '+350',
    GL: '+299',
    GM: '+220',
    GN: '+224',
    GP: '+590',
    GQ: '+240',
    GR: '+30',
    GT: '+502',
    GU: '+1',
    GW: '+245',
    GY: '+592',
    HK: '+852',
    HN: '+504',
    HR: '+385',
    HT: '+509',
    HU: '+36',
    ID: '+62',
    IE: '+353',
    IL: '+972',
    IM: '+44',
    IN: '+91',
    IO: '+246',
    IQ: '+964',
    IR: '+98',
    IS: '+354',
    IT: '+39',
    JE: '+44',
    JM: '+1',
    JO: '+962',
    JP: '+81',
    KE: '+254',
    KG: '+996',
    KH: '+855',
    KI: '+686',
    KM: '+269',
    KN: '+1',
    KP: '+850',
    KR: '+82',
    KW: '+965',
    KY: '+1',
    KZ: '+7',
    LA: '+856',
    LB: '+961',
    LC: '+1',
    LI: '+423',
    LK: '+94',
    LR: '+231',
    LS: '+266',
    LT: '+370',
    LU: '+352',
    LV: '+371',
    LY: '+218',
    MA: '+212',
    MC: '+377',
    MD: '+373',
    ME: '+382',
    MF: '+590',
    MG: '+261',
    MH: '+692',
    MK: '+389',
    ML: '+223',
    MM: '+95',
    MN: '+976',
    MO: '+853',
    MP: '+1',
    MQ: '+596',
    MR: '+222',
    MS: '+1',
    MT: '+356',
    MU: '+230',
    MV: '+960',
    MW: '+265',
    MX: '+52',
    MY: '+60',
    MZ: '+258',
    NA: '+264',
    NC: '+687',
    NE: '+227',
    NF: '+672',
    NG: '+234',
    NI: '+505',
    NL: '+31',
    NO: '+47',
    NP: '+977',
    NR: '+674',
    NU: '+683',
    NZ: '+64',
    OM: '+968',
    PA: '+507',
    PE: '+51',
    PF: '+689',
    PG: '+675',
    PH: '+63',
    PK: '+92',
    PL: '+48',
    PM: '+508',
    PR: '+1',
    PS: '+970',
    PT: '+351',
    PW: '+680',
    PY: '+595',
    QA: '+974',
    RE: '+262',
    RO: '+40',
    RS: '+381',
    RU: '+7',
    RW: '+250',
    SA: '+966',
    SB: '+677',
    SC: '+248',
    SD: '+249',
    SE: '+46',
    SG: '+65',
    SH: '+290',
    SI: '+386',
    SJ: '+47',
    SK: '+421',
    SL: '+232',
    SM: '+378',
    SN: '+221',
    SO: '+252',
    SR: '+597',
    SS: '+211',
    ST: '+239',
    SV: '+503',
    SX: '+1',
    SY: '+963',
    SZ: '+268',
    TC: '+1',
    TD: '+235',
    TG: '+228',
    TH: '+66',
    TJ: '+992',
    TK: '+690',
    TL: '+670',
    TM: '+993',
    TN: '+216',
    TO: '+676',
    TR: '+90',
    TT: '+1',
    TV: '+688',
    TW: '+886',
    TZ: '+255',
    UA: '+380',
    UG: '+256',
    US: '+1',
    UY: '+598',
    UZ: '+998',
    VA: '+379',
    VC: '+1',
    VE: '+58',
    VG: '+1',
    VI: '+1',
    VN: '+84',
    VU: '+678',
    WF: '+681',
    WS: '+685',
    XK: '+383',
    YE: '+967',
    YT: '+262',
    ZA: '+27',
    ZM: '+260',
    ZW: '+263',
  };

  const upperIsoCode = isoCode.toUpperCase();
  return dialCodes[upperIsoCode] || null;
}

document.addEventListener('DOMContentLoaded', () => {
  // Use server-injected data
  const data = window.__FOLIO_DATA__ || {};

  const { accomplishments, candidate_data } = data;

  const {
    iso2,
    gpa,
    city,
    link,
    state,
    email,
    quote,
    grade,
    country,
    last_name,
    first_name,
    phone_number,
    profile_photo_url,
    organization_name,
    objective_for_summary,
  } = candidate_data;

  const name = `${first_name} ${last_name}`;
  const location = `${city}, ${state}, ${country}`;

  const contacts = [
    { icon: icons.email, value: email },
    { icon: icons.call, value: (getDialCodeByISO(iso2 || 'us') || '') + ' ' + phone_number },
    { icon: icons.location, value: location },
    { icon: icons.link, value: link },
  ];

  const fields = {
    school: contact({ icon: icons.school, value: organization_name }, 1),
    categories: accomplishments?.map(accomplishmentLayout).join(''),
    gpa: contact({ icon: icons.star, value: 'GPA ' + gpa }, 1),
    contacts: contacts.map(contact).join(''),
    objective: objective_for_summary,
    profile: profile_photo_url,
    'page-title': name + ' Accomplishments',
    quote: icons.quote,
    about: quote,
    grade,
    name,
  };

  // Replace all fields
  Object.entries(fields).forEach(([field, value]) => {
    document.querySelectorAll(`[data-field="${field}"]`).forEach((el) => {
      const forInnerHTML = ['categories', 'contacts', 'school', 'gpa', 'grade'].includes(field);
      const forSrc = field === 'profile' || field === 'quote';

      if (value) {
        if (forInnerHTML) el.innerHTML += value;
        else if (forSrc) el.src = value;
        else el.textContent = value;
      } else el.style.display = 'none';
    });
  });

  const hideField = (key) => {
    document.querySelector(`[data-field="${key}"]`).style.display = 'none';
  };

  !objective_for_summary && hideField('objective-main');
  !quote && hideField('quote-main');
});

// ============================ Components ============================
const contact = (item, i) => {
  const { icon, value } = item;

  const isLink = icon === icons.link;

  const validUrl =
    value?.startsWith('http://') || value?.startsWith('https://') ? value : `https://${value}`;

  if (!value) return '';

  if (!isLink) {
    return `
    <div class="flex items-center gap-x-2" key="${i}">
      <image src="${icon}" alt="icon" class='w-[18px] h-[18px]' />
      <span class="font-normal ${
        i === 3 ? 'text-[var(--blue)]' : 'text-[var(--black)]'
      }">${value}</span>
    </div>
  `;
  } else {
    return `
    <a href="${validUrl}" target="_blank" class="flex items-center gap-x-2" key="${i}">
      <image src="${icon}" alt="icon" class='w-[18px] h-[18px]' />
      <span class="font-normal ${
        i === 3 ? 'text-[var(--blue)]' : 'text-[var(--black)]'
      }">${value}</span>
    </a>
  `;
  }
};

const Link = (link) => {
  const validUrl =
    link?.startsWith('http://') || link?.startsWith('https://') ? link : `https://${link}`;

  if (!link) return '';

  return `
    <a href="${validUrl}" target="_blank" class="flex items-center gap-x-2">
      <img src="${icons.link}" alt="icon" class='size-6' />
      <span class="font-normal text-[var(--blue)]">${link}</span>
    </a>
  `;
};

const accomplishmentLayout = (
  { header, form_data, form_type, category_name, sub_category_name },
  i,
) => {
  const isGlobal = category_name === 'Global Experience and Languages';

  const renderCard = (form_type) => {
    if (form_type === 'athletic') {
      return athleticsCard({
        date: formatToDDMMYYYY(form_data?.date),
        position: form_data?.title_or_award,
        location: form_data?.location,
        place: form_data?.event_name,
        region: form_data?.region,
        title: form_data?.name,
      });
    }

    if (form_type === 'academic') {
      const startYear = formatToYYYY(form_data?.academic_year_started ?? '');
      const endYear = formatToYYYY(form_data?.academic_year_ended ?? '');

      return academicsCard({
        title: form_data?.name,
        subject: form_data?.class,
        subTitle: form_data?.school_or_institution,
        grade: `Grade/GPA ${form_data?.grade_or_gpa}`,
        percentage: form_data?.standardized_test_score + '%',
        year: startYear === endYear ? startYear : `${startYear} - ${endYear}`,
      });
    }

    if (form_type === 'award') {
      return awardsCard({
        date: formatToMDYYYY(form_data?.date_received),
        institution: form_data?.institution,
        title: form_data?.award_title,
      });
    }

    if (form_type === 'certification') {
      return certificationsCard({
        date: formatToMDYYYY(form_data?.date_received),
        title: form_data?.certification_title,
        institution: form_data?.institution,
      });
    }

    if (form_type === 'employment') {
      return employmentCard({
        startDate: formatToDDMMMYYYY(form_data?.start_date),
        endDate: form_data?.end_date ? formatToDDMMMYYYY(form_data?.end_date) : 'Ongoing',
        previous_skills: form_data?.previous_skills,
        acquired_skills: form_data?.acquired_skills,
        organization: form_data?.company,
        title: form_data?.job_title,
        link: form_data?.link,
        doc: form_data?.notes,
      });
    }

    if (form_type === 'talent') {
      return talentsCard({
        skill_required: form_data?.skill_required,
        date: formatToDDMMMYYYY(form_data?.date),
        title: form_data?.name,
      });
    }

    if (form_type === 'custom') {
      return customCard({
        title: form_data?.accomplishment_name,
        date: formatToMDYYYY(form_data?.date),
        notes: form_data?.notes,
      });
    }

    if (form_type === 'specialized_skill') {
      return specializedSkillsCard({
        date: formatToDDMMYYYY(form_data?.date),
        title: form_data?.accomplishment_name,
        notes: form_data?.notes,
      });
    }

    if (form_type === 'art') {
      return artsCard({
        date: formatToDDMMYYYY(form_data?.date),
        title: form_data?.accomplishment_name,
        notes: form_data?.notes,
      });
    }

    if (form_type === 'club') {
      return clubsCard({
        date: formatToMDYYYY(form_data?.date_joined),
        tag: form_data?.membership_number,
        location: form_data?.location,
        title: form_data?.club_name,
      });
    }

    if (form_type === 'tech') {
      return techCard({
        date: formatToMMMMDYYYY(form_data?.date),
        title: form_data?.accomplishment_name,
      });
    }

    if (form_type === 'entrepreneurship') {
      return entrepreneurshipCard({
        date: `${formatToDDMMMYYYY(
          form_data?.started_date,
        )} - ${form_data?.completion_date ? formatToDDMMMYYYY(form_data?.completion_date) : 'Ongoing'}`,
        title: form_data?.venture_name,
      });
    }

    if (form_type === 'investment') {
      return investingCard({
        investment_type: form_data?.investment_type,
        title: form_data?.accomplishment_name,
        date: formatToMDYYYY(form_data?.date),
        notes: form_data?.notes,
      });
    }

    if (form_type === 'gel_travel') {
      return travelCard({
        date: `${formatToDDMMMYYYY(
          form_data?.date_arrived,
        )} - ${formatToDDMMMYYYY(form_data?.date_departed)}`,
        title: form_data?.accomplishment_name,
        destination: form_data?.destination,
      });
    }

    if (form_type === 'gel_study_abroad') {
      return studyAbroadCard({
        date: `${formatToDDMMMYYYY(
          form_data?.date_arrived,
        )} - ${formatToDDMMMYYYY(form_data?.date_departed)}`,
        title: form_data?.accomplishment_name,
        destination: form_data?.destination,
        institution: form_data?.institution,
      });
    }

    if (form_type === 'gel_semester_at_sea') {
      return semesterAtSeaCard({
        date: `${formatToDDMMMYYYY(
          form_data?.date_arrived,
        )} - ${formatToDDMMMYYYY(form_data?.date_departed)}`,
        title: form_data?.accomplishment_name,
        destination: form_data?.travel_path,
        institution: form_data?.institution,
      });
    }

    if (form_type === 'gel_internship_abroad') {
      return internshipAbroadCard({
        date: `${formatToDDMMMYYYY(
          form_data?.date_arrived,
        )} - ${form_data?.date_departed ? formatToDDMMMYYYY(form_data?.date_departed) : 'Ongoing'}`,
        company: form_data?.company,
        location: form_data?.destination,
        title: form_data?.accomplishment_name,
        internship_type: form_data?.internship_type,
      });
    }

    if (form_type === 'volunteer') {
      return volunteerCard({
        startDate: formatToDDMMMYYYY(form_data?.start_date),
        endDate: formatToDDMMMYYYY(form_data?.end_date),
        previous_skills: form_data?.previous_skills,
        acquired_skills: form_data?.acquired_skills,
        title: form_data?.volunteer_title,
        organization: form_data?.company,
        link: form_data?.link,
        doc: form_data?.notes,
      });
    }

    if (form_type === 'internship') {
      return internshipsCard({
        internship_type: form_data?.internship_type,
        startDate: formatToDDMMMYYYY(form_data?.start_date),
        endDate: formatToDDMMMYYYY(form_data?.end_date),
        previous_skills: form_data?.previous_skills,
        acquired_skills: form_data?.acquired_skills,
        title: form_data?.internship_title,
        organization: form_data?.company,
        link: form_data?.link,
        doc: form_data?.notes,
      });
    }

    if (form_type === 'gel_language') {
      return languageCard({
        yearsOfStudy: form_data?.years_of_study,
        title: form_data?.accomplishment_name,
        date: formatToMDYYYY(form_data?.date),
        institute: form_data?.institution,
        language: form_data?.language,
        apScore: form_data?.ap_score,
        notes: form_data?.notes,
        link: form_data?.link,
      });
    }

    return form_type;
  };

  return `
    <div class="box !border-none !shadow-none !gap-y-3 !p-0 ${i !== 0 ? 'mt-4' : ''} ">
    ${
      header
        ? `<p class="break-all font-medium text-[var(--gray-80)] text-lg">
              ${isGlobal ? (sub_category_name ?? category_name) : category_name}
          </p>`
        : ''
    }
      ${renderCard(form_type)}
    </div>
    `;
};

const athleticsCard = ({ title, date, location, position, place, region }) => {
  return `
  <div class="box">
    <div class="flex justify-between items-start">
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm !min-w-fit">${date}</p>
          `
            : ''
        }
      </div>
     ${
       region &&
       `
         <p class="break-all quicksand !min-w-fit text-[var(--black)] font-normal text-sm rounded-sm py-0.5 px-1.5 capitalize ${region === 'state' ? 'bg-[#D3EEE2]' : 'bg-[#E7D3EE]'}">
           ${region}
         </p>
       `
     }
    </div>

    ${
      place || location
        ? `
        <div class="space-y-2">
          ${
            place
              ? `
              <div class="flex items-center gap-x-2">
                <img class="size-6" alt="" src="${icons.calendarTick}" />
                <p class="break-all quicksand font-normal text-sm text-[var(--gray-80)] capitalize">${place}</p>
              </div>
            `
              : ''
          }
          ${
            location
              ? `
              <div class="flex items-center gap-x-2">
                <img class="size-6" alt="" src="${icons.locationColored}" />
                <p class="break-all quicksand font-normal text-sm text-[var(--gray-80)] capitalize">${location}</p>
              </div>
            `
              : ''
          }
        </div>
      `
        : ''
    }

    ${
      place || location || position
        ? `
        <hr class="-my-2 border border-[var(--gray-10)]" />
      `
        : ''
    }

    ${
      position
        ? `
        <div class="flex items-center gap-x-2">
          <img class="size-6" alt="" src="${icons.cup}" />
          <p class="break-all quicksand font-normal text-sm text-[var(--black)]">${position}</p>
        </div>
      `
        : ''
    }
  </div>
  `;
};

const academicsCard = ({ percentage, subTitle, subject, title, grade, year }) => {
  const data = [
    subject && { icon: icons.book, label: subject },
    percentage && { icon: icons.percentage, label: percentage },
    grade && { icon: icons.teacher, label: grade },
  ].filter(Boolean);

  return `
  <div class="box">
    <div class="flex justify-between items-start">
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          subTitle
            ? `
            <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm capitalize">${subTitle}</p>
          `
            : ''
        }
      </div>
      ${
        year
          ? `
          <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm rounded-sm py-0.5 px-1.5 bg-[var(--green-light)] !min-w-fit">${year}</p>
        `
          : ''
      }
    </div>

    ${
      data.length > 0
        ? `
        <div class="flex justify-between flex-wrap gap-2">
          ${data
            .map(
              ({ icon, label }, i) =>
                `<div key="${i}" class="flex items-center gap-x-1 ${i == 1 ? 'justify-center' : i == 2 && 'justify-end'}">
                  <img src="${icon}" alt="${label}" class="size-6" />
                  <p class="break-all text-[var(--black)] text-sm font-normal quicksand">${label}</p>
                </div>`,
            )
            .join('')}
        </div>
      `
        : ''
    }
  </div>
  `;
};

const awardsCard = ({ title, date, institution }) => {
  return `
  <div class="box !gap-y-3">
    <div class="flex items-center gap-x-3">
      <div
        class="w-9 h-9 rounded-full bg-[var(--yellow-light)] flex items-center justify-center"
      >
        <img src="${icons.cup}" alt="cup" class="size-6" />
      </div>
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm !min-w-fit">${date}</p>
          `
            : ''
        }
      </div>
    </div>
    ${
      institution
        ? `
        <div class="flex gap-x-2 items-center">
          <img src="${icons.building}" alt="building" class="size-6" />
          <p class="break-all text-[var(--black)] text-sm font-normal quicksand capitalize">${institution}</p>
        </div>
      `
        : ''
    }
  </div>
  `;
};

const talentsCard = ({ title, date, skill_required }) => {
  return `
  <div class="box !gap-y-3">
    <div class="flex items-center gap-x-3">
      <div
        class="w-9 h-9 rounded-full bg-[var(--gray-10)] flex items-center justify-center"
      >
        <img src="${icons.magicStar}" alt="star" class="size-6" />
      </div>
      <div class="flex items-center w-full justify-between">
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--black)] font-normal text-sm !min-w-fit">${date}</p>
          `
            : ''
        }
      </div>
    </div>
      ${
        skill_required?.length > 0
          ? `
          <div class="flex gap-y-3 flex-col">
            <div class="flex items-center gap-3 flex-wrap">
              ${skill_required
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="break-all bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium capitalize"
                    >
                      ${skill}
                    </p>
                  `,
                )
                .join('')}
            </div>
          </div>
        `
          : ''
      }
  </div>
  `;
};

const certificationsCard = ({ title, date, institution }) => {
  return `
  <div class="box w-full !gap-y-3">
    <div class="flex items-center gap-x-3">
      <div
        class="w-9 h-9 rounded-full bg-[var(--purple-light)] flex items-center justify-center"
      >
        <img src="${icons.medalStar}" alt="star" class="size-6" />
      </div>
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm !min-w-fit">${date}</p>
          `
            : ''
        }
      </div>
    </div>
    ${
      institution
        ? `
        <div class="flex gap-x-2 items-center">
          <img src="${icons.building}" alt="building" class="size-6" />
          <p class="break-all text-[var(--black)] text-sm font-normal quicksand capitalize">${institution}</p>
        </div>
      `
        : ''
    }
  </div>
  `;
};

const specializedSkillsCard = ({ title, notes, date }) => {
  return `
    <div class="box w-full !gap-y-3">
      <div class="flex items-center gap-x-3">
        <img src="${icons.ranking}" alt="star" class="size-6" />
        <div>
          ${
            title
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
            `
              : ''
          }
          ${
            date
              ? `
              <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm !min-w-fit">${date}</p>
            `
              : ''
          }
        </div>
      </div>
      ${
        notes
          ? `
          <div class="flex gap-x-1.5 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-sm font-normal quicksand">${notes}</p>
          </div>
        `
          : ''
      }
    </div>
  `;
};

const customCard = ({ title, date, notes }) => {
  return `
    <div class="box w-full !gap-y-3">
        <div>
          ${
            title
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
            `
              : ''
          }
          ${
            date
              ? `
              <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm !min-w-fit">${date}</p>
            `
              : ''
          }
        </div>
          ${
            notes
              ? `
          <div class="flex gap-x-1.5 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-sm font-normal quicksand">${notes}</p>
          </div>
        `
              : ''
          }
    </div>
  `;
};

const artsCard = ({ title, date, notes }) => {
  return `
    <div class="box w-full !gap-y-3">
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm !min-w-fit">${date}</p>
          `
            : ''
        }
      </div>
      ${
        notes
          ? `
          <div class="flex gap-x-2 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-sm font-normal quicksand line-clamp-2">${notes}</p>
          </div>
        `
          : ''
      }
    </div>
  `;
};

const employmentCard = ({
  previous_skills,
  acquired_skills,
  organization,
  startDate,
  endDate,
  title,
  link,
  doc,
}) => {
  return `
    <div class="box !gap-y-3">
      <div class="flex items-start gap-x-3">
        <div
          class="w-9 h-9 rounded-full bg-[var(--blue-light)] flex items-center justify-center"
        >
          <img src="${icons.briefcase}" alt="briefcase" class="size-6" />
        </div>
        <div>
          ${
            title
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
            `
              : ''
          }
          ${
            organization
              ? `
              <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm capitalize">${organization}</p>
            `
              : ''
          }
          ${
            startDate || endDate
              ? `
              <p class="break-all mt-2 text-[var(--black)] text-sm font-medium quicksand">
                ${startDate || ''}${startDate && endDate ? ' - ' : ''}${endDate || ''}
              </p>
            `
              : ''
          }
        </div>
      </div>

      ${
        previous_skills?.length > 0 || acquired_skills?.length > 0
          ? `
          <hr class="border border-[var(--gray-10)]" />
        `
          : ''
      }

      ${
        previous_skills?.length > 0
          ? `
          <div class="flex gap-y-3 flex-col">
            <p class="break-all font-medium quicksand text-sm text-[var(--heading)]">
              Previous Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${previous_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="break-all bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium capitalize"
                    >
                      ${skill}
                    </p>
                  `,
                )
                .join('')}
            </div>
          </div>
        `
          : ''
      }

      ${
        acquired_skills?.length > 0
          ? `
          <div class="flex gap-y-3 flex-col">
            <p class="break-all font-medium quicksand text-sm text-[var(--heading)]">
              Acquired Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${acquired_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium capitalize"
                    >
                      ${skill}
                    </p>
                  `,
                )
                .join('')}
            </div>
          </div>
        `
          : ''
      }

      ${Link(link)}

      ${
        doc
          ? `
          <div class="flex gap-x-1.5 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-sm font-normal quicksand">${doc}</p>
          </div>
        `
          : ''
      }
    </div>
  `;
};

const clubsCard = ({ title, date, location, tag }) => {
  return `
    <div class="box">
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium quicksand text-[var(--heading)]">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">${date}</p>
          `
            : ''
        }
      </div>
      ${
        tag || location
          ? `
          <div class="space-y-2">
            ${
              tag
                ? `
                <div class="flex items-center gap-x-2">
                  <img class="size-6" alt="" src="${icons.bill}" />
                  <p class="break-all quicksand font-normal text-sm text-[var(--heading)] capitalize">${tag}</p>
                </div>
              `
                : ''
            }
            ${
              location
                ? `
                <div class="flex items-center gap-x-2">
                  <img class="size-6" alt="" src="${icons.locationColored}" />
                  <p class="break-all quicksand font-normal text-sm text-[var(--heading)] capitalize">${location}</p>
                </div>
              `
                : ''
            }
          </div>
        `
          : ''
      }
    </div>
  `;
};

const techCard = ({ title, date }) => {
  return `
    <div class="box w-full !gap-y-3">
      <div class="flex items-center gap-x-3">
        <img src="${icons.mobileProgramming}" alt="star" class="size-6" />
        <div>
          ${
            title
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
            `
              : ''
          }
          ${
            date
              ? `
              <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">${date}</p>
            `
              : ''
          }
        </div>
      </div>
    </div>
  `;
};

const entrepreneurshipCard = ({ title, date }) => {
  return `
    <div class="box w-full !gap-y-3">
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">${date}</p>
          `
            : ''
        }
      </div>
    </div>
  `;
};

const investingCard = ({ title, date, notes, investment_type }) => {
  return `
    <div class="box w-full !gap-y-3">
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand flex items-center justify-between text-[var(--gray-80)] font-normal text-sm">
              ${investment_type ? `<span>${investment_type}</span>` : ''}
              <span>${date}</span>
            </p>
          `
            : ''
        }
      </div>
        ${
          notes
            ? `
          <div class="flex gap-x-1.5 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-sm font-normal quicksand">${notes}</p>
          </div>
        `
            : ''
        }
    </div>
  `;
};

const travelCard = ({ title, date, destination }) => {
  return `
    <div class="box w-full !gap-y-3">
      ${
        title
          ? `
          <p class="break-all font-medium text-[var(--heading)] quicksand">${title}</p>
        `
          : ''
      }
      <div class="flex items-center gap-x-3">
        <img src="${icons.airplane}" alt="airplane" class="size-6" />
        <div>
          ${
            destination
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${destination}</p>
            `
              : ''
          }
          ${
            date
              ? `
              <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">${date}</p>
            `
              : ''
          }
        </div>
      </div>
    </div>
  `;
};

const studyAbroadCard = ({ title, date, destination, institution }) => {
  return `
    <div class="box w-full !gap-y-3">
      ${
        title
          ? `
          <p class="break-all font-medium text-[var(--heading)] quicksand">${title}</p>
        `
          : ''
      }
      <div class="flex items-center gap-x-3">
        <img src="${icons.teacherBlue}" alt="teacher" class="size-6" />
        <div>
          ${
            destination
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${destination}</p>
            `
              : ''
          }
          ${
            date
              ? `
              <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">${date}</p>
            `
              : ''
          }
        </div>
      </div>
      ${
        institution
          ? `
          <div class="flex gap-x-2 items-center">
            <img src="${icons.building}" alt="building" class="size-6" />
            <p class="break-all text-[var(--black)] text-sm font-normal quicksand">${institution}</p>
          </div>
        `
          : ''
      }
    </div>
  `;
};

const semesterAtSeaCard = ({ title, date, destination, institution }) => {
  return `
    <div class="box w-full !gap-y-3">
      ${
        title
          ? `
          <p class="break-all font-medium text-[var(--heading)] quicksand">${title}</p>
        `
          : ''
      }
      ${
        destination || date
          ? `
          <div class="flex items-center gap-x-3">
            <img src="${icons.routing}" alt="routing" class="size-6" />
            <div>
              ${
                destination
                  ? `
                  <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${destination}</p>
                `
                  : ''
              }
              ${
                date
                  ? `
                  <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">${date}</p>
                `
                  : ''
              }
            </div>
          </div>
        `
          : ''
      }
      ${
        institution
          ? `
          <div class="flex gap-x-2 items-center">
            <img src="${icons.building}" alt="building" class="size-6" />
            <p class="break-all text-[var(--black)] text-sm font-normal quicksand">${institution}</p>
          </div>
        `
          : ''
      }
    </div>
  `;
};

const internshipAbroadCard = ({ title, date, location, company, internship_type }) => {
  return `
    <div class="box">
      <div class="flex justify-between">
        <div class="flex items-center gap-x-3">
          <img src="${icons.internshipAbroad}" alt="internship" class="size-6" />
          <div>
            ${title ? `<p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>` : ''}
            ${date ? `<p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">${date}</p>` : ''}
          </div>
        </div>
        ${
          internship_type
            ? `
              <p class="rounded-sm h-fit bg-[#FFFAF1] px-1.5 py-1 text-sm text-[var(--heading)] quicksand font-medium">
                ${internship_type}
              </p>
            `
            : ''
        }
      </div>
      ${
        location
          ? `
          <div class="space-y-2">
            <div class="flex items-center gap-x-2">
              <img class="size-6" alt="" src="${icons.locationColored}" />
              <p class="break-all quicksand font-normal text-sm text-[var(--black)] capitalize">${location}</p>
            </div>
          </div>
        `
          : ''
      }
      ${
        company
          ? `
          <div class="flex items-center gap-x-2">
            <img class="size-6" alt="" src="${icons.agency}" />
            <p class="break-all quicksand font-normal text-sm text-[var(--black)] capitalize">${company}</p>
          </div>
        `
          : ''
      }
    </div>
  `;
};

const volunteerCard = ({
  previous_skills,
  acquired_skills,
  organization,
  startDate,
  endDate,
  title,
  link,
  doc,
}) => {
  return `
    <div class="box !gap-y-3">
      <div class="flex items-start gap-x-3">
        <div
          class="w-9 h-9 rounded-full bg-[var(--primary-10)] flex items-center justify-center"
        >
          <img src="${icons.info}" alt="info" class="size-6" />
        </div>
        <div>
          ${
            title
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
            `
              : ''
          }
          ${
            startDate || endDate
              ? `
              <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">
                ${startDate || ''}${startDate && endDate ? ' - ' : ''}${endDate || ''}
              </p>
            `
              : ''
          }
        </div>
      </div>
      ${
        organization
          ? `
          <div class="flex gap-x-1.5 items-center">
            <img src="${icons.building}" alt="building" class="size-6" />
            <p class="break-all text-[var(--black)] text-sm font-normal quicksand">${organization}</p>
          </div>
        `
          : ''
      }
      ${
        previous_skills?.length > 0 || acquired_skills?.length > 0
          ? `
          <hr class="border border-[var(--gray-10)]" />
        `
          : ''
      }
      ${
        previous_skills?.length > 0
          ? `
          <div class="flex gap-y-3 flex-col">
            <p class="break-all font-medium quicksand text-sm text-[var(--heading)]">
              Previous Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${previous_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium capitalize"
                    >
                      ${skill}
                    </p>
                  `,
                )
                .join('')}
            </div>
          </div>
        `
          : ''
      }
      ${
        acquired_skills?.length > 0
          ? `
          <div class="flex gap-y-3 flex-col">
            <p class="break-all font-medium quicksand text-sm text-[var(--heading)]">
              Acquired Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${acquired_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium break-all capitalize"
                    >
                      ${skill}
                    </p>
                  `,
                )
                .join('')}
            </div>
          </div>
        `
          : ''
      }
    ${Link(link)}
      ${
        doc
          ? `
          <div class="flex gap-x-1.5 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-sm font-normal quicksand">${doc}</p>
          </div>
        `
          : ''
      }
    </div>
  `;
};

const internshipsCard = ({
  internship_type,
  previous_skills,
  acquired_skills,
  organization,
  startDate,
  endDate,
  title,
  link,
  doc,
}) => {
  return `
    <div class="box !gap-y-3">
    <div class='flex justify-between'>
      <div class="flex items-start gap-x-3">
        <div
          class="w-9 h-9 rounded-full bg-[var(--primary-20)] flex items-center justify-center"
        >
          <img src="${icons.internships}" alt="internship" class="size-6" />
        </div>
        <div>
          ${
            title
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
            `
              : ''
          }
          ${
            organization
              ? `
              <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm capitalize">${organization}</p>
            `
              : ''
          }
          ${
            startDate || endDate
              ? `
              <p class="break-all mt-2 text-[var(--black)] text-sm font-medium quicksand">
                ${startDate || ''}${startDate && endDate ? ' - ' : ''}${endDate || ''}
              </p>
            `
              : ''
          }
        </div>
      </div>

      ${
        internship_type
          ? `
              <p class="rounded-sm h-fit bg-[#FFFAF1] px-1.5 py-1 text-sm text-[var(--heading)] quicksand font-medium">
                ${internship_type}
              </p>
            `
          : ''
      }

    </div>
      ${
        previous_skills?.length > 0 || acquired_skills?.length > 0
          ? `
          <hr class="border border-[var(--gray-10)]" />
        `
          : ''
      }
      ${
        previous_skills?.length > 0
          ? `
          <div class="flex gap-y-3 flex-col">
            <p class="break-all font-medium quicksand text-sm text-[var(--heading)]">
              Previous Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${previous_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="break-all bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium capitalize"
                    >
                      ${skill}
                    </p>
                  `,
                )
                .join('')}
            </div>
          </div>
        `
          : ''
      }
      ${
        acquired_skills?.length > 0
          ? `
          <div class="flex gap-y-3 flex-col">
            <p class="break-all font-medium quicksand text-sm text-[var(--heading)]">
              Acquired Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${acquired_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="break-all bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium capitalize"
                    >
                      ${skill}
                    </p>
                  `,
                )
                .join('')}
            </div>
          </div>
        `
          : ''
      }
      ${Link(link)}
      ${
        doc
          ? `
          <div class="flex gap-x-1.5 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-sm font-normal quicksand">${doc}</p>
          </div>
        `
          : ''
      }
    </div>
  `;
};

const languageCard = ({ yearsOfStudy, institute, language, apScore, title, notes, date, link }) => {
  return `
    <div class="box">
      <div>
        ${
          title
            ? `
            <p class="break-all font-medium text-[var(--heading)] quicksand text-base capitalize">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm">${date}</p>
          `
            : ''
        }
      </div>
      ${
        language || yearsOfStudy || institute
          ? `
          <div class="space-y-2">
            ${
              language
                ? `
                <div class="flex items-center gap-x-2">
                  <img class="size-6" alt="" src="${icons.language}" />
                  <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm capitalize">${language}</p>
                </div>
              `
                : ''
            }
            ${
              yearsOfStudy
                ? `
                <div class="flex items-center gap-x-2">
                  <img class="size-6" alt="" src="${icons.book}" />
                  <p class="break-all quicksand w-full flex items-center justify-between text-[var(--gray-80)] font-normal text-sm capitalize">
                    Years of Study
                    <span class="font-medium">${yearsOfStudy}</span>
                  </p>
                </div>
              `
                : ''
            }
            ${
              institute
                ? `
                <div class="flex items-center gap-x-2">
                  <img class="size-6" alt="" src="${icons.building}" />
                  <p class="break-all quicksand text-[var(--gray-80)] font-normal text-sm capitalize">${institute}</p>
                </div>
              `
                : ''
            }
          </div>
        `
          : ''
      }
      ${
        apScore
          ? `
          <div class="bg-[var(--gray-light)] rounded-md p-4 text-[var(--heading)] text-center font-medium">AP Score ${apScore}</div>
        `
          : ''
      }
      ${
        language || yearsOfStudy || institute || apScore || notes || link
          ? `
          <hr class="-my-2 border border-[var(--gray-10)]" />
        `
          : ''
      }

     ${Link(link)}
      
     ${
       notes
         ? `
          <div class="flex gap-x-1.5 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-sm font-normal quicksand">${notes}</p>
          </div>
        `
         : ''
     }
    </div>
  `;
};

// ============================ Components End ============================
