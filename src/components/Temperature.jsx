import React from 'react';

const Temperature = ({ value }) => (
  <div className="detail-box">
    <span>🌡️</span>
    <p>Temperature: {value}°C</p>
  </div>
);

export default Temperature;
