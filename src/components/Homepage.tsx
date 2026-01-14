import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { getCategoriesByGroup, getVisibleCategories } from '../constants/categories';
import { usersByCategory } from '../data/users';
import { cohorts } from '../data/cohorts';
import { useSEO } from '../hooks/useSEO';
import BeamsBackground from './BeamsBackground';

type CategoryGroup = 'platform' | 'industry';

export default function Homepage() {
  useSEO({
    title: "Top 25 in '25 | Topmate Awards",
    description: "Celebrating the most exceptional creators on Topmate. Discover outstanding achievement across 59 categories.",
  });

  const [activeGroup, setActiveGroup] = useState<CategoryGroup>('industry');
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const categoriesSectionRef = useRef<HTMLDivElement>(null);

  // Get categories by group
  const platformCategories = getCategoriesByGroup('platform');
  const industryCategories = getCategoriesByGroup('industry');
  const currentCategories = activeGroup === 'platform' ? platformCategories : industryCategories;

  useEffect(() => {
    if (!heroRef.current) return;

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
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: {
          amount: 0.3,
          from: "start",
          ease: "power2.out"
        },
        ease: "power3.out"
      }
    );
  }, [activeGroup]);

  const scrollToCategories = () => {
    categoriesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderCategoryCard = (cat: typeof platformCategories[0]) => {
    const isCohorts = cat.slug === 'cohorts';
    const topUsers = isCohorts
      ? cohorts.slice(0, 3).map(c => ({ id: c.id, name: c.instructor.name, imageUrl: c.instructor.imageUrl }))
      : usersByCategory[cat.slug]?.slice(0, 3) || [];

    return (
      <Link
        key={cat.slug}
        to={cat.route}
        className="group/card relative cursor-pointer block"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="transition-all duration-300 ease-out group-hover/card:scale-[1.02] group-hover/card:-translate-y-2">
          <div
            className="absolute -inset-2 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none blur-lg"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,89,0.25) 0%, transparent 70%)'
            }}
          />
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: '0 20px 40px -12px rgba(0,0,0,0.6), 0 12px 28px -12px rgba(201,169,89,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          />
          <div
            className="relative rounded-3xl p-[1px] transition-all duration-300"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
            }}
          >
            <div className="bg-black group-hover/card:bg-[#0a0a0a] rounded-3xl p-6 md:p-8 transition-colors duration-300 overflow-hidden relative">
              <div
                className="absolute inset-x-0 top-0 h-12 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(201,169,89,0.12) 0%, transparent 100%)'
                }}
              />
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-t-3xl"
                style={{
                  background: 'linear-gradient(90deg, transparent 10%, rgba(201,169,89,0.5) 50%, transparent 90%)'
                }}
              />

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
                    <span className="text-xs text-white/40">+{Math.max(0, (usersByCategory[cat.slug]?.length || 25) - 3)}</span>
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
                </div>
              )}

              <h3 className="font-space text-xl md:text-2xl text-white mb-3 group-hover/card:text-[#c9a959] transition-colors font-normal">
                {cat.title}
              </h3>
              <p className="text-sm text-white/40 mb-6 line-clamp-2 font-space">
                {cat.description || 'Explore top creators in this category'}
              </p>

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
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="min-h-[70vh] lg:min-h-[75vh] flex flex-col items-center justify-center relative px-6 md:px-12 lg:px-16 pt-16"
      >
        <BeamsBackground intensity="medium" />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,1) 100%)'
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="animate-hero font-editorial text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tight mb-6">
            Top 25
            <span className="block text-[#c9a959]">in '25</span>
          </h1>

          <p className="animate-hero text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Celebrating the most exceptional creators on Topmate.
            Discover outstanding achievement across {getVisibleCategories().length} categories.
          </p>

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

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0"
          onClick={scrollToCategories}
        >
          <span className="text-xs text-white/40 font-space tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Categories Section */}
      <div
        ref={categoriesSectionRef}
        className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32"
      >
        {/* Section Header with Toggle */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-editorial text-3xl md:text-5xl text-white mb-2">
              {activeGroup === 'platform' ? 'Platform Achievements' : 'Industry Categories'}
            </h2>
            <p className="text-white/40 text-sm md:text-base font-space">
              {currentCategories.length} categories · {activeGroup === 'platform' ? 'Celebrating excellence on Topmate' : '1000+ creators by expertise'}
            </p>
          </div>

          {/* Toggle Chips */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveGroup('platform')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeGroup === 'platform'
                  ? 'bg-[#c9a959] text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              Platform Stats
            </button>
            <button
              onClick={() => setActiveGroup('industry')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeGroup === 'industry'
                  ? 'bg-[#c9a959] text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              By Industry
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {currentCategories.map(renderCategoryCard)}
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-24 pb-12 md:pb-16">
        <div
          className="rounded-3xl p-[1px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
          }}
        >
          <div className="bg-black rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
            <img
              src="/top25logo.svg"
              alt="Top 25 in '25"
              className="w-[200px] md:w-[280px] lg:w-[320px]"
            />
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
