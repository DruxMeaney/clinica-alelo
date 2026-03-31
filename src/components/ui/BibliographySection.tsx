import {
  BIBLIOGRAPHY,
  CATEGORY_LABEL,
  CATEGORY_COLOR,
  type BibEntry,
} from "@/data/bibliography";

interface Props {
  pageId: "ciencia" | "vias-metabolicas" | "investigacion";
}

export default function BibliographySection({ pageId }: Props) {
  const entries = BIBLIOGRAPHY.filter((e) => e.pages_site.includes(pageId));

  /* Agrupar por categoría manteniendo orden de aparición */
  const grouped = entries.reduce<Record<string, BibEntry[]>>((acc, entry) => {
    if (!acc[entry.category]) acc[entry.category] = [];
    acc[entry.category].push(entry);
    return acc;
  }, {});

  const categoryOrder = [
    "herramienta",
    "anotacion",
    "fenotipo",
    "poblacion",
    "rutas",
    "farmacogenetica",
    "estudio",
  ];

  return (
    <section
      id="referencias"
      style={{ scrollMarginTop: "72px" }}
      className="pt-14 pb-4 border-t border-gray-100"
    >
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-0.5 self-stretch rounded-full"
          style={{ background: "linear-gradient(180deg, #8b2fa0, #059669)" }}
        />
        <div>
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-0.5">
            Trazabilidad científica
          </p>
          <h2 className="text-xl font-bold text-gray-900">
            Fuentes y referencias bibliográficas
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Todas las bases de datos y publicaciones que respaldan el contenido de esta sección.
          </p>
        </div>
      </div>

      {/* Grupos por categoría */}
      <div className="space-y-7">
        {categoryOrder
          .filter((cat) => grouped[cat])
          .map((cat) => {
            const color = CATEGORY_COLOR[cat] ?? "#6b7280";
            return (
              <div key={cat}>
                {/* Etiqueta de categoría */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: color + "18",
                      color,
                    }}
                  >
                    {CATEGORY_LABEL[cat]}
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Entradas */}
                <ol className="space-y-2.5">
                  {grouped[cat].map((ref) => (
                    <li
                      key={ref.id}
                      className="text-xs text-gray-600 leading-relaxed pl-4 border-l-2"
                      style={{ borderColor: color + "40" }}
                    >
                      <span className="text-gray-800">{ref.authors}</span>{" "}
                      ({ref.year}).{" "}
                      <span className="text-gray-900 font-medium">
                        {ref.title}.
                      </span>{" "}
                      <em className="text-gray-700">{ref.journal}</em>
                      {ref.volume && `, ${ref.volume}`}
                      {ref.pages && `, ${ref.pages}`}.{" "}
                      <a
                        href={`https://doi.org/${ref.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono hover:underline transition-colors"
                        style={{ color }}
                      >
                        doi:{ref.doi}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
      </div>

      {/* Nota al pie */}
      <p className="mt-8 text-[10px] text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
        Las bases de datos referenciadas son de acceso abierto y se actualizan de forma continua.
        Las versiones utilizadas corresponden al período de análisis noviembre 2024 – marzo 2025.
        Los números de acceso (DOI) permiten verificación independiente de cada fuente.
      </p>
    </section>
  );
}
