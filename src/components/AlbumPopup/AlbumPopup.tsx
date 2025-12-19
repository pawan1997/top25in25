import { useEffect } from 'react';
import type { User } from '../../types';
import SpinningVinyl from './SpinningVinyl';
import AlbumCover from './AlbumCover';

interface AlbumPopupProps {
  user: User;
  onClose: () => void;
}

export default function AlbumPopup({ user, onClose }: AlbumPopupProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-auto p-6 sm:p-8 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content Grid: Vinyl Left | Album Cover Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <SpinningVinyl user={user} />
          <AlbumCover user={user} />
        </div>
      </div>
    </div>
  );
}
