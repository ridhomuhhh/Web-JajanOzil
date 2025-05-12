import React from 'react';

const StatCard = ({ title, value, icon, bg }) => (
  <div className="p-3 rounded shadow-sm" style={{ backgroundColor: bg }}>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <p className="mb-1 fw-semibold">{title}</p>
        <h4>{value}</h4>
      </div>
      <div style={{ fontSize: '24px' }}>{icon}</div>
    </div>
  </div>
);

export default StatCard;
