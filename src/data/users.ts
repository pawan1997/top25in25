import type { User } from '../types';

// Real user data from CSV - using picsum.photos as fallback for broken staging URLs
const csvUserData = [
  { id: '61820', username: 'ajay_shenoy', imageUrl: 'https://static.topmate.io/7Jn6xiUrQsncihaSqFGp6J.png' },
  { id: '192597', username: 'shubham_wadekar', imageUrl: 'https://static.topmate.io/pGbDwovAjJJLnk26TPz6D4.jpg' },
  { id: '42261', username: 'cloud', imageUrl: 'https://picsum.photos/seed/cloud/400/400' },
  { id: '20851', username: 'aishwarya_srinivasan', imageUrl: 'https://static.topmate.io/7pXWU8fGN1xd6WzMQFDt9Y.avif' },
  { id: '172054', username: 'melissagrabiner', imageUrl: 'https://picsum.photos/seed/melissa/400/400' },
  { id: '13586', username: 'sidharth_shukla', imageUrl: 'https://static.topmate.io/pTBpzeTUFYgPqdRVzxrkBA.jpg' },
  { id: '318', username: 'diwakar', imageUrl: 'https://static.topmate.io/iArsT7edVR62Jo8481BKyk.jpg' },
  { id: '175760', username: 'gabhru_in_uk', imageUrl: 'https://static.topmate.io/qqCPk9dk91jTd55tkMj2hf.jpg' },
  { id: '44990', username: 'kavach_khanna01', imageUrl: 'https://static.topmate.io/eDjrekgQPAyEoXS6UgGVSs.JPG' },
  { id: '18828', username: 'nishchay_agrawal', imageUrl: 'https://picsum.photos/seed/nishchay/400/400' },
  { id: '199743', username: 'manasbichoo', imageUrl: 'https://picsum.photos/seed/manas/400/400' },
  { id: '231684', username: 'genzcareer', imageUrl: 'https://static.topmate.io/29wpLPr9DLcPJ7j39rJUBd.jpg' },
  { id: '285315', username: 'saurav_chaudhary_1', imageUrl: 'https://static.topmate.io/6jAQdbdV69pqbsr8DT4HQU.jpg' },
  { id: '66112', username: 'piyushcanada', imageUrl: 'https://picsum.photos/seed/piyush/400/400' },
  { id: '6210', username: 'rajeev_sangwan', imageUrl: 'https://static.topmate.io/6e4H3Fubm477GZLEzzP5wm.jpg' },
  { id: '350216', username: 'marina_wyss', imageUrl: 'https://static.topmate.io/esfxx5Y8ECRdTRcQsP5USp.jpg' },
  { id: '33939', username: 'thomasguenter', imageUrl: 'https://static.topmate.io/64sViCh3J4oh4H3JCpfyEw.jpg' },
  { id: '288556', username: 'harish_kavire', imageUrl: 'https://static.topmate.io/tk21gUACqGnDeF4zVgFBeJ.jpg' },
  { id: '184932', username: 'karishma_amin', imageUrl: 'https://static.topmate.io/bEwDRVamr4VHUuB9Qa6p3X.jpg' },
  { id: '91384', username: 'pratyush_srivastava', imageUrl: 'https://static.topmate.io/vV6E3oPtTMRBFfhwvVnNvE.JPG' },
  { id: '284756', username: 'navvye', imageUrl: 'https://static.topmate.io/b1oCj2S8nwTDYr3mCtQLZR.jpg' },
  { id: '94811', username: 'saurabhjha04', imageUrl: 'https://picsum.photos/seed/saurabh/400/400' },
  { id: '215428', username: 'vidushi_marda', imageUrl: 'https://static.topmate.io/sJA7shjjScQXbHSuVhZjVH.jpg' },
  { id: '109432', username: 'niyati_shah', imageUrl: 'https://static.topmate.io/j9YaSnS1yP5GmPnH5cBEZj.jpg' },
  { id: '56234', username: 'rohit_gupta', imageUrl: 'https://picsum.photos/seed/rohit/400/400' }
];

const niches = [
  'Tech Leadership', 'Product Design', 'Marketing Strategy', 'Sales Coaching', 'Career Mentoring',
  'Fitness & Wellness', 'Creative Direction', 'Financial Planning', 'Life Coaching', 'Business Strategy',
  'UX Research', 'Content Creation', 'Personal Branding', 'Public Speaking', 'Leadership Development',
  'Software Engineering', 'Data Science', 'Product Management', 'Growth Marketing', 'Angel Investing',
  'Startup Advising', 'Remote Work', 'Freelancing', 'Nutrition', 'Mental Health'
];

const bios = [
  "Product designer helping startups build better experiences through mentorship.",
  "Sharing insights on leadership and building high-performing teams.",
  "Teaching developers how to build scalable web applications.",
  "Helping entrepreneurs scale their businesses through strategic guidance.",
  "Fitness coach empowering people to achieve their health goals.",
  "Marketing strategist with 10+ years helping brands grow their audience.",
  "Career mentor guiding professionals through major transitions.",
  "Financial advisor making wealth-building accessible to everyone.",
  "UX researcher passionate about human-centered design principles.",
  "Content creator teaching storytelling and personal branding.",
  "Sales coach helping teams close more deals with authenticity.",
  "Startup founder sharing lessons from building multiple companies.",
  "Public speaker inspiring audiences with actionable insights.",
  "Data scientist demystifying analytics for business leaders.",
  "Remote work consultant helping teams thrive in distributed environments.",
  "Life coach supporting clients in discovering their purpose.",
  "Growth marketer specializing in sustainable customer acquisition.",
  "Angel investor backing early-stage founders with bold visions.",
  "Nutrition expert helping people build healthy relationships with food.",
  "Mental health advocate destigmatizing therapy and self-care.",
  "Creative director bringing brands to life through visual storytelling.",
  "Engineering leader building inclusive and innovative tech teams.",
  "Business strategist helping companies navigate complex challenges.",
  "Freelance consultant empowering solopreneurs to thrive independently.",
  "Leadership coach developing next-generation organizational leaders."
];

// Format username to display name
function formatName(username: string): string {
  return username
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateUser(index: number, category: string): User {
  const csvUser = csvUserData[index % csvUserData.length];
  const name = formatName(csvUser.username);

  let metricValue: number | string;
  let subtitle: string;

  switch (category) {
    case 'earning':
      metricValue = Math.floor(50000 + (index * 18000) + Math.random() * 20000);
      subtitle = `$${(metricValue / 1000).toFixed(0)}k earned`;
      break;
    case 'booking':
      metricValue = Math.floor(100 + (index * 190) + Math.random() * 100);
      subtitle = `${metricValue.toLocaleString()} bookings`;
      break;
    case 'services':
      metricValue = Math.floor(50 + (index * 18) + Math.random() * 20);
      subtitle = `${metricValue} services offered`;
      break;
    case 'minutes':
      metricValue = Math.floor(10000 + (index * 7500) + Math.random() * 5000);
      subtitle = `${(metricValue / 1000).toFixed(1)}k minutes`;
      break;
    case 'profile-visits':
      metricValue = Math.floor(5000 + (index * 3800) + Math.random() * 2000);
      subtitle = `${(metricValue / 1000).toFixed(1)}k visits`;
      break;
    case 'testimonials':
      metricValue = Math.floor(50 + (index * 38) + Math.random() * 20);
      subtitle = `${metricValue} testimonials`;
      break;
    case 'five-star':
      metricValue = 4.5 + (index * 0.02);
      subtitle = `${metricValue.toFixed(2)} rating`;
      break;
    case 'niche':
      metricValue = index;
      subtitle = niches[index % niches.length];
      break;
    case 'growing':
      metricValue = Math.floor(100 + (index * 190) + Math.random() * 100);
      subtitle = `${metricValue}% growth`;
      break;
    default:
      metricValue = 0;
      subtitle = 'N/A';
  }

  return {
    id: `${category}-${index}`,
    name,
    username: `@${csvUser.username}`,
    imageUrl: csvUser.imageUrl,
    metricValue,
    subtitle,
    bio: bios[index % bios.length],
    profileUrl: `https://topmate.io/${csvUser.username}`
  };
}

export const usersByCategory: Record<string, User[]> = {
  earning: Array.from({ length: 25 }, (_, i) => generateUser(i, 'earning')),
  booking: Array.from({ length: 25 }, (_, i) => generateUser(i, 'booking')),
  services: Array.from({ length: 25 }, (_, i) => generateUser(i, 'services')),
  minutes: Array.from({ length: 25 }, (_, i) => generateUser(i, 'minutes')),
  'profile-visits': Array.from({ length: 25 }, (_, i) => generateUser(i, 'profile-visits')),
  testimonials: Array.from({ length: 25 }, (_, i) => generateUser(i, 'testimonials')),
  'five-star': Array.from({ length: 25 }, (_, i) => generateUser(i, 'five-star')),
  niche: Array.from({ length: 25 }, (_, i) => generateUser(i, 'niche')),
  growing: Array.from({ length: 25 }, (_, i) => generateUser(i, 'growing'))
};
