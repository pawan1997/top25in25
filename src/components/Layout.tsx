import { Outlet, useLocation } from 'react-router-dom';
import TopNav from './TopNav';

export default function Layout() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-dotted-grid relative">
      <TopNav />
      <main className={isHomepage ? 'pt-12 md:pt-16 pb-16' : 'pt-32 md:pt-32 pb-16'}>
        <Outlet />
      </main>
    </div>
  );
}
