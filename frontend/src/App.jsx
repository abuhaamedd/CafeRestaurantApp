import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Tables from './pages/Tables';
import Menu from './pages/Menu';
import Inventory from './pages/Inventory';
import Payments from './pages/Payments';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </Router>
  );
}

export default App;
