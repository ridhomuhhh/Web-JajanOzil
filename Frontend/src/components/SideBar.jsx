import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    onClose();
    window.location.href = '/';
  };

  return (
    <div
      className="position-fixed top-0 start-0 h-100 shadow-lg"
      style={{
        width: '250px',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 999,
        backgroundColor: '#973131',
        color: '#fff',
        padding: '1.5rem'
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">DompetOzil.</h5>
        <button onClick={onClose} className="btn btn-sm text-white">
          <FaTimes />
        </button>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item mb-3 ps-2">
          <a className="nav-link text-white fw-semibold" href="#">Dashboard</a>
        </li>
        <li className="nav-item mb-3 ps-2">
          <a className="nav-link text-white fw-semibold" href="#">Transaksi</a>
        </li>
        <li className="nav-item mb-3 ps-2">
          <a className="nav-link text-white fw-semibold" href="#">Laporan</a>
        </li>
        <li className="nav-item mb-3 ps-2">
          <button className="btn btn-link nav-link text-white fw-semibold p-0" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
