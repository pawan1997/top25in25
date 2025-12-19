import type { User } from '../types';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div
      className="aspect-square bg-cover bg-center rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{ backgroundImage: `url(${user.imageUrl})` }}
    >
      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-lg font-bold mb-1 drop-shadow-lg">{user.name}</h3>
        <p className="text-sm text-gray-100 drop-shadow-md">{user.subtitle}</p>
      </div>
    </div>
  );
}
