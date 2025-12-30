import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { CATEGORIES, getCategoriesByGroup } from '../constants/categories';
import { usersByCategory } from '../data/users';
import { cohorts } from '../data/cohorts';

export default function TopNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Always show platform categories since industry categories are hidden
  const activeGroup = 'platform';
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const categoryItemsRef = useRef<HTMLAnchorElement[]>([]);

  // Get current category for display
  const currentCategory = CATEGORIES.find(cat => cat.route === currentPath);
  const isHomepage = currentPath === '/';

  // Animate dropdown on open
  useEffect(() => {
    if (!isDropdownOpen || !dropdownRef.current) return;

    // Dropdown appearance
    gsap.fromTo(dropdownRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );

    // Category items stagger
    gsap.fromTo(categoryItemsRef.current,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        delay: 0.1
      }
    );
  }, [isDropdownOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target);
      const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);

      if (isOutsideDropdown && isOutsideButton) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isDropdownOpen]);

  // Mobile scroll behavior - hide logo on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Minimal Editorial Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Subtle gradient backdrop - transparent on homepage to show beams */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHomepage && !isScrolled
            ? 'opacity-0'
            : 'opacity-100 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`} />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Mobile: Full logo on top (hides on scroll) - on all pages */}
          <div className={`
            md:hidden flex justify-center py-3 transition-all duration-300
            ${isScrolled ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100'}
          `}>
            <Link to="/">
              <img
                src="/top25logo.svg"
                alt="Top 25 in '25"
                className="h-10"
              />
            </Link>
          </div>

          {/* Desktop & Mobile (sticky) category selector */}
          <div className={`
            flex items-center justify-between transition-all duration-300
            ${isScrolled ? 'py-4' : (isHomepage ? 'py-4' : 'py-6')}
          `}>
            {/* Logo - Desktop only */}
            <Link to="/" className="hidden md:flex items-center gap-3 group">
              <img
                src="/top25logo.svg"
                alt="Top 25 in '25"
                className="h-10 md:h-12"
              />
            </Link>

            {/* Category Dropdown - Aesthetic Box - Right aligned on Desktop */}
            <div className={isHomepage ? '' : 'flex-1 md:flex-initial'}>
              <button
                ref={buttonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 w-full md:w-auto group"
              >
                <span className="font-editorial text-sm md:text-base text-white">
                  {isHomepage ? 'Select a Category' : (currentCategory?.title || 'Select Category')}
                </span>
                <svg
                  className={`w-4 h-4 text-white/60 group-hover:text-white transition-all ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dropdown Menu - Outside the flex container for full width */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className={`fixed left-4 right-4 bottom-4 md:relative md:top-0 md:bottom-auto md:left-0 md:right-0 md:mt-2 overflow-hidden ${
                isScrolled ? 'top-[52px]' : 'top-[108px]'
              }`}
              style={{ opacity: 0 }}
            >
              <div className="relative border border-white/10 rounded-xl bg-gradient-to-b from-black/95 via-black/95 to-black backdrop-blur-xl shadow-2xl p-3 md:p-6 h-full md:h-auto overflow-y-auto">
                {/* Subtle inner glow at top */}
                <div
                  className="absolute inset-x-0 top-0 h-20 pointer-events-none rounded-t-xl"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(201,169,89,0.05) 0%, transparent 100%)'
                  }}
                />
                {/* Bottom fade for smooth edge */}
                <div
                  className="absolute inset-x-0 bottom-0 h-16 pointer-events-none rounded-b-xl z-10"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)'
                  }}
                />
                {/* Filter Chips - Hidden since industry categories are disabled */}
                {/* <div className="flex gap-2 mb-4">
                  {(Object.keys(CATEGORY_GROUPS) as CategoryGroup[]).map((group) => (
                    <button
                      key={group}
                      onClick={() => setActiveGroup(group)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                        activeGroup === group
                          ? 'bg-[#c9a959] text-black'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      {CATEGORY_GROUPS[group].label}
                    </button>
                  ))}
                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3" style={{ perspective: '1000px' }}>
                  {getCategoriesByGroup(activeGroup).map((category, index) => {
                    const isActive = currentPath === category.route;
                    // For cohorts category, show cohort instructors instead of users
                    const isCohorts = category.slug === 'cohorts';
                    const topUsers = isCohorts
                      ? cohorts.slice(0, 3).map(c => ({ id: c.id, name: c.instructor.name, imageUrl: c.instructor.imageUrl }))
                      : usersByCategory[category.slug]?.slice(0, 3) || [];
                    return (
                      <Link
                        key={category.slug}
                        to={category.route}
                        ref={(el) => {
                          if (el) categoryItemsRef.current[index] = el;
                        }}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="group/card block"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Book-pull effect wrapper */}
                        <div
                          className="relative rounded-xl md:rounded-2xl p-[1px] transition-all duration-300 ease-out group-hover/card:-translate-y-2 group-hover/card:scale-[1.02]"
                          style={{
                            background: isActive
                              ? 'linear-gradient(180deg, rgba(201,169,89,0.5) 0%, rgba(201,169,89,0.2) 50%, rgba(201,169,89,0) 100%)'
                              : 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
                            transformOrigin: 'center bottom'
                          }}
                        >
                          {/* Hover glow - spotlight effect from above */}
                          <div
                            className="absolute -inset-1 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none blur-md"
                            style={{
                              background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,89,0.25) 0%, transparent 70%)'
                            }}
                          />

                          {/* Hover shadow - book lifting effect */}
                          <div
                            className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              boxShadow: '0 12px 28px -8px rgba(0,0,0,0.6), 0 8px 20px -8px rgba(201,169,89,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                            }}
                          />

                          <div className="relative bg-black/90 group-hover/card:bg-[#0a0a0a] rounded-xl md:rounded-2xl p-3 md:p-4 transition-all duration-300 overflow-hidden">
                            {/* Top edge light reflection */}
                            <div
                              className="absolute inset-x-0 top-0 h-8 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                              style={{
                                background: 'linear-gradient(180deg, rgba(201,169,89,0.12) 0%, transparent 100%)'
                              }}
                            />

                            {/* Subtle top highlight line on hover */}
                            <div
                              className="absolute inset-x-0 top-0 h-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-t-xl"
                              style={{
                                background: 'linear-gradient(90deg, transparent 10%, rgba(201,169,89,0.5) 50%, transparent 90%)'
                              }}
                            />

                            {/* Horizontal layout: Title left, Images right */}
                            <div className="flex items-center justify-between gap-3">
                              {/* Title - Left side */}
                              <span className={`font-space text-sm md:text-base font-medium truncate max-w-[60%] transition-colors duration-300 ${isActive ? 'text-[#c9a959]' : 'text-white group-hover/card:text-white'}`}>
                                {category.title}
                              </span>

                              {/* User Photos - Right side */}
                              {topUsers.length > 0 && (
                                <div className="flex -space-x-2 flex-shrink-0 transition-transform duration-300 group-hover/card:translate-x-0.5">
                                  {topUsers.map((user, idx) => (
                                    <div
                                      key={user.id}
                                      className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border border-black/50 md:border-2 flex-shrink-0 transition-all duration-300 group-hover/card:border-white/20"
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
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
