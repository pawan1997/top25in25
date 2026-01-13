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
  {
    slug: 'cohorts',
    title: "Top Cohorts '26",
    route: '/cohorts',
    group: 'platform',
    description: 'Best-selling cohorts from 2025 that you can enroll in from January 2025 — join the most impactful learning experiences on Topmate.'
  },

  // Industry Categories - Generated from finaltop25.csv
  {
    slug: 'ai-ml',
    title: 'AI / ML',
    route: '/ai-ml',
    group: 'industry',
    description: 'Top creators in AI / ML — discover the best experts helping others succeed.'
  },
  {
    slug: 'ai-ml-2',
    title: 'AI / ML 2',
    route: '/ai-ml-2',
    group: 'industry',
    description: 'Top creators in AI / ML 2 — discover the best experts helping others succeed.'
  },
  {
    slug: 'academic-guidance',
    title: 'Academic Guidance',
    route: '/academic-guidance',
    group: 'industry',
    description: 'Top creators in Academic Guidance — discover the best experts helping others succeed.'
  },
  {
    slug: 'accounting-tax-advisory',
    title: 'Accounting & Tax Advisory',
    route: '/accounting-tax-advisory',
    group: 'industry',
    description: 'Top creators in Accounting & Tax Advisory — discover the best experts helping others succeed.'
  },
  {
    slug: 'astrology-tarot-manifestation',
    title: 'Astrology / Tarot / Manifestation',
    route: '/astrology-tarot-manifestation',
    group: 'industry',
    description: 'Top creators in Astrology / Tarot / Manifestation — discover the best experts helping others succeed.'
  },
  {
    slug: 'career-immigration-abroad',
    title: 'Career & Immigration Abroad',
    route: '/career-immigration-abroad',
    group: 'industry',
    description: 'Top creators in Career & Immigration Abroad — discover the best experts helping others succeed.'
  },
  {
    slug: 'career-guidance',
    title: 'Career Guidance',
    route: '/career-guidance',
    group: 'industry',
    description: 'Top creators in Career Guidance — discover the best experts helping others succeed.'
  },
  {
    slug: 'career-mentorship',
    title: 'Career Mentorship',
    route: '/career-mentorship',
    group: 'industry',
    description: 'Top creators in Career Mentorship — discover the best experts helping others succeed.'
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    route: '/cloud-devops',
    group: 'industry',
    description: 'Top creators in Cloud & DevOps — discover the best experts helping others succeed.'
  },
  {
    slug: 'coaching-personal-development',
    title: 'Coaching & Personal Development',
    route: '/coaching-personal-development',
    group: 'industry',
    description: 'Top creators in Coaching & Personal Development — discover the best experts helping others succeed.'
  },
  {
    slug: 'consulting-business-analysts',
    title: 'Consulting & Business Analysts',
    route: '/consulting-business-analysts',
    group: 'industry',
    description: 'Top creators in Consulting & Business Analysts — discover the best experts helping others succeed.'
  },
  {
    slug: 'content-branding-creative',
    title: 'Content, Branding & Creative',
    route: '/content-branding-creative',
    group: 'industry',
    description: 'Top creators in Content, Branding & Creative — discover the best experts helping others succeed.'
  },
  {
    slug: 'data-analytics-science',
    title: 'Data Analytics & Science',
    route: '/data-analytics-science',
    group: 'industry',
    description: 'Top creators in Data Analytics & Science — discover the best experts helping others succeed.'
  },
  {
    slug: 'data-engineering',
    title: 'Data Engineering',
    route: '/data-engineering',
    group: 'industry',
    description: 'Top creators in Data Engineering — discover the best experts helping others succeed.'
  },
  {
    slug: 'data-science-career',
    title: 'Data Science Career',
    route: '/data-science-career',
    group: 'industry',
    description: 'Top creators in Data Science Career — discover the best experts helping others succeed.'
  },
  {
    slug: 'design',
    title: 'Design',
    route: '/design',
    group: 'industry',
    description: 'Top creators in Design — discover the best experts helping others succeed.'
  },
  {
    slug: 'education-learning',
    title: 'Education & Learning',
    route: '/education-learning',
    group: 'industry',
    description: 'Top creators in Education & Learning — discover the best experts helping others succeed.'
  },
  {
    slug: 'finance-banking-careers',
    title: 'Finance & Banking Careers',
    route: '/finance-banking-careers',
    group: 'industry',
    description: 'Top creators in Finance & Banking Careers — discover the best experts helping others succeed.'
  },
  {
    slug: 'global-careers-relocation',
    title: 'Global Careers & Relocation',
    route: '/global-careers-relocation',
    group: 'industry',
    description: 'Top creators in Global Careers & Relocation — discover the best experts helping others succeed.'
  },
  {
    slug: 'health-wellness',
    title: 'Health & Wellness',
    route: '/health-wellness',
    group: 'industry',
    description: 'Top creators in Health & Wellness — discover the best experts helping others succeed.'
  },
  {
    slug: 'international-career-moves',
    title: 'International Career Moves',
    route: '/international-career-moves',
    group: 'industry',
    description: 'Top creators in International Career Moves — discover the best experts helping others succeed.'
  },
  {
    slug: 'investments',
    title: 'Investments',
    route: '/investments',
    group: 'industry',
    description: 'Top creators in Investments — discover the best experts helping others succeed.'
  },
  {
    slug: 'job-hunting-strategies',
    title: 'Job Hunting Strategies',
    route: '/job-hunting-strategies',
    group: 'industry',
    description: 'Top creators in Job Hunting Strategies — discover the best experts helping others succeed.'
  },
  {
    slug: 'job-search-placement',
    title: 'Job Search & Placement',
    route: '/job-search-placement',
    group: 'industry',
    description: 'Top creators in Job Search & Placement — discover the best experts helping others succeed.'
  },
  {
    slug: 'legal-consultations-careers',
    title: 'Legal Consultations & Careers',
    route: '/legal-consultations-careers',
    group: 'industry',
    description: 'Top creators in Legal Consultations & Careers — discover the best experts helping others succeed.'
  },
  {
    slug: 'lifestyle-personal-growth',
    title: 'Lifestyle & Personal Growth',
    route: '/lifestyle-personal-growth',
    group: 'industry',
    description: 'Top creators in Lifestyle & Personal Growth — discover the best experts helping others succeed.'
  },
  {
    slug: 'marketing-creative-services',
    title: 'Marketing & Creative Services',
    route: '/marketing-creative-services',
    group: 'industry',
    description: 'Top creators in Marketing & Creative Services — discover the best experts helping others succeed.'
  },
  {
    slug: 'medical-career',
    title: 'Medical Career',
    route: '/medical-career',
    group: 'industry',
    description: 'Top creators in Medical Career — discover the best experts helping others succeed.'
  },
  {
    slug: 'product-pm-careers',
    title: 'Product & PM Careers',
    route: '/product-pm-careers',
    group: 'industry',
    description: 'Top creators in Product & PM Careers — discover the best experts helping others succeed.'
  },
  {
    slug: 'product-management',
    title: 'Product Management',
    route: '/product-management',
    group: 'industry',
    description: 'Top creators in Product Management — discover the best experts helping others succeed.'
  },
  {
    slug: 'professional-development',
    title: 'Professional Development',
    route: '/professional-development',
    group: 'industry',
    description: 'Top creators in Professional Development — discover the best experts helping others succeed.'
  },
  {
    slug: 'psychology-mental-health',
    title: 'Psychology & Mental Health',
    route: '/psychology-mental-health',
    group: 'industry',
    description: 'Top creators in Psychology & Mental Health — discover the best experts helping others succeed.'
  },
  {
    slug: 'psychology-mental-health-2',
    title: 'Psychology & Mental Health 2',
    route: '/psychology-mental-health-2',
    group: 'industry',
    description: 'Top creators in Psychology & Mental Health 2 — discover the best experts helping others succeed.'
  },
  {
    slug: 'resume-interview-prep',
    title: 'Resume & Interview Prep',
    route: '/resume-interview-prep',
    group: 'industry',
    description: 'Top creators in Resume & Interview Prep — discover the best experts helping others succeed.'
  },
  {
    slug: 'sap-project-management',
    title: 'SAP & Project Management',
    route: '/sap-project-management',
    group: 'industry',
    description: 'Top creators in SAP & Project Management — discover the best experts helping others succeed.'
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    route: '/software-development',
    group: 'industry',
    description: 'Top creators in Software Development — discover the best experts helping others succeed.'
  },
  {
    slug: 'software-engineering',
    title: 'Software Engineering',
    route: '/software-engineering',
    group: 'industry',
    description: 'Top creators in Software Engineering — discover the best experts helping others succeed.'
  },
  {
    slug: 'specialized-consulting',
    title: 'Specialized Consulting',
    route: '/specialized-consulting',
    group: 'industry',
    description: 'Top creators in Specialized Consulting — discover the best experts helping others succeed.'
  },
  {
    slug: 'specialized-services',
    title: 'Specialized Services',
    route: '/specialized-services',
    group: 'industry',
    description: 'Top creators in Specialized Services — discover the best experts helping others succeed.'
  },
  {
    slug: 'startups-entrepreneurship',
    title: 'Startups & Entrepreneurship',
    route: '/startups-entrepreneurship',
    group: 'industry',
    description: 'Top creators in Startups & Entrepreneurship — discover the best experts helping others succeed.'
  },
  {
    slug: 'tech-careers-software',
    title: 'Tech Careers & Software',
    route: '/tech-careers-software',
    group: 'industry',
    description: 'Top creators in Tech Careers & Software — discover the best experts helping others succeed.'
  },
  {
    slug: 'tech-education',
    title: 'Tech Education',
    route: '/tech-education',
    group: 'industry',
    description: 'Top creators in Tech Education — discover the best experts helping others succeed.'
  },
  {
    slug: 'tech-learning',
    title: 'Tech Learning',
    route: '/tech-learning',
    group: 'industry',
    description: 'Top creators in Tech Learning — discover the best experts helping others succeed.'
  },
  {
    slug: 'unique-expertise',
    title: 'Unique Expertise',
    route: '/unique-expertise',
    group: 'industry',
    description: 'Top creators in Unique Expertise — discover the best experts helping others succeed.'
  },
  {
    slug: 'working-abroad',
    title: 'Working Abroad',
    route: '/working-abroad',
    group: 'industry',
    description: 'Top creators in Working Abroad — discover the best experts helping others succeed.'
  },
];

// Categories to hide from navigation (but keep routes working)
const HIDDEN_CATEGORIES: string[] = [];

// Helper to get categories by group
export const getCategoriesByGroup = (group: 'platform' | 'industry') =>
  CATEGORIES.filter(cat => cat.group === group && !HIDDEN_CATEGORIES.includes(cat.slug));

// Helper to get all visible categories (for navigation)
export const getVisibleCategories = () =>
  CATEGORIES.filter(cat => !HIDDEN_CATEGORIES.includes(cat.slug));
