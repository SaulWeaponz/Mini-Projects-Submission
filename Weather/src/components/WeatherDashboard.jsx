import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import "../styles/WeatherCard.css"; 

const cities = ["Kampala", "Nairobi", "London", "New York"];
const API_KEY = "d4910fddbb7b4ba3bf370636250106"; // API key

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      const results = await Promise.all(
        cities.map(async (city) => {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
          );
          const data = await response.json();
          return {
            city: data.location.name,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
          };
        })
      );
      setWeatherData(results);
    }

    fetchWeather();
  }, []);

  return (
    <div className="weather-dashboard">
      {weatherData.map((weather, index) => (
        <WeatherCard
          key={index}
          city={weather.city}
          temperature={weather.temperature}
          condition={weather.condition}
        />
      ))}
    </div>
  );
}

export default WeatherDashboard;
