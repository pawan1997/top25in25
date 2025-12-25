import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  // Platform Achievement Categories
  {
    slug: 'overall',
    title: "Overall Top '25",
    route: '/overall',
    group: 'platform',
    description: 'The elite 25 creators who dominated Topmate in 2025 — setting the gold standard across all metrics and inspiring a new generation of experts.'
  },
  {
    slug: 'bookings',
    title: "Most Bookings '25",
    route: '/bookings',
    group: 'platform',
    description: 'The most sought-after experts on Topmate — their calendars stay packed because their guidance delivers real results.'
  },
  {
    slug: 'minutes',
    title: "Most Minutes '25",
    route: '/minutes',
    group: 'platform',
    description: 'Masters of meaningful conversations — these creators invested the most time transforming lives, one session at a time.'
  },
  {
    slug: 'testimonials',
    title: "Most Testimonials '25",
    route: '/testimonials',
    group: 'platform',
    description: 'Creators whose impact speaks through their clients — earning the most heartfelt testimonials and success stories.'
  },
  {
    slug: 'five-star',
    title: "5/5 Rated '25",
    route: '/five-star',
    group: 'platform',
    description: 'Perfection personified — these creators consistently deliver flawless experiences, earning perfect ratings from every client.'
  },
  {
    slug: 'growth',
    title: "Most Growth '25",
    route: '/growth',
    group: 'platform',
    description: 'The breakout stars of 2025 — creators who skyrocketed their presence and proved that momentum favors the bold.'
  },
  {
    slug: 'one-on-one',
    title: "Most 1:1 Meetings '25",
    route: '/one-on-one',
    group: 'platform',
    description: 'The personal touch champions — experts who believe in deep, individual connections to unlock their clients\' potential.'
  },
  {
    slug: 'packages',
    title: "Most Package Bookings '25",
    route: '/packages',
    group: 'platform',
    description: 'Architects of transformation — creators whose comprehensive packages deliver complete journeys, not just sessions.'
  },
  {
    slug: 'live-events',
    title: "Most Live Events '25",
    route: '/live-events',
    group: 'platform',
    description: 'The stage belongs to them — dynamic creators whose live events attracted the most bookings and brought communities together.'
  },
  {
    slug: 'priority-dms',
    title: "Most Priority DMs '25",
    route: '/priority-dms',
    group: 'platform',
    description: 'Always in demand — experts whose quick, personalized advice is worth every moment of priority access.'
  },
  {
    slug: 'courses',
    title: "Most Courses Sold '25",
    route: '/courses',
    group: 'platform',
    description: 'Knowledge architects — creators who packaged their expertise into courses that thousands chose to learn from.'
  },
  {
    slug: 'digital-products',
    title: "Most Digital Products '25",
    route: '/digital-products',
    group: 'platform',
    description: 'Builders of scalable value — creators whose templates, guides, and resources became must-have tools for success.'
  },
  {
    slug: 'views',
    title: "Most Views '25",
    route: '/views',
    group: 'platform',
    description: 'The most discovered profiles on Topmate — creators whose reputation and content draw audiences like magnets.'
  },

  // Industry Categories
  {
    slug: 'ai',
    title: 'AI',
    route: '/ai',
    group: 'industry',
    description: 'Pioneers shaping the future — the leading minds in Artificial Intelligence and Machine Learning, helping others master the technology revolution.'
  },
  {
    slug: 'career',
    title: 'Career',
    route: '/career',
    group: 'industry',
    description: 'Career catalysts who turn ambitions into achievements — trusted guides helping professionals navigate pivotal moments in their journey.'
  },
  {
    slug: 'cloud',
    title: 'Cloud',
    route: '/cloud',
    group: 'industry',
    description: 'Cloud and DevOps visionaries — experts who help businesses and engineers scale to new heights with modern infrastructure.'
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    route: '/consulting',
    group: 'industry',
    description: 'Strategic masterminds — seasoned consultants who bring clarity to complex business challenges and drive transformational results.'
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    route: '/data-science',
    group: 'industry',
    description: 'Data wizards who turn numbers into narratives — experts empowering the next generation of analysts and scientists.'
  },
  {
    slug: 'design',
    title: 'Design',
    route: '/design',
    group: 'industry',
    description: 'Creative visionaries — UX/UI masters and product designers who craft experiences that delight and inspire.'
  },
  {
    slug: 'education',
    title: 'Education',
    route: '/education',
    group: 'industry',
    description: 'Champions of learning — educators and academic mentors dedicated to unlocking potential and shaping futures.'
  },
  {
    slug: 'finance',
    title: 'Finance',
    route: '/finance',
    group: 'industry',
    description: 'Financial architects — experts who demystify money matters and help build pathways to financial freedom.'
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    route: '/healthcare',
    group: 'industry',
    description: 'Healers and health advocates — professionals dedicated to improving lives through expert medical guidance and care.'
  },
  {
    slug: 'investments',
    title: 'Investments',
    route: '/investments',
    group: 'industry',
    description: 'Wealth builders — investment strategists and trading experts who help others grow and protect their portfolios.'
  },
  {
    slug: 'job-search',
    title: 'Job Search',
    route: '/job-search',
    group: 'industry',
    description: 'Career launchpad experts — specialists who crack the code on resumes, interviews, and landing dream opportunities.'
  },
  {
    slug: 'legal',
    title: 'Legal',
    route: '/legal',
    group: 'industry',
    description: 'Legal luminaries — trusted advisors navigating the complexities of law, immigration, and compliance with precision.'
  },
  {
    slug: 'marketing',
    title: 'Marketing',
    route: '/marketing',
    group: 'industry',
    description: 'Growth hackers and brand builders — marketing mavens who know how to capture attention and drive results.'
  },
  {
    slug: 'mental-health',
    title: 'Mental Health',
    route: '/mental-health',
    group: 'industry',
    description: 'Guardians of well-being — compassionate professionals helping others find balance, clarity, and inner peace.'
  },
  {
    slug: 'product-management',
    title: 'Product Management',
    route: '/product-management',
    group: 'industry',
    description: 'Product visionaries — strategic leaders who guide aspiring PMs to build products users love.'
  },
  {
    slug: 'software',
    title: 'Software',
    route: '/software',
    group: 'industry',
    description: 'Code craftsmen — elite software engineers and mentors who elevate developers from good to exceptional.'
  },
  {
    slug: 'study-abroad',
    title: 'Study Abroad',
    route: '/study-abroad',
    group: 'industry',
    description: 'Global dream enablers — experts who open doors to world-class education and international opportunities.'
  },
  {
    slug: 'wellness',
    title: 'Wellness',
    route: '/wellness',
    group: 'industry',
    description: 'Holistic life coaches — guides who help others achieve physical vitality, mental clarity, and life balance.'
  }
];

// Helper to get categories by group
export const getCategoriesByGroup = (group: 'platform' | 'industry') =>
  CATEGORIES.filter(cat => cat.group === group);
