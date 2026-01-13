const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'public', 'finaltop25.csv');
let csvContent = fs.readFileSync(csvPath, 'utf-8');

// Category changes map: username -> new category (or null for removal)
const categoryChanges = {
  // AI / ML changes
  'harish_kumar142': 'International Career Moves',
  'arnavgupta': 'Tech Education',
  'vin_thejobhunt_community': 'Job Hunting Strategies',
  'videsh_registration': 'International Career Moves',

  // AI / ML 2 changes
  'rohitdecoded': 'Lifestyle & Personal Growth',
  'nabaneet_pradhan': null, // REMOVE
  'simranjeet97': 'Lifestyle & Personal Growth',

  // Academic Guidance changes
  'hexagon_digital_services': 'Tech Learning',
  'saurabhgandhi': 'Lifestyle & Personal Growth',
  'yashika_gulati': 'Accounting & Tax Advisory',

  // Accounting & Tax Advisory changes
  'shivam_mishra64': 'Academic Guidance',
  'maha': 'Startups & Entrepreneurship',
  'ca_siddhant_gupta': 'Startups & Entrepreneurship',

  // Astrology / Tarot / Manifestation changes
  'happinesscoachanjali': 'Lifestyle & Personal Growth',

  // Career Guidance changes
  'coolcareercoach': 'Academic Guidance',
  'sachin_bhandari': 'Consulting & Business Analysts',
  'jyothi_nookula': null, // REMOVE
  'youleadbyhajara': 'Academic Guidance',
  'qa_engineer': 'Tech Learning',
  'dionysy': 'Education & Learning',

  // Working Abroad changes
  'anil_rege10': null, // REMOVE

  // Unique Expertise changes
  'nikitaswe': 'Software Engineering',
  'aarshy': 'Design',
  'arihantbaidofficial': 'Lifestyle & Personal Growth',
  'harshit_shrivastava14': 'Software Engineering',
  'arpit_goyal': 'International Career Moves',
  'neverstoplearning': 'Software Engineering',
  'vidhis': 'International Career Moves',
  'surbhigandhi': 'Lifestyle & Personal Growth',

  // Tech Learning changes
  'sumit_lad': null, // REMOVE
  'investmoneyuae': 'Accounting & Tax Advisory',
  'pratiksha_more11': 'Unique Expertise',
  'mlwhiz': 'AI / ML 2',
  'snehansu_amazon_ml_scientist': 'AI / ML 2',
  'dpenhadavid': 'Job Hunting Strategies',
  'haneet_singh': 'Job Hunting Strategies',
  'findyournorth': 'Product Management',
  'gunjan_chawla': 'Job Hunting Strategies',

  // Tech Education changes
  'arpit_sharma16': 'Unique Expertise',
  'ebookstore': 'Academic Guidance',
  'abhisat_book': 'Unique Expertise',
  'yash_singh57': 'Content, Branding & Creative',

  // Tech Careers & Software changes
  'prashant_verma': 'SAP & Project Management',
  'codtech_it_solutions': 'Tech Education',
  'pvergadia': 'Content, Branding & Creative',
  'the_gen_academy': 'AI / ML 2',
  'karansaxena': null, // REMOVE
  'mjunaid': 'Tech Education',

  // Startups & Entrepreneurship changes
  'sandeepanand': 'Career Guidance',
  'adityam': 'Unique Expertise',
  'mariana_antaya': 'Career Guidance',
  'olambit': 'Accounting & Tax Advisory',
  'vingaut': 'Unique Expertise',

  // Health & Wellness changes
  'shikhar_chaudhary': 'Unique Expertise',
  'coachaksingh': 'Lifestyle & Personal Growth',
  'divya_misra': 'Lifestyle & Personal Growth',
  'kunalkanase': 'Lifestyle & Personal Growth',
};

// Category name changes
const categoryRenames = {
  'Accounting & Tax Advisory': 'Accounting, Tax & Finance Consulting',
  'Lifestyle & Personal Growth': 'Travel, Lifestyle & Personal Growth',
};

// Parse CSV
const lines = csvContent.split('\n');
const header = lines[0];
const newLines = [header];
let removedCount = 0;
let changedCount = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Parse the line to get username
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);

  const username = fields[0];
  const currentCategory = fields[4];

  // Check if this user needs to be removed
  if (categoryChanges[username] === null) {
    console.log(`REMOVED: ${username} (was in ${currentCategory})`);
    removedCount++;
    continue;
  }

  // Check if this user needs category change
  if (categoryChanges[username]) {
    const newCategory = categoryChanges[username];
    console.log(`MOVED: ${username}: ${currentCategory} -> ${newCategory}`);
    fields[4] = newCategory;
    changedCount++;
  }

  // Apply category renames
  if (categoryRenames[fields[4]]) {
    fields[4] = categoryRenames[fields[4]];
  }

  // Rebuild the line
  const newLine = fields.map((f, idx) => {
    // Only quote if needed (contains comma or quotes)
    if (f.includes(',') || f.includes('"')) {
      if (!f.startsWith('"')) {
        return '"' + f.replace(/"/g, '""') + '"';
      }
    }
    return f;
  }).join(',');

  newLines.push(newLine);
}

// Also apply category renames to any remaining rows
let finalContent = newLines.join('\n');
for (const [oldName, newName] of Object.entries(categoryRenames)) {
  finalContent = finalContent.split(oldName).join(newName);
}

// Write the updated CSV
fs.writeFileSync(csvPath, finalContent);

console.log('\n=== SUMMARY ===');
console.log(`Removed: ${removedCount} users`);
console.log(`Moved: ${changedCount} users`);
console.log(`Category renames applied: ${Object.keys(categoryRenames).length}`);

// Now verify counts
console.log('\n=== VERIFYING COUNTS ===');
const verifyContent = fs.readFileSync(csvPath, 'utf-8');
const verifyLines = verifyContent.split('\n');
const categoryCounts = {};

for (let i = 1; i < verifyLines.length; i++) {
  const line = verifyLines[i].trim();
  if (!line) continue;

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

  const category = fields[4];
  if (category && !category.startsWith('http')) {
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  }
}

// Sort and display
const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
console.log('\nCategory counts after changes:');
for (const [cat, count] of sortedCategories) {
  const marker = count < 20 ? ' ⚠️ LOW' : (count > 25 ? ' ⚠️ HIGH' : '');
  console.log(`  ${cat}: ${count}${marker}`);
}

const total = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
console.log(`\nTotal users: ${total}`);
