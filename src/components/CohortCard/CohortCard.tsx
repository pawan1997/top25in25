import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import type { Cohort } from '../../data/cohorts';

interface CohortCardProps {
  cohort: Cohort;
}

// Topic color mapping for badges
const topicColors: Record<string, { bg: string; text: string; border: string }> = {
  'AI/ML': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  'Data Science': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  'Product Management': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  'Cloud': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  'Career': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'Design': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
  'Software': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'Marketing': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  'Finance': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  'Study Abroad': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  'Consulting': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
};

export default function CohortCard({ cohort }: CohortCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const topicStyle = topicColors[cohort.topic] || { bg: 'bg-white/5', text: 'text-white/60', border: 'border-white/10' };

  // 3D tilt effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);

    setTimeout(() => {
      if (modalRef.current && modalCardRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
        gsap.fromTo(modalCardRef.current,
          { scale: 0.85, y: 50, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
      }
    }, 10);
  };

  const handleCloseModal = () => {
    if (modalRef.current && modalCardRef.current) {
      gsap.to(modalCardRef.current, {
        scale: 0.9, y: 30, opacity: 0,
        duration: 0.25, ease: 'power2.in'
      });
      gsap.to(modalRef.current, {
        opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => setIsModalOpen(false)
      });
    }
  };

  return (
    <>
      {/* Cohort Card */}
      <div
        ref={cardRef}
        className="relative group cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenModal}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute -inset-1 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${cohort.featured ? 'rgba(201,169,89,0.15)' : 'rgba(255,255,255,0.05)'}, transparent 70%)`
          }}
        />

        {/* Card Border */}
        <div
          className="relative rounded-2xl md:rounded-3xl p-[1px] transition-all duration-300"
          style={{
            background: cohort.featured
              ? 'linear-gradient(180deg, rgba(201,169,89,0.5) 0%, rgba(201,169,89,0.15) 50%, rgba(255,255,255,0) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
          }}
        >
          <div className="bg-[#0a0a0a] rounded-2xl md:rounded-3xl p-4 md:p-5 relative overflow-hidden">
            {/* Diagonal pattern texture */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.5) 10px,
                  rgba(255,255,255,0.5) 11px
                )`
              }}
            />

            {/* Featured badge */}
            {cohort.featured && (
              <div className="absolute top-3 right-3 z-10">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#c9a959]/20 border border-[#c9a959]/30">
                  <svg className="w-3 h-3 text-[#c9a959]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[9px] font-medium text-[#c9a959] tracking-wide uppercase">Featured</span>
                </div>
              </div>
            )}

            {/* Header with instructor */}
            <div className="flex items-start gap-3 mb-4">
              {/* Instructor photo */}
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-white/10">
                  <img
                    src={cohort.instructor.imageUrl}
                    alt={cohort.instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Session count badge */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#c9a959] flex items-center justify-center shadow-lg">
                  <span className="text-[9px] font-bold text-black">{cohort.sessions}</span>
                </div>
              </div>

              {/* Instructor info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs text-white/50 truncate">{cohort.instructor.name}</h4>
                <p className="text-[10px] text-white/30 truncate">{cohort.instructor.title}</p>
              </div>
            </div>

            {/* Topic badge */}
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium mb-3 border ${topicStyle.bg} ${topicStyle.text} ${topicStyle.border}`}>
              {cohort.topic}
            </div>

            {/* Cohort name */}
            <h3 className="font-space text-sm md:text-base font-medium text-white mb-3 line-clamp-2 leading-tight">
              {cohort.name}
            </h3>

            {/* Quick stats */}
            <div className="flex items-center gap-3 mb-4 text-[10px] text-white/40">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {cohort.duration}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {cohort.enrolledCount}+
              </span>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg md:text-xl font-semibold text-white">{cohort.price}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#c9a959] text-xs font-medium group-hover:gap-2.5 transition-all">
                <span>View</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          style={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

          <div
            ref={modalCardRef}
            className="relative z-10 w-full max-w-lg my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-3xl p-[1px]"
              style={{
                background: cohort.featured
                  ? 'linear-gradient(180deg, rgba(201,169,89,0.5) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0) 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0) 100%)'
              }}
            >
              <div className="bg-[#0a0a0a] rounded-3xl p-6 md:p-8 relative overflow-hidden">
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,89,0.06) 0%, transparent 60%)'
                  }}
                />

                {/* Close button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="relative">
                  {/* Topic & Featured badges */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${topicStyle.bg} ${topicStyle.text} ${topicStyle.border}`}>
                      {cohort.topic}
                    </div>
                    {cohort.featured && (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#c9a959]/20 border border-[#c9a959]/30">
                        <svg className="w-3.5 h-3.5 text-[#c9a959]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-medium text-[#c9a959]">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                    {cohort.name}
                  </h2>

                  {/* Instructor card */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#c9a959]/30">
                      <img src={cohort.instructor.imageUrl} alt={cohort.instructor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{cohort.instructor.name}</h4>
                      <p className="text-sm text-white/40">{cohort.instructor.title}</p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-xl font-semibold text-[#c9a959]">{cohort.sessions}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Sessions</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-xl font-semibold text-white">{cohort.duration}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Duration</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-xl font-semibold text-white">{cohort.enrolledCount}+</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Enrolled</div>
                    </div>
                  </div>

                  {/* What you'll learn */}
                  <div className="mb-6">
                    <h5 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-3">What you'll learn</h5>
                    <ul className="space-y-2">
                      {cohort.learnings.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                          <svg className="w-4 h-4 text-[#c9a959] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">Starts {cohort.startDate}</div>
                      <div className="text-2xl font-semibold text-white">{cohort.price}</div>
                    </div>
                    <a
                      href={cohort.cohortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-6 py-3 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #c9a959 0%, #e8d5a3 50%, #c9a959 100%)',
                        boxShadow: '0 4px 20px rgba(201,169,89,0.3)'
                      }}
                    >
                      <span className="text-sm font-semibold text-black">Enroll Now</span>
                      <svg className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
