const fs = require('fs');
const path = require('path');

// Read main CSV with updated names/stats
const csvPath = path.join(__dirname, '../public/namesstats.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Read old CSV for "Overall Top '25" category (not in new CSV)
const oldCsvPath = path.join(__dirname, '../public/top 25 - pawan.csv');
const oldCsvContent = fs.readFileSync(oldCsvPath, 'utf-8');

// Category mapping from new CSV names to existing slugs
const categoryMap = {
  'Booking Count': 'bookings',
  'Minutes': 'minutes',
  'Most Testimonials': 'testimonials',
  'Average Ratings': 'five-star',
  'Growth Earning Wise': 'growth',
  '1:1 call bookings': 'one-on-one',
  'Package Bookings': 'packages',
  'Webinars / Cohorts': 'live-events',
  'Priority DM': 'priority-dms',
  'Course Bookings': 'courses',
  'Digital Products': 'digital-products',
  'Total Views': 'views',
};

// Category mapping for old CSV (only for Overall)
const oldCategoryMap = {
  "Overall Top '25": 'overall',
};

// Category metric suffixes for proper display
const categorySuffixes = {
  'bookings': 'bookings',
  'minutes': 'minutes',
  'testimonials': 'testimonials',
  'five-star': '5/5 ratings',
  'growth': '%',  // Growth shows percentage with special formatting
  'one-on-one': '1:1 meetings',
  'packages': 'packages sold',
  'live-events': 'bookings',
  'priority-dms': 'priority DMs',
  'courses': 'courses sold',
  'digital-products': 'products sold',
  'views': 'views',
};

// Format number with commas (e.g., 98039 -> 98,039)
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format category metric with proper suffix
function formatCategoryMetric(value, categorySlug) {
  if (!value || value === '') return '';

  // Remove commas from the value before parsing (handles "81,585" -> 81585)
  const cleanValue = value.toString().replace(/,/g, '');
  const numValue = parseInt(cleanValue, 10);
  if (isNaN(numValue)) return value;

  const suffix = categorySuffixes[categorySlug];
  if (!suffix) return formatNumber(numValue);

  // Special handling for growth (percentage)
  if (categorySlug === 'growth') {
    return `+${formatNumber(numValue)}%`;
  }

  return `${formatNumber(numValue)} ${suffix}`;
}

// Parse CSV (handling quoted fields with commas)
function parseCSV(content) {
  const lines = content.split('\n');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line handling quotes
    const fields = [];
    let field = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(field.trim());
        field = '';
      } else {
        field += char;
      }
    }
    fields.push(field.trim());

    // CSV columns: Category, Rank, Username, Topmate URL, (junk), Category Metric, User ID, Profile Pic URL, Full Name, Short Bio
    const [category, rank, username, profileUrl, , categoryMetric, userId, imageUrl, fullName, ...bioParts] = fields;
    const bio = bioParts.join(',').trim();

    if (!category || !categoryMap[category]) continue;

    const slug = categoryMap[category];
    const formattedMetric = formatCategoryMetric(categoryMetric, slug);

    result.push({
      id: `${slug}-${rank}`,
      category: slug,
      name: fullName || username,
      username: `@${username}`,
      imageUrl: imageUrl || '',
      rank: parseInt(rank, 10),
      profileUrl: profileUrl || '',
      bio: bio || '',
      categoryMetric: formattedMetric,
      subtitle: formattedMetric,
    });
  }

  return result;
}

// Parse old CSV format (for Overall category)
function parseOldCSV(content) {
  const lines = content.split('\n');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line handling quotes
    const fields = [];
    let field = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(field.trim());
        field = '';
      } else {
        field += char;
      }
    }
    fields.push(field.trim());

    // Old CSV columns: Category, Rank, Username, Topmate URL, (empty), Category Metric, User ID, Profile Pic URL, First Name, Short Bio
    const [category, rank, username, profileUrl, , categoryMetric, userId, imageUrl, firstName, ...bioParts] = fields;
    const bio = bioParts.join(',').trim();

    // Only process Overall category from old CSV
    if (!category || !oldCategoryMap[category]) continue;

    const slug = oldCategoryMap[category];

    result.push({
      id: `${slug}-${rank}`,
      category: slug,
      name: firstName || username,
      username: `@${username}`,
      imageUrl: imageUrl || '',
      rank: parseInt(rank, 10),
      profileUrl: profileUrl || '',
      bio: bio || '',
      categoryMetric: '', // Overall doesn't have a specific metric
      subtitle: '',
    });
  }

  return result;
}

const users = parseCSV(csvContent);
const overallUsers = parseOldCSV(oldCsvContent);

// Merge: Overall users first, then other categories
const allUsers = [...overallUsers, ...users];

// Group by category
const usersByCategory = {};
for (const user of allUsers) {
  if (!usersByCategory[user.category]) {
    usersByCategory[user.category] = [];
  }
  usersByCategory[user.category].push(user);
}

// Sort each category by rank
for (const cat of Object.keys(usersByCategory)) {
  usersByCategory[cat].sort((a, b) => a.rank - b.rank);
}

// Generate TypeScript
const tsContent = `import type { User } from '../types';

// Generated from CSV - ${new Date().toISOString()}
export const users: User[] = ${JSON.stringify(allUsers, null, 2)};

export const usersByCategory: Record<string, User[]> = ${JSON.stringify(usersByCategory, null, 2)};

export function getUserByRank(category: string, rank: number): User | undefined {
  return usersByCategory[category]?.find(u => u.rank === rank);
}
`;

// Write output
const outputPath = path.join(__dirname, '../src/data/users.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`Generated ${allUsers.length} users across ${Object.keys(usersByCategory).length} categories`);
console.log(`Overall users: ${overallUsers.length}`);
console.log(`Other platform users: ${users.length}`);
console.log('Categories:', Object.keys(usersByCategory).join(', '));
