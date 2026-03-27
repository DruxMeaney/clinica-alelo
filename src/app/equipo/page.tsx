import type { Metadata } from "next";
import PageSkeleton from "@/components/ui/PageSkeleton";

export const metadata: Metadata = {
  title: "Equipo multidisciplinario",
  description: "Clínica, laboratorio, bioinformática e investigación en un solo equipo.",
};

const DISCIPLINES = [
  { role: "Médicos generales y especialistas", desc: "Evaluación clínica, historia médica, integración de resultados y seguimiento del paciente." },
  { role: "Genetistas", desc: "Interpretación de variantes, asesoramiento genético y evaluación de significancia clínica." },
  { role: "Biólogos moleculares", desc: "Procesamiento de muestras, extracción de ADN y control de calidad en laboratorio." },
  { role: "Nutriólogos", desc: "Traducción de hallazgos nutrigenómicos en recomendaciones alimentarias personalizadas." },
  { role: "Farmacéuticos", desc: "Interpretación farmacogenética y orientación sobre ajustes terapéuticos." },
  { role: "Profesionales de actividad física", desc: "Diseño de estrategias de ejercicio basadas en el perfil genético de respuesta al entrenamiento." },
  { role: "Bioinformática e investigación", desc: "Análisis computacional, curación de datos y desarrollo de modelos interpretativos." },
  { role: "Bioestadística", desc: "Análisis estadístico de datos poblacionales y validación de resultados." },
];

export default function EquipoPage() {
  return (
    <PageSkeleton
      badge="Equipo"
      title="Equipo multidisciplinario"
      subtitle="Clínica, laboratorio, bioinformática e investigación en un solo equipo."
      ctaLabel="Contáctanos"
      ctaHref="/contacto"
    >
      <div className="space-y-6">
        <div className="p-6 rounded-2xl border border-gray-100 bg-white">
          <p className="text-gray-600 leading-relaxed">
            La interpretación genómica no recae en una sola disciplina. Clínica Alelo articula
            diferentes profesionales para construir una visión integrada del perfil biológico
            de cada paciente.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {DISCIPLINES.map((d) => (
            <div key={d.role} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{d.role}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Perfiles individuales</h3>
          <p className="text-gray-400">POR LLENAR — Fotografías, nombres, biografías breves de los miembros del equipo.</p>
        </div>
      </div>
    </PageSkeleton>
  );
}
