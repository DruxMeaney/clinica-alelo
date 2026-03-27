import type { Metadata } from "next";
import Link from "next/link";
import { INDICE_ALELO_MODULES } from "@/data/indice-alelo-modules";

export const metadata: Metadata = {
  title: "Índice Alelo",
  description: "Sistema de integración genómica: 7 módulos temáticos, escala 0-100, variantes de riesgo y protectoras.",
};

export default function IndiceAleloPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#2D6A4F] tracking-widest uppercase mb-4">
            Sistema de integración genómica
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Índice Alelo
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Tu perfil genómico, traducido en módulos interpretables.
          </p>
        </div>
      </section>

      {/* Qué es */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="p-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">¿Qué es el Índice Alelo?</h2>
            <p className="text-gray-400">Un sistema de integración genómica diseñado para convertir la información de múltiples variantes de un solo nucleótido (SNV) en puntajes modulares interpretables. Organiza la información genética en siete módulos temáticos y expresa la carga relativa de riesgo o protección en una escala porcentual de 0 a 100.</p>
          </div>

          <div className="p-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">¿Por qué se creó?</h2>
            <p className="text-gray-400">POR LLENAR — Problema que resuelve: la complejidad de interpretar múltiples variantes de manera aislada. La necesidad de una lectura clínica integrada, visual e intuitiva.</p>
          </div>

          <div className="p-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">¿Cómo se leen los puntajes?</h2>
            <p className="text-gray-400">POR LLENAR — Escala 0-100, significado de los rangos, diferenciación entre variantes de riesgo y protectoras, estimación neta. El resultado no es un destino biológico sino una herramienta de interpretación clínica y preventiva.</p>
          </div>

          <div className="p-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Peso clínico de cada variante</h2>
            <p className="text-gray-400">Cada SNV recibe un peso clínico según la magnitud del efecto, la robustez de la evidencia y el grado de acción clínica posible. Las variantes se seleccionan por evidencia científica, relevancia clínica y pertinencia poblacional.</p>
          </div>
        </div>
      </section>

      {/* Los 7 módulos */}
      <section id="modulos" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Los siete módulos
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Cada módulo agrupa variantes relacionadas con un eje temático de salud.
            Dentro de algunos módulos coexisten variantes de riesgo y variantes protectoras.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDICE_ALELO_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${mod.colorAccent}15` }}
                >
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: mod.colorAccent }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{mod.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{mod.shortDescription}</p>
                <div className="flex gap-2 text-xs">
                  {mod.hasRiskVariants && (
                    <span className="px-2 py-1 rounded-full bg-red-50 text-red-600">
                      Variantes de riesgo
                    </span>
                  )}
                  {mod.hasProtectiveVariants && (
                    <span className="px-2 py-1 rounded-full bg-green-50 text-green-600">
                      Variantes protectoras
                    </span>
                  )}
                </div>
                {mod.fullDescription === "" && (
                  <p className="mt-4 text-xs text-amber-500">Descripción extendida por desarrollar</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-6">
            ¿Quieres conocer tu perfil genómico a través del Índice Alelo?
          </p>
          <Link
            href="/contacto"
            className="px-7 py-3.5 bg-[#2D6A4F] text-white font-medium rounded-lg hover:bg-[#245A42] transition-colors"
          >
            Agenda una consulta
          </Link>
        </div>
      </section>
    </>
  );
}
