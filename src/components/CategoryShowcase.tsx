import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategoriesByGroup, CATEGORIES } from '../constants/categories';
import { usersByCategory } from '../data/users';
import { cohorts } from '../data/cohorts';

type CategoryGroup = 'platform' | 'industry';

export default function CategoryShowcase() {
  const { category } = useParams<{ category: string }>();

  // Determine initial group based on current category
  const currentCat = CATEGORIES.find(c => c.slug === category);
  const initialGroup: CategoryGroup = currentCat?.group === 'industry' ? 'industry' : 'platform';
  const [activeGroup, setActiveGroup] = useState<CategoryGroup>(initialGroup);

  // Get categories by group
  const platformCategories = getCategoriesByGroup('platform');
  const industryCategories = getCategoriesByGroup('industry');
  const currentCategories = activeGroup === 'platform' ? platformCategories : industryCategories;

  // Render a single category card
  const renderCategoryCard = (cat: typeof platformCategories[0]) => {
    const isActive = cat.slug === category;
    const isCohorts = cat.slug === 'cohorts';
    const topUsers = isCohorts
      ? cohorts.slice(0, 3).map(c => ({ id: c.id, name: c.instructor.name, imageUrl: c.instructor.imageUrl }))
      : usersByCategory[cat.slug]?.slice(0, 3) || [];

    return (
      <Link
        key={cat.slug}
        to={cat.route}
        className="group relative cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), rgba(255,255,255,0.05) 40%, transparent 80%)',
          }}
        />

        <div
          className="relative rounded-3xl p-[1px]"
          style={{
            background: isActive
              ? 'linear-gradient(180deg, rgba(201,169,89,0.5) 0%, rgba(201,169,89,0.2) 50%, rgba(201,169,89,0) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
          }}
        >
          <div className="bg-black rounded-3xl p-5 flex flex-col items-center justify-center min-h-[140px]">
            <div className="flex -space-x-3 mb-4">
              {topUsers.map((user, idx) => (
                <div
                  key={user.id}
                  className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-black flex-shrink-0"
                  style={{ zIndex: 3 - idx }}
                >
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <h3 className={`
              font-space text-sm md:text-lg font-medium text-center
              ${isActive ? 'text-[#c9a959]' : 'text-white'}
            `}>
              {cat.title}
            </h3>

            {isActive && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-[#c9a959]/10 rounded-full border border-[#c9a959]/20">
                <div className="w-2 h-2 rounded-full bg-[#c9a959] animate-pulse" />
                <span className="text-xs font-medium text-[#c9a959] font-space">Current</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full">
      {/* End of List Label */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-24 mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/30 font-space">
            End of List
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>

      {/* Section Header with Toggle */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-20 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="font-space text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-wide">
            {activeGroup === 'platform' ? 'Platform Achievements' : 'Industry Categories'}
          </h2>

          {/* Toggle Chips */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveGroup('platform')}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                activeGroup === 'platform'
                  ? 'bg-[#c9a959] text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              Platform Stats
            </button>
            <button
              onClick={() => setActiveGroup('industry')}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                activeGroup === 'industry'
                  ? 'bg-[#c9a959] text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              By Industry
            </button>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-7">
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
