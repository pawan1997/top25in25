import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import UserGrid from './components/UserGrid';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/earning" replace />} />
          <Route path="/:category" element={<UserGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
