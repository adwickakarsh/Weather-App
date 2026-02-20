import React, { useEffect, useRef, useState } from "react";

const Searchbar = ({ onSelectCity, loading }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced geocoding autocomplete
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = city.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=6&language=en&format=json`
        );
        const data = await res.json();
        const results = data.results ?? [];
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
      }
    }, 350);

    return () => clearTimeout(debounceRef.current);
  }, [city]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleSelect = (result) => {
    setCity(`${result.name}, ${result.country}`);
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveIndex(-1);
    onSelectCity(result);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const target = activeIndex >= 0 ? suggestions[activeIndex] : suggestions[0];
      if (target) handleSelect(target);
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Search a city..."
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          className="flex-1 bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl px-4 py-3 text-slate-700 placeholder-slate-400 text-sm font-medium outline-none shadow-sm"
        />
        <button
          onClick={() => suggestions.length > 0 && handleSelect(suggestions[activeIndex >= 0 ? activeIndex : 0])}
          disabled={loading || city.trim().length < 2}
          className="bg-violet-500 hover:scale-110 hover:bg-violet-700 disabled:opacity-0 disabled:cursor-not-allowed text-white font-bold text-sm px-4 py-3 rounded-2xl transition-all duration-300 shadow-sm"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Loading
            </span>
          ) : "Search"}
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white/90 backdrop-blur-md border border-white/80 rounded-2xl overflow-hidden shadow-xl z-50 max-h-72 overflow-y-auto"
        >
          {suggestions.map((result, i) => (
            <li
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              role="option"
              aria-selected={i === activeIndex}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex justify-between items-center px-4 py-3 cursor-pointer transition-colors ${
                i < suggestions.length - 1 ? "border-b border-slate-100" : ""
              } ${
                i === activeIndex
                  ? "bg-violet-100 text-violet-700"
                  : "hover:bg-violet-50"
              }`}
            >
              <span className="text-sm font-semibold">
                {result.name}{result.admin1 ? `, ${result.admin1}` : ""}
              </span>
              <span className={`text-xs ${i === activeIndex ? "text-violet-400" : "text-slate-400"}`}>
                {result.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;