import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getCategoriesByGroup, getVisibleCategories } from '../constants/categories';
import { usersByCategory } from '../data/users';
import { CATEGORY_GROUPS, type CategoryGroup } from '../types';
import { useSEO } from '../hooks/useSEO';
import BeamsBackground from './BeamsBackground';

export default function Homepage() {
  useSEO({
    title: "Top 25 in '25 | Topmate Awards",
    description: "Celebrating the most exceptional creators on Topmate. Discover outstanding achievement across 31 categories.",
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const categoriesSectionRef = useRef<HTMLDivElement>(null);
  const [activeGroup, setActiveGroup] = useState<CategoryGroup>('platform');

  useEffect(() => {
    if (!heroRef.current) return;

    // Animate hero section
    const heroElements = heroRef.current.querySelectorAll('.animate-hero');
    gsap.fromTo(heroElements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2
      }
    );

    // Animate scroll indicator with continuous bounce
    if (scrollIndicatorRef.current) {
      gsap.fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1.2, ease: "power2.out" }
      );

      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.8
      });
    }
  }, []);

  // Animate cards when group changes
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children);
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: {
          amount: 0.4,
          from: "start",
          ease: "power2.out"
        },
        ease: "power3.out"
      }
    );
  }, [activeGroup]);

  const filteredCategories = getCategoriesByGroup(activeGroup);

  const scrollToCategories = () => {
    categoriesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Hero Section - Compact for earlier CTA visibility */}
      <div
        ref={heroRef}
        className="min-h-[70vh] lg:min-h-[75vh] flex flex-col items-center justify-center relative px-6 md:px-12 lg:px-16 pt-16"
      >
        {/* Animated Beams Background */}
        <BeamsBackground intensity="medium" />

        {/* Bottom fade gradient for smooth transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,1) 100%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="animate-hero font-editorial text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tight mb-6">
            Top 25
            <span className="block text-[#c9a959]">in '25</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-hero text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Celebrating the most exceptional creators on Topmate.
            Discover outstanding achievement across {getVisibleCategories().length} categories.
          </p>

          {/* CTA Button - Gold */}
          <button
            onClick={scrollToCategories}
            className="animate-hero group inline-flex items-center gap-3 px-8 py-4 bg-[#c9a959] text-black rounded-full font-medium text-sm md:text-base transition-all hover:bg-[#d4b86a] hover:scale-105"
          >
            Explore Categories
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0"
          onClick={scrollToCategories}
        >
          <span className="text-xs text-white/40 font-space tracking-widest uppercase">Scroll</span>
          <svg
            className="w-5 h-5 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Categories Section */}
      <div
        ref={categoriesSectionRef}
        className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32"
      >
        {/* Section Header with Filter Chips */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-editorial text-3xl md:text-5xl text-white mb-2">
              All Categories
            </h2>
            <p className="text-white/40 text-sm md:text-base font-space">
              {getVisibleCategories().length} categories · 775+ creators
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2">
            {(Object.keys(CATEGORY_GROUPS) as CategoryGroup[]).map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeGroup === group
                    ? 'bg-[#c9a959] text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {CATEGORY_GROUPS[group].label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {filteredCategories.map((cat) => {
            const topUsers = usersByCategory[cat.slug]?.slice(0, 3) || [];

            return (
              <Link
                key={cat.slug}
                to={cat.route}
                className="group/card relative cursor-pointer block"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Book-pull hover wrapper - separate from GSAP animation */}
                <div className="transition-all duration-300 ease-out group-hover/card:scale-[1.02] group-hover/card:-translate-y-2">
                  {/* Hover glow - spotlight effect from above */}
                  <div
                    className="absolute -inset-2 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none blur-lg"
                    style={{
                      background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,89,0.25) 0%, transparent 70%)'
                    }}
                  />

                  {/* Hover shadow - book lifting effect */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.6), 0 12px 28px -12px rgba(201,169,89,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                  />

                  {/* Card Border - Figma-style Gradient */}
                  <div
                    className="relative rounded-3xl p-[1px] transition-all duration-300"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
                    }}
                  >
                  {/* Card Content */}
                  <div className="bg-black group-hover/card:bg-[#0a0a0a] rounded-3xl p-6 md:p-8 transition-colors duration-300 overflow-hidden relative">
                    {/* Top edge light reflection */}
                    <div
                      className="absolute inset-x-0 top-0 h-12 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(201,169,89,0.12) 0%, transparent 100%)'
                      }}
                    />

                    {/* Subtle top highlight line on hover */}
                    <div
                      className="absolute inset-x-0 top-0 h-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-t-3xl"
                      style={{
                        background: 'linear-gradient(90deg, transparent 10%, rgba(201,169,89,0.5) 50%, transparent 90%)'
                      }}
                    />
                    {/* Top 3 Users Preview */}
                    {topUsers.length > 0 ? (
                      <div className="flex -space-x-3 mb-6">
                        {topUsers.map((user, idx) => (
                          <div
                            key={user.id}
                            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-black group-hover/card:border-white/10 transition-colors flex-shrink-0"
                            style={{ zIndex: 3 - idx }}
                          >
                            <img
                              src={user.imageUrl}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        <div
                          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border-2 border-black flex items-center justify-center group-hover/card:bg-white/10 transition-colors flex-shrink-0"
                          style={{ zIndex: 0 }}
                        >
                          <span className="text-xs text-white/40">+22</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex -space-x-3 mb-6">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border-2 border-black flex-shrink-0"
                            style={{ zIndex: 3 - i }}
                          />
                        ))}
                        <div
                          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border-2 border-black flex items-center justify-center flex-shrink-0"
                          style={{ zIndex: 0 }}
                        >
                          <span className="text-xs text-white/40">+22</span>
                        </div>
                      </div>
                    )}

                    {/* Category Info */}
                    <h3 className="font-space text-xl md:text-2xl text-white mb-3 group-hover/card:text-[#c9a959] transition-colors font-normal">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-white/40 mb-6 line-clamp-2 font-space">
                      {cat.description || 'Explore top creators in this category'}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-white/60 group-hover/card:text-white transition-colors">
                      <span className="text-sm font-space">View Rankings</span>
                      <svg
                        className="w-4 h-4 transform group-hover/card:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Section - Logo left, CTA right (same as category pages) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-24 pb-12 md:pb-16">
        {/* Card with gradient border like user cards */}
        <div
          className="rounded-3xl p-[1px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
          }}
        >
          <div className="bg-black rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
            {/* Logo - Left aligned */}
            <img
              src="/top25logo.svg"
              alt="Top 25 in '25"
              className="w-[200px] md:w-[280px] lg:w-[320px]"
            />

            {/* CTA Button - Right aligned */}
            <a
              href="https://topmate.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #c9a959 0%, #e8d5a3 50%, #c9a959 100%)',
                boxShadow: '0 4px 24px rgba(201,169,89,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              <span className="relative text-base md:text-lg font-semibold text-black tracking-wide">
                Start Your Page
              </span>
              <svg
                className="relative w-5 h-5 text-black transform group-hover:translate-x-1 transition-transform"
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
  );
}
