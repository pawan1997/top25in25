import { Link, useParams } from 'react-router-dom';
import { getCategoriesByGroup } from '../constants/categories';
import { usersByCategory } from '../data/users';
import { cohorts } from '../data/cohorts';

export default function CategoryShowcase() {
  const { category } = useParams<{ category: string }>();
  // Always show platform categories since industry categories are hidden
  const filteredCategories = getCategoriesByGroup('platform');

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

      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-20 mb-12 md:mb-14">
        <h2 className="font-space text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-5xl xl:text-6xl text-white font-light tracking-[0.08em] uppercase whitespace-nowrap">
          All Categories
        </h2>
      </div>

      {/* Category Grid - Matching User Card Style */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-7 mb-16 md:mb-24">
        {filteredCategories.map((cat) => {
          const isActive = cat.slug === category;
          // For cohorts category, show cohort instructors instead of users
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
              {/* Hover Gradient Light Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), rgba(255,255,255,0.05) 40%, transparent 80%)',
                }}
              />

              {/* Card Border - Figma-style Gradient */}
              <div
                className="relative rounded-3xl p-[1px]"
                style={{
                  background: isActive
                    ? 'linear-gradient(180deg, rgba(201,169,89,0.5) 0%, rgba(201,169,89,0.2) 50%, rgba(201,169,89,0) 100%)'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
                }}
              >
                {/* Card Content */}
                <div className="bg-black rounded-3xl p-5 flex flex-col items-center justify-center min-h-[140px]">
                  {/* Top 3 User Photos - 1:1 aspect ratio */}
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

                  {/* Title - Same size as user list first name */}
                  <h3 className={`
                    font-space text-sm md:text-lg font-medium text-center
                    ${isActive ? 'text-[#c9a959]' : 'text-white'}
                  `}>
                    {cat.title}
                  </h3>

                  {/* Active indicator */}
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
        })}
        </div>
      </div>

      {/* Footer Section - Logo left, CTA right */}
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
