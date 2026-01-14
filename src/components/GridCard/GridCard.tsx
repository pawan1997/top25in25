import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import type { User } from '../../types';
import { CATEGORIES } from '../../constants/categories';
import { getUserCategories } from '../../utils/userCategories';

interface GridCardProps {
  user: User;
  index: number;
}

export default function GridCard({ user }: GridCardProps) {
  const { category } = useParams<{ category: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverGradientRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const currentCategory = CATEGORIES.find(c => c.slug === category);
  const isGrowthCategory = category === 'growth';

  // Mouse tracking for hover gradient effect on grid card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !hoverGradientRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    hoverGradientRef.current.style.setProperty('--mouse-x', `${x}px`);
    hoverGradientRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!hoverGradientRef.current) return;
    hoverGradientRef.current.style.setProperty('--mouse-x', '50%');
    hoverGradientRef.current.style.setProperty('--mouse-y', '50%');
  };

  // 3D tilt effect for modal card
  const handleModalCardMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalCardRef.current) return;

    const rect = modalCardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (max 12 degrees for dramatic effect)
    const rotateY = (mouseX / (rect.width / 2)) * 12;
    const rotateX = -(mouseY / (rect.height / 2)) * 12;

    gsap.to(modalCardRef.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1200,
      transformOrigin: "center center",
    });
  }, []);

  const handleModalCardLeave = useCallback(() => {
    if (!modalCardRef.current) return;

    gsap.to(modalCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);

    setTimeout(() => {
      if (modalRef.current && modalCardRef.current) {
        // Backdrop fade
        gsap.fromTo(modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        // Card entrance - dramatic 3D reveal
        gsap.fromTo(modalCardRef.current,
          {
            scale: 0.8,
            rotateX: -25,
            y: 60,
            opacity: 0
          },
          {
            scale: 1,
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.1
          }
        );
      }
    }, 10);
  };

  const handleCloseModal = () => {
    if (modalRef.current && modalCardRef.current) {
      gsap.to(modalCardRef.current, {
        scale: 0.9,
        rotateX: 15,
        y: 40,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setIsModalOpen(false);
        }
      });
    }
  };

  return (
    <>
      {/* Grid Card */}
      <div
        ref={cardRef}
        className="relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenModal}
      >
        {/* Spotlight Effect - Soft warm glow following cursor */}
        <div
          ref={hoverGradientRef}
          className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl md:rounded-3xl z-10"
          style={{
            background: `radial-gradient(
              350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(201, 169, 89, 0.12),
              rgba(255, 255, 255, 0.06) 40%,
              transparent 70%
            )`,
          }}
        />

        {/* Secondary glow - softer ambient light */}
        <div
          className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl blur-xl"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(201, 169, 89, 0.06), transparent 60%)',
          }}
        />

        {/* Card Border - Figma-style Gradient with hover glow */}
        <div
          className="relative rounded-2xl md:rounded-3xl p-[1px] transition-all duration-300 group-hover:shadow-[0_0_40px_-10px_rgba(201,169,89,0.2)]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
          }}
        >
          {/* Fixed aspect ratio container */}
          <div
            className="bg-black rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col"
            style={{ aspectRatio: '3/4' }}
          >
            {/* User Image - Takes most space (no rank overlay) */}
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-4">
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            {/* User Info - Fixed height at bottom */}
            <div className="flex-shrink-0">
              <h3 className="font-space text-sm md:text-lg font-medium mb-0.5 md:mb-1 truncate text-white">
                {user.name}
              </h3>
              {/* Category metric as subheading - only show if not empty */}
              {user.categoryMetric && (
                <p className={`text-xs md:text-sm mb-2 md:mb-3 line-clamp-1 md:line-clamp-2 flex items-center gap-1 ${isGrowthCategory ? 'text-emerald-400' : 'text-white/40'}`}>
                  {isGrowthCategory && (
                    <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                  {user.categoryMetric}
                </p>
              )}

              {/* Rank Badge */}
              <div className={`inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-white/5 rounded-full border border-white/10 ${!user.categoryMetric ? 'mt-2' : ''}`}>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#c9a959] animate-pulse" />
                <span className="text-[10px] md:text-xs font-medium truncate text-white">
                  #{user.rank}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Modal Card with Tilt Effect */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 md:p-8"
          style={{ opacity: 0, perspective: '1200px' }}
          onClick={handleCloseModal}
        >
          {/* Backdrop - Semi-transparent black with blur */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

          {/* Card Container with Tilt */}
          <div
            ref={modalCardRef}
            className="relative z-10 w-full max-w-sm my-auto"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleModalCardMove}
            onMouseLeave={handleModalCardLeave}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card with gradient border */}
            <div
              className="relative rounded-3xl p-[1px]"
              style={{
                background: 'linear-gradient(180deg, rgba(201,169,89,0.4) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%)',
              }}
            >
              <div className="bg-[#0a0a0a] rounded-3xl px-8 py-10 md:px-10 md:py-12 relative overflow-hidden">
                {/* Subtle radial gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,89,0.08) 0%, transparent 60%)'
                  }}
                />

                {/* Noise texture */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="relative flex flex-col items-center text-center">
                  {/* Logo */}
                  <div className="mb-6">
                    <img
                      src="/top25logo.svg"
                      alt="Top 25 in '25"
                      className="h-9"
                    />
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-4 py-1.5 mb-6 text-[10px] tracking-[0.25em] uppercase text-[#c9a959]/80 border border-[#c9a959]/30 rounded-full bg-[#c9a959]/5">
                    {currentCategory?.title || 'Top 25'}
                  </span>

                  {/* Profile Image with decorative rings */}
                  <div className="relative mb-6">
                    {/* Outer decorative ring */}
                    <div className="absolute -inset-4 rounded-full border border-white/5" />
                    <div className="absolute -inset-8 rounded-full border border-white/[0.02]" />

                    {/* Image container */}
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-[#c9a959]/30">
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        }}
                      />
                    </div>

                    {/* Rank badge - gold floating circle */}
                    <div
                      className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #c9a959 0%, #e8d5a3 50%, #c9a959 100%)',
                        boxShadow: '0 4px 20px rgba(201,169,89,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                      }}
                    >
                      <span className="text-base font-bold text-black">
                        #{user.rank}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h2
                    className="text-2xl md:text-3xl text-white font-light tracking-tight mb-3"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {user.name}
                  </h2>

                  {/* Subtitle/Metric - only show if not empty */}
                  {user.categoryMetric && (
                    <p className={`text-sm mb-4 max-w-[280px] flex items-center justify-center gap-1.5 ${isGrowthCategory ? 'text-emerald-400' : 'text-white/50'}`}>
                      {isGrowthCategory && (
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      )}
                      {user.categoryMetric}
                    </p>
                  )}

                  {/* Elegant divider */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a959]/60" />
                    <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/20" />
                  </div>

                  {/* Bio */}
                  {user.bio && (
                    <p className="text-white/35 text-xs leading-relaxed mb-6 max-w-[280px]">
                      {user.bio}
                    </p>
                  )}

                  {/* Other Categories */}
                  {(() => {
                    const otherCategories = getUserCategories(user.username, category);
                    if (otherCategories.length === 0) return null;
                    return (
                      <div className="mb-6 w-full">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                          Also featured in
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {otherCategories.slice(0, 5).map((cat) => (
                            <Link
                              key={cat.categorySlug}
                              to={cat.categoryRoute}
                              onClick={handleCloseModal}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c9a959]/30 rounded-full text-[11px] text-white/60 hover:text-white/90 transition-all"
                            >
                              <span className="text-[#c9a959]">#{cat.rank}</span>
                              <span className="truncate max-w-[120px]">{cat.categoryTitle}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* CTA Button */}
                  <a
                    href={user.profileUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #c9a959 0%, #e8d5a3 50%, #c9a959 100%)',
                      boxShadow: '0 4px 24px rgba(201,169,89,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                  >
                    <span className="relative text-sm font-semibold text-black tracking-wide">
                      View Profile
                    </span>
                    <svg
                      className="relative w-4 h-4 text-black transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
