// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transaksi from './pages/Transaksi';
import CatatTransaksi from './pages/CatatTransaksi';
import DetailTransaksi from './pages/DetailTransaksi';
import Laporan from './pages/Laporan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/catat-transaksi" element={<CatatTransaksi />} />
        <Route path="/transaksi/detail/:id" element={<DetailTransaksi />} />
        <Route path="/laporan" element={<Laporan />} />
      </Routes>
    </Router>
  );
}

export default App;
