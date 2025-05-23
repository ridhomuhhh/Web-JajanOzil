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
  
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Bisa diubah sesuai kebutuhan
  
  // State untuk filter tanggal
  const [filterDate, setFilterDate] = useState('');
  
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
      
      // Reset ke halaman pertama jika data berkurang
      setCurrentPage(1);
    }
  };

  // Filter transaksi berdasarkan tanggal
  const filteredTransactions = filterDate 
    ? transactions.filter(transaction => transaction.date === filterDate)
    : transactions;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat filter berubah
  };

  // Reset filter
  const resetFilter = () => {
    setFilterDate('');
    setCurrentPage(1);
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
          
          {/* Button dan Filter Row */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <button className="btn" style={{ backgroundColor: '#973131', color: '#fff' }} onClick={navigateToCatatTransaksi}>
                + Catat Transaksi
              </button>
            </div>
            
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="filterDate" className="form-label mb-0 me-2">Filter Tanggal:</label>
              <input
                type="date"
                id="filterDate"
                className="form-control"
                style={{ width: '200px' }}
                value={filterDate}
                onChange={handleFilterChange}
              />
              {filterDate && (
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={resetFilter}
                  title="Reset Filter"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
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
                {currentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-3">
                      {filterDate ? 'Tidak ada transaksi pada tanggal yang dipilih' : 'Belum ada data transaksi'}
                    </td>
                  </tr>
                ) : (
                  currentTransactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                      <td className="text-center">{indexOfFirstItem + index + 1}</td>
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
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center p-3">
                <div>
                  <small className="text-muted">
                    Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredTransactions.length)} dari {filteredTransactions.length} data
                  </small>
                </div>
                
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        &laquo; Sebelumnya
                      </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(pageNumber)}
                            style={currentPage === pageNumber ? { backgroundColor: '#973131', borderColor: '#973131' } : {}}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      );
                    })}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Selanjutnya &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;