export interface Cohort {
  id: string;
  name: string;
  instructor: {
    name: string;
    imageUrl: string;
    title: string;
  };
  topic: string;
  sessions: number;
  duration: string;
  learnings: string[];
  enrolledCount: number;
  price: string;
  startDate: string;
  cohortUrl: string;
  featured?: boolean;
}

export const cohorts: Cohort[] = [
  {
    id: 'cohort-1',
    name: 'Mastering GenAI for Product Managers',
    instructor: {
      name: 'Aishwarya Srinivasan',
      imageUrl: 'https://static.topmate.io/7pXWU8fGN1xd6WzMQFDt9Y.avif',
      title: 'AI Product Lead @ Google'
    },
    topic: 'AI/ML',
    sessions: 8,
    duration: '4 weeks',
    learnings: ['Build AI-powered products', 'Prompt engineering mastery', 'AI roadmap planning'],
    enrolledCount: 342,
    price: '₹12,999',
    startDate: 'Jan 15, 2025',
    cohortUrl: 'https://topmate.io/cohorts/genai-pm',
    featured: true
  },
  {
    id: 'cohort-2',
    name: 'Data Engineering Bootcamp',
    instructor: {
      name: 'Shubham Wadekar',
      imageUrl: 'https://static.topmate.io/pGbDwovAjJJLnk26TPz6D4.jpg',
      title: 'Senior Data Engineer @ Meta'
    },
    topic: 'Data Science',
    sessions: 12,
    duration: '6 weeks',
    learnings: ['Build data pipelines', 'Master Spark & Airflow', 'Real-world projects'],
    enrolledCount: 528,
    price: '₹15,999',
    startDate: 'Jan 20, 2025',
    cohortUrl: 'https://topmate.io/cohorts/data-engineering',
    featured: true
  },
  {
    id: 'cohort-3',
    name: 'PM Interview Masterclass',
    instructor: {
      name: 'Shreya Mahendru',
      imageUrl: 'https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_2db39a8c-1e5b-441c-8258-13baa79fddfd.jpeg',
      title: 'Product @ Steer Health'
    },
    topic: 'Product Management',
    sessions: 6,
    duration: '3 weeks',
    learnings: ['Crack FAANG PM interviews', 'Product sense frameworks', 'Mock interviews'],
    enrolledCount: 215,
    price: '₹8,999',
    startDate: 'Jan 18, 2025',
    cohortUrl: 'https://topmate.io/cohorts/pm-interview'
  },
  {
    id: 'cohort-4',
    name: 'Cloud & DevOps Zero to Hero',
    instructor: {
      name: 'Sanjeev',
      imageUrl: 'https://static.topmate.io/abCiGGCLq8unAGDzQAmtWo.jpg',
      title: 'Cloud Architect @ AWS'
    },
    topic: 'Cloud',
    sessions: 10,
    duration: '5 weeks',
    learnings: ['AWS/GCP/Azure mastery', 'CI/CD pipelines', 'Kubernetes deployment'],
    enrolledCount: 467,
    price: '₹14,999',
    startDate: 'Jan 25, 2025',
    cohortUrl: 'https://topmate.io/cohorts/cloud-devops',
    featured: true
  },
  {
    id: 'cohort-5',
    name: 'Career Pivot to Tech',
    instructor: {
      name: 'Ankita Jaiswal',
      imageUrl: 'https://static.topmate.io/xhawk2FdFNpAxcSf3XzaZJ.JPG',
      title: 'Career Coach | Ex-Flipkart'
    },
    topic: 'Career',
    sessions: 8,
    duration: '4 weeks',
    learnings: ['Resume optimization', 'Interview strategies', 'Networking tactics'],
    enrolledCount: 389,
    price: '₹6,999',
    startDate: 'Jan 22, 2025',
    cohortUrl: 'https://topmate.io/cohorts/career-pivot'
  },
  {
    id: 'cohort-6',
    name: 'SQL to Data Analyst',
    instructor: {
      name: 'MAZHER KHAN',
      imageUrl: 'https://topmate-staging.s3.amazonaws.com/9NQoYHEJu9apWSS5kdpZmK.png',
      title: 'Senior Data Analyst | 6 Years'
    },
    topic: 'Data Science',
    sessions: 10,
    duration: '5 weeks',
    learnings: ['Advanced SQL queries', 'Tableau dashboards', 'Business analytics'],
    enrolledCount: 612,
    price: '₹9,999',
    startDate: 'Feb 1, 2025',
    cohortUrl: 'https://topmate.io/cohorts/sql-analyst'
  },
  {
    id: 'cohort-7',
    name: 'UX Design Fundamentals',
    instructor: {
      name: 'Priya Sharma',
      imageUrl: 'https://static.topmate.io/7Jn6xiUrQsncihaSqFGp6J.png',
      title: 'Design Lead @ Razorpay'
    },
    topic: 'Design',
    sessions: 8,
    duration: '4 weeks',
    learnings: ['Design thinking', 'Figma mastery', 'Portfolio building'],
    enrolledCount: 276,
    price: '₹11,999',
    startDate: 'Jan 28, 2025',
    cohortUrl: 'https://topmate.io/cohorts/ux-design'
  },
  {
    id: 'cohort-8',
    name: 'Full Stack JavaScript',
    instructor: {
      name: 'Avinash Kumar',
      imageUrl: 'https://topmate-staging.s3.ap-south-1.amazonaws.com/beCDTUkJdRgHCR2iz15nEZ.png',
      title: 'Founder @ GreatStack'
    },
    topic: 'Software',
    sessions: 14,
    duration: '7 weeks',
    learnings: ['React & Node.js', 'MongoDB & APIs', 'Deploy to production'],
    enrolledCount: 445,
    price: '₹18,999',
    startDate: 'Feb 5, 2025',
    cohortUrl: 'https://topmate.io/cohorts/fullstack-js'
  },
  {
    id: 'cohort-9',
    name: 'Personal Branding on LinkedIn',
    instructor: {
      name: 'Krishan Kumar',
      imageUrl: 'https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_d47f74db-b2a3-45ec-801f-5604a5221b5b.jpeg',
      title: '130K+ LinkedIn | SWE'
    },
    topic: 'Marketing',
    sessions: 6,
    duration: '3 weeks',
    learnings: ['Content strategy', 'Viral post formulas', 'Network building'],
    enrolledCount: 523,
    price: '₹5,999',
    startDate: 'Jan 30, 2025',
    cohortUrl: 'https://topmate.io/cohorts/linkedin-branding'
  },
  {
    id: 'cohort-10',
    name: 'Machine Learning A-Z',
    instructor: {
      name: 'Ajay Shenoy',
      imageUrl: 'https://static.topmate.io/7Jn6xiUrQsncihaSqFGp6J.png',
      title: '14+ yrs AI/ML | IISc PhD'
    },
    topic: 'AI/ML',
    sessions: 12,
    duration: '6 weeks',
    learnings: ['ML algorithms deep-dive', 'Python for ML', 'End-to-end projects'],
    enrolledCount: 378,
    price: '₹16,999',
    startDate: 'Feb 10, 2025',
    cohortUrl: 'https://topmate.io/cohorts/ml-az',
    featured: true
  },
  {
    id: 'cohort-11',
    name: 'Financial Planning Masterclass',
    instructor: {
      name: 'CA Shubham Maloo',
      imageUrl: 'https://topmate-staging.s3.amazonaws.com/b2xnpAGrAfgV3uWYQdpLKA.png',
      title: 'Finance Influencer | 8+ Years'
    },
    topic: 'Finance',
    sessions: 8,
    duration: '4 weeks',
    learnings: ['Tax optimization', 'Investment strategies', 'Wealth building'],
    enrolledCount: 298,
    price: '₹7,999',
    startDate: 'Feb 8, 2025',
    cohortUrl: 'https://topmate.io/cohorts/finance-planning'
  },
  {
    id: 'cohort-12',
    name: 'Study Abroad Success',
    instructor: {
      name: 'Kamal Nanda',
      imageUrl: 'https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_13936e2b-e464-464b-8b55-e51c3bd9cc20.jpeg',
      title: 'Digital Marketing Manager, Canada'
    },
    topic: 'Study Abroad',
    sessions: 6,
    duration: '3 weeks',
    learnings: ['Application strategy', 'Visa guidance', 'Scholarship hunting'],
    enrolledCount: 187,
    price: '₹8,999',
    startDate: 'Feb 12, 2025',
    cohortUrl: 'https://topmate.io/cohorts/study-abroad'
  },
  {
    id: 'cohort-13',
    name: 'System Design for Interviews',
    instructor: {
      name: 'Ramit Kundu',
      imageUrl: 'https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_3fb0dc2d-04d5-4fce-90d1-a1cdbe74dcdb.jpeg',
      title: 'Software Engineer @ Swiggy'
    },
    topic: 'Software',
    sessions: 8,
    duration: '4 weeks',
    learnings: ['Distributed systems', 'Scalability patterns', 'Mock interviews'],
    enrolledCount: 356,
    price: '₹12,999',
    startDate: 'Feb 15, 2025',
    cohortUrl: 'https://topmate.io/cohorts/system-design'
  },
  {
    id: 'cohort-14',
    name: 'Consulting Case Cracker',
    instructor: {
      name: 'Priyasha Das',
      imageUrl: 'https://topmate-staging.s3.amazonaws.com/nJpNcyqU1EWG7NhQ2mm4LX.jpeg',
      title: 'Founder @ CRACK XAT'
    },
    topic: 'Consulting',
    sessions: 10,
    duration: '5 weeks',
    learnings: ['Case frameworks', 'Guesstimates', 'GDPI preparation'],
    enrolledCount: 234,
    price: '₹10,999',
    startDate: 'Feb 18, 2025',
    cohortUrl: 'https://topmate.io/cohorts/consulting-cases'
  }
];

export const getCohortsByTopic = (topic: string) =>
  cohorts.filter(c => c.topic.toLowerCase() === topic.toLowerCase());

export const getFeaturedCohorts = () =>
  cohorts.filter(c => c.featured);
