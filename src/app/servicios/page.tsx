import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";

export const metadata: Metadata = {
  title: "Servicios clínicos y genómicos",
  description:
    "Alelo-PGx, Alelo-Cardiometabólico, Alelo-Nutrigenómica y Alelo-Rendimiento Físico: cuatro servicios de medicina de precisión basados en tu perfil genético.",
};

const SERVICES = [
  {
    name: "Alelo–PGx",
    label: "Farmacogenómica",
    tier: "Nivel 1 — Acción terapéutica directa",
    image: "/images/genomics-lab.jpg",
    imageAlt: "Análisis farmacogenómico de precisión",
    color: "#e11d73",
    description:
      "Recomendaciones de selección o ajuste de medicamentos basadas en el genotipo del paciente, conforme a guías CPIC (Clinical Pharmacogenetics Implementation Consortium). Traduce la información genética en acciones terapéuticas concretas.",
    targets: [
      "Pacientes con polifarmacia o tratamientos crónicos",
      "Reacciones adversas previas a medicamentos",
      "Falta de respuesta terapéutica documentada",
      "Prescripciones con guías farmacogenómicas disponibles",
    ],
    output:
      "Reporte genotipo/diplotipo → fenotipo → recomendación clínica, con versión de guías CPIC/ACMG utilizadas.",
  },
  {
    name: "Alelo–Cardiometabólico",
    label: "Riesgo cardiometabólico",
    tier: "Nivel 2 — Prevención y estratificación de riesgo",
    image: "/images/cardiovascular.jpg",
    imageAlt: "Prevención cardiometabólica personalizada",
    color: "#8b2fa0",
    description:
      "Perfil genético para la prevención y seguimiento cardiometabólico, integrado con datos clínicos y marcadores de laboratorio. Evalúa susceptibilidades a hipertensión, dislipidemias, diabetes tipo 2, obesidad y enfermedad cardiovascular.",
    targets: [
      "Adultos con antecedentes familiares de enfermedades cardiovasculares",
      "Sobrepeso u obesidad con riesgo metabólico",
      "Hipertensión, dislipidemias o alteraciones de glucosa",
      "Interés en medicina preventiva personalizada",
    ],
    output:
      "Índice Alelo + desglose por categoría + plan de prevención personalizado + metas de seguimiento.",
  },
  {
    name: "Alelo–Nutrigenómica",
    label: "Nutrigenómica",
    tier: "Nivel 2 — Prevención y estratificación de riesgo",
    image: "/images/nutrition.jpg",
    imageAlt: "Nutrigenómica y alimentación personalizada",
    color: "#7c3aed",
    description:
      "Perfil de variantes relacionadas con la respuesta a componentes dietarios, con plan de alimentación personalizado. Examina cómo los genes modulan la absorción, el metabolismo y los requerimientos individuales de nutrientes.",
    targets: [
      "Control de peso o composición corporal",
      "Optimización de metabolismo y adherencia dietaria",
      "Dislipidemia con componente nutricional",
      "Riesgo cardiometabólico con intervención alimentaria",
    ],
    output:
      "3–5 recomendaciones dietarias priorizadas con metas concretas (porciones/frecuencia) y seguimiento de marcadores clínicos.",
  },
  {
    name: "Alelo–Rendimiento Físico",
    label: "Genética del ejercicio",
    tier: "Nivel 2 — Prevención y estratificación de riesgo",
    image: "/images/exercise.jpg",
    imageAlt: "Rendimiento físico y genética del ejercicio",
    color: "#0284c7",
    description:
      "Perfil para entrenamiento, recuperación y adaptación al ejercicio, sin garantías de rendimiento. Analiza variantes vinculadas con composición muscular, capacidad aeróbica, respuesta al entrenamiento y recuperación.",
    targets: [
      "Personas físicamente activas o iniciando un programa de ejercicio",
      "Deportistas recreativos que buscan optimizar su entrenamiento",
      "Pacientes en rehabilitación física",
      "Interés en prevención de lesiones y adherencia al ejercicio",
    ],
    output:
      "Recomendaciones por dominio: entrenamiento, recuperación, prevención de lesiones y periodización básica. Indicadores de percepción de esfuerzo y consistencia.",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">Servicios</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Servicios clínicos y genómicos
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Cuatro servicios de medicina de precisión diseñados para traducir tu información
            genética en estrategias de salud personalizadas.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="text-xs font-semibold text-[#8b2fa0] tracking-widest uppercase mb-2">Nivel 1</p>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Acción terapéutica directa</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Servicios con implicación farmacológica inmediata. Los hallazgos se traducen en
                recomendaciones de ajuste o selección de medicamentos conforme a guías CPIC/ACMG.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="text-xs font-semibold text-[#7c3aed] tracking-widest uppercase mb-2">Nivel 2</p>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Prevención y estratificación de riesgo</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Servicios orientados a la prevención y el seguimiento. No son diagnósticos. Integran
                el Índice Alelo con datos clínicos para construir planes preventivos individualizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          {SERVICES.map((svc, i) => (
            <div key={svc.name} className={`grid md:grid-cols-5 gap-10 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Left: visual + title */}
              <div className="md:col-span-2 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-purple-500/10">
                  <Image
                    src={svc.image}
                    alt={svc.imageAlt}
                    width={400}
                    height={240}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span
                      className="text-xs font-semibold text-white px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${svc.color}cc` }}
                    >
                      {svc.tier.split("—")[0].trim()}
                    </span>
                  </div>
                </div>
                <div style={{ borderLeft: `3px solid ${svc.color}` }} className="pl-4">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
                    {svc.label}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900">{svc.name}</h2>
                  <p className="text-xs text-gray-400 mt-1">{svc.tier}</p>
                </div>
              </div>

              {/* Right: content */}
              <div className="md:col-span-3 space-y-5">
                <p className="text-gray-600 leading-relaxed">{svc.description}</p>

                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                    Perfil del paciente objetivo
                  </h4>
                  <ul className="space-y-1.5">
                    {svc.targets.map((t, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-600">
                        <span style={{ color: svc.color }} className="mt-0.5 flex-shrink-0">›</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Resultado clínico
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{svc.output}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Complementary services */}
          <div className="p-8 rounded-2xl bg-white border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Servicios complementarios</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Coordinación con especialistas",
                  desc: "Si los hallazgos requieren evaluación adicional o sugieren enfermedad monogénica de alta penetrancia, se activa una ruta de referencia a genética clínica con clasificación de variantes conforme a criterios ACMG/AMP.",
                },
                {
                  title: "Reporte para el paciente",
                  desc: "Además del reporte clínico técnico, cada paciente recibe un reporte en lenguaje accesible que describe qué se analizó, qué se encontró (sin determinismo), qué hacer a continuación y cuándo regresar.",
                },
                {
                  title: "Seguimiento clínico estructurado",
                  desc: "Cada servicio incluye un esquema de seguimiento: desde 2–8 semanas (PGx) hasta 6–12 meses (cardiometabólico/nutrigenómica), con metas clínicas y ajuste dinámico del plan.",
                },
                {
                  title: "Estudios de laboratorio complementarios",
                  desc: "Se solicitan pruebas específicas (perfil lipídico, glucosa, HbA1c, tensión arterial, composición corporal) para integrar marcadores bioquímicos con el perfil genómico.",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Agenda una consulta
            </Link>
            <Link
              href="/ciencia"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8b2fa0] hover:text-[#8b2fa0] transition-colors"
            >
              Conoce el Índice Alelo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
