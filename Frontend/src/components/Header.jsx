import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = ({ username, isLoggingOut, confirmLogout }) => {
  return (
    <div 
      className="py-2 px-3 d-flex justify-content-end align-items-center shadow-sm" 
      style={{ 
        backgroundColor: '#F5E7B9', 
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1030,
      }}
    >
      <div className="dropdown">
        <button 
          className="btn dropdown-toggle d-flex align-items-center gap-2" 
          type="button" 
          id="adminDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
          style={{ backgroundColor: 'transparent' }}
        >
          <span className="fw-medium">{username}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button 
              className="dropdown-item d-flex align-items-center text-danger" 
              type="button" 
              onClick={confirmLogout}
              disabled={isLoggingOut}
            >
              <FaSignOutAlt className="me-2" size={16} /> 
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;