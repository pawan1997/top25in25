const fs = require('fs');

let content = fs.readFileSync('src/data/users.ts', 'utf8');

// Remove Vatsal Nahata entry from psychology-mental-health
const vatsalPattern = /,?\s*\{\s*"id":\s*"psychology-mental-health-11"[\s\S]*?"subtitle":\s*""\s*\}/;
content = content.replace(vatsalPattern, '');

// Now renumber psychology-mental-health users 12-26 to 11-25
for (let i = 12; i <= 26; i++) {
  const newNum = i - 1;

  // Update ID
  const idPattern = new RegExp(`"id":\\s*"psychology-mental-health-${i}"`, 'g');
  content = content.replace(idPattern, `"id": "psychology-mental-health-${newNum}"`);

  // Update rank (only for 12-25 since they need to shift down by 1)
  // Rank should match the new position
  if (i <= 25) {
    // Users 12-25 had ranks 12-25, should now be 11-24
    // But we need to be careful - ranks after removal should be sequential
  }
}

// Fix ranks - after removal, users should have sequential ranks from 11 onwards
// User at position 12 (now 11) had rank 12, should be rank 11
// User at position 13 (now 12) had rank 13, should be rank 12
// etc.

// Actually the ranks in the file need to be updated based on new positions
// Let me find each user and update their rank
for (let oldNum = 12; oldNum <= 26; oldNum++) {
  const newNum = oldNum - 1;

  // The rank should equal the new position number (newNum) for positions up to 25
  // Position 26 (oldNum) becomes position 25 (newNum), rank stays 25
  const newRank = newNum <= 25 ? newNum : 25;

  // Find the user block that now has the updated ID and update its rank
  const userBlockPattern = new RegExp(
    `("id":\\s*"psychology-mental-health-${newNum}"[\\s\\S]*?"rank":\\s*)\\d+`,
    'g'
  );
  content = content.replace(userBlockPattern, `$1${newRank}`);
}

fs.writeFileSync('src/data/users.ts', content);
console.log('Done! Removed Vatsal from psychology-mental-health and renumbered remaining users.');
