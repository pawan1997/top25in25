import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { CATEGORIES } from '../constants/categories';

export default function TopNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Get current category for display
  const currentCategory = CATEGORIES.find(cat => cat.route === currentPath);

  // Animate menu items on open
  useEffect(() => {
    if (!isMenuOpen || !menuContainerRef.current) return;

    const items = menuContainerRef.current.querySelectorAll('.menu-grid-item');
    if (items.length === 0) return;

    gsap.fromTo(items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.2
      }
    );
  }, [isMenuOpen]);

  // Animate backdrop on open
  useEffect(() => {
    if (!backdropRef.current) return;

    if (isMenuOpen) {
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [isMenuOpen]);

  const handleClose = () => {
    if (!backdropRef.current) return;

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setIsMenuOpen(false)
    });
  };

  return (
    <>
      {/* Minimal Editorial Nav */}
      <nav className="fixed top-0 left-0 right-0 h-20 z-50">
        {/* Subtle gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 h-full flex items-center justify-between">
          {/* Logo - Left */}
          <Link to="/earning" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#c9a959] flex items-center justify-center">
              <span className="font-editorial text-lg font-bold text-black">25</span>
            </div>
            <span className="hidden sm:block text-white/60 text-sm tracking-wide group-hover:text-white transition-colors">
              Top 25 in '25
            </span>
          </Link>

          {/* Current Category - Center (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
              Viewing
            </span>
            <span className="font-editorial text-lg text-white">
              {currentCategory?.title || 'All Categories'}
            </span>
          </div>

          {/* Menu Button - Right */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
          >
            <span className="hidden sm:block text-sm tracking-wide">
              Categories
            </span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
              <div className="flex flex-col gap-1">
                <span className="block w-4 h-px bg-current" />
                <span className="block w-4 h-px bg-current" />
              </div>
            </div>
          </button>
        </div>
      </nav>

      {/* Full-Screen Editorial Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="fixed inset-0 bg-[#0d0d0d] z-50"
            style={{ opacity: 0 }}
          />

          {/* Menu Content */}
          <div
            ref={menuContainerRef}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            {/* Header with close button */}
            <div className="sticky top-0 w-full px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a959] flex items-center justify-center">
                  <span className="font-editorial text-lg font-bold text-black">25</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Grid */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-16">
              {/* Section Title */}
              <div className="mb-12 menu-grid-item">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-2">
                  Select Category
                </span>
                <h2 className="font-editorial text-4xl md:text-5xl text-white">
                  Browse Rankings
                </h2>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {CATEGORIES.map((category, index) => {
                  const isActive = currentPath === category.route;
                  return (
                    <Link
                      key={category.slug}
                      to={category.route}
                      onClick={handleClose}
                      className="menu-grid-item block group"
                    >
                      <div className={`
                        relative p-6 md:p-8 rounded-2xl transition-all duration-300 h-full min-h-[120px] md:min-h-[140px]
                        flex flex-col justify-between
                        ${isActive
                          ? 'bg-[#c9a959] text-black'
                          : 'bg-white/[0.02] text-white hover:bg-white/[0.05]'
                        }
                        border ${isActive ? 'border-[#c9a959]' : 'border-white/5 hover:border-white/10'}
                      `}>
                        {/* Index number */}
                        <div className={`text-[11px] tracking-[0.2em] ${isActive ? 'text-black/50' : 'text-white/30'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Category title */}
                        <div className="flex items-end justify-between gap-4">
                          <h3 className="font-editorial text-xl md:text-2xl leading-tight">
                            {category.title}
                          </h3>

                          {/* Arrow indicator */}
                          <svg
                            className={`w-5 h-5 flex-shrink-0 transform transition-all duration-300 ${isActive ? '' : 'opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Footer info */}
              <div className="mt-16 pt-8 border-t border-white/5 menu-grid-item">
                <p className="text-white/30 text-sm max-w-md">
                  Celebrating the most exceptional creators on Topmate. Rankings based on 2025 performance data.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
