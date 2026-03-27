import type { Metadata } from "next";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";
import { INDICE_ALELO_MODULES } from "@/data/indice-alelo-modules";

export const metadata: Metadata = {
  title: "Índice Alelo",
  description: "Sistema de integración genómica: 7 módulos temáticos, escala 0-100, variantes de riesgo y protectoras.",
};

export default function IndiceAleloPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Sistema de integración genómica
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Índice Alelo
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Tu perfil genómico, traducido en módulos interpretables.
          </p>
        </div>
      </section>

      {/* Qué es */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">¿Qué es el Índice Alelo?</h2>
            <p className="text-gray-600 leading-relaxed">
              Un sistema de integración genómica diseñado para convertir la información de múltiples
              variantes de un solo nucleótido (SNV) en puntajes modulares interpretables. Organiza
              la información genética en siete módulos temáticos y expresa la carga relativa de
              riesgo o protección en una escala porcentual de 0 a 100, permitiendo una lectura
              clínica más clara, visual e intuitiva.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">¿Por qué se creó?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              La secuenciación genómica puede arrojar información sobre decenas o cientos de
              variantes en un solo individuo. Interpretar estas variantes de manera aislada
              resulta poco práctico tanto para el clínico como para el paciente. El Índice Alelo
              nace para resolver este problema: integrar múltiples variantes en módulos temáticos
              coherentes que traduzcan la complejidad genómica en información accionable.
            </p>
            <p className="text-gray-600 leading-relaxed">
              En lugar de presentar un listado extenso de genotipos, el Índice agrupa las variantes
              por su relevancia biológica y clínica, las pondera según la evidencia disponible y
              genera una estimación neta que orienta las decisiones de prevención, seguimiento e
              intervención personalizada.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">¿Cómo se leen los puntajes?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cada módulo expresa su resultado en una escala de 0 a 100. En los módulos de riesgo
              (como salud cardiovascular o diabetes tipo 2), un puntaje más alto indica mayor carga
              genética asociada a ese eje. En módulos orientativos (como rendimiento deportivo o
              farmacogenética), el puntaje no indica riesgo sino perfil o tendencia.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dentro de cada módulo pueden coexistir variantes de riesgo y variantes protectoras.
              Ambas se interpretan de manera diferenciada: las variantes de riesgo suman carga
              al módulo, mientras que las protectoras la atenúan. La estimación final es una
              estimación neta que refleja el balance entre ambas.
            </p>
            <p className="text-gray-600 leading-relaxed font-medium">
              El resultado no debe entenderse como destino biológico, sino como una herramienta
              de interpretación clínica y preventiva que siempre debe complementarse con historia
              clínica, estudios de laboratorio y evaluación del estilo de vida.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Peso clínico de cada variante</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cada SNV incluida en el Índice recibe un peso clínico determinado por tres criterios:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Magnitud del efecto</h4>
                <p className="text-xs text-gray-600">El tamaño del efecto reportado en estudios de asociación (odds ratios, hazard ratios) y su significancia estadística (p &lt; 0.05, n ≥ 100).</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Robustez de la evidencia</h4>
                <p className="text-xs text-gray-600">El respaldo en metaanálisis, la replicación en múltiples estudios y la publicación en revistas indexadas con revisión por pares.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Acción clínica posible</h4>
                <p className="text-xs text-gray-600">La capacidad de traducir el hallazgo en una recomendación preventiva, nutricional, farmacológica o de seguimiento concreto.</p>
              </div>
            </div>
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
                {mod.interpretationGuide && (
                  <p className="mt-4 text-xs text-gray-400 italic line-clamp-2">{mod.interpretationGuide}</p>
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
            className="px-7 py-3.5 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
          >
            Agenda una consulta
          </Link>
        </div>
      </section>
    </>
  );
}
