import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import type { Cohort } from '../../data/cohorts';

interface CohortCardProps {
  cohort: Cohort;
}

export default function CohortCard({ cohort }: CohortCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Subtle 3D tilt effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  const hasSecondPhoto = cohort.instructor.imageUrl2;
  // Use landing page URL if available, fallback to cohort URL
  const redirectUrl = cohort.landingPageUrl || cohort.cohortUrl;

  return (
    <a
      ref={cardRef}
      href={redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group block h-full"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201,169,89,0.2), transparent 70%)'
        }}
      />

      {/* Card Border */}
      <div
        className="relative rounded-3xl p-[1px] transition-all duration-300 h-full"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)'
        }}
      >
        <div className="bg-[#0a0a0a] rounded-3xl p-6 md:p-8 relative overflow-hidden group-hover:bg-[#0d0d0d] transition-colors duration-300 h-full flex flex-col">
          {/* Top edge glow on hover */}
          <div
            className="absolute inset-x-0 top-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(201,169,89,0.08) 0%, transparent 100%)'
            }}
          />

          {/* Cohort Name - At the top */}
          <h3 className="font-space text-xl md:text-2xl text-white mb-4 leading-snug group-hover:text-[#c9a959] transition-colors duration-300 line-clamp-2 min-h-[3.5rem] font-semibold">
            {cohort.name}
          </h3>

          {/* Starts & Duration - Below title */}
          <div className="flex items-center gap-4 text-sm mb-auto">
            <div className="text-white/50">
              <span className="text-white/30 text-xs uppercase tracking-wider">Starts</span>
              <div className="text-white/70 mt-0.5">{cohort.startDate}</div>
            </div>
            <div>
              <span className="text-white/30 text-xs uppercase tracking-wider">Duration</span>
              <div className="text-white/70 mt-0.5">{cohort.duration}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-5" />

          {/* Instructor Section - Photo left, Info right - At bottom */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Photo(s) */}
              {hasSecondPhoto ? (
                // Dual photos - overlapping
                <div className="flex -space-x-2 flex-shrink-0">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-[#0a0a0a] relative z-10">
                    <img
                      src={cohort.instructor.imageUrl}
                      alt={cohort.instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-[#0a0a0a]">
                    <img
                      src={cohort.instructor.imageUrl2}
                      alt={cohort.instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                // Single photo
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[#c9a959]/30 transition-all duration-300 flex-shrink-0">
                  <img
                    src={cohort.instructor.imageUrl}
                    alt={cohort.instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Instructor Name & Title */}
              <div className="min-w-0">
                <h4 className="text-white/80 font-medium text-sm truncate">{cohort.instructor.name}</h4>
                <p className="text-white/40 text-xs line-clamp-1">{cohort.instructor.title}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-[#c9a959] text-sm font-medium group-hover:gap-3 transition-all duration-300">
              <span>Enroll</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
