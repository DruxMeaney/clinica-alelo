"use client";
import { useState, useEffect } from "react";

// 6 axes for exercise genomics
const AXES = [
  {
    id: "velocidad",  label: "Velocidad",       gene: "ACTN3",    rsid: "rs1815739",
    desc: "α-Actinina-3 en fibras IIx. RR: máxima potencia de sprint y velocidad explosiva.",
    angle: -90,
  },
  {
    id: "fuerza",     label: "Fuerza",          gene: "ACTN3/ACE",rsid: "rs1815739 / rs4646994",
    desc: "Combinación ACTN3 RR + ACE DD: perfil de fuerza e hipertrofia muscular.",
    angle: -30,
  },
  {
    id: "resistencia",label: "Resistencia",     gene: "ACE",      rsid: "rs4646994",
    desc: "ACE II: menor actividad de ECA, mayor eficiencia cardíaca y resistencia aeróbica.",
    angle: 30,
  },
  {
    id: "vo2",        label: "VO₂ máx",         gene: "PPARGC1A", rsid: "rs8192678",
    desc: "PGC-1α Gly482Ser: biogénesis mitocondrial y capacidad oxidativa. Asociado a VO₂ máx elevado.",
    angle: 90,
  },
  {
    id: "recuperacion",label: "Recuperación",   gene: "IL6",      rsid: "rs1800795",
    desc: "IL-6 -174 G/C: modula respuesta inflamatoria post-ejercicio y velocidad de recuperación.",
    angle: 150,
  },
  {
    id: "lesiones",   label: "Prev. lesiones",  gene: "COL5A1",   rsid: "rs12722",
    desc: "Colágeno tipo V. Variante TT: mayor laxitud ligamentosa y riesgo de lesiones tendinosas.",
    angle: 210,
  },
];

// Two genotype profiles: power (potencia) vs endurance (resistencia)
const POWER_SCORES     = [0.92, 0.85, 0.42, 0.50, 0.55, 0.72];  // ACTN3 RR, ACE DD
const ENDURANCE_SCORES = [0.40, 0.50, 0.90, 0.88, 0.75, 0.58];  // ACTN3 XX, ACE II

const cx = 175, cy = 175, maxR = 120;
const toRad = (deg: number) => (deg * Math.PI) / 180;

const axisXY = (i: number, r: number) => ({
  x: cx + Math.cos(toRad(AXES[i].angle)) * r,
  y: cy + Math.sin(toRad(AXES[i].angle)) * r,
});

const polygonStr = (scores: number[]) =>
  scores.map((s, i) => {
    const p = axisXY(i, s * maxR);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");

export default function ExerciseCompass() {
  const [progress, setProgress]   = useState(0);
  const [hovered,  setHovered]    = useState<number | null>(null);
  const [profile,  setProfile]    = useState<"potencia" | "resistencia" | null>(null);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / 1400, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    const tid = setTimeout(() => { raf = requestAnimationFrame(animate); }, 300);
    return () => { clearTimeout(tid); cancelAnimationFrame(raf); };
  }, []);

  const hovAxis = hovered !== null ? AXES[hovered] : null;

  return (
    <div className="relative select-none inline-block">
      <style>{`
        @keyframes ecPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        .ec-example { animation: ecPulse 2.5s ease-in-out infinite; }
      `}</style>

      <svg width={350} height={350} viewBox="0 0 350 350">
        <defs>
          <radialGradient id="ecGlowP" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#e11d73" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e11d73" stopOpacity="0"   />
          </radialGradient>
          <radialGradient id="ecGlowE" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"   />
          </radialGradient>
        </defs>

        {/* Background web rings */}
        {[0.25, 0.5, 0.75, 1].map(lvl => {
          const pts = AXES.map((_, i) => axisXY(i, lvl * maxR)).map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
          return (
            <polygon key={lvl} points={pts} fill="none" stroke="rgba(139,47,160,0.1)" strokeWidth="0.8"
              strokeDasharray={lvl < 1 ? "2 4" : "none"} />
          );
        })}

        {/* Axis spokes */}
        {AXES.map((_, i) => {
          const outer = axisXY(i, maxR);
          const isH = hovered === i;
          return (
            <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y}
              stroke={isH ? AXES[i].gene.includes("ACTN3") ? "#e11d73" : "#0ea5e9" : "rgba(139,47,160,0.2)"}
              strokeWidth={isH ? 1.5 : 0.8}
              style={{ transition: "all 0.2s" }}
            />
          );
        })}

        {/* Glow backgrounds */}
        {(profile === "potencia" || !profile) && <circle cx={cx} cy={cy} r={maxR * 0.7} fill="url(#ecGlowP)" />}
        {(profile === "resistencia" || !profile) && <circle cx={cx} cy={cy} r={maxR * 0.7} fill="url(#ecGlowE)" />}

        {/* Endurance polygon */}
        <polygon
          points={polygonStr(ENDURANCE_SCORES.map(s => s * progress))}
          fill="rgba(14,165,233,0.12)"
          stroke="#0ea5e9"
          strokeWidth="1.8"
          strokeLinejoin="round"
          opacity={profile === "potencia" ? 0.2 : 1}
          style={{ transition: "opacity 0.3s" }}
        />

        {/* Power polygon */}
        <polygon
          points={polygonStr(POWER_SCORES.map(s => s * progress))}
          fill="rgba(225,29,115,0.12)"
          stroke="#e11d73"
          strokeWidth="1.8"
          strokeLinejoin="round"
          opacity={profile === "resistencia" ? 0.2 : 1}
          style={{ transition: "opacity 0.3s" }}
        />

        {/* Example "patient" polygon — oscillates between both */}
        <polygon
          className="ec-example"
          points={polygonStr(AXES.map((_, i) => ((POWER_SCORES[i] + ENDURANCE_SCORES[i]) / 2 + (i % 2 === 0 ? 0.08 : -0.06)) * progress))}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeLinejoin="round"
        />

        {/* Axis labels + dots */}
        {AXES.map((ax, i) => {
          const outer  = axisXY(i, maxR);
          const labelR = maxR + 24;
          const lp     = axisXY(i, labelR);
          const isH    = hovered === i;
          const pDot   = axisXY(i, POWER_SCORES[i]     * progress * maxR);
          const eDot   = axisXY(i, ENDURANCE_SCORES[i] * progress * maxR);

          return (
            <g key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Hover hit area */}
              <circle cx={outer.x} cy={outer.y} r={14} fill="transparent" />

              {/* Axis end marker */}
              <circle cx={outer.x} cy={outer.y} r={isH ? 5 : 3.5}
                fill={isH ? "#c084fc" : "rgba(139,47,160,0.5)"}
                style={{ transition: "all 0.2s" }}
              />

              {/* Power dot */}
              <circle cx={pDot.x} cy={pDot.y} r={isH ? 5 : 3.5}
                fill="#e11d73" opacity={profile === "resistencia" ? 0.2 : (isH ? 1 : 0.8)}
                style={{ transition: "all 0.2s" }}
              />
              {/* Endurance dot */}
              <circle cx={eDot.x} cy={eDot.y} r={isH ? 5 : 3.5}
                fill="#0ea5e9" opacity={profile === "potencia" ? 0.2 : (isH ? 1 : 0.8)}
                style={{ transition: "all 0.2s" }}
              />

              {/* Label */}
              <text x={lp.x} y={lp.y + 3} textAnchor="middle"
                fontSize={isH ? 10 : 8.5} fontWeight={isH ? "700" : "500"}
                fill={isH ? "#c084fc" : "rgba(200,180,230,0.75)"}
                style={{ transition: "all 0.2s" }}
              >
                {ax.label}
              </text>
              {/* Gene mini label */}
              <text x={lp.x} y={lp.y + 14} textAnchor="middle"
                fontSize="7" fill={isH ? "#a78bfa" : "rgba(139,47,160,0.5)"}
                style={{ transition: "all 0.2s" }}
              >
                {ax.gene}
              </text>
            </g>
          );
        })}

        {/* Center */}
        <circle cx={cx} cy={cy} r={6} fill="#8b2fa0" opacity="0.8" />
      </svg>

      {/* Profile toggle buttons */}
      <div className="flex gap-2 justify-center mt-1 mb-2">
        {(["potencia", "resistencia", null] as const).map((p) => (
          <button
            key={String(p)}
            onClick={() => setProfile(p)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              background: profile === p
                ? p === "potencia" ? "#e11d7330" : p === "resistencia" ? "#0ea5e930" : "#8b2fa030"
                : "transparent",
              border: `1px solid ${profile === p
                ? p === "potencia" ? "#e11d73" : p === "resistencia" ? "#0ea5e9" : "#8b2fa0"
                : "rgba(139,47,160,0.3)"}`,
              color: profile === p
                ? p === "potencia" ? "#e11d73" : p === "resistencia" ? "#0ea5e9" : "#c084fc"
                : "rgba(200,180,230,0.6)",
            }}
          >
            {p === null ? "Ambos perfiles" : p === "potencia" ? "● Potencia" : "● Resistencia"}
          </button>
        ))}
      </div>

      {/* Axis tooltip */}
      {hovAxis && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-64">
          <div className="rounded-xl px-4 py-2.5 text-xs shadow-2xl"
            style={{ background: "#0a0818", border: "1px solid rgba(139,47,160,0.4)" }}
          >
            <div className="font-bold text-purple-300 mb-0.5">{hovAxis.label} — {hovAxis.gene}</div>
            <div className="text-gray-500 font-mono mb-1 text-[10px]">{hovAxis.rsid}</div>
            <div className="text-gray-300 leading-relaxed">{hovAxis.desc}</div>
            <div className="mt-2 flex gap-3 text-[10px]">
              <span style={{ color: "#e11d73" }}>● Potencia: {Math.round(POWER_SCORES[AXES.indexOf(hovAxis)] * 100)}%</span>
              <span style={{ color: "#0ea5e9" }}>● Resistencia: {Math.round(ENDURANCE_SCORES[AXES.indexOf(hovAxis)] * 100)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
