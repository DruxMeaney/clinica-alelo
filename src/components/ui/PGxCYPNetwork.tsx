"use client";
import { useState } from "react";

// CYP enzymes — inner ring
const ENZYMES = [
  {
    id: "cyp2c19", name: "CYP2C19", angle: -90,
    variant: "rs4244285 (*2)", color: "#e11d73",
    pct: "~15% fármacos prescritos",
    drugs: ["Clopidogrel", "Omeprazol", "Antidepresivos ISRS", "Voriconazol"],
    phenotypes: "PM: Sin activación de clopidogrel → riesgo trombótico elevado",
  },
  {
    id: "cyp2d6", name: "CYP2D6", angle: -18,
    variant: "rs3892097 (*4)", color: "#8b2fa0",
    pct: "~25% fármacos prescritos",
    drugs: ["Codeína", "Tamoxifeno", "Haloperidol", "Metoprolol", "Antidepresivos TCA"],
    phenotypes: "UM: Sobredosis de morfina por codeína. PM: Tamoxifeno ineficaz en cáncer de mama",
  },
  {
    id: "cyp2c9", name: "CYP2C9", angle: 54,
    variant: "rs1799853 (*2)", color: "#7c3aed",
    pct: "~15% fármacos prescritos",
    drugs: ["Warfarina", "AINEs (ibuprofeno)", "Fenitoína", "Losartán"],
    phenotypes: "PM: Toxicidad por warfarina — riesgo hemorrágico severo",
  },
  {
    id: "cyp3a4", name: "CYP3A4", angle: 126,
    variant: "rs2740574 (*1B)", color: "#059669",
    pct: "~50% fármacos prescritos",
    drugs: ["Estatinas", "Inmunosupresores", "Antifúngicos", "Bloqueadores Ca²⁺"],
    phenotypes: "Modula concentraciones plasmáticas de la mayoría de los fármacos",
  },
  {
    id: "cyp1a2", name: "CYP1A2", angle: 198,
    variant: "rs762551 (*1F)", color: "#0ea5e9",
    pct: "~10% fármacos prescritos",
    drugs: ["Cafeína", "Clozapina", "Teofilina", "Ciprofloxacino"],
    phenotypes: "UM: Tolerancia elevada a cafeína. PM: Acumulación de clozapina",
  },
];

// Drug class nodes — outer ring
const DRUG_NODES = [
  { label: "Antiplaquetario",   angle: -110, color: "#e11d73", enzymes: ["cyp2c19"]            },
  { label: "Anticoagulante",    angle: -50,  color: "#7c3aed", enzymes: ["cyp2c9"]             },
  { label: "Antidepresivos",    angle: 10,   color: "#8b2fa0", enzymes: ["cyp2d6", "cyp2c19"]  },
  { label: "Analgésicos",       angle: 65,   color: "#f59e0b", enzymes: ["cyp2d6"]             },
  { label: "Estatinas",         angle: 115,  color: "#059669", enzymes: ["cyp3a4", "cyp2c9"]   },
  { label: "Cafeína / Estimul.",angle: 170,  color: "#0ea5e9", enzymes: ["cyp1a2"]             },
  { label: "Antipsicóticos",    angle: 220,  color: "#8b2fa0", enzymes: ["cyp2d6", "cyp1a2"]   },
  { label: "Inmunosupresores",  angle: 265,  color: "#059669", enzymes: ["cyp3a4"]             },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;
const cx = 200, cy = 200;
const innerR = 90, outerR = 165;

const enzymePos = (e: typeof ENZYMES[0]) => ({
  x: cx + Math.cos(toRad(e.angle)) * innerR,
  y: cy + Math.sin(toRad(e.angle)) * innerR,
});
const drugPos = (d: typeof DRUG_NODES[0]) => ({
  x: cx + Math.cos(toRad(d.angle)) * outerR,
  y: cy + Math.sin(toRad(d.angle)) * outerR,
});

export default function PGxCYPNetwork() {
  const [hoveredEnzyme, setHoveredEnzyme] = useState<string | null>(null);
  const [hoveredDrug,   setHoveredDrug]   = useState<number | null>(null);

  const activeEnzyme = ENZYMES.find(e => e.id === hoveredEnzyme) ?? null;
  const activeDrug   = hoveredDrug !== null ? DRUG_NODES[hoveredDrug] : null;

  // Which enzyme IDs are highlighted
  const highlightedEnzymes = new Set<string>(
    hoveredEnzyme ? [hoveredEnzyme] :
    activeDrug    ? activeDrug.enzymes :
    []
  );
  // Which drug indices are highlighted
  const highlightedDrugs = new Set<number>(
    hoveredEnzyme
      ? DRUG_NODES.map((d, i) => d.enzymes.includes(hoveredEnzyme) ? i : -1).filter(i => i >= 0)
      : hoveredDrug !== null ? [hoveredDrug] : []
  );

  return (
    <div className="relative inline-block select-none">
      <style>{`
        @keyframes pgxPulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1; }
        }
        @keyframes pgxSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .pgx-ring {
          transform-origin: 200px 200px;
          animation: pgxSpin 40s linear infinite;
        }
      `}</style>

      <svg width={400} height={400} viewBox="0 0 400 400">
        <defs>
          <radialGradient id="pgxGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#8b2fa0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b2fa0" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* Background rings */}
        <circle cx={cx} cy={cy} r={innerR}  fill="none" stroke="#8b2fa015" strokeWidth="1" strokeDasharray="3 5" className="pgx-ring" />
        <circle cx={cx} cy={cy} r={outerR}  fill="none" stroke="#8b2fa010" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx={cx} cy={cy} r={60}      fill="url(#pgxGlow)" />

        {/* Connection lines: drug → enzyme */}
        {DRUG_NODES.map((drug, di) =>
          drug.enzymes.map((eid) => {
            const ep = enzymePos(ENZYMES.find(e => e.id === eid)!);
            const dp = drugPos(drug);
            const isHighlight = highlightedEnzymes.has(eid) || highlightedDrugs.has(di);
            return (
              <line
                key={`${di}-${eid}`}
                x1={dp.x} y1={dp.y} x2={ep.x} y2={ep.y}
                stroke={drug.color}
                strokeWidth={isHighlight ? 1.8 : 0.7}
                opacity={isHighlight ? 0.65 : 0.12}
                strokeDasharray={isHighlight ? "none" : "3 4"}
                style={{ transition: "all 0.2s" }}
              />
            );
          })
        )}

        {/* Drug nodes — outer ring */}
        {DRUG_NODES.map((drug, di) => {
          const p = drugPos(drug);
          const isH = highlightedDrugs.has(di);
          // Label offset outward
          const lx = cx + Math.cos(toRad(drug.angle)) * (outerR + 22);
          const ly = cy + Math.sin(toRad(drug.angle)) * (outerR + 22);
          return (
            <g
              key={di}
              onMouseEnter={() => setHoveredDrug(di)}
              onMouseLeave={() => setHoveredDrug(null)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={p.x} cy={p.y} r={isH ? 14 : 9} fill={drug.color} opacity={isH ? 0.2 : 0.1} style={{ transition: "all 0.2s" }} />
              <circle cx={p.x} cy={p.y} r={isH ? 6 : 4}  fill={drug.color} opacity={isH ? 1 : 0.65} style={{ transition: "all 0.2s" }} />
              <text
                x={lx} y={ly + 3}
                textAnchor="middle" fontSize={isH ? 8.5 : 7.5}
                fontWeight={isH ? "700" : "400"}
                fill={drug.color} opacity={isH ? 1 : 0.7}
                style={{ transition: "all 0.2s" }}
              >
                {drug.label}
              </text>
            </g>
          );
        })}

        {/* Enzyme nodes — inner ring */}
        {ENZYMES.map((enz) => {
          const p = enzymePos(enz);
          const isH = highlightedEnzymes.has(enz.id);
          return (
            <g
              key={enz.id}
              onMouseEnter={() => setHoveredEnzyme(enz.id)}
              onMouseLeave={() => setHoveredEnzyme(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer glow */}
              <circle cx={p.x} cy={p.y} r={isH ? 22 : 16} fill={enz.color} opacity={isH ? 0.2 : 0.1} style={{ transition: "all 0.2s" }} />
              {/* Core */}
              <circle cx={p.x} cy={p.y} r={isH ? 9 : 7} fill={enz.color} opacity={isH ? 1 : 0.8} style={{ transition: "all 0.2s" }} />
              {/* Name */}
              <text
                x={p.x} y={p.y + (p.y > cy ? 24 : -14)}
                textAnchor="middle" fontSize={isH ? 10 : 8.5}
                fontWeight="700" fill={enz.color} opacity={isH ? 1 : 0.85}
              >
                {enz.name}
              </text>
            </g>
          );
        })}

        {/* Center label */}
        <circle cx={cx} cy={cy} r={28} fill="#0a0818" stroke="#8b2fa030" strokeWidth="1" />
        <text x={cx} y={cy - 5}  textAnchor="middle" fontSize="8" fontWeight="700" fill="#c084fc">CYP</text>
        <text x={cx} y={cy + 7}  textAnchor="middle" fontSize="7" fill="#9ca3af">Enzimas</text>
        <text x={cx} y={cy + 17} textAnchor="middle" fontSize="6.5" fill="#6b7280">P450</text>
      </svg>

      {/* Info panel */}
      {(activeEnzyme || activeDrug) && (
        <div
          className="absolute top-0 left-full ml-4 pointer-events-none z-20 w-56"
          style={{ minWidth: 210 }}
        >
          <div className="rounded-2xl px-4 py-3 text-xs shadow-2xl"
            style={{ background: "#0a0818", border: `1px solid ${(activeEnzyme?.color ?? activeDrug?.color ?? "#8b2fa0")}45` }}
          >
            {activeEnzyme && (
              <>
                <div className="font-bold text-sm mb-1" style={{ color: activeEnzyme.color }}>{activeEnzyme.name}</div>
                <div className="text-gray-500 mb-1 font-mono text-[10px]">{activeEnzyme.variant}</div>
                <div className="text-gray-400 mb-2">Metaboliza {activeEnzyme.pct}</div>
                <div className="font-semibold text-gray-300 mb-1">Fármacos clave:</div>
                <ul className="space-y-0.5 mb-2">
                  {activeEnzyme.drugs.map(d => (
                    <li key={d} className="text-gray-400 flex gap-1">
                      <span style={{ color: activeEnzyme.color }}>·</span>{d}
                    </li>
                  ))}
                </ul>
                <div className="text-gray-500 leading-relaxed text-[10px] border-t border-white/5 pt-2">{activeEnzyme.phenotypes}</div>
              </>
            )}
            {activeDrug && !activeEnzyme && (
              <>
                <div className="font-bold text-sm mb-2" style={{ color: activeDrug.color }}>{activeDrug.label}</div>
                <div className="text-gray-400 mb-1">Enzimas involucradas:</div>
                {activeDrug.enzymes.map(eid => {
                  const enz = ENZYMES.find(e => e.id === eid)!;
                  return (
                    <div key={eid} className="flex items-center gap-1.5 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: enz.color }} />
                      <span style={{ color: enz.color }} className="font-semibold">{enz.name}</span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
