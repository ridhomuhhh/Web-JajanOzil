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
    if (!products) return { 
      totalProducts: 0, 
      totalSold: 0, 
      totalStock: 0, 
      totalRevenue: 0,
      totalUmkmProfit: 0,
      totalPartnerRevenue: 0
    };
    
    const totalProducts = products.reduce((sum, product) => sum + parseInt(product.quantity || 0), 0);
    const totalSold = products.reduce((sum, product) => sum + parseInt(product.sold || 0), 0);
    const totalStock = products.reduce((sum, product) => sum + parseInt(product.stock || 0), 0);
    const totalRevenue = products.reduce((sum, product) => sum + parseInt(product.totalRevenue || 0), 0);
    const totalUmkmProfit = products.reduce((sum, product) => sum + parseInt(product.umkmProfit || 0), 0);
    const totalPartnerRevenue = products.reduce((sum, product) => sum + parseInt(product.partnerRevenue || 0), 0);
    
    return { totalProducts, totalSold, totalStock, totalRevenue, totalUmkmProfit, totalPartnerRevenue };
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
      [field]: field === 'name' ? value : parseInt(value) || 0,
    };
    
    // Jika yang diubah adalah quantity, sold, costPrice, atau sellingPrice, hitung ulang kalkulasi
    if (['quantity', 'sold', 'costPrice', 'sellingPrice'].includes(field)) {
      const product = updatedProducts[index];
      
      // Kalkulasi margin keuntungan per unit
      if (product.costPrice && product.sellingPrice) {
        product.profitMargin = product.sellingPrice - product.costPrice;
      }
      
      // Kalkulasi pendapatan dan keuntungan jika semua data lengkap
      if (product.sold && product.costPrice && product.sellingPrice) {
        // Total pendapatan (produk terjual × harga jual)
        product.totalRevenue = product.sold * product.sellingPrice;
        
        // Pendapatan mitra (produk terjual × harga pokok)
        product.partnerRevenue = product.sold * product.costPrice;
        
        // Keuntungan UMKM (total pendapatan - pendapatan mitra)
        product.umkmProfit = product.totalRevenue - product.partnerRevenue;
      }
      
      // Kalkulasi sisa produk (jumlah produk - produk terjual)
      if (product.quantity && product.sold !== undefined) {
        product.stock = product.quantity - product.sold;
      }
    }

    setEditedTransaction({
      ...editedTransaction,
      products: updatedProducts,
    });
  };

  // Tambah produk baru
  const handleAddProduct = () => {
    const newProduct = {
      id: editedTransaction.products.length + 1,
      name: '',
      quantity: 0,
      costPrice: 0, // Harga pokok dari mitra
      sellingPrice: 0, // Harga jual oleh UMKM
      sold: 0,
      totalRevenue: 0, // Total pendapatan (sold × sellingPrice)
      partnerRevenue: 0, // Pendapatan mitra (sold × costPrice)
      umkmProfit: 0, // Keuntungan UMKM (totalRevenue - partnerRevenue)
      stock: 0, // Sisa produk
      profitMargin: 0 // Margin keuntungan per unit (sellingPrice - costPrice)
    };

    setEditedTransaction({
      ...editedTransaction,
      products: [...editedTransaction.products, newProduct],
    });
  };

  // Hapus produk
  const handleRemoveProduct = (index) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updatedProducts = [...editedTransaction.products];
      updatedProducts.splice(index, 1);
      
      setEditedTransaction({
        ...editedTransaction,
        products: updatedProducts,
      });
    }
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

        if (product.sellingPrice < product.costPrice) {
          alert(`Produk ${product.name}: Harga jual harus lebih besar atau sama dengan harga pokok!`);
          setIsSaving(false);
          return;
        }
      }

      // Hitung total revenue, keuntungan UMKM, dan pendapatan mitra
      const totalRevenue = editedTransaction.products.reduce((sum, product) => sum + product.totalRevenue, 0);
      const totalUmkmProfit = editedTransaction.products.reduce((sum, product) => sum + product.umkmProfit, 0);
      const totalPartnerRevenue = editedTransaction.products.reduce((sum, product) => sum + product.partnerRevenue, 0);

      // Update informasi total dalam transaksi
      editedTransaction.totalProducts = editedTransaction.products.length;
      editedTransaction.totalRevenue = totalRevenue;
      editedTransaction.totalUmkmProfit = totalUmkmProfit;
      editedTransaction.totalPartnerRevenue = totalPartnerRevenue;

      // Ambil data transaksi dari localStorage
      const savedTransactions = localStorage.getItem('transactions');
      let transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
      
      // Cari index transaksi yang sedang diedit
      const transactionIndex = transactions.findIndex(t => t.id === parseInt(id));
      
      if (transactionIndex !== -1) {
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
          <div style={{ backgroundColor: '#F5E7B9', minHeight: '100vh', padding: '80px 30px 20px 30px' }}>
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
          <div style={{ backgroundColor: '#F5E7B9', minHeight: '100vh', padding: '80px 30px 20px 30px' }}>
            <div className="text-center py-5">
              <h4>Transaksi tidak ditemukan</h4>
              <button className="btn mt-3" style={{ backgroundColor: '#973131', color: '#fff' }} onClick={handleBackToTransactions}>
                Kembali ke Daftar Transaksi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { totalProducts, totalSold, totalStock, totalRevenue, totalUmkmProfit, totalPartnerRevenue } = calculateTotals(
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
            <button className="btn btn-link text-decoration-none" style={{ color: '#973131' }} onClick={handleBackToTransactions}>
              <i className="bi bi-arrow-left me-1"></i> Kembali ke Daftar Transaksi
            </button>
            {isEditing ? (
              <div>
                <button className="btn btn-secondary me-2" style={{ color: '#fff' }} onClick={toggleEditMode} disabled={isSaving}>
                  Batal
                </button>
                <button className="btn" style={{ backgroundColor: '#973131', color: '#fff' }} onClick={handleSaveChanges} disabled={isSaving}>
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
              <button className="btn" style={{ backgroundColor: '#973131', color: '#fff' }} onClick={toggleEditMode}>
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
                <button className="btn btn-sm" style={{ backgroundColor: '#973131', color: '#fff' }} onClick={handleAddProduct}>
                  <i className="bi bi-plus"></i> Tambah Produk
                </button>
              )}
            </div>
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr className="text-center">
                    <th style={{ width: '20%' }}>Nama Produk</th>
                    <th style={{ width: '10%' }}>Jumlah</th>
                    <th style={{ width: '12%' }}>Harga Pokok</th>
                    <th style={{ width: '12%' }}>Harga Jual</th>
                    <th style={{ width: '10%' }}>Terjual</th>
                    <th style={{ width: '8%' }}>Sisa</th>
                    <th style={{ width: '10%' }}>Margin/Unit</th>
                    <th style={{ width: '13%' }}>Total Pendapatan</th>
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
                              className="form-control form-control-sm"
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
                              className="form-control form-control-sm text-center"
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
                              className="form-control form-control-sm text-end"
                              min="0"
                              value={product.costPrice}
                              onChange={(e) => handleProductChange(index, 'costPrice', e.target.value)}
                            />
                          ) : (
                            `Rp ${product.costPrice ? product.costPrice.toLocaleString('id-ID') : 0}`
                          )}
                        </td>
                        <td className="text-end">
                          {isEditing ? (
                            <input
                              type="number"
                              className="form-control form-control-sm text-end"
                              min="0"
                              value={product.sellingPrice}
                              onChange={(e) => handleProductChange(index, 'sellingPrice', e.target.value)}
                            />
                          ) : (
                            `Rp ${product.sellingPrice ? product.sellingPrice.toLocaleString('id-ID') : 0}`
                          )}
                        </td>
                        <td className="text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              className="form-control form-control-sm text-center"
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
                          <span className={product.profitMargin > 0 ? 'text-success' : 'text-danger'}>
                            Rp {product.profitMargin ? product.profitMargin.toLocaleString('id-ID') : 0}
                          </span>
                        </td>
                        <td className="text-end">
                          <strong>Rp {product.totalRevenue ? product.totalRevenue.toLocaleString('id-ID') : 0}</strong>
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
                      <td colSpan={isEditing ? "9" : "8"} className="text-center py-3">
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
            <div className="row p-3">
              <div className="col-md-4">
                <div className="card bg-secondary text-white">
                  <div className="card-body text-center">
                    <h6>Total Pendapatan</h6>
                    <h5>Rp {totalRevenue.toLocaleString('id-ID')}</h5>
                    <small>Produk terjual: {totalSold} pcs</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-success text-white">
                  <div className="card-body text-center">
                    <h6>Keuntungan UMKM</h6>
                    <h5>Rp {totalUmkmProfit.toLocaleString('id-ID')}</h5>
                    <small>Margin bersih</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-primary text-white">
                  <div className="card-body text-center">
                    <h6>Pendapatan Mitra</h6>
                    <h5>Rp {totalPartnerRevenue.toLocaleString('id-ID')}</h5>
                    <small>Bagian mitra</small>
                  </div>
                </div>
              </div>
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
                    <td className="fw-bold">Efisiensi Penjualan</td>
                    <td className="text-end fw-bold">
                      {totalProducts > 0 ? ((totalSold / totalProducts) * 100).toFixed(1) : 0}%
                    </td>
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