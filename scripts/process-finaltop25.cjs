const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'public', 'finaltop25.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV with proper handling of quoted fields
function parseCSV(content) {
  const lines = content.split('\n');
  const users = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle quoted fields with commas
    const fields = [];
    let current = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current.trim());

    // CSV columns: username,Display Name,Profile pic,topmate_link,category,title,earnings,bookings,source,classification_method,earnings_rank
    const [username, displayName, profilePic, topmateLink, category, title, earnings, bookings] = fields;

    // Skip invalid rows
    if (!username || !category) continue;

    // Skip categories that look like garbage data
    if (category.includes('üî') || category.includes('ü') || category.match(/^\d+$/)) continue;
    if (category.includes('‚ú®') || category.includes('original,')) continue;
    if (category === 'Design Patterns' || category === 'Verisign') continue;
    if (category.length < 5 || category.length > 50) continue;

    const earningsNum = parseInt(earnings) || 0;

    users.push({
      username: username.trim(),
      displayName: displayName?.trim() || '',
      profilePic: profilePic?.trim() || '',
      topmateLink: topmateLink?.trim() || `https://topmate.io/${username.trim()}`,
      category: category.trim(),
      title: title?.trim() || '',
      earnings: earningsNum,
      bookings: parseInt(bookings) || 0,
    });
  }

  return users;
}

// Generate slug from category name
function generateSlug(category) {
  return category
    .toLowerCase()
    .replace(/[&\/]/g, '-')
    .replace(/[^a-z0-9-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Main processing
const allUsers = parseCSV(csvContent);
console.log(`Parsed ${allUsers.length} valid users from CSV`);

// Get all unique categories
const uniqueCategories = [...new Set(allUsers.map(u => u.category))].sort();
console.log(`Found ${uniqueCategories.length} unique categories`);

// Group users by category, sort by earnings (highest first), assign rank
const usersByCategory = {};
for (const category of uniqueCategories) {
  const slug = generateSlug(category);
  const categoryUsers = allUsers
    .filter(u => u.category === category)
    .sort((a, b) => b.earnings - a.earnings) // Sort by earnings descending
    .map((user, index) => ({
      id: `${slug}-${index + 1}`,
      category: slug,
      name: user.displayName || user.username,
      username: `@${user.username}`,
      imageUrl: user.profilePic || `https://topmate.io/api/og-image/${user.username}`,
      rank: index + 1,
      profileUrl: user.topmateLink,
      bio: user.title,
      categoryMetric: '', // Don't reveal earnings stats
      subtitle: '',
    }));

  usersByCategory[slug] = categoryUsers;
}

// Generate category definitions
const industryCategories = uniqueCategories.map(cat => ({
  slug: generateSlug(cat),
  title: cat,
  route: `/${generateSlug(cat)}`,
  group: 'industry',
  description: `Top creators in ${cat} — discover the best experts helping others succeed.`
}));

// Read existing categories.ts to get platform categories section
const existingCategoriesPath = path.join(__dirname, '..', 'src', 'constants', 'categories.ts');

// Generate new categories.ts
let newCategoriesTs = `import type { Category } from '../types';

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
    description: 'The personal touch champions — experts who believe in deep, individual connections to unlock their clients\\' potential.'
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
`;

for (const cat of industryCategories) {
  newCategoriesTs += `  {
    slug: '${cat.slug}',
    title: '${cat.title.replace(/'/g, "\\'")}',
    route: '${cat.route}',
    group: 'industry',
    description: '${cat.description.replace(/'/g, "\\'")}'
  },
`;
}

newCategoriesTs += `];

// Categories to hide from navigation (but keep routes working)
const HIDDEN_CATEGORIES: string[] = [];

// Helper to get categories by group
export const getCategoriesByGroup = (group: 'platform' | 'industry') =>
  CATEGORIES.filter(cat => cat.group === group && !HIDDEN_CATEGORIES.includes(cat.slug));

// Helper to get all visible categories (for navigation)
export const getVisibleCategories = () =>
  CATEGORIES.filter(cat => !HIDDEN_CATEGORIES.includes(cat.slug));
`;

// Write categories.ts
fs.writeFileSync(existingCategoriesPath, newCategoriesTs);
console.log(`\nWritten ${industryCategories.length} industry categories to categories.ts`);

// Generate new users.ts
const usersPath = path.join(__dirname, '..', 'src', 'data', 'users.ts');

let newUsersTs = `import type { User } from '../types';

// Platform users data - to be filled with actual data
const platformUsers: Record<string, User[]> = {};

// Industry users data - Generated from finaltop25.csv (ranked by earnings)
const industryUsers: Record<string, User[]> = ${JSON.stringify(usersByCategory, null, 2)};

// Combined users by category
export const usersByCategory: Record<string, User[]> = {
  ...platformUsers,
  ...industryUsers,
};

// Flat array of all users (for backward compatibility)
export const users: User[] = Object.values(usersByCategory).flat();

// Helper to get user by rank
export function getUserByRank(category: string, rank: number): User | undefined {
  return usersByCategory[category]?.find(u => u.rank === rank);
}

// Helper to get users for a category (with optional limit for performance)
export function getCategoryUsers(category: string, limit?: number): User[] {
  const users = usersByCategory[category] || [];
  return limit ? users.slice(0, limit) : users;
}
`;

// Write users.ts
fs.writeFileSync(usersPath, newUsersTs);
console.log(`Written users.ts with ${Object.keys(usersByCategory).length} categories`);

// Summary
console.log('\n--- SUMMARY ---');
console.log(`Industry categories: ${industryCategories.length}`);

let totalUsers = 0;
for (const slug of Object.keys(usersByCategory)) {
  totalUsers += usersByCategory[slug]?.length || 0;
}
console.log(`Total users: ${totalUsers}`);

// List all categories with user counts
console.log('\nCategories:');
industryCategories.forEach(cat => {
  const count = usersByCategory[cat.slug]?.length || 0;
  console.log(`  ${cat.title}: ${count} users`);
});
