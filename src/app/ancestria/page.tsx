import type { Metadata } from "next";
import PageSkeleton from "@/components/ui/PageSkeleton";

export const metadata: Metadata = {
  title: "Ancestría genética",
  description: "Línea complementaria de análisis de ancestría genética con pertinencia científica.",
};

export default function AncestriaPage() {
  return (
    <PageSkeleton
      badge="Línea complementaria"
      title="Ancestría genética"
      subtitle="Una perspectiva complementaria de sofisticación científica."
      ctaLabel="Más sobre nuestra ciencia"
      ctaHref="/investigacion"
    >
      <div className="space-y-8">
        <div className="p-8 rounded-2xl border border-gray-100 bg-white">
          <p className="text-gray-600 leading-relaxed">
            Clínica Alelo contempla la posibilidad de incorporar análisis de ancestría genética
            como línea complementaria, utilizando metodologías compatibles con su plataforma
            tecnológica. Esto incluye enfoques de secuenciación de representación reducida,
            paneles de SNP informativos de ancestría (AIMs), análisis de haplogrupos
            mitocondriales y del cromosoma Y, cuando resulte pertinente para el contexto
            clínico o investigativo del paciente.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-amber-100 bg-amber-50/50">
          <p className="text-sm text-amber-700">
            Esta línea se presenta como un complemento de sofisticación científica y no como
            entretenimiento genealógico superficial. Su implementación dependerá de la
            pertinencia clínica, la validación metodológica y el contexto de cada caso.
          </p>
        </div>

        {[
          { title: "Haplogrupos mitocondriales", desc: "POR LLENAR — Análisis del ADN mitocondrial para estudio de linaje materno." },
          { title: "Haplogrupos del cromosoma Y", desc: "POR LLENAR — Análisis del cromosoma Y para estudio de linaje paterno." },
          { title: "SNP informativos de ancestría (AIMs)", desc: "POR LLENAR — Paneles de variantes que permiten estimar proporciones de ancestría." },
          { title: "Secuenciación de representación reducida", desc: "POR LLENAR — Enfoque de secuenciación dirigida compatible con Oxford Nanopore." },
        ].map((item) => (
          <div key={item.title} className="p-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </PageSkeleton>
  );
}
