import React, { useState } from "react";
import Searchbar from "./components/Searchbar";
import Weathercard from "./components/Weathercard";

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
    <div className="md:h-screen
    flex flex-col gap-10 bg-purple-100 px-8 py-12">
      
      {/* Header */}
      <div className="flex flex-col gap-7 p-1  max-md:p-0">
        <span className="text-6xl tracking-wide max-md:text-5xl">🌤 Weather Dekho</span>
        <p className="text-xl p-2 max-md:text-lg max-md:p-0 text-slate-500">Search any city for current weather</p>
      </div>

      {/* Search */}
      <Searchbar onSelectCity={handleSelectCity} loading={loading} />

      {/* Error */}
      {error && (
        <p className="text-rose-400 text-sm font-semibold">{error}</p>
      )}

      {/* Weather result */}
      {weather && location && (
        <Weathercard weather={weather} location={location} />
      )}
    </div>
  );
};

export default App;