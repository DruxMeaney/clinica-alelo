import Link from "next/link";
import { INDICE_ALELO_MODULES } from "@/data/indice-alelo-modules";
import { CLINICAL_STEPS } from "@/data/clinical-flow";
import DnaHelix from "@/components/ui/DnaHelix";
import MolecularGrid from "@/components/ui/MolecularGrid";
import GlowOrbs from "@/components/ui/GlowOrbs";
import GeneClusterViz from "@/components/ui/GeneClusterViz";
import PilarOrbitViz from "@/components/ui/PilarOrbitViz";
import AleleScoreViz from "@/components/ui/AleleScoreViz";
import ProcesoGenomicViz from "@/components/ui/ProcesoGenomicViz";
import PopulationBubbleViz from "@/components/ui/PopulationBubbleViz";

// ─── Data for Tres pilares (with genes for orbit viz) ─────────────────────────
const PILARES = [
  {
    title: "Riesgo cardiometabólico",
    desc:  "Evaluación de susceptibilidades genéticas asociadas a obesidad, diabetes tipo 2, hipertensión, dislipidemias y enfermedad cardiovascular.",
    color: "#8b2fa0",
    genes: [
      { name: "PCSK9",   desc: "Regula el receptor LDL. Variante de pérdida de función confiere protección cardiovascular." },
      { name: "TCF7L2",  desc: "Gen T2D más replicado globalmente. Señalización Wnt en célula β pancreática." },
      { name: "APOE",    desc: "Metabolismo lipídico. Alelo ε4 modifica riesgo cardiovascular y de Alzheimer." },
      { name: "FTO",     desc: "Masa grasa y obesidad. Locus GWAS de obesidad más replicado en estudios globales." },
    ],
  },
  {
    title: "Nutrigenómica",
    desc:  "Análisis de variantes que influyen en la absorción, el metabolismo y los requerimientos individuales de nutrientes.",
    color: "#7c3aed",
    genes: [
      { name: "MTHFR",  desc: "Metabolismo del folato. C677T reduce actividad enzimática ~70%." },
      { name: "VDR",    desc: "Receptor de vitamina D. Variantes modulan absorción y activación." },
      { name: "PPARG",  desc: "Receptor nuclear de ácidos grasos. Regula adipogénesis y sensibilidad a insulina." },
      { name: "CYP1A2", desc: "Metabolismo de cafeína. Variante rs762551 determina velocidad de metabolización." },
    ],
  },
  {
    title: "Respuesta al ejercicio",
    desc:  "Examen de variantes vinculadas con la composición muscular, la capacidad aeróbica y la respuesta al entrenamiento físico.",
    color: "#e11d73",
    genes: [
      { name: "ACTN3",    desc: "α-Actinina-3 en fibras rápidas. R577X determina perfil de potencia vs. resistencia." },
      { name: "ACE",      desc: "Enzima convertidora de angiotensina. Polimorfismo I/D modula respuesta aeróbica." },
      { name: "PPARGC1A", desc: "Coactivador PGC-1α. Regula biogénesis mitocondrial y capacidad de resistencia." },
      { name: "ADRB2",    desc: "Receptor β2-adrenérgico. Variantes modulan respuesta al entrenamiento físico." },
    ],
  },
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — Dark, bold, genetic
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden gradient-alelo-dark min-h-[90vh] flex items-center">
        <GlowOrbs />
        <div className="absolute right-0 top-0 h-full w-80 hidden lg:block">
          <DnaHelix className="h-full w-full" />
        </div>
        <div className="absolute left-10 top-20 hidden xl:block">
          <MolecularGrid className="w-64 h-64" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-purple-400 glow-dot" />
              <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
                Medicina Genómica Preventiva
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              Tu genoma,
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                interpretado
              </span>
              <br />
              para tu salud
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Clínica de investigación genómica y atención personalizada para la prevención
              y el cuidado de la salud en México. Unimos ciencia, clínica y tecnología
              para traducir tu información genética en decisiones de salud.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/nosotros"
                className="px-8 py-4 gradient-alelo text-white font-medium rounded-xl transition-all text-base glow-btn inline-block"
              >
                Conoce nuestro enfoque
              </Link>
              <Link
                href="/ciencia"
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 hover:border-white/30 transition-all text-base"
              >
                Descubre la ciencia detrás
              </Link>
            </div>
            <p className="mt-10 text-sm text-gray-500">
              Clínica e iniciativa científica. Investigación genómica aplicada a la población mexicana.
            </p>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROPUESTA DE VALOR — ¿Por qué Clínica Alelo?
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#fafafa] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              ¿Por qué Clínica Alelo?
            </h2>
            <p className="mt-4 text-gray-500">
              Cerramos la brecha entre la investigación genómica y la práctica clínica,
              con herramientas diseñadas para la población mexicana.
            </p>
          </div>

          {/* Interactive gene cluster visualization — dark container */}
          <div className="mb-10 viz-dark viz-dark-pulse px-4 py-6">
            <GeneClusterViz />
            <p className="text-center text-xs text-gray-500 mt-2">
              Genes del panel Alelo · Pasa el cursor sobre cada nodo para ver más información
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Prevención personalizada",
                description: "Estrategias de salud basadas en tu perfil genético, tu historia clínica y tu estilo de vida.",
                accent: "from-purple-500 to-fuchsia-500",
              },
              {
                title: "Contexto mexicano",
                description: "Herramientas interpretativas construidas con pertinencia biológica y clínica para México.",
                accent: "from-fuchsia-500 to-pink-500",
              },
              {
                title: "Investigación y clínica",
                description: "No solo atendemos pacientes: generamos conocimiento poblacional y contribuimos a la ciencia.",
                accent: "from-violet-500 to-purple-500",
              },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl bg-white border border-gray-100 card-hover group">
                <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${item.accent} mb-6 group-hover:w-16 transition-all glow-bar`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRES PILARES — con visualización orbital por pilar
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 gradient-alelo-soft relative">
        <div className="absolute inset-0 molecular-grid" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tres pilares de atención
            </h2>
            <p className="mt-4 text-gray-500">
              Nuestros ejes iniciales traducen la información genética en estrategias preventivas
              individualizadas, útiles y realistas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILARES.map((pilar) => (
              <div
                key={pilar.title}
                className="rounded-2xl border border-white/50 card-hover flex flex-col overflow-hidden"
                style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
              >
                {/* Dark orbit panel — fondo oscuro para la visualización */}
                <div
                  className="w-full flex items-center justify-center py-6 relative"
                  style={{
                    background: "linear-gradient(145deg, #080410 0%, #0f0008 50%, #08040e 100%)",
                    borderBottom: `1px solid color-mix(in srgb, ${pilar.color} 30%, transparent)`,
                    boxShadow: `inset 0 -20px 40px rgba(0,0,0,0.4), 0 0 20px color-mix(in srgb, ${pilar.color} 10%, transparent)`,
                  }}
                >
                  {/* Subtle radial glow behind the orbit */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, color-mix(in srgb, ${pilar.color} 12%, transparent) 0%, transparent 70%)`,
                    }}
                  />
                  <PilarOrbitViz genes={pilar.genes} color={pilar.color} size={128} />
                </div>
                {/* Text content — light area */}
                <div className="p-6 flex flex-col flex-1">
                  <div
                    className="w-8 h-0.5 rounded-full mb-4 glow-bar"
                    style={{ background: pilar.color }}
                  />
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{pilar.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{pilar.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/servicios" className="text-sm font-medium text-[#8b2fa0] hover:underline">
              Ver todos los servicios &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ÍNDICE ALELO — Dark section con radar de módulos
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 gradient-alelo-dark relative overflow-hidden">
        <GlowOrbs />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
                  Sistema de integración genómica
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 glow-heading">Índice Alelo</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Un sistema diseñado para convertir la información de múltiples variantes genéticas
                en puntajes modulares interpretables. Siete módulos temáticos, una escala de 0 a 100,
                una lectura clínica más clara e intuitiva.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                El resultado no es un destino biológico. Es una herramienta de interpretación
                clínica y preventiva que integra variantes de riesgo y variantes protectoras
                para construir una estimación neta más precisa.
              </p>

              {/* Radar visualization of the 7 modules */}
              <div className="flex items-center gap-6 mb-8">
                <AleleScoreViz />
                <p className="text-xs text-gray-500 leading-relaxed max-w-[160px]">
                  Puntajes ilustrativos de los 7 módulos del Índice Alelo.
                  Pasa el cursor sobre cada eje para ver el módulo.
                </p>
              </div>

              <Link
                href="/indice-alelo"
                className="px-7 py-3.5 gradient-alelo text-white font-medium rounded-xl transition-all glow-btn inline-block"
              >
                Explorar el Índice Alelo
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INDICE_ALELO_MODULES.map((mod) => (
                <div
                  key={mod.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 module-card-hover group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${mod.colorAccent}25` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: mod.colorAccent }} />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{mod.name}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors">{mod.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESO CLÍNICO — con flujo genómico animado
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Proceso de atención</h2>
            <p className="mt-4 text-gray-500">
              Desde la consulta inicial hasta el seguimiento personalizado.
            </p>
          </div>

          {/* Animated genomic flow connector — dark container */}
          <div className="mb-8 viz-dark px-4 py-5">
            <ProcesoGenomicViz />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CLINICAL_STEPS.slice(0, 10).map((step) => (
              <div key={step.order} className="text-center p-4 group">
                <div className="w-11 h-11 rounded-xl gradient-alelo text-white font-bold text-sm flex items-center justify-center mx-auto mb-3 shadow-md shadow-purple-500/20 transition-all glow-btn">
                  {step.order}
                </div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">{step.title}</h4>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/proceso-clinico" className="text-sm font-medium text-[#8b2fa0] hover:underline">
              Ver el proceso completo &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CIENCIA Y POBLACIÓN — con frecuencias poblacionales
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-purple-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Genómica con contexto mexicano
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                La población mexicana presenta una mezcla compleja de ancestrías y frecuencias
                alélicas distintas a las de otras poblaciones. Extrapolar hallazgos sin contexto
                local puede ser insuficiente o engañoso.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                Clínica Alelo construye herramientas con mayor pertinencia biológica y clínica
                para México.
              </p>
              {/* Population bubble viz — SLC16A11 */}
              <div className="viz-dark px-4 pt-4 pb-2 mt-2">
                <PopulationBubbleViz variant="genomica" />
              </div>
              <div className="mt-5">
                <Link href="/ciencia" className="text-sm font-medium text-[#8b2fa0] hover:underline">
                  Ver Ciencia &rarr;
                </Link>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-purple-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Investigación traslacional
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                No solo prestamos servicios. Generamos conocimiento: bases de datos,
                prevalencia de variantes, validación metodológica, publicaciones científicas.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                Nuestro estudio piloto valida el modelo con vocación metodológica y estructura
                científica.
              </p>
              {/* Population bubble viz — MTHFR C677T */}
              <div className="viz-dark px-4 pt-4 pb-2 mt-2">
                <PopulationBubbleViz variant="traslacional" />
              </div>
              <div className="mt-5">
                <Link href="/ciencia" className="text-sm font-medium text-[#8b2fa0] hover:underline">
                  Investigación y ciencia &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 gradient-alelo-dark relative overflow-hidden">
        <GlowOrbs />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comienza tu perfil genómico
          </h2>
          <p className="text-purple-200/70 mb-10 text-lg">
            Agenda una consulta, conoce nuestro proceso o vincula tu institución con Clínica Alelo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="px-8 py-4 bg-white text-[#6b1d7b] font-medium rounded-xl hover:shadow-xl hover:shadow-purple-500/20 transition-all"
            >
              Agenda una consulta
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-all"
            >
              Preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
