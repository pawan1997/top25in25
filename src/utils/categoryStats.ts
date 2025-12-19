import type { User } from '../types';

// Niche categories for users
const nicheCategories = [
  'Software Engineering', 'Product Design', 'Data Science', 'Marketing',
  'Finance', 'Healthcare', 'Education', 'Consulting', 'Legal', 'Real Estate',
  'Fitness', 'Nutrition', 'Mental Health', 'Career Coaching', 'Leadership',
  'Sales', 'Startups', 'AI/ML', 'Blockchain', 'UX Research',
  'Content Creation', 'Public Speaking', 'Writing', 'Photography', 'Music'
];

// Service types for services category
const serviceTypes = [
  '1:1 Mentorship', 'Group Coaching', 'Resume Review', 'Mock Interview',
  'Career Strategy', 'Portfolio Review', 'Code Review', 'Business Consulting',
  'Life Coaching', 'Fitness Training', 'Nutrition Planning', 'Therapy Session',
  'Workshop', 'Webinar', 'Course', 'Masterclass', 'Advisory Call', 'Q&A Session'
];

export interface CategoryStat {
  categoryTitle: string;
  statLabel: string;
  statValue: string;
  statSuffix?: string;
  rank: number;
}

export function getCategoryStats(categorySlug: string, user: User, index: number): CategoryStat {
  const rank = index + 1;

  // Generate consistent values based on user id
  const userIdNum = parseInt(user.id) || index;
  const nicheIndex = userIdNum % nicheCategories.length;
  const serviceIndex = userIdNum % serviceTypes.length;

  switch (categorySlug) {
    case 'earning':
      return {
        categoryTitle: 'Top Earners',
        statLabel: nicheCategories[nicheIndex],
        statValue: `#${rank}`,
        rank
      };

    case 'booking':
      const bookings = Math.floor(44000 - (index * 1200) + (userIdNum % 500));
      return {
        categoryTitle: 'Most Bookings',
        statLabel: 'Total Bookings',
        statValue: bookings.toLocaleString(),
        rank
      };

    case 'services':
      const serviceBookings = Math.floor(2500 - (index * 80) + (userIdNum % 200));
      return {
        categoryTitle: 'Services by Type',
        statLabel: serviceTypes[serviceIndex],
        statValue: serviceBookings.toLocaleString(),
        statSuffix: 'bookings',
        rank
      };

    case 'minutes':
      const minutes = Math.floor(180000 - (index * 5000) + (userIdNum % 2000));
      return {
        categoryTitle: 'Most Minutes',
        statLabel: 'Total Minutes',
        statValue: minutes.toLocaleString(),
        rank
      };

    case 'profile-visits':
      const visits = Math.floor(95000 - (index * 2800) + (userIdNum % 1500));
      return {
        categoryTitle: 'Profile Visits',
        statLabel: 'Total Visits',
        statValue: visits.toLocaleString(),
        rank
      };

    case 'testimonials':
      const testimonials = Math.floor(850 - (index * 25) + (userIdNum % 50));
      return {
        categoryTitle: 'Most Testimonials',
        statLabel: 'Total Testimonials',
        statValue: testimonials.toLocaleString(),
        rank
      };

    case 'five-star':
      const rating = (4.95 - (index * 0.01)).toFixed(2);
      const ratingCount = Math.floor(450 - (index * 12) + (userIdNum % 30));
      return {
        categoryTitle: '5-Star Rated',
        statLabel: 'Average Rating',
        statValue: `${rating}/5`,
        statSuffix: `(${ratingCount})`,
        rank
      };

    case 'niche':
      return {
        categoryTitle: 'Niche Leaders',
        statLabel: 'Category',
        statValue: nicheCategories[nicheIndex],
        rank
      };

    case 'growing':
      const growthPct = Math.floor(350 - (index * 10) + (userIdNum % 25));
      return {
        categoryTitle: 'Fastest Growing',
        statLabel: 'Growth (6mo)',
        statValue: `+${growthPct}%`,
        rank
      };

    default:
      return {
        categoryTitle: 'Top Creators',
        statLabel: 'Ranking',
        statValue: `#${rank}`,
        rank
      };
  }
}
