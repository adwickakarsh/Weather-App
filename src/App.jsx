import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelectCity = async (result) => {
    setLoading(true);
    setError("");
    setWeather(null);
    setLocation(null);

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=kmh&timezone=${result.timezone}`
      );
      const data = await res.json();
      setWeather(data);
      setLocation({
        name: result.name,
        country: result.country,
        timezone: result.timezone,
        latitude: result.latitude,
        longitude: result.longitude,
      });
    } catch (err) {
      setError("Failed to fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-10 bg-amber-100 p-10">
      
      {/* Header */}
      <div className="flex flex-col gap-7">
        <h1 className="text-5xl font-black text-black tracking-wide">🌤 Weather Check</h1>
        <p className="text-xl p-2">Search any city for current weather</p>
      </div>

      {/* Search */}
      <SearchBar onSelectCity={handleSelectCity} loading={loading} />

      {/* Error */}
      {error && (
        <p className="text-rose-400 text-sm font-semibold">{error}</p>
      )}

      {/* Weather result */}
      {weather && location && (
        <WeatherCard weather={weather} location={location} />
      )}
    </div>
  );
};

export default App;