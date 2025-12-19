import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

export default function Layout() {
  return (
    <div className="min-h-screen relative">
      {/* Main Content */}
      <div className="relative">
        <TopNav />
        <main className="pt-20 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
