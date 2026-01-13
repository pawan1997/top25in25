import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Homepage from './components/Homepage';

// Lazy load components that use user data
const UserGrid = lazy(() => import('./components/UserGrid'));
const UserDetailPage = lazy(() => import('./components/UserDetailPage'));
const CohortsGrid = lazy(() => import('./components/CohortsGrid'));

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Top 25 pages with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/cohorts" element={
            <Suspense fallback={<LoadingSpinner />}>
              <CohortsGrid />
            </Suspense>
          } />
          <Route path="/:category" element={
            <Suspense fallback={<LoadingSpinner />}>
              <UserGrid />
            </Suspense>
          } />
          <Route path="/:category/:rank" element={
            <Suspense fallback={<LoadingSpinner />}>
              <UserDetailPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
