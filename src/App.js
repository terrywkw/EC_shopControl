import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MerchantSettings from './pages/MerchantSettings';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import AffiliateSettings from './pages/AffiliateSettings';
import AchievementCenter from './pages/AchievementCenter';
import AllTasksPage from './pages/AllTasksPage';
import AffiliateListPage from './pages/AffiliateManagement/AffiliateListPage';
import AffiliateLandingPage from './pages/AffiliateManagement/AffiliateLandingPage';
import AIServiceManagement from './pages/AIServiceManagement';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<MerchantSettings />} />
              <Route path="/products" element={<ProductManagement />} />

              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/affiliate" element={<AffiliateLandingPage />} />
              <Route path="/affiliate/settings" element={<AffiliateSettings />} />
              <Route path="/affiliate/referrers" element={<AffiliateListPage />} />
              <Route path="/achievements" element={<AchievementCenter />} />
              <Route path="/achievements/all-tasks" element={<AllTasksPage />} />
              <Route path="/ai-services" element={<AIServiceManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;