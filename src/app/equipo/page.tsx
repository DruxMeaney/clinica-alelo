import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Equipo multidisciplinario",
  description:
    "Médicos, genetistas, biólogos moleculares, nutriólogos, farmacéuticos, profesionales de actividad física, bioinformática y bioestadística.",
};

const DISCIPLINES = [
  {
    role: "Médicos generales y especialistas",
    desc: "Responsables de elaborar la historia clínica inicial, interpretar resultados, emitir recomendaciones preventivas y, en caso necesario, remitir a otros niveles de atención en hospitales o instituciones asociadas.",
    focus: "Evaluación clínica, diagnóstico integrado y seguimiento del paciente.",
    icon: "stethoscope",
  },
  {
    role: "Genetistas y biólogos moleculares",
    desc: "Encargados del análisis técnico de las muestras, la interpretación de datos genómicos y la validación de resultados de acuerdo con los protocolos de Buenas Prácticas de Laboratorio.",
    focus: "Secuenciación, genotipado, control de calidad y análisis molecular.",
    icon: "dna",
  },
  {
    role: "Nutriólogos",
    desc: "Colaboran en el diseño de planes de alimentación y en la elaboración de recomendaciones nutricionales específicas, en función de las variantes genéticas detectadas en el módulo de nutrigenómica.",
    focus: "Planes nutricionales personalizados y orientación dietaria basada en genómica.",
    icon: "leaf",
  },
  {
    role: "Farmacéuticos",
    desc: "Participan en la interpretación farmacogenética y en el diseño de planes de suplementación que compensen carencias nutrimentales o fortalezcan rutas metabólicas identificadas.",
    focus: "Farmacogenética, suplementación dirigida y ajustes terapéuticos.",
    icon: "pill",
  },
  {
    role: "Profesionales de la actividad física",
    desc: "Proponen y supervisan rutinas de ejercicio adaptadas al perfil genético, en coordinación con las necesidades y objetivos de cada paciente, basándose en los resultados del módulo de rendimiento deportivo.",
    focus: "Prescripción de ejercicio personalizado y prevención de lesiones.",
    icon: "activity",
  },
  {
    role: "Personal de investigación y bioestadística",
    desc: "Responsable de centralizar la información genética y clínica con el fin de elaborar estudios epidemiológicos, publicaciones científicas y reportes para la comunidad académica.",
    focus: "Análisis estadístico, estudios poblacionales y publicación de hallazgos.",
    icon: "chart",
  },
  {
    role: "Bioinformática",
    desc: "Desarrolla y opera los pipelines computacionales para el alineamiento de lecturas, la detección de variantes, la anotación funcional y la integración con bases de datos genómicas internacionales.",
    focus: "Pipelines de análisis, conexión con NCBI/Ensembl/gnomAD y desarrollo del Índice Alelo.",
    icon: "code",
  },
  {
    role: "Personal de atención y recepción",
    desc: "Primer punto de contacto con el paciente. Brinda orientación sobre el proceso, aclara expectativas y acompaña al paciente durante toda su experiencia en la clínica.",
    focus: "Experiencia del paciente, logística clínica y gestión administrativa.",
    icon: "users",
  },
];

export default function EquipoPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-gray-50 to-purple-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Equipo
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Equipo multidisciplinario
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Clínica, laboratorio, bioinformática e investigación en un solo equipo.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          {/* Principio */}
          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <p className="text-gray-700 leading-relaxed text-lg">
              La interpretación genómica no recae en una sola disciplina. Clínica Alelo está
              integrada por un equipo multidisciplinario donde médicos, nutriólogos, farmacólogos,
              genetistas, biólogos moleculares y bioinformáticos examinan conjuntamente los
              resultados, correlacionándolos con la historia clínica y los objetivos individuales
              de cada paciente. Este enfoque proporciona una visión integral que ninguna disciplina
              podría ofrecer por sí sola.
            </p>
          </div>

          {/* Disciplinas */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Disciplinas del equipo</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {DISCIPLINES.map((d) => (
                <div
                  key={d.role}
                  className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-[#8b2fa0]" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{d.role}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{d.desc}</p>
                  <p className="text-xs text-[#8b2fa0] font-medium">{d.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enfoque colaborativo */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Enfoque colaborativo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              La correlación entre datos genómicos (identificados mediante secuenciación de nueva
              generación), parámetros clínicos y estudios complementarios permite proponer cambios
              precisos en la dieta, el ejercicio y los estilos de vida. Este modelo, basado en la
              individualidad biológica, prevé un seguimiento continuo, de tal forma que las
              recomendaciones se ajusten de manera dinámica conforme evolucione la condición
              del paciente.
            </p>
            <p className="text-gray-600 leading-relaxed">
              La articulación con hospitales y especialistas médicos garantiza la continuidad en
              la atención para quienes requieran un seguimiento clínico más profundo.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/contacto"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
