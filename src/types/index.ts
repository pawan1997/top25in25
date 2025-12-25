export interface User {
  id: string;
  category: string;
  name: string;
  username: string;
  imageUrl: string;
  rank: number;
  profileUrl: string;
  bio: string;
  categoryMetric: string; // Can be empty - if empty, don't display
  subtitle: string; // Kept for backward compatibility, same as categoryMetric
}

export type CategoryGroup = 'platform' | 'industry';

export interface Category {
  slug: string;
  title: string;
  route: string;
  group: CategoryGroup;
  icon?: string;
  description?: string;
}

export const CATEGORY_GROUPS: Record<CategoryGroup, { label: string; description: string }> = {
  platform: {
    label: 'Platform Achievements',
    description: 'Performance metrics on Topmate'
  },
  industry: {
    label: 'By Industry',
    description: 'Expertise domains'
  }
};
