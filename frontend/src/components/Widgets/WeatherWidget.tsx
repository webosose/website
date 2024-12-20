import React, { useEffect, useState } from "react";
import "./WeatherWidget.css";
import MoonSvg from "../../assets/svgs/moon.svg";
import CloudSvg from "../../assets/svgs/cloud.svg";
import SunSvg from "../../assets/svgs/sun.svg";
import{ getWeatherData }from "../ServiceFunction/ServiceToTypeScript"

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { main: string }[];
  sys: { sunrise: number; sunset: number };
  timezone: number;
}

const WeatherWidget: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("Seoul");
  const [location, setLocation] = useState<string>("Seoul");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(inputValue);
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location && token) {
      getWeatherData(location,token)
        .then((data) => setWeatherData(data))
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [location, token]);

  if (!weatherData) return <div>Loading...</div>;

  const currentTimeUTC = new Date().getTime() / 1000;
  const localTime = currentTimeUTC + weatherData.timezone;
  const isDayTime = localTime > weatherData.sys.sunrise && localTime < weatherData.sys.sunset;

    const containerStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38vw",
    borderRadius: "35px",
    padding: "5px",
    background: "linear-gradient(to bottom, #0e1c26, #2a454b, #294861)",
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    transition: "box-shadow 0.2s",
  };

  return (
    <div style={containerStyle}>
      <div className="weather-left">
      {isDayTime ? <img src={SunSvg} className="sun" /> : <img src={MoonSvg} className="moon" />}
      <div className="cloud-container">
        <img src={CloudSvg} className="cloud" />
      </div>
      <div className="temperature">{Math.round(weatherData.main.temp)}°</div>
      <form onSubmit={handleFormSubmit}>
        <input
          className="location"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()} // Prevent drag on input interaction
        />
      </form> 
      </div>
      <div className="weather-right">
      <div className="weather">{weatherData.weather[0].main}</div>
      <div className="low-high">
        {Math.round(weatherData.main.temp_min)}° / {Math.round(weatherData.main.temp_max)}°
      </div>
      <div className="feels-like">Feels like: {Math.round(weatherData.main.feels_like)}°</div>
      
      <div className="humidity">Humidity: {weatherData.main.humidity}%</div>
      </div>
    </div>
  );
};

export default WeatherWidget;