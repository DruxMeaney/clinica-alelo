"use client";
import { useState } from "react";

// SLC16A11 (T2D) — risk allele frequencies by population (SIGMA 2014 + gnomAD)
const DATA_GENOMICA = [
  { pop: "Mx indígena", shortPop: "Ind.", freq: 0.48, color: "#8b2fa0", desc: "SLC16A11 — Frecuencia más alta globalmente (SIGMA Consortium 2014, Nature 506:97)." },
  { pop: "Mx mestizo",  shortPop: "Mx.",  freq: 0.30, color: "#7c3aed", desc: "SLC16A11 — Frecuencia elevada respecto a poblaciones europeas." },
  { pop: "Latinoamérica",shortPop:"LA.",  freq: 0.20, color: "#e11d73", desc: "SLC16A11 — Varía según proporción de ancestría indígena." },
  { pop: "Asia Este",   shortPop: "EA.",  freq: 0.11, color: "#0ea5e9", desc: "SLC16A11 — Presente en poblaciones del este asiático." },
  { pop: "Europa",      shortPop: "EU.",  freq: 0.02, color: "#059669", desc: "SLC16A11 — Frecuencia muy baja en europeos." },
  { pop: "África",      shortPop: "AF.",  freq: 0.01, color: "#f59e0b", desc: "SLC16A11 — Casi ausente en africanos subsaharianos." },
];

// MTHFR C677T allele T frequencies — gnomAD + literatura
const DATA_TRASLACIONAL = [
  { pop: "México",       shortPop: "Mx.",  freq: 0.52, color: "#8b2fa0", desc: "MTHFR C677T — Alta prevalencia en México. Relevante para suplementación con folato." },
  { pop: "Europa Sur",  shortPop: "ES.",  freq: 0.47, color: "#e11d73", desc: "MTHFR C677T — Alta en mediterráneos (Italia, España, Grecia)." },
  { pop: "China",        shortPop: "CN.", freq: 0.38, color: "#0ea5e9", desc: "MTHFR C677T — Frecuencia moderada-alta en chinos Han." },
  { pop: "Europa Norte", shortPop: "EN.", freq: 0.30, color: "#7c3aed", desc: "MTHFR C677T — Moderada en norte de Europa." },
  { pop: "Asia Sur",    shortPop: "SA.",  freq: 0.18, color: "#6366f1", desc: "MTHFR C677T — Moderada en india / Asia del sur." },
  { pop: "África",       shortPop: "AF.", freq: 0.10, color: "#059669", desc: "MTHFR C677T — Baja en África subsahariana." },
];

interface Props {
  variant: "genomica" | "traslacional";
}

export default function PopulationBubbleViz({ variant }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const data   = variant === "genomica" ? DATA_GENOMICA : DATA_TRASLACIONAL;
  const gene   = variant === "genomica" ? "SLC16A11 · T2D" : "MTHFR C677T · folato";
  const W = 270, H = 120, maxR = 28;

  return (
    <div className="relative mt-4">
      {/* Mini header */}
      <div className="text-xs text-gray-400 mb-2 font-medium tracking-wide">
        Frecuencias alélicas — {gene}
      </div>

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
        {data.map((d, i) => {
          const x   = 22 + i * 44;
          const r   = d.freq * maxR;
          const cy  = H - 22 - r;
          const isH = hovered === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Bubble */}
              <circle
                cx={x} cy={cy}
                r={isH ? r + 3 : r}
                fill={d.color}
                opacity={isH ? 0.8 : 0.45}
                style={{ transition: "r 0.15s ease, opacity 0.15s ease" }}
              />
              {/* Percent label */}
              <text
                x={x} y={H - 8}
                textAnchor="middle"
                fontSize="7.5"
                fill={d.color}
                fontWeight={isH ? "700" : "400"}
                opacity={isH ? 1 : 0.75}
              >
                {Math.round(d.freq * 100)}%
              </text>
              {/* Short pop label */}
              <text
                x={x} y={H + 5}
                textAnchor="middle"
                fontSize="7"
                fill={d.color}
                opacity="0.55"
              >
                {d.shortPop}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered !== null && (
        <div className="absolute top-6 left-0 pointer-events-none z-20 w-52">
          <div
            className="rounded-xl px-3 py-2 text-xs shadow-xl"
            style={{ background: "#0a0818", border: `1px solid ${data[hovered].color}50` }}
          >
            <div className="font-bold mb-0.5" style={{ color: data[hovered].color }}>
              {data[hovered].pop}
            </div>
            <div className="text-white font-semibold mb-0.5">
              Frecuencia: {Math.round(data[hovered].freq * 100)}%
            </div>
            <div className="text-gray-400 leading-relaxed">
              {data[hovered].desc}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
