import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { usersByCategory } from '../data/users';
import { CATEGORIES } from '../constants/categories';
import VinylRecord from './VinylRecord/VinylRecord';

export default function UserGrid() {
  const { category } = useParams<{ category: string }>();
  const users = category ? usersByCategory[category] || [] : [];
  const currentCategory = CATEGORIES.find(cat => cat.slug === category);
  const currentIndex = CATEGORIES.findIndex(cat => cat.slug === category);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !heroRef.current) return;

    // Animate hero section
    const heroElements = heroRef.current.querySelectorAll('.animate-hero');
    gsap.fromTo(heroElements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }
    );

    // Animate vinyl records with grid stagger
    const vinylCards = Array.from(gridRef.current.children);
    gsap.fromTo(vinylCards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: {
          amount: 0.8,
          from: "start",
          ease: "power2.out"
        },
        ease: "power3.out",
        delay: 0.3
      }
    );
  }, [category]);

  return (
    <div className="w-full min-h-screen pt-24 pb-16">
      {/* Editorial Hero Section */}
      <div ref={heroRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-20">
        {/* Top line with category index */}
        <div className="animate-hero flex items-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-[60px] bg-white/10" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">
            Category {String(currentIndex + 1).padStart(2, '0')} of {String(CATEGORIES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="animate-hero font-editorial text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-6">
          {currentCategory?.title || 'Top 25'}
        </h1>

        {/* Subtitle */}
        <p className="animate-hero text-white/40 text-base md:text-lg max-w-xl leading-relaxed">
          Celebrating the most exceptional creators on Topmate in 2025.
          These rankings highlight outstanding achievement across our platform.
        </p>

        {/* Decorative line */}
        <div className="animate-hero mt-10 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Grid header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">
            {users.length} Creators
          </span>
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">
            2025 Rankings
          </span>
        </div>

        {/* User Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {users.map((user, index) => (
            <VinylRecord key={user.id} user={user} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom section with navigation hint */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-20">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-[100px] bg-white/5" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">
            Click to view profile
          </span>
          <div className="h-px flex-1 max-w-[100px] bg-white/5" />
        </div>
      </div>
    </div>
  );
}
