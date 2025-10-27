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

document.addEventListener('DOMContentLoaded', () => {
  // Use server-injected data
  const data = window.__FOLIO_DATA__ || {};

  const { accomplishments, candidate_data } = data;

  const {
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
    { icon: icons.call, value: '+' + phone_number },
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
        subTitle: form_data?.notes,
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
        endDate: formatToDDMMMYYYY(form_data?.end_date),
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
        ? `<p class="break-all font-medium text-[var(--gray-60)] text-lg">
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
            <p class="break-all font-medium quicksand text-[var(--heading)]">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-70)] font-normal text-sm !min-w-fit">${date}</p>
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
                <p class="break-all quicksand font-normal text-sm text-[var(--gray-70)]">${place}</p>
              </div>
            `
              : ''
          }
          ${
            location
              ? `
              <div class="flex items-center gap-x-2">
                <img class="size-6" alt="" src="${icons.locationColored}" />
                <p class="break-all quicksand font-normal text-sm text-[var(--gray-70)]">${location}</p>
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
            <p class="break-all font-medium quicksand text-[var(--heading)] text-sm">${title}</p>
          `
            : ''
        }
        ${
          subTitle
            ? `
            <p class="break-all quicksand text-[var(--gray-60)] font-normal text-sm">${subTitle}</p>
          `
            : ''
        }
      </div>
      ${
        year
          ? `
          <p class="break-all quicksand text-[var(--gray-70)] font-normal text-sm rounded-sm py-0.5 px-1.5 bg-[var(--green-light)] !min-w-fit">${year}</p>
        `
          : ''
      }
    </div>

    ${
      data.length > 0
        ? `
        <div class="flex justify-between items-center w-full">
          ${data
            .map(
              ({ icon, label }, i) =>
                `<div key="${i}" class="flex items-center justify-between gap-x-1">
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
            <p class="break-all font-medium quicksand text-[var(--heading)] text-sm">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-70)] font-normal text-xs !min-w-fit">${date}</p>
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
            <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
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
                      class="break-all bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium"
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
            <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-70)] font-normal text-xs !min-w-fit">${date}</p>
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

const specializedSkillsCard = ({ title, notes, date }) => {
  return `
    <div class="box w-full !gap-y-3">
      <div class="flex items-center gap-x-3">
        <img src="${icons.ranking}" alt="star" class="size-6" />
        <div>
          ${
            title
              ? `
              <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
            `
              : ''
          }
          ${
            date
              ? `
              <p class="break-all quicksand text-[var(--gray-70)] font-normal text-xs !min-w-fit">${date}</p>
            `
              : ''
          }
        </div>
      </div>
      ${
        notes
          ? `
          <p class="break-all text-[var(--gray-70)] text-xs font-normal quicksand">${notes}</p>
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
              <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
            `
              : ''
          }
          ${
            date
              ? `
              <p class="break-all quicksand text-[var(--gray-60)] font-normal text-xs !min-w-fit">${date}</p>
            `
              : ''
          }
        </div>
        ${
          notes
            ? `
            <p class="break-all text-[var(--gray-70)] text-xs font-normal quicksand">${notes}</p>
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
            <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-60)] font-normal text-xs !min-w-fit">${date}</p>
          `
            : ''
        }
      </div>
      ${
        notes
          ? `
          <div class="flex gap-x-2 items-start">
            <img src="${icons.note}" alt="note" class="size-6" />
            <p class="break-all text-[var(--gray-80)] text-xs font-normal quicksand line-clamp-2">${notes}</p>
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
              <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
            `
              : ''
          }
          ${
            organization
              ? `
              <p class="break-all quicksand text-[var(--gray-70)] font-normal text-xs">${organization}</p>
            `
              : ''
          }
          ${
            startDate || endDate
              ? `
              <p class="break-all mt-2 text-[var(--black)] text-xs font-medium quicksand">
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
            <p class="break-all font-medium quicksand text-xs text-[var(--heading)]">
              Previous Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${previous_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="break-all bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium"
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
            <p class="break-all font-medium quicksand text-xs text-[var(--heading)]">
              Acquired Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${acquired_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium"
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
            <p class="break-all text-[var(--gray-70)] text-sm font-normal quicksand">${doc}</p>
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
            <p class="break-all quicksand text-[var(--gray-70)] font-normal text-sm">${date}</p>
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
                  <p class="break-all quicksand font-normal text-sm text-[var(--heading)]">${tag}</p>
                </div>
              `
                : ''
            }
            ${
              location
                ? `
                <div class="flex items-center gap-x-2">
                  <img class="size-6" alt="" src="${icons.locationColored}" />
                  <p class="break-all quicksand font-normal text-sm text-[var(--heading)]">${location}</p>
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
              <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
            `
              : ''
          }
          ${
            date
              ? `
              <p class="break-all quicksand text-[var(--gray-70)] font-normal text-xs">${date}</p>
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
            <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-60)] font-normal text-xs">${date}</p>
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
            <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand flex items-center justify-between text-[var(--gray-60)] font-normal text-xs">
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
          <p class="break-all text-[var(--gray-80)] text-xs font-normal quicksand line-clamp-2">${notes}</p>
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
              <p class="break-all quicksand text-[var(--gray-60)] font-normal text-xs">${date}</p>
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
              <p class="break-all quicksand text-[var(--gray-60)] font-normal text-xs">${date}</p>
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
                  <p class="break-all quicksand text-[var(--gray-60)] font-normal text-xs">${date}</p>
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
            ${title ? `<p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>` : ''}
            ${date ? `<p class="break-all quicksand text-[var(--gray-70)] font-normal text-sm">${date}</p>` : ''}
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
              <p class="break-all quicksand font-normal text-sm text-[var(--black)]">${location}</p>
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
            <p class="break-all quicksand font-normal text-sm text-[var(--black)]">${company}</p>
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
              <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
            `
              : ''
          }
          ${
            startDate || endDate
              ? `
              <p class="break-all quicksand text-[var(--gray-70)] font-normal text-xs">
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
            <p class="break-all font-medium quicksand text-xs text-[var(--heading)]">
              Previous Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${previous_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium"
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
            <p class="break-all font-medium quicksand text-xs text-[var(--heading)]">
              Acquired Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${acquired_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium break-all"
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
            <p class="break-all text-[var(--gray-70)] text-sm font-normal quicksand">${doc}</p>
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
              <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
            `
              : ''
          }
          ${
            organization
              ? `
              <p class="break-all quicksand text-[var(--gray-70)] font-normal text-xs">${organization}</p>
            `
              : ''
          }
          ${
            startDate || endDate
              ? `
              <p class="break-all mt-2 text-[var(--black)] text-xs font-medium quicksand">
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
            <p class="break-all font-medium quicksand text-xs text-[var(--heading)]">
              Previous Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${previous_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="break-all bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium"
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
            <p class="break-all font-medium quicksand text-xs text-[var(--heading)]">
              Acquired Skills
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              ${acquired_skills
                .map(
                  (skill) => `
                    <p
                      key="${skill}"
                      class="break-all bg-[var(--gray-light)] p-1 rounded-md text-[var(--heading)] text-sm quicksand font-medium"
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
            <p class="break-all text-[var(--gray-70)] text-sm font-normal quicksand">${doc}</p>
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
            <p class="break-all font-medium text-[var(--heading)] quicksand !text-sm">${title}</p>
          `
            : ''
        }
        ${
          date
            ? `
            <p class="break-all quicksand text-[var(--gray-60)] font-normal text-xs">${date}</p>
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
                  <p class="break-all quicksand font-semibold text-sm text-[var(--black)]">${language}</p>
                </div>
              `
                : ''
            }
            ${
              yearsOfStudy
                ? `
                <div class="flex items-center gap-x-2">
                  <img class="size-6" alt="" src="${icons.book}" />
                  <p class="break-all quicksand font-normal w-full flex items-center justify-between text-sm text-[var(--black)]">
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
                  <p class="break-all quicksand font-normal text-sm text-[var(--gray-70)]">${institute}</p>
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
            <p class="break-all text-[var(--gray-70)] text-sm font-normal quicksand">${notes}</p>
          </div>
        `
         : ''
     }
    </div>
  `;
};

// ============================ Components End ============================
