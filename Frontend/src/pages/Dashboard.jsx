import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header'; 
import Statcard from '../components/Statcard';
import BarCharts from '../components/BarCharts';
import { FaWallet, FaUsers, FaBox } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Admin');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Proteksi: redirect ke login jika belum login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    
    if (isLoggedIn !== 'true') {
      navigate('/home');
    } else if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Simulasi proses logout ke server (bisa diganti dengan API call yang sebenarnya)
    setTimeout(() => {
      // Hapus semua data user dari localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('userToken'); // Jika menggunakan token
      
      // Redirect ke halaman login
      navigate('/home');
    }, 500); // Delay sedikit untuk menunjukkan proses logout
  };

  // Konfirmasi logout
  const confirmLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      handleLogout();
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-grow-1">
        {/* Header Component */}
        <Header 
          username={username} 
          isLoggingOut={isLoggingOut} 
          confirmLogout={confirmLogout} 
        />

        {/* Main Content */}
        <div
          style={{
            backgroundColor: '#f6e9b2',
            minHeight: '100vh',
            padding: '80px 30px 20px 30px', /* Ditambahkan padding-top lebih besar agar tidak terlalu mepet header */
            overflowX: 'hidden'
          }}
        >
          {/* Dashboard Header - Not Fixed */}
          <div className="mb-4">
            <h4 className="fw-bold mb-1">Dashboard</h4>
            <p className="text-secondary">Selamat datang kembali, {username}!</p>
          </div>

          {/* Stat Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <Statcard title="Total Transaksi" value="123" icon={<FaWallet size={20}/>} bg="#fff8e1"/>
            </div>
            <div className="col-md-4">
              <Statcard title="Total Mitra"  value="76" icon={<FaUsers size={20}/>} bg="#e0f7fa"/>
            </div>
            <div className="col-md-4">
              <Statcard title="Total Produk"  value="56 pcs" icon={<FaBox size={20} />} bg="#fce4ec"/>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white p-4 rounded shadow-sm">
            <h6 className="mb-4 fw-bold">Grafik Keuangan Bulanan</h6>
            <div className="chart-container">
              <BarCharts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;