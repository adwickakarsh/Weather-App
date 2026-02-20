import React from "react";
import Weathericon from "./Weathericon";

const WEATHER_LABELS = {
  0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Foggy", 48: "Icy Fog",
  51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
  61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
  71: "Slight Snow", 73: "Moderate Snow", 75: "Heavy Snow",
  80: "Showers", 81: "Moderate Showers", 82: "Violent Showers",
  95: "Thunderstorm", 96: "Thunderstorm + Hail", 99: "Thunderstorm + Hail",
};

const StatRow = ({ label, value }) => (
  <div className="flex justify-around gap-6 items-center bg-white/50 border border-white/70 rounded-2xl px-7 py-4 transition-all duration-300 hover:scale-115">
    <span className="text-slate-500 text-sm font-medium ">{label}</span>
    <span className="text-slate-700 text-sm font-black">{value}</span>
  </div>
);

const WeatherCard = ({ weather, location }) => {
  const current = weather.current;
  const daily = weather.daily;
  const condition = WEATHER_LABELS[current.weather_code] ?? `Code ${current.weather_code}`;

  return (
    <div className="w-full flex gap-10 max-md:flex-col">
      {/* Hero card — location + temp + icon */}
      <div className="bg-white backdrop-blur-md border border-white rounded-3xl p-7 shadow-md flex items-center justify-between gap-7 transition-all duration-400 scale-90 hover:scale-100">
        {/* Left: text info */}
        <div className="flex flex-col gap-6 max-md:gap-2">
          <p className="text-5xl font-black text-slate-700 leading-tight">
            {location.name}
            <span className="text-slate-400 font-semibold text-lg">, {location.country}</span>
          </p>
          <p className="text-slate-400 text-xl font-medium tracking-wide">
            {location.latitude}°N · {location.longitude}°E · {location.timezone}
          </p>

          {/* Big temp */}
          <div className="flex items-end gap-1 mt-3">
            <span className="text-8xl font-black text-slate-700 leading-none">
              {Math.round(current.temperature_2m)}°
            </span>
            <span className="text-4xl font-semibold text-slate-400 mb-2">C</span>
          </div>

          {/* Condition badge */}
          <span className="inline-block mt-2 self-start bg-violet-200 text-violet-600 text-xl font-bold px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-violet-600 hover:text-violet-100">
            {condition}
          </span>
        </div>

        {/* Right: animated SVG icon */}
        <div className="bg-white/40 rounded-3xl p-4">
          <Weathericon code={current.weather_code} size={130} />
        </div>
      </div>

      {/* Stat rows */}
      <div className="flex flex-col justify-evenly max-md:gap-5">
        <StatRow label="🌬️ Wind Speed"  value={`${current.wind_speed_10m} km/h`} />
        <StatRow label="🔺 Today's Max" value={`${Math.round(daily.temperature_2m_max[0])} °C`} />
        <StatRow label="🔻 Today's Min" value={`${Math.round(daily.temperature_2m_min[0])} °C`} />
      </div>
    </div>
  );
};

export default WeatherCard;