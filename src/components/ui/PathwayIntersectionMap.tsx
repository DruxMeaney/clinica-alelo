"use client";
import { useState } from "react";

/* ─── Intersection data ──────────────────────────────────────────────────── */
const INTERSECTIONS = [
  {
    id: "cyp-lipid",
    label: "SLCO1B1 · CYP3A4",
    sublabel: "Farmacogenómica lipídica",
    color: "#8b2fa0",
    from: "cyp450",
    to: "lipid",
    title: "La intersección farmacogenómica-lipídica",
    body: "Las estatinas (simvastatina, atorvastatina) son metabolizadas por CYP3A4 y transportadas activamente al hepatocito por SLCO1B1. Una variante en SLCO1B1*5 (rs4149056) aumenta el riesgo de miopatía por estatinas hasta 5x. CYP2C9 también metaboliza fluvastatin. Esta intersección convierte la farmacogenómica en herramienta indispensable para la prescripción lipídica segura y eficaz.",
    genes: ["CYP3A4", "SLCO1B1", "CYP2C9", "ABCB1"],
    clinical: "CPIC A: ajuste de estatina según genotipo SLCO1B1 antes de prescribir simvastatina",
    modules: ["M6 Farmacogenética", "M4 Cardiovascular"],
  },
  {
    id: "cyp-folate",
    label: "Metotrexato · antifolatos",
    sublabel: "CYP y metabolismo de folatos",
    color: "#7c3aed",
    from: "cyp450",
    to: "folate",
    title: "La intersección farmacogenómica-nutricional",
    body: "El metotrexato y otros antifolatos inhiben DHFR (dihidrofolato reductasa), interfiriendo directamente con el ciclo del folato. Su toxicidad es modulada por variantes en MTHFR (C677T reduce el folato disponible, amplificando la toxicidad), y su eliminación renal y biliar involucra transportadores ABCC2 y SLC22A8. Pacientes con TT en MTHFR tienen mayor riesgo de toxicidad por metotrexato.",
    genes: ["MTHFR", "DHFR", "ABCC2", "SLC22A8"],
    clinical: "Ajuste de dosis de metotrexato según genotipo MTHFR C677T en artritis reumatoide y psoriasis",
    modules: ["M6 Farmacogenética", "M5 Nutrigenómica"],
  },
  {
    id: "lipid-folate",
    label: "Hiperhomocisteinemia → riesgo CV",
    sublabel: "Puente metabólico-vascular",
    color: "#e11d73",
    from: "lipid",
    to: "folate",
    title: "La intersección metabólico-vascular",
    body: "La hiperhomocisteinemia (elevación de homocisteína plasmática, frecuente en genotipos TT de MTHFR) produce daño endotelial, disfunción del NO endotelial (NOS3) y activación pro-aterogénica. Este mecanismo conecta el ciclo del folato con el riesgo cardiovascular independientemente del colesterol LDL. La corrección con L-metilfolato + B12 puede reducir la homocisteína hasta un 25-30%.",
    genes: ["MTHFR", "MTR", "NOS3", "CBS"],
    clinical: "Suplementación con L-metilfolato en TT MTHFR como intervención primaria de riesgo vascular",
    modules: ["M5 Nutrigenómica", "M4 Cardiovascular"],
  },
];

/* ─── SVG geometry ─────────────────────────────────────────────────────────
   Triangle vertices (viewBox 600×400):
   CYP450  → top center  (300, 65)
   Lipídico → bottom-left (90, 340)
   Folato  → bottom-right (510, 340)
*/
const NODES = {
  cyp450: { cx: 300, cy: 65,  r: 52, color: "#8b2fa0", label: "Sistema CYP450",      sub: "Farmacogenómica" },
  lipid:  { cx: 90,  cy: 340, r: 52, color: "#e11d73", label: "Metabolismo lipídico", sub: "Riesgo CV"        },
  folate: { cx: 510, cy: 340, r: 52, color: "#059669", label: "Ciclo del folato",     sub: "Nutrigenómica"    },
};

/* Edge midpoints for interaction gates */
function edgeMidpoint(a: { cx: number; cy: number }, b: { cx: number; cy: number }) {
  return { x: (a.cx + b.cx) / 2, y: (a.cy + b.cy) / 2 };
}

const GATE_POSITIONS: Record<string, { x: number; y: number }> = {
  "cyp-lipid":  edgeMidpoint(NODES.cyp450, NODES.lipid),   // ≈ (195, 202)
  "cyp-folate": edgeMidpoint(NODES.cyp450, NODES.folate),  // ≈ (405, 202)
  "lipid-folate": edgeMidpoint(NODES.lipid, NODES.folate), // ≈ (300, 340)
};

/* Edge line endpoint (stop at node edge) */
function lineEndpoint(
  from: { cx: number; cy: number; r: number },
  to: { cx: number; cy: number; r: number },
  fromSide: boolean
) {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const node = fromSide ? from : to;
  const sign = fromSide ? 1 : -1;
  return { x: node.cx + sign * ux * (node.r + 4), y: node.cy + sign * uy * (node.r + 4) };
}

export default function PathwayIntersectionMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const selectedData = INTERSECTIONS.find((i) => i.id === selected);

  const toggleSelected = (id: string) =>
    setSelected((prev) => (prev === id ? null : id));

  /* compute edge endpoints */
  const edges = [
    { id: "cyp-lipid",   from: NODES.cyp450, to: NODES.lipid   },
    { id: "cyp-folate",  from: NODES.cyp450, to: NODES.folate  },
    { id: "lipid-folate",from: NODES.lipid,  to: NODES.folate  },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl overflow-hidden" style={{ background: "#080514", border: "1px solid rgba(255,255,255,0.06)" }}>
        <svg
          viewBox="0 0 600 410"
          className="w-full"
          style={{ maxHeight: "420px" }}
          aria-label="Mapa de intersección entre las tres vías metabólicas del panel Alelo"
        >
          <defs>
            <marker id="pim-arr" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
              <polygon points="0 0, 6 2.5, 0 5" fill="#4b5563" />
            </marker>
            {Object.entries(NODES).map(([id, n]) => (
              <radialGradient key={id} id={`pim-glow-${id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={n.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* Central label */}
          <text x="300" y="200" textAnchor="middle" fill="rgba(255,255,255,0.06)" fontSize="64" fontWeight="900" letterSpacing="-2">
            ALELO
          </text>

          {/* Edge lines */}
          {edges.map((e) => {
            const s = lineEndpoint(e.from as { cx: number; cy: number; r: number }, e.to as { cx: number; cy: number; r: number }, true);
            const t = lineEndpoint(e.from as { cx: number; cy: number; r: number }, e.to as { cx: number; cy: number; r: number }, false);
            const isActive = selected === e.id || hovered === e.id;
            const iData = INTERSECTIONS.find((i) => i.id === e.id)!;
            return (
              <line
                key={e.id}
                x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={isActive ? iData.color : "rgba(255,255,255,0.08)"}
                strokeWidth={isActive ? 2 : 1.5}
                strokeDasharray={isActive ? "none" : "5,4"}
                style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
              />
            );
          })}

          {/* Main pathway nodes */}
          {Object.entries(NODES).map(([id, n]) => {
            const isRelated =
              selected && INTERSECTIONS.find((i) => i.id === selected && (i.from === id || i.to === id));
            return (
              <g key={id}>
                {/* Glow */}
                <circle cx={n.cx} cy={n.cy} r={n.r + 24}
                  fill={`url(#pim-glow-${id})`}
                  opacity={isRelated ? 1 : 0.4}
                  style={{ transition: "opacity 0.3s" }}
                />
                {/* Main circle */}
                <circle cx={n.cx} cy={n.cy} r={n.r}
                  fill="#0d0920"
                  stroke={n.color}
                  strokeWidth={isRelated ? 2 : 1.5}
                  style={{ transition: "stroke-width 0.3s" }}
                />
                {/* Label */}
                <text x={n.cx} y={n.cy - 5} textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
                  {n.label.split(" ")[0]}
                </text>
                <text x={n.cx} y={n.cy + 7} textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
                  {n.label.split(" ").slice(1).join(" ")}
                </text>
                <text x={n.cx} y={n.cy + 20} textAnchor="middle" fill={n.color} fontSize="7.5" fontWeight="600">
                  {n.sub}
                </text>
              </g>
            );
          })}

          {/* Intersection gate buttons */}
          {INTERSECTIONS.map((inter) => {
            const gp = GATE_POSITIONS[inter.id];
            const isHov = hovered === inter.id;
            const isSel = selected === inter.id;
            const isActive = isHov || isSel;
            const offsetY = inter.id === "lipid-folate" ? 22 : 0;

            return (
              <g
                key={inter.id}
                role="button"
                tabIndex={0}
                aria-label={`Intersección: ${inter.label}`}
                onClick={() => toggleSelected(inter.id)}
                onKeyDown={(e) => e.key === "Enter" && toggleSelected(inter.id)}
                onMouseEnter={() => setHovered(inter.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Gate background pill */}
                <rect
                  x={gp.x - 55} y={gp.y + offsetY - 16}
                  width={110} height={32}
                  rx={16}
                  fill={isActive ? inter.color : "#131028"}
                  stroke={inter.color}
                  strokeWidth={isActive ? 0 : 1}
                  fillOpacity={isActive ? 0.9 : 1}
                  style={{ transition: "fill 0.25s, fill-opacity 0.25s" }}
                />
                {/* Label */}
                <text
                  x={gp.x} y={gp.y + offsetY - 3}
                  textAnchor="middle"
                  fill={isActive ? "white" : inter.color}
                  fontSize="6.5"
                  fontWeight="700"
                  style={{ transition: "fill 0.25s" }}
                >
                  {inter.label}
                </text>
                <text
                  x={gp.x} y={gp.y + offsetY + 8}
                  textAnchor="middle"
                  fill={isActive ? "rgba(255,255,255,0.75)" : "#9ca3af"}
                  fontSize="5.5"
                  style={{ transition: "fill 0.25s" }}
                >
                  {inter.sublabel}
                </text>
                {/* Expand indicator */}
                <text
                  x={gp.x + 48} y={gp.y + offsetY - 1}
                  textAnchor="middle"
                  fill={isActive ? "white" : inter.color}
                  fontSize="10"
                >
                  {isSel ? "−" : "+"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {selectedData && (
        <div
          className="rounded-2xl p-6 space-y-4 transition-all"
          style={{ background: "#0d0920", border: `1px solid ${selectedData.color}40` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedData.modules.map((m) => (
                  <span key={m} className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${selectedData.color}20`, color: selectedData.color }}>
                    {m}
                  </span>
                ))}
              </div>
              <h4 className="text-white font-bold text-base">{selectedData.title}</h4>
            </div>
            <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors flex-shrink-0 text-lg leading-none">✕</button>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{selectedData.body}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Genes involucrados */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Genes en la intersección</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedData.genes.map((g) => (
                  <span key={g} className="text-xs font-mono px-2.5 py-1 rounded"
                    style={{ backgroundColor: `${selectedData.color}18`, color: selectedData.color }}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
            {/* Clinical consequence */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Implicación clínica</p>
              <p className="text-sm text-gray-300 leading-relaxed"
                style={{ borderLeft: `2px solid ${selectedData.color}`, paddingLeft: "10px" }}>
                {selectedData.clinical}
              </p>
            </div>
          </div>
        </div>
      )}

      {!selected && (
        <p className="text-center text-xs text-gray-600">
          Haz clic en cualquiera de los tres puntos de intersección para explorar la convergencia clínica
        </p>
      )}
    </div>
  );
}
