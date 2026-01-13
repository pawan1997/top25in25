const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'public', 'top 25 - pawan.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Category name to slug mapping
const categoryMapping = {
  "Overall Top '25": 'overall',
  "Most Bookings '25": 'bookings',
  "Most Minutes '25": 'minutes',
  "Most Testimonials '25": 'testimonials',
  "5/5 Rated '25": 'five-star',
  "Most Growth '25": 'growth',
  "Most 1:1 Meeting '25": 'one-on-one',
  "Most Package Bookings '25": 'packages',
  "Most Live Events Hosted '25": 'live-events',
  "Most Priority DM's '25": 'priority-dms',
  "Most Courses Sold '25": 'courses',
  "Most Digital Products Sold '25": 'digital-products',
  "Most Views ' 25": 'views',
};

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

    // CSV columns: Category,Rank,Username,Topmate URL,,Category Metric,User ID,Profile Pic URL,First Name,Short Bio
    const [category, rank, username, topmateUrl, , categoryMetric, userId, profilePicUrl, firstName, shortBio] = fields;

    // Skip invalid rows
    if (!username || !category) continue;

    // Only process platform categories
    const slug = categoryMapping[category];
    if (!slug) continue;

    users.push({
      category,
      slug,
      rank: parseInt(rank) || 0,
      username: username.trim(),
      topmateUrl: topmateUrl?.trim() || `https://topmate.io/${username.trim()}`,
      categoryMetric: categoryMetric?.trim() || '',
      userId: userId?.trim() || '',
      profilePicUrl: profilePicUrl?.trim() || '',
      firstName: firstName?.trim() || '',
      shortBio: shortBio?.trim() || '',
    });
  }

  return users;
}

// Main processing
const allUsers = parseCSV(csvContent);
console.log(`Parsed ${allUsers.length} valid platform users from CSV`);

// Group users by category slug
const usersByCategory = {};
for (const user of allUsers) {
  if (!usersByCategory[user.slug]) {
    usersByCategory[user.slug] = [];
  }

  usersByCategory[user.slug].push({
    id: `${user.slug}-${user.rank}`,
    category: user.slug,
    name: user.firstName || user.username,
    username: `@${user.username}`,
    imageUrl: user.profilePicUrl || `https://topmate.io/api/og-image/${user.username}`,
    rank: user.rank,
    profileUrl: user.topmateUrl,
    bio: user.shortBio,
    categoryMetric: user.categoryMetric,
    subtitle: '',
  });
}

// Sort each category by rank
for (const slug of Object.keys(usersByCategory)) {
  usersByCategory[slug].sort((a, b) => a.rank - b.rank);
}

// Read existing users.ts
const usersPath = path.join(__dirname, '..', 'src', 'data', 'users.ts');
let usersContent = fs.readFileSync(usersPath, 'utf-8');

// Extract industry users from the existing file
const industryMatch = usersContent.match(/const industryUsers: Record<string, User\[\]> = ({[\s\S]*?});/);
let industryUsers = {};
if (industryMatch) {
  try {
    // This is a simplified extraction - we'll just keep the whole section
    industryUsers = industryMatch[1];
  } catch (e) {
    console.log('Could not parse existing industry users, will only update platform users');
  }
}

// Generate new users.ts
const newUsersTs = `import type { User } from '../types';

// Platform users data - Generated from top 25 - pawan.csv
const platformUsers: Record<string, User[]> = ${JSON.stringify(usersByCategory, null, 2)};

// Industry users data - Generated from finaltop25.csv (ranked by earnings)
const industryUsers: Record<string, User[]> = ${industryUsers};

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
console.log(`Written users.ts with ${Object.keys(usersByCategory).length} platform categories`);

// Summary
console.log('\n--- SUMMARY ---');
console.log(`Platform categories: ${Object.keys(usersByCategory).length}`);

let totalUsers = 0;
for (const slug of Object.keys(usersByCategory)) {
  const count = usersByCategory[slug]?.length || 0;
  totalUsers += count;
  console.log(`  ${slug}: ${count} users`);
}
console.log(`Total platform users: ${totalUsers}`);
