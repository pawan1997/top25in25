const fs = require('fs');
const path = require('path');

// Read new CSV with industry categories (includes profile pics)
const csvPath = path.join(__dirname, '../public/profilepicsforcategory.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Category mapping from CSV names to slugs
const categoryMap = {
  'AI': 'ai',
  'Career': 'career',
  'Cloud': 'cloud',
  'Consulting': 'consulting',
  'Data Science': 'data-science',
  'Design': 'design',
  'Education': 'education',
  'Finance': 'finance',
  'Healthcare': 'healthcare',
  'Investments': 'investments',
  'Job Search': 'job-search',
  'Legal': 'legal',
  'Marketing': 'marketing',
  'Mental Health': 'mental-health',
  'Product Management': 'product-management',
  'Software': 'software',
  'Study Abroad': 'study-abroad',
  'Wellness': 'wellness',
};

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

    // CSV columns: Category,Rank,Username,Profile Pic,Display_Name,Email,Title,Earnings_2025,Bookings,Services,Category_Score
    const [category, rank, username, profilePic, displayName, email, title, earnings, bookings, services, score] = fields;

    const slug = categoryMap[category];
    if (!slug) continue;

    // Build profile URL
    const profileUrl = `https://topmate.io/${username}`;

    // Use actual profile pic from CSV, fallback to OG image if empty
    const imageUrl = profilePic && profilePic.startsWith('http')
      ? profilePic
      : `https://topmate.io/embed/og_image?username=${username}`;

    result.push({
      id: `${slug}-${rank}`,
      category: slug,
      name: displayName || username,
      username: `@${username}`,
      imageUrl: imageUrl,
      rank: parseInt(rank, 10),
      profileUrl: profileUrl,
      bio: title || '',
      categoryMetric: '',  // Not in this CSV
      subtitle: '',
    });
  }

  return result;
}

const industryUsers = parseCSV(csvContent);

// Read existing users file to merge
const existingUsersPath = path.join(__dirname, '../src/data/users.ts');
const existingContent = fs.readFileSync(existingUsersPath, 'utf-8');

// Extract existing users array (simple regex parse)
const usersMatch = existingContent.match(/export const users: User\[\] = (\[[\s\S]*?\]);/);
let existingUsers = [];
if (usersMatch) {
  try {
    existingUsers = JSON.parse(usersMatch[1]);
  } catch (e) {
    console.error('Could not parse existing users');
  }
}

// Merge: keep existing platform users, add new industry users
const platformCategories = ['overall', 'bookings', 'minutes', 'testimonials', 'five-star', 'growth', 'one-on-one', 'packages', 'live-events', 'priority-dms', 'courses', 'digital-products', 'views'];
const platformUsers = existingUsers.filter(u => platformCategories.includes(u.category));
const allUsers = [...platformUsers, ...industryUsers];

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

console.log(`Merged data: ${allUsers.length} total users`);
console.log(`Platform users: ${platformUsers.length}`);
console.log(`Industry users: ${industryUsers.length}`);
console.log('Categories:', Object.keys(usersByCategory).join(', '));
