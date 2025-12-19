import type { User } from '../../types';

interface AlbumCoverProps {
  user: User;
}

export default function AlbumCover({ user }: AlbumCoverProps) {
  return (
    <div className="album-cover max-w-md w-full shadow-lg rounded-xl overflow-hidden slide-in-right">
      {/* User Image Background */}
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${user.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          {user.name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">{user.username}</p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {user.bio}
        </p>

        {/* Metric Display */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl font-semibold text-blue-600">
            {typeof user.metricValue === 'number' && user.metricValue > 100
              ? user.metricValue.toLocaleString()
              : user.metricValue}
          </span>
          <span className="text-gray-600">{user.subtitle}</span>
        </div>

        {/* CTA Button */}
        <a
          href={user.profileUrl}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          View Profile →
        </a>
      </div>
    </div>
  );
}
