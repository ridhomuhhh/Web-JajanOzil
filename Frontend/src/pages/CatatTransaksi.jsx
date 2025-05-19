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
      price: '',
      sold: '',
      revenue: '',
      stock: ''
    };
    setProducts([...products, newProduct]);
    setProductCount(productCount + 1);
  };

  // Fungsi untuk menyimpan transaksi
  const handleSaveTransaction = () => {
    // Membuat objek transaksi baru
    const newTransaction = {
      id: new Date().getTime(), // Menggunakan timestamp sebagai ID
      date: currentTransaction.date,
      partnerName: currentTransaction.partnerName,
      products: [...products],
      totalProducts: productCount,
      totalRevenue: products.reduce((sum, product) => sum + product.revenue, 0)
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
    
    // Hitung ulang pendapatan dan stok setiap kali jumlah produk, harga, atau produk terjual berubah
    if (['quantity', 'price', 'sold'].includes(field)) {
      const product = updatedProducts[index];
      
      // Kalkulasi pendapatan (produk terjual x harga)
      product.revenue = product.sold * product.price;
      
      // Kalkulasi sisa produk (jumlah produk - produk terjual)
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
            <div className="mb-3">
              <label htmlFor="tanggal" className="form-label">Tanggal</label>
              <input
                type="date"
                className="form-control"
                id="tanggal"
                value={currentTransaction.date}
                onChange={(e) => handleTransactionChange('date', e.target.value)}
              />
            </div>

            <div className="mb-3">
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

            <div className="mb-3">
              <label htmlFor="totalJenisProduk" className="form-label">Total Jenis Produk</label>
              <input
                type="number"
                className="form-control bg-light"
                id="totalJenisProduk"
                value={productCount}
                readOnly
              />
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

                  <div className="row mb-3">
                    <div className="col-md-4">
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
                    <div className="col-md-4">
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
                    <div className="col-md-4">
                      <label htmlFor={`harga${index}`} className="form-label">Harga</label>
                      <input
                        type="number"
                        className="form-control"
                        id={`harga${index}`}
                        placeholder="0"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, 'price', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor={`produkTerjual${index}`} className="form-label">Produk Terjual</label>
                      <input
                        type="number"
                        className="form-control"
                        id={`produkTerjual${index}`}
                        placeholder="0"
                        value={product.sold}
                        onChange={(e) => handleProductChange(index, 'sold', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor={`pendapatan${index}`} className="form-label">Pendapatan</label>
                      <input
                        type="number"
                        className="form-control bg-light"
                        id={`pendapatan${index}`}
                        placeholder="0"
                        value={product.revenue}
                        readOnly
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor={`sisaProduk${index}`} className="form-label">Sisa Produk</label>
                      <input
                        type="number"
                        className="form-control bg-light"
                        id={`sisaProduk${index}`}
                        placeholder="0"
                        value={product.stock}
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