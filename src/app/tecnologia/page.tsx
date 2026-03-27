import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EXTERNAL_DATABASES } from "@/data/external-databases";
import GlowOrbs from "@/components/ui/GlowOrbs";

export const metadata: Metadata = {
  title: "Tecnología y metodología",
  description:
    "Secuenciación NGS con Oxford Nanopore, análisis bioinformático, curación de evidencia e interpretación interdisciplinaria.",
};

export default function TecnologiaPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
              Tecnología
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Tecnología y metodología
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Secuenciación de nueva generación, análisis bioinformático e interpretación clínica
            interdisciplinaria.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6 space-y-16">

          {/* NGS + imagen */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Secuenciación de nueva generación
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
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10">
              <Image
                src="/images/sequencing-lab.jpg"
                alt="Equipo de secuenciación genómica en laboratorio"
                width={600}
                height={400}
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <p className="absolute bottom-3 left-4 text-xs text-white/70">
                Equipos de secuenciación genómica de nueva generación
              </p>
            </div>
          </div>

          {/* Bioinformática + imagen */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10">
              <Image
                src="/images/bioinformatics.jpg"
                alt="Análisis bioinformático de datos genómicos"
                width={600}
                height={400}
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <p className="absolute bottom-3 left-4 text-xs text-white/70">
                Análisis bioinformático e interpretación de variantes
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Análisis bioinformático</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                El equipo de genetistas valida los resultados mediante herramientas bioinformáticas,
                asegurando la exactitud de la interpretación de los datos.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  Alineamiento de lecturas al genoma de referencia
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  Detección y llamado de variantes genéticas
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  Anotación funcional de cada variante detectada
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  Contraste con bases de datos genómicas reconocidas
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  Mantenimiento de etiquetas clínicas oficiales
                </li>
              </ul>
            </div>
          </div>

          {/* Curación de evidencia */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-purple-500 via-fuchsia-500 to-pink-500" />
            <div className="p-8 rounded-2xl bg-white border border-gray-100 ml-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Curación de evidencia científica
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Cada variante se evalúa mediante una revisión sistemática de la literatura
                siguiendo lineamientos adaptados del marco PRISMA.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/50">
                  <h4 className="font-semibold text-gray-900 mb-1">Bases de datos consultadas</h4>
                  <p className="text-gray-600">PubMed, Scopus, Web of Science, Ensembl, 1000 Genomes Project</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/50">
                  <h4 className="font-semibold text-gray-900 mb-1">Período de búsqueda</h4>
                  <p className="text-gray-600">Principalmente de 2010 a la fecha, con apertura para estudios fundacionales</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/50">
                  <h4 className="font-semibold text-gray-900 mb-1">Criterios de inclusión</h4>
                  <p className="text-gray-600">Estudios con revisión por pares, n ≥ 100, asociaciones significativas (p &lt; 0.05)</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/50">
                  <h4 className="font-semibold text-gray-900 mb-1">Criterios de exclusión</h4>
                  <p className="text-gray-600">Estudios puramente in vitro, datos incompletos o variantes sin respaldo sólido</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interpretación + imagen microscopio */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
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
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10">
              <Image
                src="/images/microscope.jpg"
                alt="Microscopio en laboratorio de biología molecular"
                width={600}
                height={400}
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <p className="absolute bottom-3 left-4 text-xs text-white/70">
                Análisis molecular e interpretación de resultados
              </p>
            </div>
          </div>

          {/* Bases de datos */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Bases de datos de referencia</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXTERNAL_DATABASES.map((db) => (
                <a
                  key={db.name}
                  href={db.baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-gray-100 bg-white card-hover group"
                >
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#8b2fa0] transition-colors">
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
              className="px-6 py-3 gradient-alelo text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Ver el proceso clínico
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
