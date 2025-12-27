import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cohorts } from '../data/cohorts';
import CohortCard from './CohortCard/CohortCard';
import CategoryShowcase from './CategoryShowcase';
import { useSEO } from '../hooks/useSEO';

// Get unique topics for filtering
const allTopics = ['All', ...Array.from(new Set(cohorts.map(c => c.topic)))];

export default function CohortsGrid() {
  useSEO({
    title: "Top Cohorts '25 | Topmate Awards",
    description: "The most impactful learning experiences on Topmate. Join live cohorts, master new skills, and accelerate your career.",
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const filteredCohorts = activeFilter === 'All'
    ? cohorts
    : cohorts.filter(c => c.topic === activeFilter);

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

  // Animate on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    gsap.fromTo(cards,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeFilter]);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-8 md:mb-12 pt-4 md:pt-0">
        {/* Title with decorative element */}
        <div className="flex items-start gap-4 mb-4 md:mb-6">
          <h1 className="animate-hero font-editorial text-4xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight">
            Top Cohorts
          </h1>
          {/* Live indicator */}
          <div className="animate-hero flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mt-2 md:mt-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium text-emerald-400 uppercase tracking-wide">Live</span>
          </div>
        </div>

        {/* Description */}
        <p className="animate-hero text-white/40 text-sm md:text-lg max-w-2xl leading-relaxed mb-6">
          Learn from the best creators on Topmate. Join live cohorts, master new skills, and accelerate your career with structured learning paths.
        </p>

        {/* Filter chips */}
        <div className="animate-hero flex flex-wrap gap-2 mb-6">
          {allTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setActiveFilter(topic)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                activeFilter === topic
                  ? 'bg-[#c9a959] text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Decorative line */}
        <div className="animate-hero h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Grid header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">
            {filteredCohorts.length} Cohorts
          </span>
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">
            Enrolling Now
          </span>
        </div>

        {/* Cohort Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredCohorts.map((cohort) => (
            <CohortCard key={cohort.id} cohort={cohort} />
          ))}
        </div>

        {/* Empty state */}
        {filteredCohorts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-white/20 text-lg mb-2">No cohorts found</div>
            <button
              onClick={() => setActiveFilter('All')}
              className="text-[#c9a959] text-sm hover:underline"
            >
              View all cohorts
            </button>
          </div>
        )}
      </div>

      {/* Category Showcase */}
      <CategoryShowcase />
    </div>
  );
}
