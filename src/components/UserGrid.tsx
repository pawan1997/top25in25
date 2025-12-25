import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { usersByCategory } from '../data/users';
import { CATEGORIES } from '../constants/categories';
import GridCard from './GridCard/GridCard';
import CategoryShowcase from './CategoryShowcase';

export default function UserGrid() {
  const { category } = useParams<{ category: string }>();
  const users = category ? usersByCategory[category] || [] : [];
  const currentCategory = CATEGORIES.find(cat => cat.slug === category);
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
    <div className="w-full min-h-screen">
      {/* Editorial Hero Section */}
      <div ref={heroRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-8 md:mb-16 pt-4 md:pt-0">
        {/* Main Title */}
        <h1 className="animate-hero font-editorial text-4xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-4 md:mb-6">
          {currentCategory?.title || 'Top 25'}
        </h1>

        {/* Subtitle - Category specific */}
        <p className="animate-hero text-white/40 text-sm md:text-lg max-w-xl leading-relaxed">
          {currentCategory?.description || 'Celebrating the most exceptional creators on Topmate in 2025.'}
        </p>

        {/* Decorative line */}
        <div className="animate-hero mt-6 md:mt-10 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          {users.map((user, index) => (
            <GridCard key={user.id} user={user} index={index} />
          ))}
        </div>
      </div>

      {/* Category Showcase */}
      <CategoryShowcase />
    </div>
  );
}
