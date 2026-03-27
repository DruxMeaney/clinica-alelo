import type { Metadata } from "next";
import Link from "next/link";
import { EXTERNAL_DATABASES } from "@/data/external-databases";

export const metadata: Metadata = {
  title: "Tecnología y metodología",
  description:
    "Secuenciación NGS con Oxford Nanopore, análisis bioinformático, curación de evidencia e interpretación interdisciplinaria.",
};

export default function TecnologiaPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#2D6A4F] tracking-widest uppercase mb-4">
            Tecnología
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Tecnología y metodología
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Secuenciación de nueva generación, análisis bioinformático e interpretación clínica
            interdisciplinaria.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* NGS */}
          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Secuenciación de nueva generación (NGS)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Clínica Alelo utiliza secuenciación de nueva generación (NGS) con tecnología
              Oxford Nanopore para la identificación y confirmación de las variantes incluidas
              en los paneles diagnósticos. Esta tecnología ofrece alta sensibilidad y la posibilidad
              de procesar grandes volúmenes de muestras de manera ágil.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Oxford Nanopore es una plataforma de tercera generación que lee cadenas de ADN al
              pasar moléculas individuales a través de nanoporos proteicos incrustados en una
              membrana. Permite lecturas largas, análisis en tiempo real y portabilidad del equipo.
            </p>
          </div>

          {/* Análisis bioinformático */}
          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Análisis bioinformático</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              El equipo de genetistas valida los resultados mediante herramientas bioinformáticas,
              asegurando la exactitud de la interpretación de los datos. El proceso incluye:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Alineamiento de lecturas al genoma de referencia.</li>
              <li>Detección y llamado de variantes genéticas.</li>
              <li>Anotación funcional de cada variante detectada.</li>
              <li>Contraste con bases de datos genómicas reconocidas internacionalmente.</li>
              <li>Mantenimiento de las etiquetas clínicas oficiales asignadas por las bases de datos.</li>
            </ul>
          </div>

          {/* Curación de evidencia */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Curación de evidencia científica
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cada variante se evalúa mediante una revisión sistemática de la literatura
              siguiendo lineamientos adaptados del marco PRISMA:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-white border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-1">Bases de datos consultadas</h4>
                <p className="text-gray-600">PubMed, Scopus, Web of Science, Ensembl, 1000 Genomes Project</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-1">Período de búsqueda</h4>
                <p className="text-gray-600">Principalmente de 2010 a la fecha, con apertura para estudios fundacionales de alta relevancia</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-1">Criterios de inclusión</h4>
                <p className="text-gray-600">Estudios con revisión por pares, n ≥ 100, asociaciones estadísticamente significativas (p &lt; 0.05)</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-1">Criterios de exclusión</h4>
                <p className="text-gray-600">Estudios puramente in vitro, datos incompletos o variantes sin respaldo bibliográfico sólido</p>
              </div>
            </div>
          </div>

          {/* Interpretación interdisciplinaria */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Interpretación interdisciplinaria
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Con la colaboración de médicos, nutriólogos, farmacólogos y genetistas, se examinan
              conjuntamente los resultados, correlacionándolos con la historia clínica y los
              objetivos individuales del paciente. Este enfoque multidisciplinario proporciona una
              visión integral, facilitando la elaboración de recomendaciones específicas fundamentadas
              en la genética y la evidencia clínica. La información genómica se integra con
              parámetros clínicos y estudios complementarios para proponer cambios precisos en
              la dieta, el ejercicio y los estilos de vida.
            </p>
          </div>

          {/* Bases de datos */}
          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bases de datos de referencia</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {EXTERNAL_DATABASES.map((db) => (
                <a
                  key={db.name}
                  href={db.baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group"
                >
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#2D6A4F] transition-colors">
                    {db.name} &rarr;
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{db.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/proceso-clinico"
              className="px-6 py-3 bg-[#2D6A4F] text-white font-medium rounded-lg hover:bg-[#245A42] transition-colors"
            >
              Ver el proceso clínico
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
