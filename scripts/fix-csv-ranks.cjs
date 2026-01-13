const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'public', 'finaltop25.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV with proper handling of quoted fields
function parseCSV(content) {
  const lines = content.split('\n');
  const header = lines[0];
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
        fields.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current);

    // CSV columns: username,Display Name,Profile pic,topmate_link,category,title,earnings,bookings,source,classification_method,earnings_rank,category_link
    const [username, displayName, profilePic, topmateLink, category, title, earnings, bookings, source, classificationMethod, earningsRank, categoryLink] = fields;

    // Skip invalid rows
    if (!username || !category) continue;

    users.push({
      username,
      displayName,
      profilePic,
      topmateLink,
      category,
      title,
      earnings: parseInt(earnings) || 0,
      bookings,
      source,
      classificationMethod,
      earningsRank,
      categoryLink,
      originalLine: line
    });
  }

  return { header, users };
}

// Escape CSV field if needed
function escapeCSV(field) {
  if (!field) return '';
  // If field contains comma, newline, or quote, wrap in quotes
  if (field.includes(',') || field.includes('\n') || field.includes('"')) {
    return '"' + field.replace(/"/g, '""') + '"';
  }
  return field;
}

// Main processing
const { header, users } = parseCSV(csvContent);
console.log(`Parsed ${users.length} users from CSV`);

// Group users by category
const usersByCategory = {};
for (const user of users) {
  if (!usersByCategory[user.category]) {
    usersByCategory[user.category] = [];
  }
  usersByCategory[user.category].push(user);
}

// Sort each category by earnings (descending) and assign correct rank (capped at 25 with ties)
for (const category of Object.keys(usersByCategory)) {
  usersByCategory[category].sort((a, b) => b.earnings - a.earnings);

  const totalUsers = usersByCategory[category].length;
  const maxRank = 25;

  usersByCategory[category].forEach((user, index) => {
    let rank;
    if (totalUsers <= maxRank) {
      // Normal ranking if 25 or fewer users
      rank = index + 1;
    } else {
      // Cap at 25: distribute extra users across the last few ranks
      const extraUsers = totalUsers - maxRank;
      if (index < maxRank - extraUsers) {
        // Users that get unique ranks
        rank = index + 1;
      } else {
        // Remaining users share ranks starting from (maxRank - extraUsers + 1) up to 25
        const sharedRankStart = maxRank - extraUsers;
        const positionInShared = index - sharedRankStart;
        const ranksToShare = extraUsers + 1;
        rank = Math.min(maxRank, sharedRankStart + 1 + Math.floor(positionInShared / Math.ceil((totalUsers - sharedRankStart) / ranksToShare)));
      }
    }
    user.correctRank = rank;
  });
}

// Generate new CSV content
let newCSV = header + '\n';

// Flatten all users back (maintaining original category order)
const allCategories = [...new Set(users.map(u => u.category))];
for (const category of allCategories) {
  const categoryUsers = usersByCategory[category];
  for (const user of categoryUsers) {
    const row = [
      escapeCSV(user.username),
      escapeCSV(user.displayName),
      escapeCSV(user.profilePic),
      escapeCSV(user.topmateLink),
      escapeCSV(user.category),
      escapeCSV(user.title),
      user.earnings,
      user.bookings,
      escapeCSV(user.source),
      escapeCSV(user.classificationMethod),
      user.correctRank,  // Use the correct rank (capped at 25 with ties)
      escapeCSV(user.categoryLink)
    ].join(',');
    newCSV += row + '\n';
  }
}

// Write updated CSV
fs.writeFileSync(csvPath, newCSV);
console.log(`Updated CSV with correct per-category rankings`);

// Summary
console.log('\n--- SUMMARY ---');
console.log(`Categories: ${allCategories.length}`);
console.log(`Total users: ${users.length}`);

// Show sample of corrected ranks
console.log('\nSample corrections (first 3 users per category for first 5 categories):');
let count = 0;
for (const category of allCategories) {
  if (count >= 5) break;
  console.log(`\n${category}:`);
  usersByCategory[category].slice(0, 3).forEach(user => {
    console.log(`  Rank ${user.correctRank}: ${user.displayName || user.username} (earnings: ${user.earnings})`);
  });
  count++;
}
