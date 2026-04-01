"use client";
import { useState } from "react";

// Three columns: Nutrientes → Genes → Fenotipos clínicos
const NUTRIENTS = [
  { id: "folate",   label: "Folato / B9",   color: "#8b2fa0", y: 40  },
  { id: "vitd",     label: "Vitamina D",    color: "#f59e0b", y: 95  },
  { id: "omega3",   label: "Ácidos grasos ω-3", color: "#0ea5e9", y: 150 },
  { id: "caffeine", label: "Cafeína",       color: "#6366f1", y: 205 },
  { id: "lactose",  label: "Lactosa",       color: "#10b981", y: 260 },
  { id: "iron",     label: "Hierro",        color: "#dc2626", y: 315 },
];

const GENES = [
  { id: "mthfr",  label: "MTHFR",   rsid: "rs1801133", color: "#8b2fa0", y: 55,  nutrients: ["folate"],            phenotypes: ["homocys", "neural"] },
  { id: "vdr",    label: "VDR",     rsid: "rs2228570", color: "#f59e0b", y: 120, nutrients: ["vitd"],              phenotypes: ["bone",   "immune"] },
  { id: "pparg",  label: "PPARG",   rsid: "rs1801282", color: "#0ea5e9", y: 180, nutrients: ["omega3", "folate"],  phenotypes: ["adipo",  "insulin"] },
  { id: "cyp1a2", label: "CYP1A2",  rsid: "rs762551",  color: "#6366f1", y: 235, nutrients: ["caffeine"],          phenotypes: ["stimul"] },
  { id: "lct",    label: "LCT",     rsid: "rs4988235", color: "#10b981", y: 285, nutrients: ["lactose"],           phenotypes: ["gi"] },
  { id: "hfe",    label: "HFE",     rsid: "rs1800562", color: "#dc2626", y: 330, nutrients: ["iron"],              phenotypes: ["iron_ov"] },
];

const PHENOTYPES = [
  { id: "homocys", label: "Hiperhomocisteinemia",    color: "#8b2fa0", y: 40,  genes: ["mthfr"],          desc: "↑ Homocisteína → riesgo cardiovascular, defectos del tubo neural" },
  { id: "neural",  label: "Defecto tubo neural",     color: "#c026d3", y: 90,  genes: ["mthfr"],          desc: "MTHFR C677T: requerimiento elevado de folato activo en embarazo" },
  { id: "bone",    label: "Densidad ósea",           color: "#f59e0b", y: 145, genes: ["vdr"],            desc: "Variantes VDR modulan absorción intestinal de Ca²⁺ y remodelado óseo" },
  { id: "immune",  label: "Respuesta inmune",        color: "#fb923c", y: 195, genes: ["vdr"],            desc: "VDR regula genes de inflamación y diferenciación de linfocitos T" },
  { id: "adipo",   label: "Adipogénesis",            color: "#0ea5e9", y: 245, genes: ["pparg"],          desc: "PPARγ Pro12Ala: menor adipogénesis, mejora sensibilidad a insulina" },
  { id: "insulin", label: "Sensibilidad insulínica", color: "#38bdf8", y: 295, genes: ["pparg", "mthfr"], desc: "PPARG y estado de metilación (MTHFR) convergen en resistencia a insulina" },
  { id: "stimul",  label: "Sensibilidad cafeína",    color: "#6366f1", y: 330, genes: ["cyp1a2"],         desc: "CYP1A2 *1F/*1F: metabolizador rápido — mayor tolerancia y rendimiento" },
  { id: "gi",      label: "Intolerancia a lactosa",  color: "#10b981", y: 355, genes: ["lct"],            desc: "LCT -13910 C/C: persistencia de lactasa ausente — síntomas GI" },
  { id: "iron_ov", label: "Sobrecarga de hierro",    color: "#dc2626", y: 385, genes: ["hfe"],            desc: "HFE C282Y: hemocromatosis hereditaria — acumulación hepática de hierro" },
];

const W = 580, H = 420;
const COL = { n: 80, g: 280, p: 480 };  // x center of each column

// Build arc path between two y positions, from column A to column B
function arc(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

export default function NutriGeneFlow() {
  const [hovered, setHovered] = useState<{ type: "nutrient"|"gene"|"phenotype", id: string } | null>(null);

  // Resolve which IDs should be highlighted based on hover
  const highlighted = (() => {
    if (!hovered) return { nutrients: new Set<string>(), genes: new Set<string>(), phenotypes: new Set<string>() };

    if (hovered.type === "nutrient") {
      const gs  = GENES.filter(g => g.nutrients.includes(hovered.id)).map(g => g.id);
      const phs = PHENOTYPES.filter(p => p.genes.some(gid => gs.includes(gid))).map(p => p.id);
      return { nutrients: new Set([hovered.id]), genes: new Set(gs), phenotypes: new Set(phs) };
    }
    if (hovered.type === "gene") {
      const g   = GENES.find(g => g.id === hovered.id)!;
      const phs = PHENOTYPES.filter(p => p.genes.includes(hovered.id)).map(p => p.id);
      return { nutrients: new Set(g.nutrients), genes: new Set([hovered.id]), phenotypes: new Set(phs) };
    }
    // phenotype
    const ph  = PHENOTYPES.find(p => p.id === hovered.id)!;
    const gs  = GENES.filter(g => ph.genes.includes(g.id)).map(g => g.id);
    const ns  = new Set(gs.flatMap(gid => GENES.find(g => g.id === gid)!.nutrients));
    return { nutrients: ns, genes: new Set(gs), phenotypes: new Set([hovered.id]) };
  })();

  const anyHighlight = hovered !== null;

  // Tooltip content
  let tooltip: { label: string; color: string; desc: string } | null = null;
  if (hovered?.type === "gene") {
    const g = GENES.find(g => g.id === hovered.id)!;
    tooltip = { label: `${g.label} · ${g.rsid}`, color: g.color, desc: "" };
  } else if (hovered?.type === "phenotype") {
    const p = PHENOTYPES.find(p => p.id === hovered.id)!;
    tooltip = { label: p.label, color: p.color, desc: p.desc };
  }

  return (
    <div className="relative select-none overflow-x-auto">
      <style>{`
        @keyframes nfFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        .nf-node { animation: nfFloat 3.5s ease-in-out infinite; }
      `}</style>

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* Column headers */}
        {[
          { x: COL.n, label: "NUTRIENTES / COMPUESTOS", color: "#8b2fa0" },
          { x: COL.g, label: "GEN / VARIANTE",          color: "#6b7280" },
          { x: COL.p, label: "FENOTIPO CLÍNICO",        color: "#e11d73" },
        ].map(col => (
          <text key={col.label} x={col.x} y={18} textAnchor="middle" fontSize="8" fontWeight="700"
            fill={col.color} opacity="0.65" letterSpacing="0.8">
            {col.label}
          </text>
        ))}

        {/* Nutrient → Gene arcs */}
        {GENES.flatMap(gene =>
          gene.nutrients.map(nid => {
            const nut = NUTRIENTS.find(n => n.id === nid)!;
            const isHL = highlighted.genes.has(gene.id) && highlighted.nutrients.has(nid);
            return (
              <path
                key={`${nid}-${gene.id}`}
                d={arc(COL.n + 40, nut.y, COL.g - 38, gene.y)}
                fill="none"
                stroke={nut.color}
                strokeWidth={isHL ? 2 : 0.8}
                opacity={anyHighlight ? (isHL ? 0.7 : 0.06) : 0.2}
                strokeDasharray={isHL ? "none" : "3 4"}
                style={{ transition: "all 0.2s" }}
              />
            );
          })
        )}

        {/* Gene → Phenotype arcs */}
        {PHENOTYPES.flatMap(ph =>
          ph.genes.map(gid => {
            const gene = GENES.find(g => g.id === gid)!;
            const isHL = highlighted.genes.has(gid) && highlighted.phenotypes.has(ph.id);
            return (
              <path
                key={`${gid}-${ph.id}`}
                d={arc(COL.g + 35, gene.y, COL.p - 42, ph.y)}
                fill="none"
                stroke={ph.color}
                strokeWidth={isHL ? 2 : 0.8}
                opacity={anyHighlight ? (isHL ? 0.7 : 0.06) : 0.2}
                strokeDasharray={isHL ? "none" : "3 4"}
                style={{ transition: "all 0.2s" }}
              />
            );
          })
        )}

        {/* Nutrient nodes */}
        {NUTRIENTS.map((n, i) => {
          const isHL = !anyHighlight || highlighted.nutrients.has(n.id);
          return (
            <g key={n.id}
              className="nf-node"
              style={{ animationDelay: `${i * 0.3}s`, cursor: "pointer", transformOrigin: `${COL.n}px ${n.y}px` }}
              onMouseEnter={() => setHovered({ type: "nutrient", id: n.id })}
              onMouseLeave={() => setHovered(null)}
            >
              <rect x={COL.n - 40} y={n.y - 12} width={80} height={24} rx={12}
                fill={n.color} opacity={isHL ? 0.15 : 0.04} style={{ transition: "all 0.2s" }} />
              <rect x={COL.n - 40} y={n.y - 12} width={80} height={24} rx={12}
                fill="none" stroke={n.color} strokeWidth={isHL ? 1.2 : 0.5} opacity={isHL ? 0.7 : 0.2} style={{ transition: "all 0.2s" }} />
              <text x={COL.n} y={n.y + 4} textAnchor="middle" fontSize="8.5" fontWeight={isHL ? "600" : "400"}
                fill={n.color} opacity={isHL ? 1 : 0.3} style={{ transition: "all 0.2s" }}>
                {n.label}
              </text>
            </g>
          );
        })}

        {/* Gene nodes */}
        {GENES.map((g, i) => {
          const isHL = !anyHighlight || highlighted.genes.has(g.id);
          return (
            <g key={g.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered({ type: "gene", id: g.id })}
              onMouseLeave={() => setHovered(null)}
            >
              <circle cx={COL.g} cy={g.y} r={isHL ? 18 : 14} fill={g.color} opacity={isHL ? 0.15 : 0.04} style={{ transition: "all 0.2s" }} />
              <circle cx={COL.g} cy={g.y} r={isHL ? 8 : 6}   fill={g.color} opacity={isHL ? 0.9 : 0.25} style={{ transition: "all 0.2s" }} />
              <text x={COL.g} y={g.y + 4} textAnchor="middle" fontSize="8" fontWeight="700"
                fill="white" opacity={isHL ? 0.95 : 0.3} style={{ transition: "all 0.2s" }}>
                {g.label}
              </text>
              <text x={COL.g} y={g.y + 26} textAnchor="middle" fontSize="7" fill={g.color} opacity={isHL ? 0.6 : 0.15}>
                {g.rsid}
              </text>
            </g>
          );
        })}

        {/* Phenotype nodes */}
        {PHENOTYPES.map((p, i) => {
          const isHL = !anyHighlight || highlighted.phenotypes.has(p.id);
          return (
            <g key={p.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered({ type: "phenotype", id: p.id })}
              onMouseLeave={() => setHovered(null)}
            >
              <rect x={COL.p - 45} y={p.y - 11} width={90} height={22} rx={6}
                fill={p.color} opacity={isHL ? 0.12 : 0.03} style={{ transition: "all 0.2s" }} />
              <rect x={COL.p - 45} y={p.y - 11} width={90} height={22} rx={6}
                fill="none" stroke={p.color} strokeWidth={isHL ? 1.2 : 0.4} opacity={isHL ? 0.65 : 0.15} style={{ transition: "all 0.2s" }} />
              <text x={COL.p} y={p.y + 4} textAnchor="middle" fontSize="7.5" fontWeight={isHL ? "600" : "400"}
                fill={p.color} opacity={isHL ? 1 : 0.25} style={{ transition: "all 0.2s" }}>
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-64">
          <div className="rounded-xl px-4 py-2.5 text-xs shadow-2xl text-center"
            style={{ background: "#0a0818", border: `1px solid ${tooltip.color}50` }}
          >
            <div className="font-bold mb-0.5" style={{ color: tooltip.color }}>{tooltip.label}</div>
            {tooltip.desc && <div className="text-gray-300 leading-relaxed">{tooltip.desc}</div>}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-1">
        Pasa el cursor sobre nutrientes, genes o fenotipos para explorar las vías
      </p>
    </div>
  );
}
