import React, { useEffect, useRef, useState } from 'react';
import SearchSection from './components/SearchSection';
import CurrentWeather from './components/CurrentWeather';
import DailyWeatherItem from './components/DailyWeatherItem';
import DetailedWeather from './components/DetailedWeather';
import { weatherCodes } from './constants';
import NoResultsDiv from './components/NoResultsDiv';
import Header from './components/Header';

const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [currentWeather, setCurrentWeather] = useState({});
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isTodaySelected, setIsTodaySelected] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef = useRef(null);

  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false);
    window.innerWidth <= 768 && searchInputRef.current.focus();

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();

      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

      setCurrentWeather({ temperature, description, weatherIcon });

      const next5days = data.forecast.forecastday;
      setDailyForecast(next5days);

      searchInputRef.current.value = data.location.name;
    } catch {
      setHasNoResults(true);
    }
  };

  useEffect(() => {
    const defaultCity = 'Panadura';
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=6`;
    getWeatherDetails(API_URL);
  }, []);

  const handleDayClick = (day) => {
    const today = new Date().toISOString().split('T')[0];
    if (day.date === today) {
      if (isTodaySelected) {
        setSelectedDay(null);
        setIsTodaySelected(false);
      } else {
        setSelectedDay(day);
        setIsTodaySelected(true);
      }
    } else {
      setSelectedDay(day);
      setIsTodaySelected(false);
    }
  };

  return (
    <div className="container">
      <Header />
      <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />

      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          {!selectedDay ? (
            <CurrentWeather currentWeather={currentWeather} />
          ) : (
            <DetailedWeather day={selectedDay} />
          )}

          <div className="daily-forecast">
            <ul className="weather-list">
              {dailyForecast.map((day, index) => (
                <DailyWeatherItem 
                  key={day.date} 
                  day={day} 
                  index={index} 
                  onClick={() => handleDayClick(day)} 
                  isSelected={selectedDay?.date === day.date} 
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
