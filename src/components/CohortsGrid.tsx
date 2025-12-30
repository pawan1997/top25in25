import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cohorts } from '../data/cohorts';
import CohortCard from './CohortCard/CohortCard';
import CategoryShowcase from './CategoryShowcase';
import { useSEO } from '../hooks/useSEO';

export default function CohortsGrid() {
  useSEO({
    title: "Top Cohorts '26 | Topmate Awards",
    description: "Best-selling cohorts from 2025 that you can enroll in from January 2025. Join the most impactful learning experiences on Topmate.",
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !heroRef.current) return;

    // Animate hero
    const heroElements = heroRef.current.querySelectorAll('.animate-hero');
    gsap.fromTo(heroElements,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );

    // Animate grid
    const cards = Array.from(gridRef.current.children);
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: { amount: 0.6, from: 'start' },
        ease: 'power3.out',
        delay: 0.3
      }
    );
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-8 md:mb-12 pt-4 md:pt-0">
        {/* Title with decorative element */}
        <div className="flex items-start gap-4 mb-4 md:mb-6">
          <h1 className="animate-hero font-editorial text-4xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight">
            Top Cohorts '26
          </h1>
          {/* Live indicator */}
          <div className="animate-hero flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mt-2 md:mt-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium text-emerald-400 uppercase tracking-wide">Enrolling Now</span>
          </div>
        </div>

        {/* Description */}
        <p className="animate-hero text-white/40 text-sm md:text-lg max-w-2xl leading-relaxed mb-6">
          Best-selling cohorts from 2025 that you can enroll in from January 2025. Join the most impactful learning experiences on Topmate and accelerate your career.
        </p>

        {/* Decorative line */}
        <div className="animate-hero h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Grid header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">
            {cohorts.length} Cohorts
          </span>
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">
            Enrolling Now
          </span>
        </div>

        {/* Cohort Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {cohorts.map((cohort) => (
            <CohortCard key={cohort.id} cohort={cohort} />
          ))}
        </div>
      </div>

      {/* Category Showcase */}
      <CategoryShowcase />
    </div>
  );
}
