import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../constants/categories';

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 z-50">
      {/* Scroll fade indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      {/* Scrollable container */}
      <div className="h-16 overflow-x-auto scrollbar-hide scroll-smooth">
        <div className="flex items-center h-full px-6 gap-2 min-w-max">
          {CATEGORIES.map((category) => {
            const isActive = currentPath === category.route;
            return (
              <Link
                key={category.slug}
                to={category.route}
                className={`
                  px-5 py-2.5 font-black text-sm uppercase whitespace-nowrap transition-all duration-150 tracking-tight border-2
                  ${isActive
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/20 hover:border-white/50 hover:bg-white/5'
                  }
                `}
                style={{ fontFamily: 'Bebas Neue, Anton, sans-serif' }}
              >
                {category.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
