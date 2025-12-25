import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { usersByCategory } from '../data/users';
import { CATEGORIES } from '../constants/categories';

export default function UserDetailPage() {
  const { category, rank } = useParams<{ category: string; rank: string }>();
  const contentRef = useRef<HTMLDivElement>(null);

  const users = category ? usersByCategory[category] || [] : [];
  const rankNum = parseInt(rank || '1', 10);
  const user = users.find(u => u.rank === rankNum);
  const currentCategory = CATEGORIES.find(cat => cat.slug === category);

  useEffect(() => {
    if (!contentRef.current) return;

    // Animate content on mount
    const elements = contentRef.current.querySelectorAll('.animate-in');
    gsap.fromTo(elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out"
      }
    );
  }, [category, rank]);

  if (!user || !currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-editorial text-3xl text-white mb-4">User Not Found</h1>
          <Link to={`/${category || ''}`} className="text-white/60 hover:text-white transition-colors">
            ← Back to list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-8 py-8 md:py-16">
      {/* Back Button */}
      <Link
        to={`/${category}`}
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 group"
      >
        <div className="relative flex items-center gap-2 px-4 py-2">
          <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-white/40 transition-colors" />
          <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm text-white/60 group-hover:text-white transition-colors">Back</span>
        </div>
      </Link>

      {/* Editorial Layout - Magazine Style */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-3xl flex flex-col items-center"
      >
        {/* Logo at top */}
        <div className="animate-in mb-6">
          <img
            src="/top25logo.svg"
            alt="Top 25 in '25"
            className="h-10 md:h-12"
          />
        </div>

        {/* Category Title - Prominent */}
        <h3
          className="animate-in text-xl md:text-2xl text-white font-light tracking-tight text-center mb-3"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {currentCategory.title}
        </h3>

        {/* Rank Badge - Gold highlighted */}
        <div className="animate-in mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a959]/10 rounded-full border border-[#c9a959]/30">
            <div className="w-2 h-2 rounded-full bg-[#c9a959] animate-pulse" />
            <span className="text-base font-semibold text-[#c9a959]">
              Rank #{rankNum}
            </span>
          </div>
        </div>

        {/* Profile Image with artistic frame - Moderate size */}
        <div className="animate-in relative mb-8">
          {/* Decorative ring */}
          <div className="absolute -inset-3 rounded-full border border-white/5" />
          <div className="absolute -inset-6 rounded-full border border-white/[0.02]" />

          {/* Main image */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-white/10">
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
        </div>

        {/* Name - Large editorial typography */}
        <h1
          className="animate-in text-2xl md:text-4xl lg:text-5xl text-white font-light tracking-tight text-center mb-3"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: '-0.02em'
          }}
        >
          {user.name}
        </h1>

        {/* Category Metric - only show if not empty */}
        {user.categoryMetric && (
          <p
            className="animate-in text-white/50 text-sm md:text-base text-center mb-4"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {user.categoryMetric}
          </p>
        )}

        {/* Divider - Thin elegant line */}
        <div className="animate-in w-12 h-px bg-white/20 mb-4" />

        {/* Bio/Description */}
        {user.bio && (
          <p
            className="animate-in text-white/40 text-sm text-center max-w-md mb-8 leading-relaxed"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {user.bio}
          </p>
        )}

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
  );
}
