import type { User } from '../../types';
import ShaderBackdrop from '../VinylRecord/ShaderBackdrop';

interface SpinningVinylProps {
  user: User;
}

export default function SpinningVinyl({ user }: SpinningVinylProps) {
  return (
    <div className="flex items-center justify-center slide-in-left">
      {/* Larger Vinyl for Popup - Always Spinning */}
      <div className="spinning-vinyl w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full relative shadow-2xl overflow-hidden">
        {/* Simple Gradient Background */}
        <ShaderBackdrop userId={user.id} />

        {/* Center User Photo - Large, leaving only 10-15% gradient visible */}
        <div className="absolute inset-[12%] rounded-full flex items-center justify-center z-10">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-full h-full rounded-full object-cover shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
