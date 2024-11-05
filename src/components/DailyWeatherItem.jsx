import React from 'react';
import { weatherCodes } from '../constants';

const DailyWeatherItem = ({ day, index, onClick }) => {
  const temperature = Math.floor(day.day.avgtemp_c);
  const date = day.date;
  const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(day.day.condition.code));
  const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: 'long' });

  return (
    <li className="weather-item" onClick={onClick}>
      <p className="day">{index === 0 ? "Today" : dayOfWeek}</p>
      <img src={`icons/${weatherIcon}.svg`} className="weather-icon" alt="weather icon" />
      <p className="temperature">{temperature}°</p>
    </li>
  );
};

export default DailyWeatherItem;
