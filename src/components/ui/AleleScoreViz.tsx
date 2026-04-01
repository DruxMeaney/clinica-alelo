"use client";
import { useState, useEffect } from "react";

const MODULES = [
  { abbr: "Peso",    name: "Regulación del peso y obesidad",        score: 0.72, color: "#a855c7" },
  { abbr: "DT2",     name: "Diabetes tipo 2",                       score: 0.65, color: "#7c3aed" },
  { abbr: "Deporte", name: "Rendimiento deportivo",                  score: 0.81, color: "#e11d73" },
  { abbr: "Cardio",  name: "Salud cardiovascular",                   score: 0.68, color: "#dc2670" },
  { abbr: "Nutri",   name: "Nutrigenómica y micronutrientes",        score: 0.74, color: "#8b5cf6" },
  { abbr: "Farma",   name: "Farmacogenética",                        score: 0.58, color: "#6366f1" },
  { abbr: "Bienestar",name: "Tendencias de bienestar y salud general",score: 0.77,color: "#f59e0b" },
];

export default function AleleScoreViz() {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 1400;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    const tid = setTimeout(() => { raf = requestAnimationFrame(animate); }, 400);
    return () => { clearTimeout(tid); cancelAnimationFrame(raf); };
  }, []);

  const cx = 115, cy = 115, maxR = 82;
  const n = MODULES.length;

  const getXY = (i: number, r: number) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  };

  const polygonPts = MODULES.map((m, i) =>
    getXY(i, m.score * progress * maxR)
  ).map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <div className="relative inline-block">
      <svg width={230} height={230} viewBox="0 0 230 230">
        <defs>
          <radialGradient id="scoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#8b2fa0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Background web rings */}
        {[0.25, 0.5, 0.75, 1].map((lvl) => {
          const pts = MODULES.map((_, i) => getXY(i, lvl * maxR))
            .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
          return (
            <polygon
              key={lvl}
              points={pts}
              fill="none"
              stroke="rgba(139,47,160,0.12)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Axis spokes */}
        {MODULES.map((_, i) => {
          const outer = getXY(i, maxR);
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={outer.x} y2={outer.y}
              stroke="rgba(139,47,160,0.18)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Score polygon fill */}
        <polygon
          points={polygonPts}
          fill="url(#scoreGrad)"
          stroke="#8b2fa0"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Vertex dots + labels */}
        {MODULES.map((m, i) => {
          const labelPt  = getXY(i, maxR + 18);
          const scorePt  = getXY(i, m.score * progress * maxR);
          const isHov    = hovered === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer ring on hover */}
              {isHov && (
                <circle
                  cx={scorePt.x} cy={scorePt.y}
                  r={9} fill={m.color} opacity="0.18"
                />
              )}
              {/* Score dot */}
              <circle
                cx={scorePt.x} cy={scorePt.y}
                r={isHov ? 5.5 : 3.5}
                fill={m.color}
                opacity={isHov ? 1 : 0.85}
                style={{ transition: "r 0.15s ease" }}
              />
              {/* Axis label */}
              <text
                x={labelPt.x} y={labelPt.y + 3}
                textAnchor="middle"
                fontSize={isHov ? 9.5 : 8.5}
                fontWeight={isHov ? "700" : "500"}
                fill={isHov ? m.color : "rgba(200,180,230,0.7)"}
                style={{ transition: "fill 0.15s ease" }}
              >
                {m.abbr}
              </text>
            </g>
          );
        })}

        {/* Center */}
        <circle cx={cx} cy={cy} r={5} fill="#8b2fa0" opacity="0.9" />
        <text x={cx} y={cy - 9} textAnchor="middle" fontSize="7.5" fill="rgba(200,180,230,0.45)" letterSpacing="1">
          ÍNDICE ALELO
        </text>
      </svg>

      {/* Tooltip */}
      {hovered !== null && (
        <div className="absolute top-2 right-0 pointer-events-none z-20 w-40">
          <div
            className="rounded-xl px-3 py-2 text-xs shadow-xl"
            style={{ background: "#0a0818", border: `1px solid ${MODULES[hovered].color}50` }}
          >
            <div className="font-bold mb-1" style={{ color: MODULES[hovered].color }}>
              {MODULES[hovered].name}
            </div>
            <div className="text-gray-400">
              Puntaje ejemplo:{" "}
              <span className="text-white font-semibold">
                {Math.round(MODULES[hovered].score * 100)}/100
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
