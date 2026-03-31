import type { Metadata } from "next";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";

export const metadata: Metadata = {
  title: "Proceso de atención",
  description:
    "Desde la recepción hasta el seguimiento: un proceso ordenado, ético y centrado en el paciente.",
};

const STEPS = [
  {
    order: 1,
    title: "Recepción y consentimiento informado",
    description:
      "Un profesional de la salud da la bienvenida al paciente, explicando de forma clara en qué consisten las pruebas de secuenciación, su alcance clínico y su valor dentro del proyecto de investigación. Se enfatiza que, al acceder a los servicios, el paciente también participa en la recolección de datos para un estudio continuo. El consentimiento informado se firma conforme a la NOM-004-SSA3-2012 y otras normas vigentes.",
  },
  {
    order: 2,
    title: "Elaboración de la historia clínica",
    description:
      "Siguiendo los lineamientos de la NOM-004-SSA3-2012, un médico documenta antecedentes familiares, estilo de vida y factores de riesgo específicos. Esta información es crucial para interpretar posteriormente los resultados genéticos y ajustar de manera personalizada las intervenciones recomendadas.",
  },
  {
    order: 3,
    title: "Cuestionarios de estilo de vida",
    description:
      "Evaluación de hábitos de alimentación, actividad física, sueño, estrés y otros factores ambientales relevantes para la interpretación clínica y la construcción del perfil integral del paciente.",
  },
  {
    order: 4,
    title: "Toma de muestras biológicas",
    description:
      "Se realiza la extracción de sangre bajo condiciones de Buenas Prácticas de Laboratorio (BPL), maximizando la calidad del ADN obtenido. La trazabilidad y la seguridad del material biológico son estrictamente vigiladas a fin de evitar errores o contaminaciones.",
  },
  {
    order: 5,
    title: "Análisis genético con tecnología NGS",
    description:
      "El ADN se secuencia utilizando Oxford Nanopore Technologies, permitiendo identificar variantes relevantes en el contexto cardiovascular, nutrigenómico y de rendimiento físico. El equipo de genetistas valida los resultados mediante herramientas bioinformáticas.",
  },
  {
    order: 6,
    title: "Interpretación interdisciplinaria",
    description:
      "Con la colaboración de médicos, nutriólogos, farmacólogos y genetistas, se examinan conjuntamente los resultados, correlacionándolos con la historia clínica y los objetivos individuales del paciente. Este enfoque proporciona una visión integral para la elaboración de recomendaciones fundamentadas.",
  },
  {
    order: 7,
    title: "Entrega de resultados",
    description:
      "Sesión personalizada donde se explican los resultados del análisis genético, los hallazgos relevantes del Índice Alelo y su significado clínico, de forma clara y comprensible para el paciente.",
  },
  {
    order: 8,
    title: "Propuesta de intervención personalizada",
    description:
      "Se diseña un plan integral que puede abarcar modificaciones de la dieta, ajustes en la rutina de ejercicio y suplementación enfocada en las necesidades identificadas. Los hallazgos genéticos sirven como fundamento para personalizar las intervenciones.",
  },
  {
    order: 9,
    title: "Coordinación con especialistas",
    description:
      "En caso de detectarse hallazgos que requieran evaluación o tratamiento adicional, el paciente es referido con cardiólogos, endocrinólogos u otros subespecialistas. Se comparte documentación genética y clínica para un seguimiento coordinado.",
  },
  {
    order: 10,
    title: "Seguimiento clínico e integración investigativa",
    description:
      "Se establece un programa de revisiones periódicas para monitorear la evolución y adaptar las recomendaciones conforme se obtenga nueva evidencia. Con el consentimiento del paciente, los datos se integran de forma anonimizada a las bases de investigación poblacional.",
  },
];

export default function ProcesoClinicoPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Proceso clínico
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Tu proceso de atención
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Desde la consulta inicial hasta el seguimiento personalizado.
            Un proceso ordenado, ético y centrado en el paciente.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gray-700 leading-relaxed text-lg mb-12">
            Nuestro objetivo es guiar al paciente en cada etapa de su experiencia, desde el momento
            en que llega a la clínica hasta la interpretación final de sus resultados, asegurando una
            recolección de datos rigurosa, la aplicación adecuada de las técnicas de secuenciación y
            el trabajo coordinado de un equipo multidisciplinario.
          </p>

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <div key={step.order} className="relative flex gap-6 pb-12 last:pb-0">
                {i < STEPS.length - 1 && (
                  <div className="absolute left-5 top-12 w-px h-full bg-gray-200" />
                )}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8b2fa0] text-white font-bold text-sm flex items-center justify-center z-10">
                  {step.order}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reportes */}
          <div className="mt-16 p-8 rounded-2xl bg-gray-50 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dos reportes por cada estudio</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Reporte clínico</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex gap-2"><span className="text-[#8b2fa0]">›</span>Resumen ejecutivo: qué significa y qué hacer</li>
                  <li className="flex gap-2"><span className="text-[#8b2fa0]">›</span>Índice Alelo o fenotipos farmacogenómicos con interpretación</li>
                  <li className="flex gap-2"><span className="text-[#8b2fa0]">›</span>Detalle técnico mínimo: método, cobertura, limitaciones</li>
                  <li className="flex gap-2"><span className="text-[#8b2fa0]">›</span>Guías y evidencias utilizadas (CPIC/ACMG) con versión y fecha</li>
                  <li className="flex gap-2"><span className="text-[#8b2fa0]">›</span>Recomendaciones y seguimiento: acciones concretas</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-white border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Reporte para el paciente</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex gap-2"><span className="text-[#7c3aed]">›</span>Qué analizó Alelo y cómo</li>
                  <li className="flex gap-2"><span className="text-[#7c3aed]">›</span>Qué se encontró (sin determinismo)</li>
                  <li className="flex gap-2"><span className="text-[#7c3aed]">›</span>Qué hacer a continuación</li>
                  <li className="flex gap-2"><span className="text-[#7c3aed]">›</span>Cómo se protegen y resguardan los datos</li>
                  <li className="flex gap-2"><span className="text-[#7c3aed]">›</span>Cuándo regresar y por qué</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seguimiento */}
          <div className="mt-8 p-8 rounded-2xl bg-purple-50/40 border border-purple-100/60">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Esquema de seguimiento por servicio</h2>
            <div className="space-y-4">
              {[
                {
                  service: "Alelo–PGx",
                  steps: [
                    "2–8 semanas después de un cambio farmacológico basado en el perfil",
                    "Seguimiento anual: actualización de lista de medicamentos y revisión de nuevas guías CPIC",
                    "Basado en eventos: cada vez que se agrega un fármaco con guías disponibles",
                  ],
                },
                {
                  service: "Alelo–Cardiometabólico / Nutrigenómica / Rendimiento",
                  steps: [
                    "Seguimiento 1 (4–8 semanas): adherencia y ajustes al plan",
                    "Seguimiento 2 (3–4 meses): marcadores bioquímicos y metas intermedias",
                    "Seguimiento 3 (6–12 meses): evaluación de impacto y re-estratificación clínica",
                    "Seguimiento anual: revisión del plan, marcadores y actualización de evidencia",
                  ],
                },
              ].map((item) => (
                <div key={item.service} className="p-4 rounded-xl bg-white border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">{item.service}</h4>
                  <ul className="space-y-1">
                    {item.steps.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-[#8b2fa0] flex-shrink-0">›</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/contacto"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Agenda tu cita
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
