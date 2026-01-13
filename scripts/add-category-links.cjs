const fs = require('fs');
const path = require('path');

const PROD_BASE_URL = 'https://awards.topmate.io';

// Generate slug from category name
function generateSlug(category) {
  return category
    .toLowerCase()
    .replace(/[&\\/]/g, '-')
    .replace(/[^a-z0-9-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Category name to slug mapping for platform categories
const platformCategoryMapping = {
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
function parseCSVLine(line) {
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
  return fields;
}

// Escape CSV field if needed
function escapeCSV(field) {
  if (!field) return '';
  if (field.includes(',') || field.includes('\n') || field.includes('"')) {
    return '"' + field.replace(/"/g, '""') + '"';
  }
  return field;
}

// ===== Process finaltop25.csv (industry categories) =====
console.log('Processing finaltop25.csv...');
const industryCSVPath = path.join(__dirname, '..', 'public', 'finaltop25.csv');
const industryContent = fs.readFileSync(industryCSVPath, 'utf-8');
const industryLines = industryContent.split('\n');

// Add category_link column to header
const industryHeader = industryLines[0] + ',category_link';
let newIndustryCSV = industryHeader + '\n';

for (let i = 1; i < industryLines.length; i++) {
  const line = industryLines[i].trim();
  if (!line) continue;

  const fields = parseCSVLine(line);
  // CSV columns: username,Display Name,Profile pic,topmate_link,category,title,earnings,bookings,source,classification_method,earnings_rank
  const category = fields[4];

  if (!category) continue;

  const slug = generateSlug(category);
  const categoryLink = `${PROD_BASE_URL}/${slug}`;

  newIndustryCSV += line + ',' + categoryLink + '\n';
}

fs.writeFileSync(industryCSVPath, newIndustryCSV);
console.log(`Updated finaltop25.csv with category links`);

// ===== Process top 25 - pawan.csv (platform categories) =====
console.log('\nProcessing top 25 - pawan.csv...');
const platformCSVPath = path.join(__dirname, '..', 'public', 'top 25 - pawan.csv');
const platformContent = fs.readFileSync(platformCSVPath, 'utf-8');
const platformLines = platformContent.split('\n');

// Add category_link column to header
const platformHeader = platformLines[0] + ',category_link';
let newPlatformCSV = platformHeader + '\n';

for (let i = 1; i < platformLines.length; i++) {
  const line = platformLines[i].trim();
  if (!line) continue;

  const fields = parseCSVLine(line);
  // CSV columns: Category,Rank,Username,Topmate URL,,Category Metric,User ID,Profile Pic URL,First Name,Short Bio
  const category = fields[0];

  if (!category) continue;

  // Use mapping for platform categories, otherwise generate slug
  const slug = platformCategoryMapping[category] || generateSlug(category);
  const categoryLink = `${PROD_BASE_URL}/${slug}`;

  newPlatformCSV += line + ',' + categoryLink + '\n';
}

fs.writeFileSync(platformCSVPath, newPlatformCSV);
console.log(`Updated top 25 - pawan.csv with category links`);

console.log('\nDone! Both CSVs now have category_link column.');
