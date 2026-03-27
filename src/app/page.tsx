import Link from "next/link";
import { INDICE_ALELO_MODULES } from "@/data/indice-alelo-modules";
import { CLINICAL_STEPS } from "@/data/clinical-flow";

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#2D6A4F] tracking-widest uppercase mb-4">
              Medicina Genómica Preventiva
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Tu genoma, interpretado para tu salud
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Clínica de investigación genómica y atención personalizada para la prevención
              y el cuidado de la salud en México. Unimos ciencia, clínica y tecnología
              para traducir tu información genética en decisiones de salud.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/nosotros"
                className="px-7 py-3.5 bg-[#2D6A4F] text-white font-medium rounded-lg hover:bg-[#245A42] transition-colors"
              >
                Conoce nuestro enfoque
              </Link>
              <Link
                href="/indice-alelo"
                className="px-7 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
              >
                Descubre el Índice Alelo
              </Link>
            </div>
            <p className="mt-8 text-xs text-gray-400">
              Clínica e iniciativa científica. Investigación genómica aplicada a la población mexicana.
            </p>
          </div>
        </div>
        {/* Visual element placeholder */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-[#2D6A4F]/20 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROPUESTA DE VALOR — 3 columnas
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              ¿Por qué Clínica Alelo?
            </h2>
            <p className="mt-4 text-gray-600">
              Cerramos la brecha entre la investigación genómica y la práctica clínica,
              con herramientas diseñadas para la población mexicana.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Prevención personalizada",
                description:
                  "Estrategias de salud basadas en tu perfil genético, tu historia clínica y tu estilo de vida.",
              },
              {
                title: "Contexto mexicano",
                description:
                  "Herramientas interpretativas construidas con pertinencia biológica y clínica para México.",
              },
              {
                title: "Investigación y clínica",
                description:
                  "No solo atendemos pacientes: generamos conocimiento poblacional y contribuimos a la ciencia.",
              },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#2D6A4F]/10 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRES PILARES
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Tres pilares de atención
            </h2>
            <p className="mt-4 text-gray-600">
              Nuestros ejes iniciales traducen la información genética en estrategias preventivas
              individualizadas, útiles y realistas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Riesgo cardiometabólico",
                description:
                  "Evaluación de susceptibilidades genéticas asociadas a obesidad, diabetes tipo 2, hipertensión, dislipidemias y enfermedad cardiovascular.",
                color: "#1B4965",
              },
              {
                title: "Nutrigenómica",
                description:
                  "Análisis de variantes que influyen en la absorción, el metabolismo y los requerimientos individuales de nutrientes.",
                color: "#606C38",
              },
              {
                title: "Respuesta al ejercicio",
                description:
                  "Examen de variantes vinculadas con la composición muscular, la capacidad aeróbica y la respuesta al entrenamiento físico.",
                color: "#3A7D44",
              },
            ].map((pilar) => (
              <div key={pilar.title} className="p-8 rounded-2xl bg-white border border-gray-100">
                <div
                  className="w-12 h-1 rounded-full mb-6"
                  style={{ backgroundColor: pilar.color }}
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{pilar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pilar.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/servicios" className="text-sm font-medium text-[#2D6A4F] hover:underline">
              Ver todos los servicios &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ÍNDICE ALELO — Preview
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-[#2D6A4F] uppercase tracking-wider mb-2">
                Sistema de integración genómica
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Índice Alelo</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Un sistema diseñado para convertir la información de múltiples variantes genéticas
                en puntajes modulares interpretables. Siete módulos temáticos, una escala de 0 a 100,
                una lectura clínica más clara e intuitiva.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                El resultado no es un destino biológico. Es una herramienta de interpretación
                clínica y preventiva que integra variantes de riesgo y variantes protectoras
                para construir una estimación neta más precisa.
              </p>
              <Link
                href="/indice-alelo"
                className="px-6 py-3 bg-[#2D6A4F] text-white font-medium rounded-lg hover:bg-[#245A42] transition-colors"
              >
                Explorar el Índice Alelo
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INDICE_ALELO_MODULES.map((mod) => (
                <div
                  key={mod.id}
                  className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${mod.colorAccent}15` }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mod.colorAccent }} />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{mod.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{mod.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESO CLÍNICO — Preview
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Proceso de atención</h2>
            <p className="mt-4 text-gray-600">
              Desde la consulta inicial hasta el seguimiento personalizado.
              Un proceso ordenado, ético y centrado en el paciente.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CLINICAL_STEPS.slice(0, 10).map((step) => (
              <div key={step.order} className="text-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] font-bold text-sm flex items-center justify-center mx-auto mb-3">
                  {step.order}
                </div>
                <h4 className="text-xs font-semibold text-gray-900 mb-1">{step.title}</h4>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/proceso-clinico" className="text-sm font-medium text-[#2D6A4F] hover:underline">
              Ver el proceso completo &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CIENCIA Y POBLACIÓN
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Genómica con contexto mexicano
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La población mexicana presenta una mezcla compleja de ancestrías y frecuencias
                alélicas distintas a las de otras poblaciones. Extrapolar hallazgos sin contexto
                local puede ser insuficiente o engañoso.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Clínica Alelo construye herramientas con mayor pertinencia biológica y clínica
                para México, generando bases de datos genómicas contextualizadas y validando
                modelos interpretativos propios.
              </p>
              <Link href="/genomica-poblacional" className="text-sm font-medium text-[#2D6A4F] hover:underline">
                Conoce más sobre genómica poblacional &rarr;
              </Link>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Investigación traslacional
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                No solo prestamos servicios. Generamos conocimiento: bases de datos,
                prevalencia de variantes, validación metodológica, publicaciones científicas
                y vinculación institucional.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Nuestro estudio piloto valida el modelo de atención e investigación genómica
                con vocación metodológica y estructura científica.
              </p>
              <Link href="/investigacion" className="text-sm font-medium text-[#2D6A4F] hover:underline">
                Ver líneas de investigación &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#2D6A4F]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comienza tu perfil genómico
          </h2>
          <p className="text-emerald-100 mb-10">
            Agenda una consulta, conoce nuestro proceso o vincula tu institución con Clínica Alelo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="px-7 py-3.5 bg-white text-[#2D6A4F] font-medium rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Agenda una consulta
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="px-7 py-3.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
