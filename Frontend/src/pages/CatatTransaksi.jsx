// CatatTransaksi.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';

const CatatTransaksi = () => {
  const navigate = useNavigate();
  const [username] = useState('Admin');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    partnerName: '',
    products: []
  });

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

  // Fungsi untuk menambah produk baru
  const handleAddProduct = () => {
    setShowProductForm(true);
    const newProduct = {
      id: products.length + 1,
      name: '',
      quantity: '',
      costPrice: '', // Harga pokok dari mitra
      sellingPrice: '', // Harga jual oleh UMKM
      sold: '',
      totalRevenue: 0, // Total pendapatan (sold × sellingPrice)
      partnerRevenue: 0, // Pendapatan mitra (sold × costPrice)
      umkmProfit: 0, // Keuntungan UMKM (totalRevenue - partnerRevenue)
      stock: '', // Sisa produk
      profitMargin: 0 // Margin keuntungan per unit (sellingPrice - costPrice)
    };
    setProducts([...products, newProduct]);
    setProductCount(productCount + 1);
  };

  // Fungsi untuk menyimpan transaksi
  const handleSaveTransaction = () => {
    // Validasi input
    const isValid = products.every(product => 
      product.name.trim() && 
      product.quantity > 0 && 
      product.costPrice > 0 && 
      product.sellingPrice > 0 && 
      product.sold >= 0 &&
      product.sellingPrice >= product.costPrice // Harga jual harus >= harga pokok
    );

    if (!isValid) {
      alert('Mohon lengkapi semua data produk dengan benar. Harga jual harus lebih besar atau sama dengan harga pokok.');
      return;
    }

    // Hitung total revenue, keuntungan UMKM, dan pendapatan mitra
    const totalRevenue = products.reduce((sum, product) => sum + product.totalRevenue, 0);
    const totalUmkmProfit = products.reduce((sum, product) => sum + product.umkmProfit, 0);
    const totalPartnerRevenue = products.reduce((sum, product) => sum + product.partnerRevenue, 0);
    
    // Membuat objek transaksi baru
    const newTransaction = {
      id: new Date().getTime(), // Menggunakan timestamp sebagai ID
      date: currentTransaction.date,
      partnerName: currentTransaction.partnerName,
      products: [...products],
      totalProducts: productCount,
      totalRevenue: totalRevenue,
      totalUmkmProfit: totalUmkmProfit,
      totalPartnerRevenue: totalPartnerRevenue
    };
    
    // Di sini Anda bisa menyimpan transaksi ke state global/context/redux
    // Contoh menggunakan localStorage untuk demo
    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    localStorage.setItem('transactions', JSON.stringify([...existingTransactions, newTransaction]));
    
    // Kembali ke halaman Transaksi setelah simpan
    alert('Transaksi berhasil disimpan!');
    navigate('/transaksi');
  };

  // Fungsi untuk membatalkan transaksi dan kembali ke halaman transaksi
  const handleCancelTransaction = () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan transaksi?')) {
      navigate('/transaksi');
    }
  };

  // Fungsi untuk membatalkan penambahan produk
  const handleCancelProduct = () => {
    setShowProductForm(false);
    if (products.length > 0) {
      const updatedProducts = [...products];
      updatedProducts.pop();
      setProducts(updatedProducts);
      setProductCount(productCount - 1);
    }
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    setProductCount(productCount - 1);
  };

  // Fungsi untuk mengubah nilai produk
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    
    // Hitung ulang kalkulasi setiap kali ada perubahan
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
    if (product.quantity && product.sold) {
      product.stock = product.quantity - product.sold;
    }
    
    setProducts(updatedProducts);
  };

  // Fungsi untuk menangani perubahan pada form transaksi
  const handleTransactionChange = (field, value) => {
    setCurrentTransaction({
      ...currentTransaction,
      [field]: value
    });
  };

  // Hitung total keseluruhan
  const totalRevenue = products.reduce((sum, product) => sum + product.totalRevenue, 0);
  const totalUmkmProfit = products.reduce((sum, product) => sum + product.umkmProfit, 0);
  const totalPartnerRevenue = products.reduce((sum, product) => sum + product.partnerRevenue, 0);

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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">Catat Transaksi</h3>
            <button className="btn btn-outline-secondary" onClick={handleCancelTransaction}>
              Kembali
            </button>
          </div>

          {/* Form Transaksi */}
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="tanggal" className="form-label">Tanggal</label>
                <input
                  type="date"
                  className="form-control"
                  id="tanggal"
                  value={currentTransaction.date}
                  onChange={(e) => handleTransactionChange('date', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="namaMitra" className="form-label">Nama Mitra</label>
                <input
                  type="text"
                  className="form-control"
                  id="namaMitra"
                  placeholder="Masukkan Nama Mitra"
                  value={currentTransaction.partnerName}
                  onChange={(e) => handleTransactionChange('partnerName', e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="totalJenisProduk" className="form-label">Total Jenis Produk</label>
                <input
                  type="number"
                  className="form-control bg-light"
                  id="totalJenisProduk"
                  value={productCount}
                  readOnly
                />
              </div>
            </div>

            {/* Detail Produk */}
            <div className="bg-light p-3 mb-4 rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Detail Produk</h6>
                <button className="btn btn-sm" style={{ backgroundColor: '#973131', color: '#fff' }} onClick={handleAddProduct}>
                  + Tambah Produk
                </button>
              </div>
            </div>

            {/* Summary Card - Tampil jika ada produk */}
            {products.length > 0 && (
              <div className="bg-light p-3 rounded border">
                <h6 className="mb-3 text-center">Ringkasan Transaksi</h6>
                <div className="row text-center">
                  <div className="col-md-4">
                    <div className="card bg-secondary text-white">
                      <div className="card-body">
                        <h6>Total Pendapatan</h6>
                        <h5>Rp {totalRevenue.toLocaleString('id-ID')}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-success text-white">
                      <div className="card-body">
                        <h6>Keuntungan UMKM</h6>
                        <h5>Rp {totalUmkmProfit.toLocaleString('id-ID')}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-primary text-white">
                      <div className="card-body">
                        <h6>Pendapatan Mitra</h6>
                        <h5>Rp {totalPartnerRevenue.toLocaleString('id-ID')}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Detail Produk yang muncul setelah klik Tambah Produk */}
          {showProductForm && (
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              {products.map((product, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Produk #{index + 1}</h6>
                    <button className="btn btn-sm" style={{ backgroundColor: '#973131', color: '#fff' }} onClick={() => handleDeleteProduct(index)}>
                      Hapus
                    </button>
                  </div>

                  {/* Baris 1: Info Dasar Produk */}
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label htmlFor={`namaProduk${index}`} className="form-label">Nama Produk</label>
                      <input
                        type="text"
                        className="form-control"
                        id={`namaProduk${index}`}
                        placeholder="Nama Produk"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`jumlahProduk${index}`} className="form-label">Jumlah Produk</label>
                      <input
                        type="number"
                        className="form-control"
                        id={`jumlahProduk${index}`}
                        placeholder="0"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`hargaPokok${index}`} className="form-label">
                        Harga Pokok (Rp) <small className="text-muted">*Harga dari mitra</small>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id={`hargaPokok${index}`}
                        placeholder="0"
                        value={product.costPrice}
                        onChange={(e) => handleProductChange(index, 'costPrice', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`hargaJual${index}`} className="form-label">
                        Harga Jual (Rp) <small className="text-muted">*Harga jual UMKM</small>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id={`hargaJual${index}`}
                        placeholder="0"
                        value={product.sellingPrice}
                        onChange={(e) => handleProductChange(index, 'sellingPrice', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  {/* Baris 2: Produk Terjual dan Margin */}
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label htmlFor={`produkTerjual${index}`} className="form-label">Produk Terjual</label>
                      <input
                        type="number"
                        className="form-control"
                        id={`produkTerjual${index}`}
                        placeholder="0"
                        max={product.quantity}
                        value={product.sold}
                        onChange={(e) => handleProductChange(index, 'sold', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`marginKeuntungan${index}`} className="form-label">Margin per Unit</label>
                      <input
                        type="text"
                        className="form-control bg-warning text-dark"
                        id={`marginKeuntungan${index}`}
                        value={`Rp ${product.profitMargin.toLocaleString('id-ID')}`}
                        readOnly
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`sisaProduk${index}`} className="form-label">Sisa Produk</label>
                      <input
                        type="number"
                        className="form-control bg-light"
                        id={`sisaProduk${index}`}
                        value={product.stock}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Baris 3: Hasil Kalkulasi */}
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor={`totalPendapatan${index}`} className="form-label">Total Pendapatan</label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-white"
                        id={`totalPendapatan${index}`}
                        value={`Rp ${product.totalRevenue.toLocaleString('id-ID')}`}
                        readOnly
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`keuntunganUmkm${index}`} className="form-label">Keuntungan UMKM</label>
                      <input
                        type="text"
                        className="form-control bg-success text-white"
                        id={`keuntunganUmkm${index}`}
                        value={`Rp ${product.umkmProfit.toLocaleString('id-ID')}`}
                        readOnly
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`pendapatanMitra${index}`} className="form-label">Pendapatan Mitra</label>
                      <input
                        type="text"
                        className="form-control bg-primary text-white"
                        id={`pendapatanMitra${index}`}
                        value={`Rp ${product.partnerRevenue.toLocaleString('id-ID')}`}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-end mt-3">
                <button 
                  className="btn btn-secondary me-2" style={{ filter: 'none' }} onClick={handleCancelProduct}
                >
                  Batal
                </button>
                <button 
                  className="btn" style={{ backgroundColor: '#973131', color: '#fff', filter: 'none' }}
                  onClick={handleSaveTransaction}
                  disabled={products.length === 0 || !currentTransaction.partnerName.trim()}
                >
                  Simpan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatatTransaksi;