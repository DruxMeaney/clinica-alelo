"use client";
import { useState } from "react";

/**
 * GWASChart — Lollipop chart of GWAS association strengths for panel SNPs
 *
 * Data sources:
 *   - GWAS Catalog (NHGRI-EBI; Sollis et al. 2023, Nucleic Acids Res. 51:D977–D985)
 *     descargado vía SNPnexus (Oscanoa et al. 2020, Nucleic Acids Res. 48:W185–W192)
 *     → archivo gwas_SNV1.txt
 *   - SIGMA Type 2 Diabetes Consortium (2014): SLC16A11, Nature 506:97–101
 *   - CPIC / PharmGKB: CYP2C19 pharmacogenomics
 *
 * All -log10(p) values >80 are displayed capped at 80 with actual value annotated.
 * Genome-wide significance threshold: p = 5×10⁻⁸ → -log10(p) = 7.3
 */

interface GWASPoint {
  gene: string;
  rsid: string;
  trait: string;
  traitES: string;          // Spanish trait name
  category: "metabolic" | "cardiovascular" | "pharmacogenomics" | "neurological" | "population";
  actualNegLogP: number;    // true -log10(p)
  displayNegLogP: number;   // capped at 80 for rendering
  capped: boolean;
  pValue: string;           // formatted for display
  source: string;
  description: string;
}

const GWAS_DATA: GWASPoint[] = [
  {
    gene: "PCSK9", rsid: "rs11591147",
    trait: "LDL cholesterol",
    traitES: "Colesterol LDL",
    category: "cardiovascular",
    actualNegLogP: 257, displayNegLogP: 78, capped: true,
    pValue: "3×10⁻²⁵⁷",
    source: "GWAS Catalog (NHGRI-EBI) vía SNPnexus · Graham et al. 2021, Nat Genet (UK Biobank + meta-análisis lipídico)",
    description: "Variante de ganancia de función en PCSK9. Impacto sobre el receptor LDL con la asociación más fuerte del conjunto de datos. Efecto directo sobre LDL-C.",
  },
  {
    gene: "TCF7L2", rsid: "rs7903146",
    trait: "Type 2 diabetes",
    traitES: "Diabetes tipo 2",
    category: "metabolic",
    actualNegLogP: 176, displayNegLogP: 76, capped: true,
    pValue: "2×10⁻¹⁷⁶",
    source: "GWAS Catalog (NHGRI-EBI) vía SNPnexus · Mahajan et al. 2022, Nat Genet (DIAMANTE meta-análisis, >1.4M individuos)",
    description: "TCF7L2 es el locus genético de T2D más replicado a nivel mundial. La variante rs7903146 modula la señalización Wnt en células beta del páncreas.",
  },
  {
    gene: "MTHFR", rsid: "rs1801133",
    trait: "Homocysteine levels",
    traitES: "Niveles de homocisteína",
    category: "metabolic",
    actualNegLogP: 104, displayNegLogP: 74, capped: true,
    pValue: "4×10⁻¹⁰⁴",
    source: "GWAS Catalog (NHGRI-EBI) vía SNPnexus · van Meurs et al. 2013 (meta-análisis ~68,000 individuos)",
    description: "C677T en MTHFR es la asociación genética más robusta con niveles de homocisteína. Frecuencia del alelo T en México ~47% (1KGen AMR), la más alta de cualquier continental population.",
  },
  {
    gene: "APOE", rsid: "rs429358",
    trait: "Alzheimer / LDL",
    traitES: "Alzheimer / LDL-C",
    category: "neurological",
    actualNegLogP: 80, displayNegLogP: 70, capped: false,
    pValue: "~10⁻⁸⁰",
    source: "GWAS Catalog — Lambert et al. 2013; Kunkle et al. 2019",
    description: "El alelo ε4 (definido por rs429358) es el factor genético de riesgo de Alzheimer más conocido y también eleva el LDL. La estimación del -log10(p) es conservadora; asociaciones con >n=1M son más extremas.",
  },
  {
    gene: "FTO", rsid: "rs9939609",
    trait: "BMI / Obesity",
    traitES: "IMC / Obesidad",
    category: "metabolic",
    actualNegLogP: 48, displayNegLogP: 48, capped: false,
    pValue: "4×10⁻⁴⁸",
    source: "GWAS Catalog — Locke et al. 2015 (meta-analysis ~340,000 individuos)",
    description: "FTO fue el primer locus GWAS de obesidad identificado. rs9939609 (alelo A) aumenta el IMC ~0.39 kg/m² y el riesgo de obesidad ~1.3×. Modula la expresión de IRX3/IRX5 hipotalámicos.",
  },
  {
    gene: "PPARG", rsid: "rs1801282",
    trait: "Type 2 diabetes",
    traitES: "Diabetes tipo 2 / sensib. insulínica",
    category: "metabolic",
    actualNegLogP: 19, displayNegLogP: 19, capped: false,
    pValue: "4×10⁻¹⁹",
    source: "GWAS Catalog — Altshuler et al. 2000; Deeb et al. 1998",
    description: "Pro12Ala (rs1801282) de PPARG. El alelo Ala reduce la transactivación de PPARG ~20% → mayor sensibilidad a insulina. Una de las asociaciones genéticas de T2D más robustas con impacto funcional demostrado.",
  },
  {
    gene: "LDLR", rsid: "rs2228671",
    trait: "LDL / Familial hypercholesterolemia",
    traitES: "LDL / Hipercolesterolemia familiar",
    category: "cardiovascular",
    actualNegLogP: 28, displayNegLogP: 28, capped: false,
    pValue: "~10⁻²⁸",
    source: "GWAS Catalog — Willer et al. 2013 (Global Lipids Genetics Consortium)",
    description: "El locus LDLR tiene >2,000 variantes patogénicas documentadas en ClinVar. rs2228671 es un marcador funcional de la actividad del receptor LDL. Clave para diagnóstico molecular de hipercolesterolemia familiar.",
  },
  {
    gene: "CYP2C19", rsid: "rs4244285",
    trait: "Clopidogrel response",
    traitES: "Respuesta a clopidogrel",
    category: "pharmacogenomics",
    actualNegLogP: 22, displayNegLogP: 22, capped: false,
    pValue: "~10⁻²²",
    source: "GWAS Catalog; Shuldiner et al. 2009 (PAPI study); FDA black box warning 2010",
    description: "CYP2C19*2 (rs4244285) define el fenotipo PM de CYP2C19. Metabolizadores pobres no convierten clopidogrel a su forma activa. La FDA emitió una advertencia de caja negra. Este análisis es el paradigma de la farmacogenómica clínica.",
  },
  {
    gene: "SLC16A11", rsid: "rs13342692",
    trait: "Type 2 diabetes (Mexico/Indigenous)",
    traitES: "Diabetes tipo 2 (México / Amerindios)",
    category: "population",
    actualNegLogP: 13, displayNegLogP: 13, capped: false,
    pValue: "~4×10⁻¹³",
    source: "SIGMA Type 2 Diabetes Consortium, 2014 (Nature 506:97–101)",
    description: "Haplotipo de riesgo en SLC16A11 identificado específicamente en la cohorte mexicana por el consorcio SIGMA. Alelo de riesgo ~29% en mestizos, ~50% en indígenas vs ~2% en europeos. Ilustra la necesidad de GWAS en poblaciones latinoamericanas.",
  },
  {
    gene: "NOS3", rsid: "rs1799983",
    trait: "Systolic blood pressure",
    traitES: "Presión arterial sistólica",
    category: "cardiovascular",
    actualNegLogP: 12, displayNegLogP: 12, capped: false,
    pValue: "~2×10⁻¹²",
    source: "GWAS Catalog — Ehret et al. 2011 (International Consortium for Blood Pressure GWAS)",
    description: "Glu298Asp (rs1799983) en NOS3 reduce la producción de óxido nítrico endotelial → vasoconstricción → hipertensión. El alelo Asp (T) se asocia con HTA y disfunción endotelial. NOS3 es un nodo de convergencia entre metabolismo vascular y respuesta al ejercicio.",
  },
];

// Layout constants
const LEFT = 200;
const CHART_W = 540;
const MAX_DISPLAY = 80;
const PX_PER_UNIT = CHART_W / MAX_DISPLAY;
const ROW_H = 34;
const TOP_PAD = 58;
const SVG_H = TOP_PAD + GWAS_DATA.length * ROW_H + 44;
const THRESHOLD = 7.3; // -log10(5e-8)

const CAT_COLOR: Record<string, string> = {
  metabolic:        "#8b5cf6",
  cardiovascular:   "#e11d73",
  pharmacogenomics: "#0284c7",
  neurological:     "#d97706",
  population:       "#059669",
};

const CAT_LABEL: Record<string, string> = {
  metabolic:        "Metabólico",
  cardiovascular:   "Cardiovascular",
  pharmacogenomics: "Farmacogenómica",
  neurological:     "Neurológico",
  population:       "Específico de población",
};

export default function GWASChart() {
  const [selected, setSelected] = useState<string | null>("PCSK9");
  const point = GWAS_DATA.find(d => d.gene === selected);

  const xTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80];

  return (
    <div className="space-y-0">
      <div className="rounded-2xl overflow-hidden bg-[#0a0818] border border-white/5">
        <svg viewBox={`0 0 760 ${SVG_H}`} width="100%" preserveAspectRatio="xMidYMid meet" className="block">
          <defs>
            <marker id="arr-gwas" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <polygon points="0 0, 5 2.5, 0 5" fill="#6b7280" />
            </marker>
          </defs>

          {/* Legend */}
          <g>
            {Object.entries(CAT_COLOR).map(([cat, col], i) => (
              <g key={cat} transform={`translate(${LEFT + i * 114}, 14)`}>
                <circle cx="5" cy="5" r="5" fill={col} fillOpacity="0.85" />
                <text x="13" y="9" fontSize="8.5" fill="#9ca3af" fontFamily="system-ui">{CAT_LABEL[cat]}</text>
              </g>
            ))}
          </g>

          {/* X-axis label */}
          <text x={LEFT + CHART_W / 2} y={SVG_H - 6} textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="system-ui">
            -log₁₀(p-valor) — capped en 80 para valores extremos
          </text>

          {/* Grid lines + X-axis ticks */}
          {xTicks.map(t => (
            <g key={t}>
              <line
                x1={LEFT + t * PX_PER_UNIT} y1={TOP_PAD - 4}
                x2={LEFT + t * PX_PER_UNIT} y2={SVG_H - 20}
                stroke={t === 0 ? "#374151" : "#1f1b3a"} strokeWidth={t === 0 ? 1.5 : 1}
              />
              <text
                x={LEFT + t * PX_PER_UNIT} y={SVG_H - 22}
                textAnchor="middle" fontSize="8.5" fill="#4b5563" fontFamily="system-ui"
              >
                {t}
              </text>
            </g>
          ))}

          {/* Genome-wide significance threshold */}
          <line
            x1={LEFT + THRESHOLD * PX_PER_UNIT} y1={TOP_PAD - 4}
            x2={LEFT + THRESHOLD * PX_PER_UNIT} y2={SVG_H - 20}
            stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2"
          />
          <text
            x={LEFT + THRESHOLD * PX_PER_UNIT + 3} y={TOP_PAD}
            fontSize="7.5" fill="#f59e0b" fontFamily="system-ui"
          >
            p=5×10⁻⁸
          </text>

          {/* Lollipop rows */}
          {GWAS_DATA.map((d, i) => {
            const y = TOP_PAD + i * ROW_H + ROW_H / 2;
            const color = CAT_COLOR[d.category];
            const x2 = LEFT + d.displayNegLogP * PX_PER_UNIT;
            const isSel = selected === d.gene;

            return (
              <g key={d.gene + d.rsid} style={{ cursor: "pointer" }} onClick={() => setSelected(isSel ? null : d.gene)}>
                {/* Row highlight */}
                {isSel && (
                  <rect x={LEFT - 2} y={y - ROW_H / 2 + 2} width={CHART_W + 2} height={ROW_H - 4}
                    rx="4" fill={color} fillOpacity="0.08" />
                )}

                {/* Gene label */}
                <text x={LEFT - 8} y={y - 4} textAnchor="end" fontSize="10" fontWeight="700"
                  fill={isSel ? color : "#e5e7eb"} fontFamily="system-ui">
                  {d.gene}
                </text>
                <text x={LEFT - 8} y={y + 6} textAnchor="end" fontSize="7.5"
                  fill={isSel ? "#d1d5db" : "#6b7280"} fontFamily="system-ui">
                  {d.traitES.length > 28 ? d.traitES.slice(0, 27) + "…" : d.traitES}
                </text>

                {/* Category dot on left */}
                <circle cx={8} cy={y} r="4" fill={color} fillOpacity="0.8" />

                {/* Track */}
                <line x1={LEFT} y1={y} x2={LEFT + CHART_W} y2={y}
                  stroke="#1a1535" strokeWidth="1.5" />

                {/* Lollipop stick */}
                <line x1={LEFT} y1={y} x2={x2 - (d.capped ? 10 : 10)} y2={y}
                  stroke={color} strokeWidth={isSel ? 2.5 : 1.5} strokeOpacity="0.9"
                />

                {/* Capped continuation (dashed) */}
                {d.capped && (
                  <>
                    <line x1={x2 - 10} y1={y} x2={LEFT + CHART_W - 12} y2={y}
                      stroke={color} strokeWidth="1.5" strokeDasharray="3,2" strokeOpacity="0.6" />
                    <text x={LEFT + CHART_W - 8} y={y + 4} textAnchor="end"
                      fontSize="8" fill={color} fontFamily="system-ui" fontWeight="bold">
                      ▶▶
                    </text>
                    <text x={LEFT + CHART_W} y={y - 5} textAnchor="end"
                      fontSize="7" fill={color} fontFamily="system-ui">
                      p={d.pValue}
                    </text>
                  </>
                )}

                {/* Lollipop head */}
                {!d.capped && (
                  <circle cx={x2} cy={y} r={isSel ? 7 : 5}
                    fill={color} stroke="#0a0818" strokeWidth="1.5" />
                )}
                {!d.capped && (
                  <text x={x2 + 10} y={y + 4} fontSize="8" fill={color} fontFamily="system-ui">
                    p={d.pValue}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {point ? (
        <div
          className="rounded-2xl border bg-white overflow-hidden"
          style={{ borderTop: `3px solid ${CAT_COLOR[point.category]}` }}
        >
          <div className="p-5 grid md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900">{point.gene}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: CAT_COLOR[point.category] + "20", color: CAT_COLOR[point.category] }}>
                  {CAT_LABEL[point.category]}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">{point.rsid}</p>
              <p className="text-xs text-gray-600">{point.traitES}</p>
              <div className="pt-1">
                <p className="text-xs text-gray-500 mb-1">p-valor GWAS</p>
                <p className="text-2xl font-mono font-bold" style={{ color: CAT_COLOR[point.category] }}>
                  {point.pValue}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">-log₁₀(p) = {point.actualNegLogP}{point.capped ? " (mostrado capped en 80)" : ""}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Descripción</p>
              <p className="text-xs text-gray-600 leading-relaxed">{point.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fuente</p>
              <p className="text-xs text-gray-500 leading-relaxed italic">{point.source}</p>
              <div className="mt-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-500">
                  Umbral de significancia genómica: p = 5×10⁻⁸ (-log₁₀ = 7.3).<br />
                  Todos los valores mostrados superan ampliamente este umbral.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl">
          <p className="text-xs text-gray-400 text-center">
            Haz clic en cualquier gen para ver descripción, fuente y contexto clínico
          </p>
        </div>
      )}
    </div>
  );
}
