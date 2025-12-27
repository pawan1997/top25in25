import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserGrid from './components/UserGrid';
import Homepage from './components/Homepage';
import UserDetailPage from './components/UserDetailPage';
import CohortsGrid from './components/CohortsGrid';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Top 25 pages with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/cohorts" element={<CohortsGrid />} />
          <Route path="/:category" element={<UserGrid />} />
          <Route path="/:category/:rank" element={<UserDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
