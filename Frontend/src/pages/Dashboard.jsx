import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import Statcard from '../components/Statcard'; // Pastikan komponen ini diperbarui
import BarCharts from '../components/BarCharts'; // Pastikan komponen ini diperbarui
import { FaWallet, FaUsers, FaBox } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Admin');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false); // State untuk modal konfirmasi

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

  // Tampilkan modal konfirmasi logout
  const confirmLogout = () => {
    setShowConfirmLogout(true);
  };

  // Aksi setelah konfirmasi dari modal
  const handleConfirmAction = (confirmed) => {
    setShowConfirmLogout(false); // Sembunyikan modal
    if (confirmed) {
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
            // Background putih bersih atau abu-abu muda untuk dashboard
            backgroundColor: '#F6E9B2', // Ganti dari '#f6e9b2'
            minHeight: '100vh',
            padding: '80px 30px 20px 30px', /* Ditambahkan padding-top lebih besar agar tidak terlalu mepet header */
            overflowX: 'hidden'
          }}
        >
          {/* Dashboard Header - Not Fixed */}
          <div className="mb-4">
            <h4 className="fw-bold mb-1" style={{ color: '#343a40' }}>Dashboard</h4> {/* Warna teks lebih gelap */}
            <p className="text-secondary" style={{ fontSize: '0.95rem' }}>Selamat datang kembali, {username}!</p> {/* Ukuran teks sedikit disesuaikan */}
          </div>

          {/* Stat Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              {/* Prop 'bg' dihapus karena styling di handle di Statcard.js */}
              <Statcard title="Total Transaksi" value="123" icon={<FaWallet />} />
            </div>
            <div className="col-md-4">
              <Statcard title="Total Mitra" value="76" icon={<FaUsers />} />
            </div>
            <div className="col-md-4">
              <Statcard title="Total Produk" value="56 pcs" icon={<FaBox />} />
            </div>
          </div>

          {/* Chart */}
          <div
            style={{
              backgroundColor: '#FFFFFF', // Latar belakang putih untuk grafik
              padding: '25px', // Padding lebih lega
              borderRadius: '12px', // Sudut membulat
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)', // Bayangan lembut konsisten dengan kartu
            }}
          >
            <h6 className="mb-4 fw-bold" style={{ color: '#343a40' }}>Grafik Keuangan Bulanan</h6> {/* Warna teks lebih gelap */}
            <div className="chart-container" style={{ height: '300px' }}> {/* Berikan tinggi tetap untuk chart */}
              <BarCharts />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmLogout && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
              textAlign: 'center',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <h5 style={{ marginBottom: '20px', color: '#343a40' }}>Konfirmasi Logout</h5>
            <p style={{ marginBottom: '30px', color: '#6c757d' }}>Apakah Anda yakin ingin keluar dari akun ini?</p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button
                onClick={() => handleConfirmAction(true)}
                style={{
                  padding: '10px 25px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#dc3545', // Warna merah untuk Ya
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Ya
              </button>
              <button
                onClick={() => handleConfirmAction(false)}
                style={{
                  padding: '10px 25px',
                  borderRadius: '8px',
                  border: '1px solid #6c757d',
                  backgroundColor: '#fff',
                  color: '#6c757d',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;