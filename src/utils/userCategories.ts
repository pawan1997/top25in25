import { usersByCategory } from '../data/users';
import { CATEGORIES } from '../constants/categories';

export interface UserCategoryInfo {
  categorySlug: string;
  categoryTitle: string;
  categoryRoute: string;
  rank: number;
  group: 'platform' | 'industry';
}

/**
 * Find all categories a user appears in by their username
 * @param username - The username to search for (with or without @)
 * @param excludeCurrentCategory - Optional category slug to exclude (the current one being viewed)
 * @returns Array of category info objects sorted by rank
 */
export function getUserCategories(
  username: string,
  excludeCurrentCategory?: string
): UserCategoryInfo[] {
  // Normalize username (remove @ if present)
  const normalizedUsername = username.startsWith('@') ? username : `@${username}`;

  const categories: UserCategoryInfo[] = [];

  // Search through all categories in users data
  for (const [categorySlug, categoryUsers] of Object.entries(usersByCategory)) {
    // Skip the excluded category
    if (excludeCurrentCategory && categorySlug === excludeCurrentCategory) {
      continue;
    }

    // Find the user in this category
    const userInCategory = categoryUsers.find(u => u.username === normalizedUsername);

    if (userInCategory) {
      // Find the category info from CATEGORIES
      const categoryInfo = CATEGORIES.find(c => c.slug === categorySlug);

      if (categoryInfo) {
        categories.push({
          categorySlug,
          categoryTitle: categoryInfo.title,
          categoryRoute: categoryInfo.route,
          rank: userInCategory.rank,
          group: categoryInfo.group,
        });
      }
    }
  }

  // Sort by rank (best rank first)
  return categories.sort((a, b) => a.rank - b.rank);
}

/**
 * Get the count of categories a user appears in
 */
export function getUserCategoryCount(username: string): number {
  const normalizedUsername = username.startsWith('@') ? username : `@${username}`;
  let count = 0;

  for (const categoryUsers of Object.values(usersByCategory)) {
    if (categoryUsers.some(u => u.username === normalizedUsername)) {
      count++;
    }
  }

  return count;
}
