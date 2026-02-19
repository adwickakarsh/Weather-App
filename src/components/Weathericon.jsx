import React from "react";

const WeatherIcon = ({ code, size = 120 }) => {
  const condition = getCondition(code);

  return (
    <div style={{ width: size, height: size }}>
      {condition === "sunny"        && <Sunny size={size} />}
      {condition === "partlyCloudy" && <PartlyCloudy size={size} />}
      {condition === "cloudy"       && <Cloudy size={size} />}
      {condition === "fog"          && <Fog size={size} />}
      {condition === "drizzle"      && <Drizzle size={size} />}
      {condition === "rainy"        && <Rainy size={size} />}
      {condition === "snowy"        && <Snowy size={size} />}
      {condition === "stormy"       && <Stormy size={size} />}
    </div>
  );
};

// Map WMO code → condition key
const getCondition = (code) => {
  if ([0, 1].includes(code))             return "sunny";
  if ([2].includes(code))                return "partlyCloudy";
  if ([3].includes(code))                return "cloudy";
  if ([45, 48].includes(code))           return "fog";
  if ([51, 53, 55].includes(code))       return "drizzle";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
  if ([95, 96, 99].includes(code))       return "stormy";
  return "sunny";
};

// ─── Sunny ───────────────────────────────────────────────────────────────────
const Sunny = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes pulse-sun { 0%,100% { r: 22; } 50% { r: 25; } }
      .sun-rays { transform-origin: 60px 60px; animation: spin-slow 10s linear infinite; }
      .sun-core { animation: pulse-sun 3s ease-in-out infinite; }
    `}</style>
    <g className="sun-rays">
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={i}
            x1={60 + 32 * Math.cos(rad)} y1={60 + 32 * Math.sin(rad)}
            x2={60 + 46 * Math.cos(rad)} y2={60 + 46 * Math.sin(rad)}
            stroke="#FBBF24" strokeWidth="5" strokeLinecap="round"
          />
        );
      })}
    </g>
    <circle cx="60" cy="60" r="24" fill="#FDE68A" stroke="#FBBF24" strokeWidth="3" />
    <circle className="sun-core" cx="60" cy="60" r="16" fill="#FCD34D" />
  </svg>
);

// ─── Partly Cloudy ────────────────────────────────────────────────────────────
const PartlyCloudy = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes slide-cloud { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
      @keyframes spin-small { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .cloud-float { animation: slide-cloud 4s ease-in-out infinite; }
      .small-rays { transform-origin: 38px 40px; animation: spin-small 12s linear infinite; }
    `}</style>
    {/* Sun */}
    <g className="small-rays">
      {[0,60,120,180,240,300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return <line key={i} x1={38 + 20 * Math.cos(rad)} y1={40 + 20 * Math.sin(rad)} x2={38 + 28 * Math.cos(rad)} y2={40 + 28 * Math.sin(rad)} stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />;
      })}
    </g>
    <circle cx="38" cy="40" r="15" fill="#FDE68A" stroke="#FBBF24" strokeWidth="2.5" />
    {/* Cloud */}
    <g className="cloud-float">
      <circle cx="52" cy="74" r="16" fill="#E0F2FE" />
      <circle cx="70" cy="68" r="20" fill="#E0F2FE" />
      <circle cx="88" cy="74" r="14" fill="#E0F2FE" />
      <rect x="52" y="74" width="50" height="18" fill="#E0F2FE" />
    </g>
  </svg>
);

// ─── Cloudy ───────────────────────────────────────────────────────────────────
const Cloudy = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes drift1 { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-5px); } }
      @keyframes drift2 { 0%,100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
      .back-cloud { animation: drift1 5s ease-in-out infinite; }
      .front-cloud { animation: drift2 4s ease-in-out infinite; }
    `}</style>
    <g className="back-cloud">
      <circle cx="44" cy="58" r="16" fill="#CBD5E1" />
      <circle cx="62" cy="50" r="20" fill="#CBD5E1" />
      <circle cx="80" cy="58" r="15" fill="#CBD5E1" />
      <rect x="44" y="58" width="51" height="18" fill="#CBD5E1" />
    </g>
    <g className="front-cloud">
      <circle cx="36" cy="72" r="14" fill="#E2E8F0" />
      <circle cx="54" cy="64" r="18" fill="#E2E8F0" />
      <circle cx="74" cy="70" r="16" fill="#E2E8F0" />
      <rect x="36" y="72" width="54" height="16" fill="#E2E8F0" />
    </g>
  </svg>
);

// ─── Fog ──────────────────────────────────────────────────────────────────────
const Fog = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes fog-slide { 0% { transform: translateX(-8px); opacity:0.4; } 50% { transform: translateX(8px); opacity:0.9; } 100% { transform: translateX(-8px); opacity:0.4; } }
      .fog-line-1 { animation: fog-slide 3s ease-in-out infinite; }
      .fog-line-2 { animation: fog-slide 3.5s ease-in-out infinite reverse; }
      .fog-line-3 { animation: fog-slide 4s ease-in-out infinite; }
    `}</style>
    <circle cx="48" cy="44" r="16" fill="#E2E8F0" />
    <circle cx="66" cy="38" r="20" fill="#E2E8F0" />
    <circle cx="84" cy="44" r="14" fill="#E2E8F0" />
    <rect x="48" y="44" width="50" height="16" fill="#E2E8F0" />
    <rect className="fog-line-1" x="20" y="68" width="80" height="6" rx="3" fill="#94A3B8" opacity="0.7" />
    <rect className="fog-line-2" x="26" y="80" width="68" height="6" rx="3" fill="#94A3B8" opacity="0.6" />
    <rect className="fog-line-3" x="20" y="92" width="76" height="6" rx="3" fill="#94A3B8" opacity="0.5" />
  </svg>
);

// ─── Drizzle ──────────────────────────────────────────────────────────────────
const Drizzle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes drop-fall { 0% { transform: translateY(-6px); opacity:0; } 60% { opacity:1; } 100% { transform: translateY(10px); opacity:0; } }
      .d1 { animation: drop-fall 1.4s ease-in infinite 0s; }
      .d2 { animation: drop-fall 1.4s ease-in infinite 0.2s; }
      .d3 { animation: drop-fall 1.4s ease-in infinite 0.5s; }
      .d4 { animation: drop-fall 1.4s ease-in infinite 0.8s; }
      .d5 { animation: drop-fall 1.4s ease-in infinite 1.1s; }
    `}</style>
    <circle cx="44" cy="50" r="16" fill="#BAE6FD" />
    <circle cx="62" cy="42" r="20" fill="#BAE6FD" />
    <circle cx="82" cy="50" r="14" fill="#BAE6FD" />
    <rect x="44" y="50" width="52" height="16" fill="#BAE6FD" />
    <ellipse className="d1" cx="40" cy="80" rx="3.5" ry="5.5" fill="#7DD3FC" />
    <ellipse className="d2" cx="56" cy="86" rx="3.5" ry="5.5" fill="#7DD3FC" />
    <ellipse className="d3" cx="72" cy="80" rx="3.5" ry="5.5" fill="#7DD3FC" />
    <ellipse className="d4" cx="88" cy="86" rx="3.5" ry="5.5" fill="#7DD3FC" />
    <ellipse className="d5" cx="48" cy="94" rx="3.5" ry="5.5" fill="#7DD3FC" />
  </svg>
);

// ─── Rainy ────────────────────────────────────────────────────────────────────
const Rainy = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes rain-fall { 0% { transform: translate(0,-8px); opacity:0; } 50% { opacity:1; } 100% { transform: translate(-4px,14px); opacity:0; } }
      .r1 { animation: rain-fall 1s ease-in infinite 0s; }
      .r2 { animation: rain-fall 1s ease-in infinite 0.15s; }
      .r3 { animation: rain-fall 1s ease-in infinite 0.3s; }
      .r4 { animation: rain-fall 1s ease-in infinite 0.45s; }
      .r5 { animation: rain-fall 1s ease-in infinite 0.6s; }
    `}</style>
    <circle cx="44" cy="50" r="16" fill="#93C5FD" />
    <circle cx="62" cy="42" r="20" fill="#93C5FD" />
    <circle cx="82" cy="50" r="14" fill="#93C5FD" />
    <rect x="44" y="50" width="52" height="16" fill="#93C5FD" />
    <line className="r1" x1="38" y1="74" x2="32" y2="90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line className="r2" x1="52" y1="78" x2="46" y2="94" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line className="r3" x1="66" y1="74" x2="60" y2="90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line className="r4" x1="80" y1="78" x2="74" y2="94" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line className="r5" x1="94" y1="74" x2="88" y2="90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// ─── Snowy ────────────────────────────────────────────────────────────────────
const Snowy = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes snow-fall { 0% { transform: translateY(-6px) rotate(0deg); opacity:0; } 50% { opacity:1; } 100% { transform: translateY(12px) rotate(180deg); opacity:0; } }
      @keyframes snow-fall2 { 0% { transform: translateY(-6px) rotate(0deg); opacity:0; } 50% { opacity:1; } 100% { transform: translateY(12px) rotate(-180deg); opacity:0; } }
      .s1 { animation: snow-fall 2s ease-in infinite 0s; }
      .s2 { animation: snow-fall2 2s ease-in infinite 0.4s; }
      .s3 { animation: snow-fall 2s ease-in infinite 0.8s; }
      .s4 { animation: snow-fall2 2s ease-in infinite 1.2s; }
    `}</style>
    <circle cx="44" cy="50" r="16" fill="#C7D2FE" />
    <circle cx="62" cy="42" r="20" fill="#C7D2FE" />
    <circle cx="82" cy="50" r="14" fill="#C7D2FE" />
    <rect x="44" y="50" width="52" height="16" fill="#C7D2FE" />
    {[[38,78],[56,84],[74,78],[92,84]].map(([cx, cy], i) => (
      <g key={i} className={`s${i+1}`}>
        <line x1={cx} y1={cy-8} x2={cx} y2={cy+8} stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={cx-7} y1={cy} x2={cx+7} y2={cy} stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={cx-5} y1={cy-5} x2={cx+5} y2={cy+5} stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={cx+5} y1={cy-5} x2={cx-5} y2={cy+5} stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    ))}
  </svg>
);

// ─── Stormy ───────────────────────────────────────────────────────────────────
const Stormy = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes bolt-flash { 0%,100% { opacity:1; } 45%,55% { opacity:0.1; } 50% { opacity:1; } }
      @keyframes storm-rain { 0% { transform: translate(0,-8px); opacity:0; } 50% { opacity:1; } 100% { transform: translate(-4px,14px); opacity:0; } }
      .bolt { animation: bolt-flash 2s ease-in-out infinite; }
      .sr1 { animation: storm-rain 0.9s ease-in infinite 0s; }
      .sr2 { animation: storm-rain 0.9s ease-in infinite 0.3s; }
      .sr3 { animation: storm-rain 0.9s ease-in infinite 0.6s; }
    `}</style>
    <circle cx="44" cy="48" r="16" fill="#A78BFA" />
    <circle cx="62" cy="40" r="20" fill="#A78BFA" />
    <circle cx="82" cy="48" r="14" fill="#A78BFA" />
    <rect x="44" y="48" width="52" height="16" fill="#A78BFA" />
    <polygon className="bolt"
      points="66,64 54,82 62,82 56,100 74,76 66,76 72,64"
      fill="#FDE68A" stroke="#FBBF24" strokeWidth="1.5" strokeLinejoin="round"
    />
    <line className="sr1" x1="36" y1="72" x2="30" y2="86" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    <line className="sr2" x1="90" y1="70" x2="84" y2="84" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    <line className="sr3" x1="44" y1="76" x2="38" y2="90" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export default WeatherIcon;