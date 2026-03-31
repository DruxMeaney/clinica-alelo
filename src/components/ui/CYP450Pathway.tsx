"use client";
import { useState } from "react";

interface GeneNode {
  id: string;
  fullName: string;
  phase: "I" | "II" | "transporter";
  cpicLevel: "A" | "B";
  svgX: number;
  svgY: number;
  color: string;
  glow: string;
  phenotypes: { label: string; freq: string; action: string }[];
  drugs: string[];
  snps: string[];
  pearl: string;
}

const GENES: GeneNode[] = [
  /* ── Phase I ─────────────────────────────────────────── */
  {
    id: "CYP2D6", fullName: "Citocromo P450 2D6",
    phase: "I", cpicLevel: "A", svgX: 120, svgY: 110,
    color: "#818cf8", glow: "#818cf840",
    phenotypes: [
      { label: "PM (Metabolizador Pobre)", freq: "~7-10% en México", action: "Evitar codeína/tramadol. Ajustar dosis antidepresivos y antipsicóticos." },
      { label: "IM (Metabolizador Intermedio)", freq: "~20-30%", action: "Dosis reducida para opioides débiles y algunos antidepresivos." },
      { label: "NM (Normal)", freq: "~55-65%", action: "Dosis estándar según guías." },
      { label: "UM (Ultrarrápido)", freq: "~2-5%", action: "Riesgo de toxicidad opioide. Tamoxifeno: activación aumentada." },
    ],
    drugs: ["Codeína / Tramadol (activación a opioides activos)", "Tamoxifeno → endoxifeno activo", "Metoprolol / Carvedilol", "Fluoxetina / Paroxetina", "Haloperidol / Risperidona / Aripiprazol"],
    snps: ["*4 rs3892097 (PM europeo, ~12-15%)", "*5 (deleción del gen completo)", "*10 rs1065852 (IM, ~6% mestizos)", "*41 rs28371725 (IM)", "*1xN / *2xN (UM, duplicación)"],
    pearl: "CYP2D6 metaboliza ~25% de los fármacos en uso. Los PM no convierten codeína a morfina (analgesia nula) y los UM pueden sufrir depresión respiratoria. En oncología, es esencial para activar tamoxifeno; un PM tiene exposición subóptima a endoxifeno, comprometiendo la eficacia en cáncer de mama hormono-receptor positivo.",
  },
  {
    id: "CYP2C19", fullName: "Citocromo P450 2C19",
    phase: "I", cpicLevel: "A", svgX: 252, svgY: 110,
    color: "#a78bfa", glow: "#a78bfa40",
    phenotypes: [
      { label: "PM (Metabolizador Pobre)", freq: "~3-7%", action: "Clopidogrel: evitar — riesgo de trombosis de stent. Alternativa: prasugrel o ticagrelor." },
      { label: "IM (Metabolizador Intermedio)", freq: "~25-30%", action: "Clopidogrel: vigilancia CV. IBPs: respuesta estándar." },
      { label: "NM (Normal)", freq: "~45-55%", action: "Dosis estándar." },
      { label: "UM (Ultrarrápido)", freq: "~3-7%", action: "IBPs menos eficaces. Antiagregación aumentada con clopidogrel." },
    ],
    drugs: ["Clopidogrel (activación a tiol activo antiagregante)", "Omeprazol / Esomeprazol / IBPs", "Escitalopram / Citalopram (antidepresivos)", "Voriconazol (antifúngico)", "Diazepam / Clonazepam"],
    snps: ["*2 rs4244285 (más frecuente, ~15% europeos)", "*3 rs4986893 (frecuente en Asia)", "*17 rs12248560 (función aumentada, ~20% europeos)"],
    pearl: "Pacientes PM con stent coronario que reciben clopidogrel tienen 2-3× más riesgo de eventos cardiovasculares mayores (MACE). Las guías ACC/AHA y CPIC recomiendan genotipificar CYP2C19 antes de prescribir clopidogrel en SCA. La FDA emitió una advertencia de caja negra (black box warning) en 2010.",
  },
  {
    id: "CYP2C9", fullName: "Citocromo P450 2C9",
    phase: "I", cpicLevel: "A", svgX: 384, svgY: 110,
    color: "#c084fc", glow: "#c084fc40",
    phenotypes: [
      { label: "PM (Metabolizador Pobre)", freq: "<1%", action: "Warfarina: iniciar dosis muy baja (≤1.5 mg). Alto riesgo de sangrado." },
      { label: "IM (Metabolizador Intermedio)", freq: "~18-25%", action: "Warfarina: reducir dosis inicial ~25-50%. Monitoreo frecuente de INR." },
      { label: "NM (Normal)", freq: "~70-78%", action: "Dosis estándar según INR." },
    ],
    drugs: ["Warfarina (S-warfarina, 5× más potente que R)", "AINEs: ibuprofeno, celecoxib, diclofenaco", "Glipizida / Tolbutamida / Glibenclamida", "Losartán → E3174 activo", "Fenitoína (nivel sérico aumentado en PM)"],
    snps: ["*2 rs1799853 (Arg144Cys, ~11% europeos, ~4% mexicanos)", "*3 rs1057910 (Ile359Leu, ~7% europeos, ~2% mexicanos)", "*5, *6, *8, *11 (variantes con actividad reducida)"],
    pearl: "La dosis de warfarina varía hasta 10 veces entre individuos. El algoritmo CPIC integra CYP2C9 + VKORC1 + CYP4F2 + información clínica y puede predecir la dosis estable con ~50% menos tiempo hasta rango terapéutico y reducción significativa de eventos hemorrágicos graves.",
  },
  {
    id: "CYP3A4", fullName: "Citocromo P450 3A4/3A5",
    phase: "I", cpicLevel: "A", svgX: 516, svgY: 110,
    color: "#e879f9", glow: "#e879f940",
    phenotypes: [
      { label: "PM / CYP3A5 no expresor (*3/*3)", freq: "~83-92% latinoamericanos", action: "Tacrolimus: dosis inicial reducida. Ajustar por niveles." },
      { label: "NM / CYP3A5 expresor (*1/*3 ó *1/*1)", freq: "~8-17%", action: "Tacrolimus: dosis inicial mayor para alcanzar niveles terapéuticos." },
    ],
    drugs: ["Estatinas: lovastatina, simvastatina (metabolismo hepático)", "Ciclosporina / Tacrolimus (trasplante)", "Midazolam / Alprazolam", "Nifedipino / Amlodipino", "Eritromicina / Claritromicina (también inhibidores)"],
    snps: ["CYP3A5*3 rs776746 (variante más importante para trasplante)", "CYP3A4*22 rs35599367 (actividad reducida ~50%, ~5% europeos)"],
    pearl: "CYP3A4/5 metaboliza >50% de los fármacos aprobados y está presente en hígado e intestino. Inhibidores potentes (ketoconazol, ritonavir, zumo de toronja) o inductores (rifampicina, carbamazepina) pueden multiplicar o dividir las concentraciones de sustratos. CYP3A5*3 es especialmente relevante en trasplante renal (tacrolimus).",
  },

  /* ── Phase II ─────────────────────────────────────────── */
  {
    id: "UGT1A1", fullName: "UDP-Glucuronosiltransferasa 1A1",
    phase: "II", cpicLevel: "A", svgX: 120, svgY: 240,
    color: "#34d399", glow: "#34d39940",
    phenotypes: [
      { label: "PM (*28/*28 — Síndrome Gilbert)", freq: "~5-15% en México", action: "Irinotecán: reducir dosis inicial 30%. Vigilancia estrecha de toxicidad." },
      { label: "IM (*28/wt)", freq: "~40-50%", action: "Irinotecán: vigilancia de toxicidad, especialmente a dosis altas." },
      { label: "NM (wt/wt)", freq: "~40%", action: "Dosis estándar." },
    ],
    drugs: ["Irinotecán → SN-38 (metabolito activo en cáncer colorrectal)", "Belinostat (linfoma T)", "Nilotinib (LMC)", "Bilirrubina endógena", "Morfina (glucuronidación)"],
    snps: ["*28 rs8175347 (microsatélite TA: TA7 reduce expresión ~50%)", "*6 rs4148323 (frecuente en Asia Oriental)", "UGT1A9, UGT1A7 modulan parcialmente"],
    pearl: "El alelo *28 causa síndrome de Gilbert (hiperbilirrubinemia leve, benigna). Sin embargo, en oncología, ese mismo genotipo predice toxicidad severa con irinotecán (diarrea Grado 3-4, neutropenia). El alelo *28 tiene ~40% de frecuencia en población latinoamericana — especialmente relevante para oncología en México.",
  },
  {
    id: "TPMT", fullName: "Tiopurina S-metiltransferasa",
    phase: "II", cpicLevel: "A", svgX: 252, svgY: 240,
    color: "#6ee7b7", glow: "#6ee7b740",
    phenotypes: [
      { label: "PM (Actividad deficiente)", freq: "~0.3-0.5%", action: "CONTRAINDICADO tiopurinas a dosis estándar: riesgo de mielosupresión fatal. Alternativa o dosis <10% de la estándar." },
      { label: "IM (Actividad intermedia)", freq: "~10-15%", action: "Reducir dosis 30-70%. Monitoreo hematológico estrecho." },
      { label: "NM (Actividad normal)", freq: "~85-90%", action: "Dosis estándar." },
    ],
    drugs: ["Azatioprina (EII, artritis reumatoide, trasplante)", "6-Mercaptopurina (leucemia aguda linfoblástica)", "Tioguanina (leucemia)"],
    snps: ["*2 rs1800462 (Ala80Pro)", "*3C rs1142345 (Tyr240Cys, más frecuente en latinoamérica)", "*3A (combinación *3B + *3C)", "NUDT15*3 rs116855232 (especialmente importante en latinoamérica y Asia)"],
    pearl: "NUDT15 y TPMT son complementarios: ambos deben evaluarse para predecir toxicidad por tiopurinas. NUDT15*3 es más frecuente en latinoamericanos (~5-8%) que las variantes TPMT estándar. La prueba CPIC A recomienda ambos genes antes de iniciar azatioprina o 6-MP. La mielosupresión puede ser fatal si no se detecta.",
  },
  {
    id: "DPYD", fullName: "Dihidropirimidina Deshidrogenasa",
    phase: "II", cpicLevel: "A", svgX: 384, svgY: 240,
    color: "#a7f3d0", glow: "#a7f3d040",
    phenotypes: [
      { label: "PM (Deficiencia completa)", freq: "~0.2%", action: "CONTRAINDICADO 5-FU/capecitabina. Riesgo de toxicidad fatal." },
      { label: "IM (Deficiencia parcial)", freq: "~7-10%", action: "Reducir dosis inicial 50%. Escalada cuidadosa según tolerancia." },
      { label: "NM (Normal)", freq: "~90%", action: "Dosis estándar." },
    ],
    drugs: ["5-Fluorouracilo (cáncer colorrectal, gástrico, mama, H&N)", "Capecitabina — Xeloda (profármaco oral de 5-FU)", "Tegafur (profármaco en combinación S-1)"],
    snps: ["*2A rs3918290 (IVS14+1G>A, splice site defect)", "rs67376798 (c.2846A>T, HapB3)", "rs55886062 (c.1679T>G)", "rs75017182 (c.1129-5923 HapB3 haplotype)"],
    pearl: "Desde 2020, la EMA recomienda la genotipificación de DPYD obligatoria antes de iniciar fluoropirimidinas en Europa. Los pacientes PM pueden experimentar toxicidades potencialmente fatales: mucositis severa, diarrea grado 4, neutropenia febril, encefalopatía. En México, las fluoropirimidinas son estándar de tratamiento en los cánceres más frecuentes (colorrectal, gástrico).",
  },
  {
    id: "VKORC1", fullName: "Vitamina K Epóxido Reductasa Complejo 1",
    phase: "II", cpicLevel: "A", svgX: 516, svgY: 240,
    color: "#fde68a", glow: "#fde68a40",
    phenotypes: [
      { label: "Sensible (AA genotipo)", freq: "~37% latinoamericanos", action: "Warfarina: dosis inicial baja (~3 mg/día). Alto riesgo sangrado con dosis estándar." },
      { label: "Moderado (AG genotipo)", freq: "~47%", action: "Warfarina: dosis intermedia (~4-5 mg/día)." },
      { label: "Resistente (GG genotipo)", freq: "~16%", action: "Warfarina: dosis mayor (~6-9 mg/día) para lograr anticoagulación." },
    ],
    drugs: ["Warfarina (anticoagulante oral clásico, diana directa de VKORC1)", "Acenocumarol", "Fenprocumona", "Vitamina K (antagonista endógeno del efecto)"],
    snps: ["-1639G>A rs9923231 (variante de promotor principal, altera expresión ~50%)", "también denominada c.-1639G>A o 3673G>A"],
    pearl: "VKORC1 es el target farmacológico de la warfarina. La variante -1639A reduce la expresión de VKORC1, por lo que se necesita menos warfarina para inhibir la vía. Combinado con CYP2C9 (metabolismo) y CYP4F2 (activación vitamina K), el algoritmo IWPC o CPIC puede reducir eventos hemorrágicos mayores y tiempo en rango INR sub o supraterapeútico.",
  },

  /* ── Transporters ─────────────────────────────────────── */
  {
    id: "SLCO1B1", fullName: "Transportador de Captación Hepática OATP1B1",
    phase: "transporter", cpicLevel: "A", svgX: 670, svgY: 110,
    color: "#fb923c", glow: "#fb923c40",
    phenotypes: [
      { label: "Función normal (*1a, *1b)", freq: "~60-70%", action: "Simvastatina: dosis según guías lipídicas estándar." },
      { label: "Función reducida (hetero *5)", freq: "~20-25%", action: "Evitar simvastatina >20 mg. Preferir pravastatina, rosuvastatina o fluvastatina." },
      { label: "Función pobre (*5/*5 u otros)", freq: "~1-2%", action: "Contraindicación relativa a simvastatina/atorvastatina alta dosis. Monitoreo de CK." },
    ],
    drugs: ["Simvastatina (miopatía inducida 5-17× mayor riesgo con *5)", "Atorvastatina / Pravastatina / Rosuvastatina", "Metotrexato (transporte hepático)", "Repaglinida / Nateglinida"],
    snps: ["*5 rs4149056 (c.521T>C, Val174Ala — variante principal de miopatía)", "*1b rs2306283 (Asn130Asp, frecuente, efecto leve)", "Haplotipos con *5 incluidos en *15, *16, *17"],
    pearl: "SLCO1B1 es el transportador de influx hepático que capta estatinas del plasma hacia el hepatocito. El alelo *5 reduce esta captación → mayor concentración plasmática → miotoxicidad. La FDA retiró simvastatina 80 mg en 2011 por riesgo de miopatía. El riesgo de miopatía grave es ~1 por 10,000 pacientes-año con *5/*5 versus ~1 por 100,000 con función normal.",
  },
  {
    id: "ABCB1", fullName: "P-Glucoproteína (MDR1, ABCB1)",
    phase: "transporter", cpicLevel: "B", svgX: 670, svgY: 240,
    color: "#fdba74", glow: "#fdba7440",
    phenotypes: [
      { label: "Expresión normal / alta", freq: "Variable", action: "Fármacos sustratos: biodisponibilidad reducida por eflujo intestinal y BHE." },
      { label: "Expresión reducida", freq: "Variable por haplotipos", action: "Mayor absorción oral y penetración al SNC de sustratos." },
    ],
    drugs: ["Digoxina (nivel sérico muy sensible a ABCB1)", "Dabigatrán / Rivaroxabán", "Ciclosporina / Tacrolimus", "Ondansetrón / Loperamida", "Morfina / Fentanilo (penetración SNC)"],
    snps: ["rs1045642 (C3435T, sinónimo, efecto en plegamiento)", "rs2032582 (G2677T/A, Ala893Ser/Thr)", "rs1128503 (C1236T)"],
    pearl: "P-gp es una bomba de eflujo que protege al organismo de xenobióticos en intestino, hígado, barrera hematoencefálica (BHE) y placenta. Cuando está inhibida (por ritonavir, ketoconazol), los sustratos alcanzan mayor exposición sistémica. Relevante en polimedicación y en oncología (resistencia multidroga).",
  },
];

const PHASE_I_LABEL = { x: 315, y: 52, text: "FASE I — Oxidación / Reducción (Hígado, Intestino)" };
const PHASE_II_LABEL = { x: 315, y: 185, text: "FASE II — Conjugación / Inactivación" };
const TRANS_LABEL = { x: 670, y: 52, text: "Transportadores" };

function CPICBadge({ level }: { level: "A" | "B" }) {
  return (
    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${level === "A" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
      CPIC {level}
    </span>
  );
}

export default function CYP450Pathway() {
  const [selected, setSelected] = useState<string>("CYP2D6");
  const gene = GENES.find(g => g.id === selected)!;

  return (
    <div className="space-y-0">
      {/* SVG Diagram */}
      <div className="rounded-2xl overflow-hidden bg-[#0a0818] border border-white/5">
        <svg
          viewBox="0 0 780 320"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          className="block"
        >
          <defs>
            <filter id="glow-cyp">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Phase backgrounds */}
            <linearGradient id="phaseI-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0f1f3d" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="phaseII-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f3d2a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#071e14" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="trans-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d2a0f" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1e150a" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Phase I background */}
          <rect x="72" y="62" width="580" height="108" rx="14" fill="url(#phaseI-bg)" />
          {/* Phase II background */}
          <rect x="72" y="195" width="580" height="108" rx="14" fill="url(#phaseII-bg)" />
          {/* Transporters background */}
          <rect x="630" y="62" width="120" height="241" rx="14" fill="url(#trans-bg)" />

          {/* Phase labels */}
          <text x={PHASE_I_LABEL.x} y={PHASE_I_LABEL.y} textAnchor="middle" fill="#93c5fd" fontSize="9.5" fontWeight="600" letterSpacing="0.04em" fontFamily="system-ui">
            {PHASE_I_LABEL.text}
          </text>
          <text x={PHASE_II_LABEL.x} y={PHASE_II_LABEL.y} textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontWeight="600" letterSpacing="0.04em" fontFamily="system-ui">
            {PHASE_II_LABEL.text}
          </text>
          <text x={TRANS_LABEL.x} y={TRANS_LABEL.y} textAnchor="middle" fill="#fb923c" fontSize="8" fontWeight="600" letterSpacing="0.04em" fontFamily="system-ui">
            {TRANS_LABEL.text}
          </text>

          {/* Drug input arrow */}
          <text x="20" y="173" fill="#d1d5db" fontSize="9" fontFamily="system-ui" textAnchor="middle">Fármaco</text>
          <line x1="20" y1="178" x2="68" y2="178" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arr)" />
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280" />
            </marker>
            <marker id="arr-out" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280" />
            </marker>
          </defs>

          {/* Vertical connector Phase I → II */}
          <line x1="315" y1="170" x2="315" y2="193" stroke="#4b5563" strokeWidth="1" strokeDasharray="2,2" />

          {/* Output arrows */}
          <line x1="625" y1="178" x2="626" y2="178" stroke="#6b7280" strokeWidth="1.5" />
          <line x1="752" y1="178" x2="778" y2="178" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arr-out)" />
          <text x="760" y="173" fill="#d1d5db" fontSize="9" fontFamily="system-ui" textAnchor="middle">Excreción /</text>
          <text x="760" y="184" fill="#d1d5db" fontSize="9" fontFamily="system-ui" textAnchor="middle">Diana</text>

          {/* Gene nodes */}
          {GENES.map(g => {
            const isSelected = g.id === selected;
            const r = 28;
            return (
              <g key={g.id} style={{ cursor: "pointer" }} onClick={() => setSelected(g.id)}>
                {isSelected && (
                  <circle cx={g.svgX} cy={g.svgY} r={r + 8} fill={g.glow} />
                )}
                <circle
                  cx={g.svgX} cy={g.svgY} r={r}
                  fill={isSelected ? g.color : "#1e1b2e"}
                  stroke={g.color}
                  strokeWidth={isSelected ? 0 : 1.5}
                />
                <text
                  x={g.svgX} y={g.svgY - 5}
                  textAnchor="middle"
                  fill={isSelected ? "#0f0b1e" : g.color}
                  fontSize="9" fontWeight="700" fontFamily="system-ui"
                >
                  {g.id.length > 8 ? g.id.split("/")[0] : g.id}
                </text>
                {g.id.includes("/") && (
                  <text x={g.svgX} y={g.svgY + 6} textAnchor="middle" fill={isSelected ? "#0f0b1e" : g.color} fontSize="8" fontFamily="system-ui">
                    /{g.id.split("/")[1]}
                  </text>
                )}
                <text
                  x={g.svgX} y={g.svgY + (g.id.includes("/") ? 17 : 8)}
                  textAnchor="middle"
                  fill={isSelected ? "#1e1b2e" : "#9ca3af"}
                  fontSize="7.5" fontFamily="system-ui"
                >
                  CPIC {g.cpicLevel}
                </text>
              </g>
            );
          })}

          {/* Phase I horizontal connecting line */}
          <line x1="76" y1="110" x2="548" y2="110" stroke="#1e3a5f" strokeWidth="1" />
          {/* Phase II horizontal connecting line */}
          <line x1="76" y1="240" x2="548" y2="240" stroke="#0f3d2a" strokeWidth="1" />
        </svg>
      </div>

      {/* Gene detail panel */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden" style={{ borderTop: `3px solid ${gene.color}` }}>
        {/* Gene selector tabs */}
        <div className="flex flex-wrap gap-1.5 p-4 bg-gray-50 border-b border-gray-100">
          {GENES.map(g => (
            <button
              key={g.id}
              onClick={() => setSelected(g.id)}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
              style={selected === g.id
                ? { backgroundColor: g.color, color: "#fff" }
                : { backgroundColor: "#f3f4f6", color: "#6b7280" }
              }
            >
              {g.id}
            </button>
          ))}
        </div>

        <div className="p-5 grid md:grid-cols-3 gap-5">
          {/* Left: identity */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-lg font-bold text-gray-900">{gene.id}</h3>
                <CPICBadge level={gene.cpicLevel} />
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                  Fase {gene.phase === "transporter" ? "Transporte" : gene.phase}
                </span>
              </div>
              <p className="text-xs text-gray-500">{gene.fullName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Fármacos afectados</p>
              <ul className="space-y-0.5">
                {gene.drugs.map((d, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                    <span style={{ color: gene.color }}>›</span>{d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Variantes clave (SNPs)</p>
              <ul className="space-y-0.5">
                {gene.snps.map((s, i) => (
                  <li key={i} className="text-xs text-gray-500 font-mono leading-relaxed">{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center: phenotypes */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fenotipos y acción clínica</p>
            <div className="space-y-2">
              {gene.phenotypes.map((p, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-800">{p.label}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{p.freq}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{p.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: pearl */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Perla clínica</p>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-700 leading-relaxed">{gene.pearl}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
