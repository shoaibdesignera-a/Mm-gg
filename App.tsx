
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FurniturePage from './pages/Furniture';
import PaintsPage from './pages/Paints';
import AdminDashboard from './pages/AdminDashboard';
import DetailView from './pages/DetailView';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Home />} />
          <Route path="/properties/:id" element={<DetailView />} />
          <Route path="/furniture" element={<FurniturePage />} />
          <Route path="/furniture/:id" element={<DetailView />} />
          <Route path="/paints" element={<PaintsPage />} />
          <Route path="/paints/:id" element={<DetailView />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
