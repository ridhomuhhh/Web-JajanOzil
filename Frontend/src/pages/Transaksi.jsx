import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import Sidebar from '../components/SideBar';

const Transaksi = () => {
  const [username] = useState('Admin');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    // Ambil data dari localStorage jika ada
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [
      // Data sampel sebagai fallback jika tidak ada data di localStorage
      {
        id: 1,
        date: '2025-05-15',
        partnerName: 'Toko Makmur',
        totalProducts: 3
      },
      {
        id: 2,
        date: '2025-05-14',
        partnerName: 'PT Sejahtera',
        totalProducts: 5
      }
    ];
  });
  
  const navigate = useNavigate();

  // Konfirmasi logout
  const confirmLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Logic logout
  };

  // Navigasi ke halaman catat transaksi
  const navigateToCatatTransaksi = () => {
    navigate('/catat-transaksi');
    // Jika navigasi tidak berhasil, coba console.log untuk debugging
    console.log('Navigating to /catat-transaksi');
  };

  // Format tanggal ke dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  // Fungsi untuk melihat detail transaksi
  const handleViewDetail = (id) => {
    navigate(`/transaksi/detail/${id}`);
  };

  // Fungsi untuk menghapus transaksi
  const handleDeleteTransaction = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
      
      // Update localStorage
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    }
  };
  
  // Listen untuk perubahan pada localStorage (dari halaman lain)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }
    };
    
    // Tambahkan event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-grow-1">
        {/* Header */}
        <Header
          username={username}
          isLoggingOut={isLoggingOut}
          confirmLogout={confirmLogout}
        />

        {/* Main Content */}
        <div
          style={{
            backgroundColor: '#F5E7B9',
            minHeight: '100vh',
            padding: '80px 30px 20px 30px',
            overflowX: 'hidden'
          }}
        >
          <h3 className="fw-bold mb-3">Transaksi</h3>
          <div className="mb-3">
            {/* Opsi 1: Menggunakan useNavigate */}
            <button className="btn" style={{ backgroundColor: '#973131', color: '#fff' }} onClick={navigateToCatatTransaksi}>
              + Catat Transaksi
            </button>
            
            {/* Opsi 2: Menggunakan Link (sebagai alternatif) */}
            {/* <Link 
              to="/catat-transaksi" 
              className="btn" 
              style={{ backgroundColor: '#973131', color: '#fff', textDecoration: 'none' }}
            >
              + Catat Transaksi
            </Link> */}
          </div>

          {/* Tabel Daftar Transaksi */}
          <div className="bg-white rounded shadow-sm">
            <table className="table table-bordered mb-0">
              <thead>
                <tr className="text-center">
                  <th style={{ width: '5%' }}>No.</th>
                  <th style={{ width: '25%' }}>Tanggal</th>
                  <th style={{ width: '30%' }}>Nama Mitra</th>
                  <th style={{ width: '20%' }}>Total Jenis Produk</th>
                  <th style={{ width: '20%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-3">Belum ada data transaksi</td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{formatDate(transaction.date)}</td>
                      <td>{transaction.partnerName}</td>
                      <td className="text-center">{transaction.totalProducts}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-warning btn-sm me-2"
                          style={{ backgroundColor: '#F9A826', color: '#000', fontWeight: 'bold', border: 'none' }}
                          onClick={() => handleViewDetail(transaction.id)}
                        >
                          Detail
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          style={{ backgroundColor: '#fff', border: '1px solid #DC3545' }}
                          onClick={() => handleDeleteTransaction(transaction.id)}
                        >
                          <i className="bi bi-trash" style={{ color: '#DC3545' }}></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;