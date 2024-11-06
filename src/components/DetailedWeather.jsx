import React from 'react';
import Temperature from "./Temperature";
import Wind from "./Wind";
import UV from "./UV";
import Humidity from "./Humidity";
import Sunrise from "./Sunrise";
import Sunset from './Sunset';
import { weatherCodes } from '../constants';

const DetailedWeather = ({ day }) => {
  const date = new Date(day.date).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
  const description = day.day.condition.text;
  const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(day.day.condition.code));

  return (
    <div className="detailed-weather">
      <div className="weather-summary">
        <p className="selected-date">{date}</p>
        <img src={`icons/${weatherIcon}.svg`} alt="Weather Icon" className="selected-weather-icon" />
        <p className="weather-description">{description}</p>
      </div>

      <div className="weather-details-grid">
        <Temperature value={day.day.avgtemp_c} />
        <Wind value={day.day.maxwind_kph} />
        <UV value={day.day.uv} />
        <Humidity value={day.day.avghumidity} />
        <Sunrise value={day.astro.sunrise} />
        <Sunset value={day.astro.sunset} />
      </div>
    </div>
  );
};

export default DetailedWeather;
