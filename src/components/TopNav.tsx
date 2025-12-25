import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { CATEGORIES, getCategoriesByGroup } from '../constants/categories';
import { usersByCategory } from '../data/users';
import { CATEGORY_GROUPS, type CategoryGroup } from '../types';

export default function TopNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState<CategoryGroup>('platform');
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
        {/* Subtle gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Mobile: Full logo on top (hides on scroll) - only on category pages */}
          {currentCategory && (
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
          )}

          {/* Desktop & Mobile (sticky) category selector */}
          <div className={`
            flex items-center justify-between transition-all duration-300
            ${isScrolled ? 'py-4' : 'py-6'}
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
              className="fixed left-4 right-4 top-28 md:relative md:top-0 md:left-0 md:right-0 md:mt-2"
              style={{ opacity: 0 }}
            >
              <div className="border-2 border-white/20 rounded-xl overflow-hidden bg-black/95 backdrop-blur-xl shadow-2xl p-3 md:p-6">
                {/* Filter Chips */}
                <div className="flex gap-2 mb-4">
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
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                  {getCategoriesByGroup(activeGroup).map((category, index) => {
                    const isActive = currentPath === category.route;
                    const topUsers = usersByCategory[category.slug]?.slice(0, 3) || [];
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
                        className="group/card"
                      >
                        <div
                          className="relative rounded-xl md:rounded-2xl p-[1px] transition-all duration-200"
                          style={{
                            background: isActive
                              ? 'linear-gradient(180deg, rgba(201,169,89,0.5) 0%, rgba(201,169,89,0.2) 50%, rgba(201,169,89,0) 100%)'
                              : 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)'
                          }}
                        >
                          <div className="bg-black/80 group-hover/card:bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-5 transition-colors">
                            {/* User Photos - Fixed size circles */}
                            {topUsers.length > 0 && (
                              <div className="flex -space-x-2 md:-space-x-3 mb-2 md:mb-3">
                                {topUsers.map((user, idx) => (
                                  <div
                                    key={user.id}
                                    className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden border border-black md:border-2 flex-shrink-0"
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
                            {/* Title */}
                            <span className={`font-space text-xs md:text-base font-medium block truncate ${isActive ? 'text-[#c9a959]' : 'text-white'}`}>
                              {category.title}
                            </span>
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
