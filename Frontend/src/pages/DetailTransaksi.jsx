// DetailTransaksi.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';

const DetailTransaksi = () => {
  const { id } = useParams(); // Mengambil ID transaksi dari URL
  const navigate = useNavigate();
  const [username] = useState('Admin');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Ambil data transaksi berdasarkan ID
  useEffect(() => {
    const fetchTransactionDetail = () => {
      try {
        // Ambil data dari localStorage
        const savedTransactions = localStorage.getItem('transactions');
        if (savedTransactions) {
          const transactions = JSON.parse(savedTransactions);
          // Cari transaksi dengan ID yang sesuai
          const foundTransaction = transactions.find(
            (transaction) => transaction.id === parseInt(id)
          );
          
          if (foundTransaction) {
            setTransaction(foundTransaction);
            // Inisialisasi state untuk data yang diedit
            setEditedTransaction(JSON.parse(JSON.stringify(foundTransaction)));
          } else {
            alert('Transaksi tidak ditemukan!');
            navigate('/transaksi');
          }
        } else {
          alert('Tidak ada data transaksi!');
          navigate('/transaksi');
        }
      } catch (error) {
        console.error('Error fetching transaction:', error);
        alert('Terjadi kesalahan saat mengambil data transaksi!');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [id, navigate]);

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

  // Format tanggal ke dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Mengkonversi string tanggal ke format YYYY-MM-DD untuk input date
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Kembali ke halaman transaksi
  const handleBackToTransactions = () => {
    // Jika sedang dalam mode edit, konfirmasi terlebih dahulu
    if (isEditing) {
      if (window.confirm('Perubahan belum disimpan. Apakah Anda yakin ingin kembali?')) {
        setIsEditing(false);
        navigate('/transaksi');
      }
    } else {
      navigate('/transaksi');
    }
  };

  // Menghitung total dari semua produk
  const calculateTotals = (products) => {
    if (!products) return { totalProducts: 0, totalSold: 0, totalStock: 0, totalRevenue: 0 };
    
    const totalProducts = products.reduce((sum, product) => sum + parseInt(product.quantity || 0), 0);
    const totalSold = products.reduce((sum, product) => sum + parseInt(product.sold || 0), 0);
    const totalStock = products.reduce((sum, product) => sum + parseInt(product.stock || 0), 0);
    const totalRevenue = products.reduce((sum, product) => sum + parseInt(product.revenue || 0), 0);
    
    return { totalProducts, totalSold, totalStock, totalRevenue };
  };

  // Toggle mode edit
  const toggleEditMode = () => {
    if (isEditing) {
      // Jika sedang dalam mode edit, konfirmasi batal
      if (window.confirm('Perubahan belum disimpan. Apakah Anda yakin ingin batal?')) {
        setIsEditing(false);
        // Reset data yang diedit ke data asli
        setEditedTransaction(JSON.parse(JSON.stringify(transaction)));
      }
    } else {
      // Masuk ke mode edit
      setIsEditing(true);
    }
  };

  // Handle perubahan data transaksi
  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction({
      ...editedTransaction,
      [name]: value,
    });
  };

  // Handle perubahan data produk
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...editedTransaction.products];
    
    // Update nilai produk
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: field === 'name' ? value : parseInt(value),
    };
    
    // Jika yang diubah adalah quantity, sold, atau price, hitung ulang revenue dan stock
    if (['quantity', 'sold', 'price'].includes(field)) {
      const product = updatedProducts[index];
      // Hitung ulang stock
      product.stock = product.quantity - product.sold;
      // Hitung ulang revenue
      product.revenue = product.sold * product.price;
    }

    setEditedTransaction({
      ...editedTransaction,
      products: updatedProducts,
    });
  };

  // Tambah produk baru
  const handleAddProduct = () => {
    const newProduct = {
      name: 'Produk Baru',
      quantity: 0,
      price: 0,
      sold: 0,
      stock: 0,
      revenue: 0,
    };

    setEditedTransaction({
      ...editedTransaction,
      products: [...editedTransaction.products, newProduct],
    });
  };

  // Hapus produk
  const handleRemoveProduct = (index) => {
    const updatedProducts = [...editedTransaction.products];
    updatedProducts.splice(index, 1);
    
    setEditedTransaction({
      ...editedTransaction,
      products: updatedProducts,
    });
  };

  // Simpan perubahan
  const handleSaveChanges = () => {
    setIsSaving(true);
    
    try {
      // Validasi data sebelum menyimpan
      if (!editedTransaction.partnerName.trim()) {
        alert('Nama mitra tidak boleh kosong!');
        setIsSaving(false);
        return;
      }

      // Validasi setiap produk
      for (const product of editedTransaction.products) {
        if (!product.name.trim()) {
          alert('Nama produk tidak boleh kosong!');
          setIsSaving(false);
          return;
        }
        
        if (product.sold > product.quantity) {
          alert(`Produk ${product.name}: Jumlah terjual tidak boleh lebih dari jumlah produk!`);
          setIsSaving(false);
          return;
        }
      }

      // Ambil data transaksi dari localStorage
      const savedTransactions = localStorage.getItem('transactions');
      let transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
      
      // Cari index transaksi yang sedang diedit
      const transactionIndex = transactions.findIndex(t => t.id === parseInt(id));
      
      if (transactionIndex !== -1) {
        // Update informasi totalProducts untuk tampilan di halaman Transaksi
        editedTransaction.totalProducts = editedTransaction.products.length;
        
        // Update transaksi
        transactions[transactionIndex] = editedTransaction;
        
        // Simpan kembali ke localStorage
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Trigger event storage untuk memberi tahu komponen lain bahwa data berubah
        window.dispatchEvent(new Event('localStorageUpdated'));
        
        // Update state transaksi
        setTransaction(editedTransaction);
        
        // Keluar dari mode edit
        setIsEditing(false);
        
        alert('Transaksi berhasil diperbarui!');
      } else {
        alert('Transaksi tidak ditemukan!');
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Terjadi kesalahan saat menyimpan data transaksi!');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Header
            username={username}
            isLoggingOut={isLoggingOut}
            confirmLogout={confirmLogout}
          />
          <div
            style={{
              backgroundColor: '#F5E7B9',
              minHeight: '100vh',
              padding: '80px 30px 20px 30px'
            }}
          >
            <div className="text-center py-5">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Memuat data transaksi...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Header
            username={username}
            isLoggingOut={isLoggingOut}
            confirmLogout={confirmLogout}
          />
          <div
            style={{
              backgroundColor: '#F5E7B9',
              minHeight: '100vh',
              padding: '80px 30px 20px 30px'
            }}
          >
            <div className="text-center py-5">
              <h4>Transaksi tidak ditemukan</h4>
              <button 
                className="btn mt-3" 
                style={{ backgroundColor: '#973131', color: '#fff' }}
                onClick={handleBackToTransactions}
              >
                Kembali ke Daftar Transaksi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { totalProducts, totalSold, totalStock, totalRevenue } = calculateTotals(
    isEditing ? editedTransaction.products : transaction.products
  );

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
          <h3 className="fw-bold mb-3">
            {isEditing ? 'Edit Transaksi' : 'Informasi Transaksi'}
          </h3>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <button 
              className="btn btn-link text-decoration-none" 
              style={{ color: '#973131' }}
              onClick={handleBackToTransactions}
            >
              <i className="bi bi-arrow-left me-1"></i> Kembali ke Daftar Transaksi
            </button>
            {isEditing ? (
              <div>
                <button 
                  className="btn me-2" 
                  style={{ backgroundColor: '#6c757d', color: '#fff' }}
                  onClick={toggleEditMode}
                  disabled={isSaving}
                >
                  Batal
                </button>
                <button 
                  className="btn" 
                  style={{ backgroundColor: '#28a745', color: '#fff' }}
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan'
                  )}
                </button>
              </div>
            ) : (
              <button 
                className="btn" 
                style={{ backgroundColor: '#973131', color: '#fff' }}
                onClick={toggleEditMode}
              >
                Edit
              </button>
            )}
          </div>

          {/* Transaction Info Card */}
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <div className="row">
              <div className="col-md-4">
                <p className="text-secondary mb-1">Tanggal</p>
                {isEditing ? (
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formatDateForInput(editedTransaction.date)}
                    onChange={handleTransactionChange}
                  />
                ) : (
                  <h5>{formatDate(transaction.date)}</h5>
                )}
              </div>
              <div className="col-md-4">
                <p className="text-secondary mb-1">Nama Mitra</p>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    name="partnerName"
                    value={editedTransaction.partnerName}
                    onChange={handleTransactionChange}
                  />
                ) : (
                  <h5>{transaction.partnerName}</h5>
                )}
              </div>
              <div className="col-md-4">
                <p className="text-secondary mb-1">Total Jenis Produk</p>
                <h5>
                  {isEditing ? editedTransaction.products.length : transaction.products.length}
                </h5>
              </div>
            </div>
          </div>

          {/* Detail Produk Card */}
          <div className="bg-white rounded shadow-sm mb-4">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Detail Produk</h5>
              {isEditing && (
                <button 
                  className="btn btn-sm" 
                  style={{ backgroundColor: '#28a745', color: '#fff' }}
                  onClick={handleAddProduct}
                >
                  <i className="bi bi-plus"></i> Tambah Produk
                </button>
              )}
            </div>
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr className="text-center">
                    <th style={{ width: '30%' }}>Nama Produk</th>
                    <th style={{ width: '15%' }}>Jumlah</th>
                    <th style={{ width: '15%' }}>Harga</th>
                    <th style={{ width: '15%' }}>Terjual</th>
                    <th style={{ width: '10%' }}>Sisa</th>
                    <th style={{ width: '15%' }}>Pendapatan</th>
                    {isEditing && <th style={{ width: '5%' }}>Aksi</th>}
                  </tr>
                </thead>
                <tbody>
                  {(isEditing ? editedTransaction.products : transaction.products) && 
                  (isEditing ? editedTransaction.products : transaction.products).length > 0 ? (
                    (isEditing ? editedTransaction.products : transaction.products).map((product, index) => (
                      <tr key={index}>
                        <td>
                          {isEditing ? (
                            <input
                              type="text"
                              className="form-control"
                              value={product.name}
                              onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                            />
                          ) : (
                            product.name
                          )}
                        </td>
                        <td className="text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              className="form-control text-center"
                              min="0"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                            />
                          ) : (
                            product.quantity
                          )}
                        </td>
                        <td className="text-end">
                          {isEditing ? (
                            <input
                              type="number"
                              className="form-control text-end"
                              min="0"
                              value={product.price}
                              onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                            />
                          ) : (
                            `Rp. ${product.price ? product.price.toLocaleString('id-ID') : 0}`
                          )}
                        </td>
                        <td className="text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              className="form-control text-center"
                              min="0"
                              max={product.quantity}
                              value={product.sold}
                              onChange={(e) => handleProductChange(index, 'sold', e.target.value)}
                            />
                          ) : (
                            product.sold
                          )}
                        </td>
                        <td className="text-center">
                          {product.stock}
                        </td>
                        <td className="text-end">
                          {isEditing ? (
                            `Rp. ${product.revenue.toLocaleString('id-ID')}`
                          ) : (
                            `Rp. ${product.revenue ? product.revenue.toLocaleString('id-ID') : 0}`
                          )}
                        </td>
                        {isEditing && (
                          <td className="text-center">
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveProduct(index)}
                              disabled={(isEditing ? editedTransaction.products : transaction.products).length <= 1}
                              title={(isEditing ? editedTransaction.products : transaction.products).length <= 1 ? "Minimal harus ada 1 produk" : "Hapus produk"}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={isEditing ? "7" : "6"} className="text-center py-3">
                        Tidak ada produk
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ringkasan Transaksi Card */}
          <div className="bg-white rounded shadow-sm">
            <div className="p-3 border-bottom">
              <h5 className="fw-bold mb-0">Ringkasan Transaksi</h5>
            </div>
            <div className="table-responsive">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>Total Produk</td>
                    <td style={{ width: '50%' }} className="text-end">{totalProducts} pcs</td>
                  </tr>
                  <tr>
                    <td>Total Terjual</td>
                    <td className="text-end">{totalSold} pcs</td>
                  </tr>
                  <tr>
                    <td>Sisa Produk</td>
                    <td className="text-end">{totalStock} pcs</td>
                  </tr>
                  <tr className="table-light">
                    <td className="fw-bold">Total Pendapatan</td>
                    <td className="text-end fw-bold">Rp. {totalRevenue.toLocaleString('id-ID')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaksi;