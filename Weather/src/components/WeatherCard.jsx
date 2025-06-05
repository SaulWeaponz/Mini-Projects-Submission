// components/WeatherCard.jsx
import React from "react";
import "../styles/WeatherCard.css";

function WeatherCard({ city, temperature, condition }) {
  return (
    <div className="weather-card">
      <h3 className="city">{city}</h3>
      <h1 className="temperature">{temperature}°C</h1>
      <p className="condition">{condition}</p>
    </div>
  );
}

export default WeatherCard;
