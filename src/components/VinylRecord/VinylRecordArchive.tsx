/**
 * ARCHIVED: Original Vinyl Record Design
 *
 * This was the initial design featuring glass morphism cards with Figma-inspired
 * gradient borders. The design included:
 * - 180px max-width square cards
 * - Gradient border (28% white top → 0% bottom)
 * - Glass background gradient (white 0-15%, black 30% bottom)
 * - User photo with 12px padding
 * - Hover animations (elevation + scale)
 * - Full-screen editorial modal
 *
 * Preserved for potential future use or reference.
 *
 * Date Archived: December 24, 2025
 * Replaced By: GridCard.tsx (grid-based design with dynamic hover effects)
 */

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import type { User } from '../../types';
import { getCategoryStats } from '../../utils/categoryStats';

interface VinylRecordProps {
  user: User;
  index: number;
}

export default function VinylRecordArchive({ user, index }: VinylRecordProps) {
  const { category } = useParams<{ category: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const stats = getCategoryStats(category || 'earning', user, index);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  const handleMouseEnter = () => {
    if (!cardRef.current || isModalOpen) return;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isModalOpen) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);

    setTimeout(() => {
      if (modalRef.current && contentRef.current) {
        // Backdrop fade
        gsap.fromTo(modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        // Content slide up with stagger
        const elements = contentRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.15
          }
        );
      }
    }, 10);
  };

  const handleCloseModal = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsModalOpen(false)
      });
    }
  };

  return (
    <>
      {/* Grid Card */}
      <div
        ref={cardRef}
        className="relative w-full flex flex-col items-center cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenModal}
      >
        {/* Figma Frame Design - Glass Card */}
        <div className="w-full aspect-square max-w-[180px] relative mx-auto">
          {/* Glass background with proper rounded corners */}
          <div className="absolute inset-0 rounded-[26px] overflow-hidden">
            {/* Background gradient - transitions to black at bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(0,0,0,0.3) 100%)'
              }}
            />
          </div>

          {/* Border gradient using pseudo-element to preserve border-radius */}
          <div
            className="absolute inset-0 rounded-[26px] pointer-events-none"
            style={{
              background: `
                linear-gradient(#000, #000) padding-box,
                linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 100%) border-box
              `,
              border: '1px solid transparent'
            }}
          />

          {/* User Photo - sits on top of glass */}
          <div className="absolute inset-0 rounded-[26px] overflow-hidden z-10 flex items-center justify-center p-3">
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-full h-full object-cover rounded-[18px]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Info Below Vinyl */}
        <div className="vinyl-info text-center mt-5 px-1">
          <h3 className="font-editorial text-base md:text-lg text-white leading-tight">{user.name}</h3>
          <p className="text-xs md:text-sm text-white/40 mt-1.5 truncate">{user.subtitle}</p>
        </div>
      </div>

      {/* Full Screen Editorial Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          {/* Background - Deep charcoal with grain texture */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #0d0d0d 0%, #1a1a1a 50%, #0a0a0a 100%)',
            }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Close Button - Editorial style */}
          <button
            onClick={handleCloseModal}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-50 group"
            aria-label="Close"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-white/40 transition-colors" />
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>

          {/* Main Content Container */}
          <div
            ref={contentRef}
            className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Editorial Layout - Magazine Style */}
            <div className="flex flex-col items-center">

              {/* Category Badge */}
              <div className="animate-in mb-8">
                <span
                  className="inline-block px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-white/50 border border-white/10 rounded-full"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  {stats.categoryTitle}
                </span>
              </div>

              {/* Large Profile Image with artistic frame */}
              <div className="animate-in relative mb-10">
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-full border border-white/5" />
                <div className="absolute -inset-6 rounded-full border border-white/[0.02]" />

                {/* Main image */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-2 ring-white/10">
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

                {/* Rank badge - floating */}
                <div
                  className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full bg-[#f5f0e8] flex items-center justify-center shadow-2xl"
                  style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                >
                  <span
                    className="text-lg font-bold text-[#1a1a1a]"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    #{stats.rank}
                  </span>
                </div>
              </div>

              {/* Name - Large editorial typography */}
              <h2
                className="animate-in text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-tight text-center mb-4"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  letterSpacing: '-0.02em'
                }}
              >
                {user.name}
              </h2>

              {/* Divider - Thin elegant line */}
              <div className="animate-in w-12 h-px bg-white/20 mb-6" />

              {/* Bio/Description */}
              <p
                className="animate-in text-white/40 text-sm md:text-base text-center max-w-md mb-10 leading-relaxed"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {user.bio || user.subtitle}
              </p>

              {/* Stat Card - The hero metric */}
              <div className="animate-in w-full max-w-sm mb-10">
                <div
                  className="relative p-8 rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Subtle border */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5" />

                  {/* Stat Label */}
                  <p
                    className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    {stats.statLabel}
                  </p>

                  {/* Main Stat Value */}
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-4xl md:text-5xl text-white font-light"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {stats.statValue}
                    </span>
                    {stats.statSuffix && (
                      <span
                        className="text-lg text-white/30"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      >
                        {stats.statSuffix}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Button - Minimal elegant style */}
              <a
                href={user.profileUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-in group relative inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wide text-white/80 hover:text-white transition-colors"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {/* Button border that animates */}
                <span className="absolute inset-0 border border-white/20 rounded-full group-hover:border-white/40 transition-colors" />

                <span>View Profile</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
