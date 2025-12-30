export interface Cohort {
  id: string;
  name: string;
  instructor: {
    name: string;
    imageUrl: string;
    imageUrl2?: string; // Second photo for dual instructors
    title: string;
  };
  topic: string;
  duration: string;
  price: string;
  startDate: string;
  cohortUrl: string;
  landingPageUrl?: string;
}

// Real cohort data extracted from landing pages
export const cohorts: Cohort[] = [
  {
    id: 'cohort-1',
    name: 'End-to-End Job Assistance Masterclass for Europe',
    instructor: {
      name: 'Gurpreet Kaur Jaggi',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://static.topmate.io/ebiJwYzFn5KeGFtsMd4SqJ.jpg',
      title: 'Lead Recruiter • 50K+ CVs Reviewed'
    },
    topic: 'Career',
    duration: '6 weeks',
    price: '₹59,100',
    startDate: 'Jan 26, 2026',
    cohortUrl: 'https://topmate.io/gurpreet_kaur_jaggi/1835201',
    landingPageUrl: 'https://topmate.io/gurpreet_kaur_jaggi/page/SR8MdBIuYU'
  },
  {
    id: 'cohort-2',
    name: 'Analytics Engineer Accelerator (DE & DA)',
    instructor: {
      name: 'Durgesh + Pragya',
      imageUrl: 'https://static.topmate.io/uD2wR7U2e4rxrVd1cRs3en.webp',
      imageUrl2: 'https://topmate.io/cdn-cgi/image/width=640,quality=90/https://static.topmate.io/sonNisvutwh5u6KdyotLzp.jpg',
      title: 'Data Engineering Experts'
    },
    topic: 'Data Science',
    duration: '12 weeks',
    price: '₹55,499',
    startDate: 'Jan 2026',
    cohortUrl: 'https://topmate.io/durgesh_yadav/1833913',
    landingPageUrl: 'https://topmate.io/durgesh_yadav/page/yPusP9Owyy'
  },
  {
    id: 'cohort-3',
    name: 'Break Into Senior Engineering Roles',
    instructor: {
      name: 'Hemant',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://static.topmate.io/gx1jEYUsSgggQpJAhYLSw8.jpeg',
      title: 'Senior Engineer • FAANG Mentor'
    },
    topic: 'Software',
    duration: '5 weeks',
    price: '₹50,000',
    startDate: 'Jan 2026',
    cohortUrl: 'https://topmate.io/hemant/1837174',
    landingPageUrl: 'https://topmate.io/hemant/page/3FC9RuLLgZ'
  },
  {
    id: 'cohort-4',
    name: 'Dubai Job Market Strategy',
    instructor: {
      name: 'Charul Motwani',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://static.topmate.io/hiMDy294e4z2FC1VGeYq8U.jpeg',
      title: 'UAE Career Strategist'
    },
    topic: 'Career',
    duration: '6 weeks',
    price: '$649',
    startDate: 'Jan 31, 2026',
    cohortUrl: 'https://topmate.io/charulmotwani/1841015',
    landingPageUrl: 'https://topmate.io/charulmotwani/page/XJt2ZUV8s2'
  },
  {
    id: 'cohort-5',
    name: 'Dubai Job Search Cohort Program',
    instructor: {
      name: 'Manas Bichhoo',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_f2e8e5a5-75d6-49dc-a80e-434a0a9f70cc.jpeg',
      title: 'Dubai Career Expert'
    },
    topic: 'Career',
    duration: '6 weeks',
    price: '$649',
    startDate: 'Jan 2026',
    cohortUrl: 'https://topmate.io/manasbichoo/1841000',
    landingPageUrl: 'https://topmate.io/manasbichoo/page/bhESm95tSX'
  },
  {
    id: 'cohort-6',
    name: '8-Week Career Breakthrough Cohort',
    instructor: {
      name: 'Vijay Chandola',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_b434c7f4-739b-40c8-9c9e-55bd81751188.jpeg',
      title: 'Hiring Manager • Career Coach'
    },
    topic: 'Career',
    duration: '8 weeks',
    price: '₹60,000',
    startDate: 'Jan 18, 2026',
    cohortUrl: 'https://topmate.io/vijaychandola/1841850',
    landingPageUrl: 'https://topmate.io/vijaychandola/page/EoZqInqRJw'
  },
  {
    id: 'cohort-7',
    name: 'AI Product Manager 8-Week Career Accelerator',
    instructor: {
      name: 'Karan Sethi',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://topmate-staging.s3.ap-south-1.amazonaws.com/fJm3rAfEnvrLrq977sGdjM.jpg',
      title: 'AI Product Lead'
    },
    topic: 'AI/ML',
    duration: '8 weeks',
    price: '₹70,000',
    startDate: 'Jan 2026',
    cohortUrl: 'https://topmate.io/karan_sethi/1837145',
    landingPageUrl: 'https://topmate.io/karan_sethi/page/EeZYInq9JP'
  },
  {
    id: 'cohort-8',
    name: 'Transition from PM to AI Product Leader',
    instructor: {
      name: 'Malthi & Aniket',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/Malthi-SS-1669274484.jpeg',
      title: 'AI Product Leaders'
    },
    topic: 'AI/ML',
    duration: '6 weeks',
    price: '₹55,000',
    startDate: 'Jan 17, 2026',
    cohortUrl: 'https://www.topmate.io/malthi_ss/1840846',
    landingPageUrl: 'https://www.topmate.io/malthi_ss/page/x8oK7oS2IK'
  },
  {
    id: 'cohort-9',
    name: 'Launch Your Canadian Career in 6 Sessions',
    instructor: {
      name: 'Ron Johnson',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_16359a3d-72cc-4fb1-8944-482b970554b4.jpeg',
      title: 'Canada Career Expert'
    },
    topic: 'Career',
    duration: '6 weeks',
    price: '₹60,000',
    startDate: 'Jan 2026',
    cohortUrl: 'https://topmate.io/ron_johnson/1841086',
    landingPageUrl: 'https://topmate.io/ron_johnson/page/nPy82CBa3H'
  },
  {
    id: 'cohort-10',
    name: 'InfraThrone Elite - Operational DevOps Bootcamp',
    instructor: {
      name: 'Saurabh Chaudhary',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=640,quality=90/https://static.topmate.io/6jAQdbdV69pqbsr8DT4HQU.jpg',
      title: 'DevOps Architect • 6+ Years'
    },
    topic: 'Cloud',
    duration: '6 weeks',
    price: '₹39,999',
    startDate: 'Jan 2026',
    cohortUrl: 'https://topmate.io/saurav_chaudhary_1/1755939',
    landingPageUrl: 'https://topmate.io/saurav_chaudhary_1/page/3FCHR9LJgx'
  },
  {
    id: 'cohort-11',
    name: 'Get Job-Ready as an AI-Powered Product Manager',
    instructor: {
      name: 'Sachin Sharma',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://topmate-staging.s3.ap-south-1.amazonaws.com/ru1XthVWfXRXEZp6QmkAf4.JPG',
      title: 'Senior Product Manager'
    },
    topic: 'Product Management',
    duration: '6 weeks',
    price: '₹60,000',
    startDate: 'Jan 18, 2026',
    cohortUrl: 'https://topmate.io/sachin_sharma/1841037',
    landingPageUrl: 'https://topmate.io/sachin_sharma/page/xHoa7hSoIb'
  },
  {
    id: 'cohort-12',
    name: 'AI in AEC Cohort - 10x Your Productivity',
    instructor: {
      name: 'Naman Mehta',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=640,quality=90/https://static.topmate.io/6ihZPq2daEU9mibMtSfdZn.jpg',
      title: 'AI & AEC Expert'
    },
    topic: 'AI/ML',
    duration: '7 weeks',
    price: '₹100,000',
    startDate: 'Jan 17, 2026',
    cohortUrl: 'https://topmate.io/namanmehta2211/1788737',
    landingPageUrl: 'https://topmate.io/namanmehta2211/page/K2BA9htAgN'
  },
  {
    id: 'cohort-13',
    name: '6-Week Job Search & Hiring Roadmap for Europe',
    instructor: {
      name: 'Payal in Europe',
      imageUrl: 'https://topmate.io/cdn-cgi/image/width=256,quality=90/https://static.topmate.io/sPjT6eEgK7e279PKVUTyMJ.jpeg',
      title: 'Europe Career Consultant'
    },
    topic: 'Study Abroad',
    duration: '6 weeks',
    price: '₹55,000',
    startDate: 'Jan 2026',
    cohortUrl: 'https://topmate.io/payalineurope/1849380',
    landingPageUrl: 'https://topmate.io/payalineurope/page/uM1ZoPEHga'
  }
];

export const getCohortsByTopic = (topic: string) =>
  cohorts.filter(c => c.topic.toLowerCase() === topic.toLowerCase());
