import React from 'react';

const Humidity = ({ value }) => (
  <div className="detail-box">
    <span>💧</span>
    <p>Humidity: {value}%</p>
  </div>
);

export default Humidity;
