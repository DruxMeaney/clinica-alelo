"use client";
import { useState } from "react";

/**
 * ReactomeEnrichment — Horizontal enrichment chart from pathway_SNV1.txt
 *
 * Data source: analisisBD/Reactome/pathway_SNV1.txt
 * Enrichment p-values from Fisher's exact test against the Reactome pathway database.
 * -log10(p) >= 1.30 corresponds to p < 0.05.
 *
 * The chart shows that the Alelo panel is SPECIFICALLY enriched in:
 *   - Metabolismo (p ≪ 0.001): the core of cardiometabolic medicine
 *   - Xenobióticos/CYP450 (p = 1.86×10⁻⁴): pharmacogenomics relevance
 *   - Metabolismo de vitaminas (p = 3.11×10⁻⁴): nutrigenomics relevance
 *   - Enfermedad (p = 4.38×10⁻⁴): disease-related pathways
 * And is NOT enriched in immune system, cell cycle, or neuronal pathways.
 * This is precisely what a cardiometabolic + PGx + nutrigenomics panel should show.
 */

interface Pathway {
  id: string;
  name: string;
  nameES: string;
  parent: string;
  pValue: number | null;   // null = essentially 0
  negLogP: number;         // for display (capped at 8)
  genes: string[];
  geneCount: number;
  category: "core" | "significant" | "marginal" | "ns";
  description: string;
}

const PATHWAYS: Pathway[] = [
  {
    id: "R-HSA-1430728",
    name: "Metabolism",
    nameES: "Metabolismo",
    parent: "Top-level",
    pValue: null,
    negLogP: 8,
    genes: ["CYP2C19","CYP2C9","ABCC8","ABCG2","MTHFR","LDLR","NOS3","PPARG","VDR","DHCR7","HMGCR","F5","APOE","CETP","APOB","LPL","TCF7L2","PPARGC1A","SOD1","SOD2","FTO","ALDH2","CYP1A2","SLC16A11","ACE","IL6","ADIPOQ"],
    geneCount: 27,
    category: "core",
    description: "La categoría más enriquecida. El 47% (27/57) de los genes del panel participan en rutas metabólicas. Este superenriquecimiento refleja el diseño cardiometabólico del panel: síntesis de lípidos, glucólisis, metabolismo de xenobióticos y metabolismo de vitaminas.",
  },
  {
    id: "R-HSA-211981",
    name: "Metabolism of xenobiotics by CYP450",
    nameES: "Xenobióticos / CYP450",
    parent: "Metabolism",
    pValue: 1.86e-4,
    negLogP: 3.73,
    genes: ["CYP2C19","CYP2C9","CYP1A2"],
    geneCount: 3,
    category: "significant",
    description: "Los genes CYP (fase I) del panel están altamente enriquecidos en esta vía. Con solo 3 genes de los 57, la probabilidad de este enriquecimiento al azar es 1 en 5,400. Sustenta la validez del módulo de farmacogenómica.",
  },
  {
    id: "R-HSA-196854",
    name: "Vitamin metabolism",
    nameES: "Metabolismo de vitaminas",
    parent: "Metabolism",
    pValue: 3.11e-4,
    negLogP: 3.51,
    genes: ["MTHFR","VDR","DHCR7","ALDH2","ABCG2","CYP1A2"],
    geneCount: 6,
    category: "significant",
    description: "MTHFR (folato/B9), VDR (vitamina D), DHCR7 (vitamina D síntesis), ALDH2 (B1/tiamina). La coherencia nutrigenómica del panel se refleja en el enriquecimiento estadístico de las vías de metabolismo vitamínico.",
  },
  {
    id: "R-HSA-1643685",
    name: "Disease (metabolic & cardiovascular)",
    nameES: "Rutas de enfermedad cardiometabólica",
    parent: "Disease",
    pValue: 4.38e-4,
    negLogP: 3.36,
    genes: ["PCSK9","LDLR","APOE","CETP","FTO","PPARG","TCF7L2","SLC16A11","ACE","NOS3","IL6","ADIPOQ","ABCC8","KCNJ11","GCK","HNF4A","VEGFA"],
    geneCount: 17,
    category: "significant",
    description: "Las rutas de enfermedad cardiovascular y diabetes tipo 2 están altamente enriquecidas. Los 17 genes incluyen los loci clásicos de hipercolesterolemia familiar (PCSK9, LDLR), T2D (TCF7L2, SLC16A11, GCK) y vasculares (NOS3, ACE).",
  },
  {
    id: "R-HSA-110056",
    name: "MAPK/ERK signaling (IL-6 axis)",
    nameES: "Señalización MAPK/ERK (eje IL-6)",
    parent: "Signal Transduction",
    pValue: 0.048,
    negLogP: 1.32,
    genes: ["IL6","NOS3"],
    geneCount: 2,
    category: "marginal",
    description: "Señalización inflamatoria marginal. IL-6 (rs1800795) y NOS3 comparten esta vía. La asociación es estadísticamente borderline — relevante para inflamación crónica en riesgo cardiometabólico pero no un módulo central del panel.",
  },
  {
    id: "R-HSA-1059683",
    name: "Interleukin-6 signaling",
    nameES: "Señalización de interleucina-6",
    parent: "Immune System",
    pValue: 0.053,
    negLogP: 1.28,
    genes: ["IL6"],
    geneCount: 1,
    category: "marginal",
    description: "IL-6 es marcador de inflamación sistémica y conecta el metabolismo con la respuesta inmune. Su inclusión en el panel captura el componente inflamatorio del riesgo cardiometabólico, pero el enriquecimiento estadístico es marginal.",
  },
  {
    id: "R-HSA-109582",
    name: "Hemostasis",
    nameES: "Hemostasia",
    parent: "Hemostasis",
    pValue: 0.145,
    negLogP: 0.84,
    genes: ["APOB","ITGB3","NOS3","SLC16A1","SOD1","VEGFA"],
    geneCount: 6,
    category: "ns",
    description: "Hemostasia no enriquecida significativamente. Los 6 genes que participan en esta vía lo hacen como efectores secundarios (NOS3 en función endotelial, SOD1 en estrés oxidativo), no como genes hemostáticos primarios.",
  },
  {
    id: "R-HSA-162582",
    name: "Signal Transduction",
    nameES: "Transducción de señales",
    parent: "Signal Transduction",
    pValue: 0.059,
    negLogP: 1.23,
    genes: ["IL6","VEGFA","PPARG","PPARGC1A"],
    geneCount: 4,
    category: "marginal",
    description: "Las vías de transducción de señales muestran enriquecimiento marginal, impulsado principalmente por PPARG y PPARGC1A (reguladores maestros del metabolismo lipídico y mitocondrial) y VEGFA (angiogénesis).",
  },
  {
    id: "R-HSA-74160",
    name: "Gene Expression",
    nameES: "Expresión génica / regulación",
    parent: "Gene Expression",
    pValue: 0.214,
    negLogP: 0.67,
    genes: ["VDR","NR3C1","PPARG","HNF4A"],
    geneCount: 4,
    category: "ns",
    description: "Varios genes del panel son factores de transcripción (PPARG, HNF4A, VDR), pero la ruta de expresión génica en general no está enriquecida — consistente con un panel orientado a efectores metabólicos, no reguladores globales.",
  },
  {
    id: "R-HSA-168928",
    name: "Immune System",
    nameES: "Sistema inmune",
    parent: "Immune System",
    pValue: 0.731,
    negLogP: 0.14,
    genes: ["IL6","SOD1","VEGFA"],
    geneCount: 3,
    category: "ns",
    description: "El sistema inmune NO está enriquecido. Esto es metodológicamente correcto: el panel Alelo no está diseñado para enfermedades autoinmunes o inmunodeficiencias. La ausencia de enriquecimiento inmune valida la especificidad del panel.",
  },
  {
    id: "R-HSA-1640170",
    name: "Cell Cycle",
    nameES: "Ciclo celular",
    parent: "Cell Cycle",
    pValue: 0.826,
    negLogP: 0.08,
    genes: [],
    geneCount: 0,
    category: "ns",
    description: "No hay genes del panel involucrados en el ciclo celular. Confirma que el panel no está orientado a oncología, sino a medicina preventiva cardiometabólica.",
  },
];

const CAT_CONFIG = {
  core:        { color: "#8b2fa0", label: "Altamente enriquecida",   bg: "#8b2fa015" },
  significant: { color: "#0284c7", label: "Enriquecida (p<0.001)",   bg: "#0284c715" },
  marginal:    { color: "#d97706", label: "Marginal (0.001<p<0.05)", bg: "#d9770615" },
  ns:          { color: "#6b7280", label: "No significativa",         bg: "#6b728010" },
};

const SVG_H = PATHWAYS.length * 38 + 72;
const LEFT = 235;
const CHART_W = 480;
const MAX_DISP = 8;
const PX = CHART_W / MAX_DISP;
const THRESH_X = LEFT + 1.3 * PX; // -log10(0.05)

export default function ReactomeEnrichment() {
  const [selected, setSelected] = useState<string | null>("R-HSA-1430728");
  const pw = PATHWAYS.find(p => p.id === selected);

  return (
    <div className="space-y-0">
      <div className="rounded-2xl overflow-hidden bg-[#0a0818] border border-white/5">
        <svg viewBox={`0 0 740 ${SVG_H}`} width="100%" preserveAspectRatio="xMidYMid meet" className="block">

          {/* Legend */}
          <g>
            {Object.entries(CAT_CONFIG).map(([cat, cfg], i) => (
              <g key={cat} transform={`translate(${LEFT + i * 142}, 14)`}>
                <rect width="8" height="8" rx="2" y="0" fill={cfg.color} />
                <text x="12" y="8" fontSize="8.5" fill="#9ca3af" fontFamily="system-ui">{cfg.label}</text>
              </g>
            ))}
          </g>

          {/* X-axis ticks */}
          {[0,1,2,3,4,5,6,7,8].map(t => (
            <g key={t}>
              <line x1={LEFT + t * PX} y1={40} x2={LEFT + t * PX} y2={SVG_H - 24}
                stroke={t === 0 ? "#374151" : "#1f1b3a"} strokeWidth={t === 0 ? 1.5 : 1} />
              <text x={LEFT + t * PX} y={SVG_H - 10} textAnchor="middle" fontSize="8" fill="#4b5563" fontFamily="system-ui">{t}</text>
            </g>
          ))}

          {/* Significance threshold */}
          <line x1={THRESH_X} y1={40} x2={THRESH_X} y2={SVG_H - 24}
            stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" />
          <text x={THRESH_X + 3} y={50} fontSize="7.5" fill="#f59e0b" fontFamily="system-ui">p=0.05</text>

          {/* X label */}
          <text x={LEFT + CHART_W / 2} y={SVG_H - 2} textAnchor="middle" fontSize="8.5" fill="#6b7280" fontFamily="system-ui">
            -log₁₀(p de enriquecimiento) — Reactome pathway_SNV1.txt
          </text>

          {/* Pathway rows */}
          {PATHWAYS.map((p, i) => {
            const y = 48 + i * 38;
            const barW = Math.min(p.negLogP, MAX_DISP) * PX;
            const cfg = CAT_CONFIG[p.category];
            const isSel = selected === p.id;

            return (
              <g key={p.id} style={{ cursor: "pointer" }} onClick={() => setSelected(isSel ? null : p.id)}>
                {isSel && (
                  <rect x={LEFT - 4} y={y - 2} width={CHART_W + 4} height={28} rx="4" fill={cfg.color} fillOpacity="0.08" />
                )}

                {/* Pathway name */}
                <text x={LEFT - 8} y={y + 10} textAnchor="end" fontSize="9.5" fontWeight={isSel ? "700" : "400"}
                  fill={isSel ? cfg.color : "#d1d5db"} fontFamily="system-ui">
                  {p.nameES.length > 28 ? p.nameES.slice(0, 27) + "…" : p.nameES}
                </text>
                <text x={LEFT - 8} y={y + 20} textAnchor="end" fontSize="7" fill="#4b5563" fontFamily="system-ui">
                  {p.geneCount} gen{p.geneCount !== 1 ? "es" : ""}
                </text>

                {/* Category dot */}
                <circle cx={6} cy={y + 11} r="4" fill={cfg.color} />

                {/* Track */}
                <rect x={LEFT} y={y + 4} width={CHART_W} height={16} rx="3" fill="#1a1535" />

                {/* Bar */}
                <rect x={LEFT} y={y + 4} width={barW} height={16} rx="3" fill={cfg.color} fillOpacity={isSel ? 0.9 : 0.7} />

                {/* p-value annotation */}
                <text
                  x={LEFT + barW + 5} y={y + 16}
                  fontSize="8" fill={cfg.color} fontFamily="system-ui"
                >
                  {p.pValue === null ? "p≪0.001" : p.pValue < 0.001
                    ? `p=${p.pValue.toExponential(0)}`
                    : `p=${p.pValue.toFixed(3)}`
                  }
                </text>

                {/* Capped marker for Metabolism */}
                {p.negLogP >= MAX_DISP && (
                  <text x={LEFT + CHART_W - 2} y={y + 17} textAnchor="end"
                    fontSize="9" fill={cfg.color} fontWeight="bold" fontFamily="system-ui">
                    ▶▶
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail */}
      {pw ? (
        <div className="rounded-2xl border bg-white overflow-hidden"
          style={{ borderTop: `3px solid ${CAT_CONFIG[pw.category].color}` }}>
          <div className="p-5 grid md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-gray-900">{pw.nameES}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: CAT_CONFIG[pw.category].bg, color: CAT_CONFIG[pw.category].color }}>
                  {CAT_CONFIG[pw.category].label}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">{pw.id}</p>
              <div className="pt-1">
                <p className="text-xs text-gray-500 mb-0.5">p de enriquecimiento</p>
                <p className="text-xl font-mono font-bold" style={{ color: CAT_CONFIG[pw.category].color }}>
                  {pw.pValue === null ? "p ≪ 0.001" : pw.pValue < 0.001
                    ? pw.pValue.toExponential(2) : pw.pValue.toFixed(3)
                  }
                </p>
                <p className="text-xs text-gray-400">-log₁₀(p) = {pw.negLogP >= MAX_DISP ? "≥8 (capped)" : pw.negLogP.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-0.5">Genes involucrados: {pw.geneCount}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Interpretación</p>
              <p className="text-xs text-gray-600 leading-relaxed">{pw.description}</p>
            </div>
            <div>
              {pw.genes.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Genes del panel en esta vía
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {pw.genes.map(g => (
                      <span key={g} className="text-xs font-mono px-1.5 py-0.5 rounded bg-gray-50 border border-gray-200 text-gray-700">
                        {g}
                      </span>
                    ))}
                  </div>
                </>
              )}
              <div className="mt-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-400">
                  Fuente: Reactome pathway_SNV1.txt (analisisBD)<br />
                  Test: Fisher exacto contra base de datos Reactome v87
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl">
          <p className="text-xs text-gray-400 text-center">
            Haz clic en una vía para ver genes involucrados e interpretación
          </p>
        </div>
      )}
    </div>
  );
}
