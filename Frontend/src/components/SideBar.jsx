import React, { useState, useEffect } from 'react';
import { FaThLarge, FaExchangeAlt, FaFileAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(!isMobile); // Sidebar terbuka secara default di desktop
  const [activeMenu, setActiveMenu] = useState('dashboard'); // State untuk menu aktif

  // Menentukan menu aktif berdasarkan URL saat komponen dimount
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/dashboard')) {
      setActiveMenu('dashboard');
    } else if (path.includes('/transaksi')) {
      setActiveMenu('transaksi');
    } else if (path.includes('/laporan')) {
      setActiveMenu('laporan');
    }
  }, []);

  // Memantau perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Jika beralih ke desktop, sidebar selalu terbuka
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false); // Default tertutup di mobile
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  // Toggle sidebar untuk mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Styles untuk active/hover effect
  const getButtonStyle = (menuName) => ({
    backgroundColor: activeMenu === menuName ? '#4A90E2' : 'transparent',
    transition: 'all 0.3s ease',
    borderRadius: '4px',
    margin: '2px 8px',
  });

  const buttonHoverStyle = {
    ':hover': {
      backgroundColor: activeMenu !== undefined ? '#4A90E2' : 'rgba(255, 255, 255, 0.1)',
    }
  };

  return (
    <>
      {/* Toggle button untuk mobile */}
      {isMobile && (
        <button 
          className="position-fixed top-0 start-0 m-2 p-2 rounded border-0 text-white" 
          style={{ 
            backgroundColor: '#973131', 
            zIndex: 1040,
            ...buttonHoverStyle
          }}
          onClick={toggleSidebar}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#7a2828';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#973131';
          }}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Overlay backdrop untuk mobile ketika sidebar terbuka */}
      {isMobile && isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100" 
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            zIndex: 1030 
          }}
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 h-100 transition-all"
        style={{
          width: '250px', // Tetap 250px di desktop
          backgroundColor: '#973131',
          color: '#fff',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1035,
        }}
      >
        <div className="p-3 text-center">
          <h2 className="fw-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>DompetOzil.</h2>
          <p className="mt-1 mb-4 fw-normal" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>Kelola Keuangan Lebih Mudah!</p>

          <hr style={{ borderColor: '#FFFFFF', marginTop: '8px', marginBottom: '8px' }} />
        </div>
        
        <div className="mt-0">
          <p className="ps-3 mb-2 text-white-50 small fw-bold">MENU</p>
          
          <div className="nav flex-column">
            {/* Beranda */}
            <button 
              className="nav-link py-2 px-3 text-white d-flex align-items-center border-0" 
              style={getButtonStyle('dashboard')}
              onClick={() => {
                setActiveMenu('dashboard');
                window.location.href = '/dashboard';
                if (isMobile) setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== 'dashboard') {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== 'dashboard') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FaThLarge className="me-3" /> Dashboard
            </button>
            
            {/* Transaksi */}
            <button 
              className="nav-link py-2 px-3 text-white d-flex align-items-center border-0"
              style={getButtonStyle('transaksi')}
              onClick={() => {
                setActiveMenu('transaksi');
                window.location.href = '/transaksi';
                if (isMobile) setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== 'transaksi') {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== 'transaksi') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FaExchangeAlt className="me-3" /> Transaksi
            </button>
            
            {/* Laporan */}
            <button 
              className="nav-link py-2 px-3 text-white d-flex align-items-center border-0"
              style={getButtonStyle('laporan')}
              onClick={() => {
                setActiveMenu('laporan');
                window.location.href = '/laporan';
                if (isMobile) setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== 'laporan') {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== 'laporan') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FaFileAlt className="me-3" /> Laporan
            </button>
            
            {/* Keluar */}
            <button 
              onClick={() => {
                handleLogout();
                if (isMobile) setIsOpen(false);
              }}
              className="nav-link py-2 px-3 text-white border-0 bg-transparent d-flex align-items-center"
              style={{
                transition: 'all 0.3s ease',
                borderRadius: '4px',
                margin: '2px 8px',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <FaSignOutAlt className="me-3" /> Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Spacer untuk konten utama (hanya di desktop) */}
      {!isMobile && <div style={{ width: '250px' }} />}
    </>
  );
};

export default Sidebar;