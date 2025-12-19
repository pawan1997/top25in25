export interface User {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  metricValue: number;
  subtitle: string;
  bio: string;
  profileUrl: string;
}

export interface Category {
  slug: string;
  title: string;
  route: string;
}
