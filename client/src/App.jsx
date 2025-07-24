import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateInvoice from './components/CreateInvoice';
import Dashboard from './components/Dashboard';
import SidebarPage from './components/SidebarPage';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import StatsPage from './components/StatsPage';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sidebar" element={<SidebarPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-invoice" element={<CreateInvoice />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
