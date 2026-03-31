"use client";

import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";
import CYP450Pathway from "@/components/ui/CYP450Pathway";
import LipidPathway from "@/components/ui/LipidPathway";
import FolateCycle from "@/components/ui/FolateCycle";
import PathwayIntersectionMap from "@/components/ui/PathwayIntersectionMap";

/* ─── Data: evidence genes ─────────────────────────────────────────────── */
const EVIDENCE_GENES = [
  { gene: "CYP2D6",       service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "*4, *5, *10, *41",      mexican: "PM ~7-10%; *10 frecuente en mestizos" },
  { gene: "CYP2C19",      service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "*2, *3, *17",           mexican: "UM *17 ~5-7%; PM ~3-5%; relevante en cardiopatía" },
  { gene: "CYP2C9",       service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "*2, *3",                mexican: "*3 ~2-4% (menor que europeos); warfarina" },
  { gene: "CYP3A4/5",     service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "*22, CYP3A5*3",        mexican: "CYP3A5*3 ~83-92%; relevante en trasplante" },
  { gene: "SLCO1B1",      service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "*5 rs4149056",          mexican: "*5 ~14-17% en mestizos; estatinas" },
  { gene: "UGT1A1",       service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "*28, *6",              mexican: "*28 ~40%; síndrome Gilbert frecuente" },
  { gene: "TPMT/NUDT15",  service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "*3C, NUDT15*3",        mexican: "NUDT15*3 ~5-8%; riesgo mielosupresión" },
  { gene: "DPYD",         service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "*2A, rs67376798",       mexican: "IM ~7-10%; alta carga cáncer GI" },
  { gene: "VKORC1",       service: "PGx",                       cpic: "A", pharmgkb: "1A", variants: "-1639G>A rs9923231",   mexican: "Alelo A sensible ~37% latinoamericanos" },
  { gene: "MTHFR",        service: "Nutrigenómica",              cpic: "B", pharmgkb: "2A", variants: "C677T, A1298C",        mexican: "TT ~18-32%: uno de los más altos mundialmente" },
  { gene: "APOE",         service: "Cardiometabólico",           cpic: "—", pharmgkb: "1A", variants: "ε2/ε3/ε4 (rs429358)", mexican: "ε4 ~14-18%; resistencia a insulina amplifica riesgo" },
  { gene: "PCSK9",        service: "Cardiometabólico",           cpic: "—", pharmgkb: "2A", variants: "GOF / LOF variants",  mexican: "HF subdiagnosticada; LOF reduce LDL 30-40%" },
  { gene: "SLC16A11",     service: "Cardiometabólico",           cpic: "—", pharmgkb: "2A", variants: "rs13342692 haplotipo", mexican: "~29% mestizos, ~50% indígenas: T2D más específico de América" },
  { gene: "ACTN3",        service: "Rendimiento",                cpic: "—", pharmgkb: "—",  variants: "R577X rs1815739",      mexican: "XX ~18-25% en mestizos; fibra muscular tipo II" },
  { gene: "ACE I/D",      service: "Cardiometabólico/Rendimiento", cpic: "—", pharmgkb: "2B", variants: "rs4646994 (I/D)",   mexican: "Alelo I ~50%; DD asociado a HTA y ejercicio" },
];

const DATABASES = [
  { name: "CPIC",         url: "https://cpicpgx.org",                  description: "Guías farmacogenómicas basadas en evidencia con recomendaciones de dosificación por genotipo.", badge: "Guías A-D",    color: "#16a34a" },
  { name: "PharmGKB",    url: "https://pharmgkb.org",                  description: "Base de datos curada de asociaciones gen-fármaco, rutas farmacogenómicas y literatura anotada.", badge: "Evidence 1A-4", color: "#7c3aed" },
  { name: "ClinVar",     url: "https://ncbi.nlm.nih.gov/clinvar",      description: "Variantes genéticas con significancia clínica documentada bajo el marco ACMG/AMP.",             badge: "ACMG/AMP",    color: "#0284c7" },
  { name: "gnomAD v4",   url: "https://gnomad.broadinstitute.org",     description: "Frecuencias alélicas poblacionales en >807,000 individuos (730,947 exomas + 76,215 genomas) incluyendo Latino/AMR.",       badge: ">807k",       color: "#0891b2" },
  { name: "PharmVar",    url: "https://pharmvar.org",                  description: "Nomenclatura oficial de alelos estrella (*1, *2…) para genes farmacogenómicos.",                badge: "Star alleles", color: "#e11d73" },
  { name: "OMIM",        url: "https://omim.org",                     description: "Catálogo de genes y fenotipos genéticos, incluyendo herencia monogénica relevante.",             badge: "Mendelian",   color: "#f59e0b" },
  { name: "Reactome",    url: "https://reactome.org",                 description: "Base de datos curada de rutas biológicas y reacciones moleculares. Fuente para enriquecimiento.", badge: "Pathways",    color: "#8b5cf6" },
  { name: "SIGMA 2014",  url: "https://www.broadinstitute.org",       description: "Consorcio que identificó SLC16A11 como factor de riesgo T2D específico de México.",             badge: "T2D México",  color: "#dc2626" },
];

const SERVICE_COLOR: Record<string, string> = {
  "PGx": "#8b2fa0",
  "Nutrigenómica": "#0284c7",
  "Cardiometabólico": "#e11d73",
  "Rendimiento": "#059669",
  "Cardiometabólico/Rendimiento": "#7c3aed",
};

function PharmGKBBadge({ level }: { level: string }) {
  if (level === "—") return <span className="text-gray-400 text-xs">—</span>;
  const color = level === "1A" ? "#16a34a" : level === "2A" ? "#0284c7" : "#6b7280";
  return <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: color + "20", color }}>{level}</span>;
}
function CPICBadge({ level }: { level: string }) {
  if (level === "—") return <span className="text-gray-400 text-xs">—</span>;
  const color = level === "A" ? "#16a34a" : "#0284c7";
  return <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: color + "20", color }}>CPIC {level}</span>;
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function ViasMetabolicasPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-28">
        <GlowOrbs />
        <div className="max-w-5xl mx-auto px-6 relative z-10">

          {/* Back-breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
            <Link href="/ciencia" className="hover:text-purple-300 transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Sección de Ciencia
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400">Rutas metabólicas</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b2fa0]"></span>
            <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
              Capa molecular del panel Alelo
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-3xl leading-tight">
            La maquinaria molecular donde actúan los 94 genes
          </h1>
          <p className="mt-5 text-lg text-gray-300 max-w-3xl leading-relaxed">
            Si la sección de Ciencia muestra <em>qué variantes</em> existen y <em>cuán significativas</em> son
            estadísticamente, esta sección muestra <em>dónde actúan</em> molecularmente. Tres sistemas biológicos
            concentran la mayor densidad clínica del panel —y los tres se intersectan en puntos con consecuencias directas para la práctica médica.
          </p>

          {/* Quick-nav chips */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Sistema CYP450", anchor: "#cyp450",    color: "#8b2fa0" },
              { label: "Metabolismo lipídico", anchor: "#lipido", color: "#e11d73" },
              { label: "Ciclo del folato",  anchor: "#folato",  color: "#059669" },
              { label: "Convergencia entre rutas", anchor: "#intersecciones", color: "#7c3aed" },
            ].map(({ label, anchor, color }) => (
              <a
                key={anchor}
                href={anchor}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
                style={{ borderColor: `${color}50`, color, backgroundColor: `${color}12` }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Context strip ───────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(90deg, #0d0920 0%, #140828 50%, #0d0920 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-[#8b2fa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.170.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.8 1.8M5 14.5l-1.8 1.8M3.2 16.8l2.5 2.5M20.8 16.8l-2.5 2.5" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Posición en el recorrido científico</p>
              <p className="text-gray-400 text-xs leading-relaxed mt-0.5">
                Esta sección es la profundización molecular de la{" "}
                <Link href="/ciencia#redes" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                  Sección 05 — Redes biológicas
                </Link>{" "}
                del itinerario de Ciencia. El Índice Alelo integra estas vías en{" "}
                <Link href="/ciencia#modelo" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                  7 módulos clínicos (Sección 06)
                </Link>.
              </p>
            </div>
          </div>
          <Link
            href="/ciencia#modelo"
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-purple-300 border border-purple-800/40 hover:border-purple-600/60 transition-colors"
          >
            Continuar al Índice Alelo
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-28">

        {/* ══ SECCIÓN 1: CYP450 ════════════════════════════════════════ */}
        <section id="cyp450" style={{ scrollMarginTop: "72px" }}>
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #8b2fa0, #7c3aed)" }}>1</div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8b2fa0]/20 text-[#8b2fa0] font-semibold">M6 — Farmacogenética</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8b2fa0]/10 text-gray-400">CPIC Nivel A · PharmGKB 1A</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Sistema CYP450 — Farmacogenómica de precisión</h2>
              <p className="text-gray-500 mt-1 text-sm">Enzimas de Fase I · Fase II · Transportadores de membrana</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <div className="md:col-span-3 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Las enzimas del citocromo P450 son el sistema de biotransformación xenobiótica más importante del organismo.
                Determinan si un fármaco se convierte en su forma activa, si es eliminado demasiado rápido para ser eficaz,
                o si se acumula hasta niveles tóxicos. Este perfil individual —el <strong>fenotipo metabolizador</strong>—
                varía genéticamente y es altamente heredable.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                El servicio <strong>Alelo-PGx</strong> traduce los genotipos de CYP2D6, CYP2C19, CYP2C9 y CYP3A4/5 en fenotipos
                predichos (PM/IM/NM/UM) y los contrasta con las guías CPIC correspondientes al medicamento prescrito.
                La integración de transportadores (SLCO1B1, ABCB1) y enzimas de Fase II (UGT1A1, TPMT, DPYD) permite
                cubrir más del 80% de los medicamentos con guías farmacogenómicas disponibles.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                En México, la distribución de fenotipos metabolizadores difiere en algunos genes respecto a las cohortes
                de referencia europeas: NUDT15*3, relevante para tiopurinas, es más frecuente en la población mestiza
                (~5-8%) que en europeos (&lt;1%), un hallazgo con implicaciones directas para oncología pediátrica.
              </p>
            </div>
            <div className="md:col-span-2 space-y-3">
              {[
                { val: "~25%", desc: "de todos los fármacos son metabolizados por CYP2D6", color: "#8b2fa0" },
                { val: ">50%", desc: "de los fármacos en uso clínico dependen de CYP3A4/5", color: "#7c3aed" },
                { val: "~7-10%", desc: "de mexicanos son metabolizadores pobres de CYP2D6", color: "#8b2fa0" },
                { val: "~5-8%", desc: "de mestizos portan NUDT15*3 (mayor que europeos)", color: "#e11d73" },
              ].map(({ val, desc, color }) => (
                <div key={val} className="p-3.5 rounded-xl bg-white border border-gray-100 flex items-start gap-3">
                  <span className="text-xl font-bold shrink-0" style={{ color }}>{val}</span>
                  <span className="text-xs text-gray-500 leading-tight">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Callout clínico */}
          <div className="mb-8 p-5 rounded-2xl flex items-start gap-4"
            style={{ background: "rgba(139,47,160,0.07)", border: "1px solid rgba(139,47,160,0.2)" }}>
            <span className="text-[#8b2fa0] shrink-0 mt-0.5 text-lg">⚕</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Consecuencia clínica central</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Un metabolizador pobre de CYP2C19 tratado con clopidogrel (antiagregante) puede no activar el fármaco
                y sufrir un evento cardiovascular evitable. Un metabolizador ultrarrápido de CYP2D6 tratado con
                codeína puede experimentar toxicidad opiácea severa. Ambos escenarios son prevenibles con el
                genotipo disponible antes de la prescripción.
              </p>
            </div>
          </div>

          <CYP450Pathway />
        </section>

        {/* ══ SECCIÓN 2: METABOLISMO LIPÍDICO ═══════════════════════════ */}
        <section id="lipido" style={{ scrollMarginTop: "72px" }}>
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #e11d73, #8b2fa0)" }}>2</div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e11d73]/20 text-[#e11d73] font-semibold">M4 — Cardiovascular</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e11d73]/10 text-gray-400">GWAS · PharmGKB 1A-2A</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Metabolismo lipídico — Riesgo cardiometabólico</h2>
              <p className="text-gray-500 mt-1 text-sm">Síntesis hepática · Transporte lipoproteinario · Captación periférica</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <div className="md:col-span-3 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                El metabolismo lipídico no es una sola ruta: es una red de circuitos que conecta la absorción intestinal
                de quilomicrones, la síntesis hepática de VLDL y LDL, y el transporte reverso de colesterol vía HDL.
                Los genes del panel actúan como reguladores críticos de cada uno de estos nodos. PCSK9, por ejemplo,
                degrada al receptor LDL reduciendo la captación hepatocítica de LDL-C; sus variantes de pérdida de
                función se asocian a reducciones de LDL de 30-40 mg/dL y protección cardiovascular robusta.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                El hallazgo más relevante para México en esta vía es <strong>SLC16A11</strong>: un haplotipo de riesgo
                para diabetes tipo 2 identificado por el Consorcio SIGMA en 2014, con frecuencia de ~29% en mestizos
                y ~50% en poblaciones indígenas, frente a &lt;2% en europeos. SLC16A11 codifica un transportador
                de la familia MCT localizado en el retículo endoplásmico hepático, cuya disfunción eleva diacilgliceroles hepáticos y promueve resistencia a la insulina.
                Este hallazgo es la demostración más contundente de por qué el panel necesita calibración local.
              </p>
            </div>
            <div className="md:col-span-2 space-y-3">
              {[
                { val: "37%", desc: "de adultos mexicanos tienen hipertrigliceridemia clínica", color: "#e11d73" },
                { val: "~29%", desc: "de mestizos portan el haplotipo de riesgo SLC16A11", color: "#8b2fa0" },
                { val: ">200k", desc: "mexicanos estimados con hipercolesterolemia familiar", color: "#e11d73" },
                { val: "<5%", desc: "de casos de hipercolesterolemia familiar diagnosticados", color: "#dc2626" },
              ].map(({ val, desc, color }) => (
                <div key={val} className="p-3.5 rounded-xl bg-white border border-gray-100 flex items-start gap-3">
                  <span className="text-xl font-bold shrink-0" style={{ color }}>{val}</span>
                  <span className="text-xs text-gray-500 leading-tight">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Callout clínico */}
          <div className="mb-8 p-5 rounded-2xl flex items-start gap-4"
            style={{ background: "rgba(225,29,115,0.07)", border: "1px solid rgba(225,29,115,0.2)" }}>
            <span className="text-[#e11d73] shrink-0 mt-0.5 text-lg">⚕</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Consecuencia clínica central</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Un paciente con variante PCSK9 de ganancia de función (GOF) puede mantener LDL-C persistentemente
                elevado pese a dieta adecuada, indicando estatinas de alta intensidad o inhibidores PCSK9 biológicos
                desde edad temprana. Un paciente SLC16A11 positivo requiere seguimiento glucémico más frecuente y
                énfasis en pérdida de peso hepático como intervención primaria.
              </p>
            </div>
          </div>

          <LipidPathway />
        </section>

        {/* ══ SECCIÓN 3: CICLO DEL FOLATO ══════════════════════════════ */}
        <section id="folato" style={{ scrollMarginTop: "72px" }}>
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #059669, #0284c7)" }}>3</div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#059669]/20 text-[#059669] font-semibold">M5 — Nutrigenómica</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#059669]/10 text-gray-400">CPIC B · PharmGKB 2A</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ciclo del folato — Nutrigenómica y epigenética</h2>
              <p className="text-gray-500 mt-1 text-sm">Metilación de ADN · Síntesis de purinas · Regulación de homocisteína</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <div className="md:col-span-3 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                El ciclo del folato integra la vitamina B9 en dos funciones celulares críticas: la síntesis de
                timidilato y purinas (indispensable para replicación de ADN) y la generación del donador universal
                de grupos metilo SAM (S-adenosilmetionina), que participa en más de 200 reacciones de metilación,
                incluyendo regulación epigenética de histonas y ADN, síntesis de neurotransmisores y metabolismo
                de homocisteína.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                <strong>MTHFR C677T</strong> (rs1801133) es la variante de mayor impacto en este ciclo. La sustitución
                C→T genera una enzima termoestable con actividad reducida 35-70% en homocigotos (TT). México tiene
                una de las prevalencias de TT más altas del mundo (~18-32% en mestizos, hasta ~40% en poblaciones
                indígenas), lo que históricamente se asoció a tasas de defectos de tubo neural de 7–14 por 10,000
                nacidos vivos (antes de la fortificación obligatoria con ácido fólico); actualmente la tasa
                post-fortificación es de ~3–4 por 10,000, aunque sigue siendo una de las más altas de la región.
                La intervención nutricional de elección es el
                L-metilfolato (5-MTHF) activo, que bypasea el bloqueo enzimático.
              </p>
            </div>
            <div className="md:col-span-2 space-y-3">
              {[
                { val: "~18-32%", desc: "de mexicanos con genotipo TT en MTHFR C677T", color: "#059669" },
                { val: "~40%",    desc: "de TT en algunas poblaciones indígenas de México", color: "#047857" },
                { val: ">200",    desc: "reacciones de metilación dependen de SAM como donador", color: "#059669" },
                { val: "~3-4/10k", desc: "nacidos vivos con defectos de tubo neural en México (post-fortificación; cifra histórica pre-fortif.: 7–14)", color: "#dc2626" },
              ].map(({ val, desc, color }) => (
                <div key={val} className="p-3.5 rounded-xl bg-white border border-gray-100 flex items-start gap-3">
                  <span className="text-xl font-bold shrink-0" style={{ color }}>{val}</span>
                  <span className="text-xs text-gray-500 leading-tight">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Callout clínico */}
          <div className="mb-8 p-5 rounded-2xl flex items-start gap-4"
            style={{ background: "rgba(5,150,105,0.07)", border: "1px solid rgba(5,150,105,0.2)" }}>
            <span className="text-[#059669] shrink-0 mt-0.5 text-lg">⚕</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Consecuencia clínica central</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Un paciente TT en MTHFR con niveles bajos de B12 y folato en dieta puede desarrollar
                hiperhomocisteinemia, que daña el endotelio vascular independientemente del colesterol.
                La suplementación con L-metilfolato 400-800 mcg/día + metilcobalamina puede reducir la
                homocisteína hasta un 25-30%, con evidencia de reducción del riesgo de defectos de tubo
                neural en gestación y reducción modesta del riesgo de ictus (~10% en metaanálisis de
                ensayos clínicos aleatorizados).
              </p>
            </div>
          </div>

          <FolateCycle />
        </section>

        {/* ══ SECCIÓN 4: INTERSECCIONES ENTRE VÍAS ═════════════════════ */}
        <section id="intersecciones" style={{ scrollMarginTop: "72px" }}>
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #7c3aed, #e11d73, #059669)" }}>×</div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#7c3aed]/20 text-[#7c3aed] font-semibold">Convergencia clínica</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#7c3aed]/10 text-gray-400">Rutas cruzadas · Interpretación integrada</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Las tres vías se intersectan</h2>
              <p className="text-gray-500 mt-1 text-sm">Los sistemas biológicos no operan en silos. Sus intersecciones generan los escenarios clínicos más complejos —y los más relevantes.</p>
            </div>
          </div>

          <div className="space-y-5 text-gray-600 text-sm leading-relaxed mb-10 max-w-3xl">
            <p>
              Un análisis de variantes aisladas puede perder el efecto real de un genotipo cuando este opera
              a través de múltiples rutas simultáneamente. La farmacogenómica del CYP450 no está desconectada
              del riesgo lipídico: los transportadores que llevan las estatinas al hígado son los mismos genes
              que la farmacogenómica evalúa. El ciclo del folato no está desconectado del riesgo cardiovascular:
              la homocisteína elevada por MTHFR daña el mismo endotelio que PCSK9 y APOE comprometen por otras vías.
            </p>
            <p>
              Haz clic en cada punto de intersección del diagrama para explorar la evidencia clínica de cada convergencia.
            </p>
          </div>

          <PathwayIntersectionMap />
        </section>

        {/* ══ SECCIÓN 5: EVIDENCIA GENÓMICA ════════════════════════════ */}
        <section id="evidencia" style={{ scrollMarginTop: "72px" }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center text-[#8b2fa0] font-bold text-sm border border-purple-100">4</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Matriz de evidencia genómica</h2>
              <p className="text-gray-500 mt-1 text-sm">Genes del panel Alelo con niveles de evidencia CPIC y PharmGKB — ordenados por vía y módulo</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100" style={{ background: "#fafafa" }}>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Gen</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Servicio</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">CPIC</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">PharmGKB</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Variantes clave</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Relevancia en México</th>
                </tr>
              </thead>
              <tbody>
                {EVIDENCE_GENES.map((row, i) => (
                  <tr key={row.gene} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-3">
                      <span className="font-mono font-bold text-gray-900 text-xs">{row.gene}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: (SERVICE_COLOR[row.service] ?? "#8b2fa0") + "18",
                          color: SERVICE_COLOR[row.service] ?? "#8b2fa0",
                        }}>
                        {row.service}
                      </span>
                    </td>
                    <td className="p-3"><CPICBadge level={row.cpic} /></td>
                    <td className="p-3"><PharmGKBBadge level={row.pharmgkb} /></td>
                    <td className="p-3 hidden md:table-cell">
                      <span className="text-xs text-gray-500 font-mono">{row.variants}</span>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <span className="text-xs text-gray-600 leading-snug">{row.mexican}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
            <span><strong className="text-green-700">CPIC A</strong> — Recomendación fuerte, evidencia alta</span>
            <span><strong className="text-blue-600">CPIC B</strong> — Recomendación moderada</span>
            <span><strong className="text-green-700">PharmGKB 1A</strong> — Asociación farmacogenómica nivel máximo</span>
            <span><strong className="text-blue-600">PharmGKB 2A/2B</strong> — Asociación moderada</span>
          </div>
        </section>

        {/* ══ SECCIÓN 6: BASES DE DATOS ═════════════════════════════════ */}
        <section id="fuentes" style={{ scrollMarginTop: "72px" }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 font-bold text-sm border border-gray-100">5</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Fuentes y bases de datos</h2>
              <p className="text-gray-500 mt-1 text-sm">Las interpretaciones del panel Alelo se basan en fuentes de acceso abierto con actualización continua</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DATABASES.map((db) => (
              <a
                key={db.name}
                href={db.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all space-y-2 group block"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#8b2fa0] transition-colors">{db.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: db.color + "18", color: db.color }}>
                    {db.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{db.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Estándares de nomenclatura y clasificación</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <strong>ACMG/AMP (2015, actualizado 2023):</strong> Marco de 5 categorías para clasificación de variantes:
                Patogénica · Probablemente patogénica · VUS · Probablemente benigna · Benigna.
                Alelo reporta variantes inesperadas de alta penetrancia bajo este marco cuando aplica.
              </div>
              <div>
                <strong>Nomenclatura estrella (PharmVar / CPIC):</strong> Los genes farmacogenómicos usan alelos estrella
                (*1 = función normal, *2, *3, etc.) para definir haplotipos funcionalmente relevantes.
                Las guías CPIC definen el fenotipo predicho (PM/IM/NM/UM) a partir del diplotipo observado.
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA FINAL ═════════════════════════════════════════════════ */}
        <section className="pt-8 border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-100">
              <p className="text-xs font-semibold text-[#8b2fa0] tracking-widest uppercase mb-2">Siguiente paso en la narrativa</p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ver cómo se integra en el Índice Alelo</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Estas tres vías alimentan los 7 módulos del modelo probabilístico. La Sección 06 de Ciencia
                explica la fórmula Pᵢ × Wᵢ y cómo se asignan los pesos clínicos.
              </p>
              <Link href="/ciencia#modelo"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all"
                style={{ background: "linear-gradient(135deg, #8b2fa0, #7c3aed)" }}>
                Índice Alelo — Sección 06
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-100">
              <p className="text-xs font-semibold text-[#e11d73] tracking-widest uppercase mb-2">Aplicación clínica</p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Traducir esto en acción terapéutica</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Los servicios Alelo-PGx, Alelo-Cardiometabólico y Alelo-Nutrigenómica aplican exactamente
                este marco molecular a cada perfil genético individual.
              </p>
              <Link href="/contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-[#8b2fa0] text-[#8b2fa0] hover:bg-purple-50 transition-all">
                Agenda una consulta
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/ciencia" className="px-5 py-2.5 border border-gray-200 text-gray-600 font-medium text-sm rounded-lg hover:border-[#8b2fa0] hover:text-[#8b2fa0] transition-colors">
              ← Volver a la sección de Ciencia
            </Link>
            <Link href="/nosotros#servicios" className="px-5 py-2.5 border border-gray-200 text-gray-600 font-medium text-sm rounded-lg hover:border-[#8b2fa0] hover:text-[#8b2fa0] transition-colors">
              Ver los cuatro servicios →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
