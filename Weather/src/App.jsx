import React from "react";
import WeatherDashboard from "./components/WeatherDashboard";
import "./index.css";

function App() {
  return (
    <div className="App">
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>City Weather Dashboard</h2>
      <WeatherDashboard />
    </div>
  );
}

export default App;
