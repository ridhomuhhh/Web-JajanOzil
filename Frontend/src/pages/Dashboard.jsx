import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import StatCard from '../components/Statcard';
import CustomBarChart from '../components/BarCharts';
import { FaBars, FaWallet, FaUsers, FaBox } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Proteksi: redirect ke login jika belum login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 998 }}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div
        className="p-4"
        style={{
          backgroundColor: '#f6e9b2',
          minHeight: '100vh',
          marginLeft: isSidebarOpen ? '250px' : '0',
          transition: 'margin-left 0.3s',
          position: 'relative',
          zIndex: 1
        }}
      >
        <button className="btn btn-outline-danger mb-3" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </button>

        <h4 className="fw-bold">Dashboard</h4>
        <p>Selamat datang kembali, Admin!</p>

        <div className="row g-3 mb-4">
          <div className="col-md-4"><StatCard title="Total Transaksi" value="123" icon={<FaWallet />} bg="#fff8e1" /></div>
          <div className="col-md-4"><StatCard title="Total Mitra" value="7" icon={<FaUsers />} bg="#e0f7fa" /></div>
          <div className="col-md-4"><StatCard title="Total Produk" value="56 pcs" icon={<FaBox />} bg="#fce4ec" /></div>
        </div>

        <div className="bg-white p-3 rounded shadow-sm">
          <h6 className="mb-3 fw-bold">Grafik Keuangan Bulanan</h6>
          <CustomBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
