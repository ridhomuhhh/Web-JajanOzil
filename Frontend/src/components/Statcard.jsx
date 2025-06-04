import React from 'react';

const Statcard = ({ title, value, icon }) => {
  const cardStyle = {
    backgroundColor: '#FFFFFF', // Latar belakang putih
    borderRadius: '12px', // Sudut membulat
    padding: '25px', // Padding lebih lega
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '100%', // Agar tinggi kartu seragam
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)', // Bayangan lembut
  };

  const iconContainerStyle = {
    backgroundColor: 'rgba(0, 123, 255, 0.1)', // Latar belakang ringan untuk ikon (warna aksen biru)
    borderRadius: '50%', // Bentuk lingkaran
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px', // Jarak antara ikon dan judul
  };

  const titleStyle = {
    fontSize: '0.9rem', // Sedikit lebih kecil
    color: '#6c757d', // Warna abu-abu
    marginBottom: '5px',
  };

  const valueStyle = {
    fontSize: '1.8rem', // Angka lebih besar
    fontWeight: '700', // Lebih tebal
    color: '#343a40', // Warna gelap
  };

  return (
    <div style={cardStyle}>
      <div style={iconContainerStyle}>
        {/* Mengkloning ikon untuk mengatur ukuran dan warna */}
        {React.cloneElement(icon, { size: 24, color: '#007bff' })} {/* Ikon lebih besar, warna aksen biru */}
      </div>
      <div style={titleStyle}>{title}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
};

export default Statcard;