// ============================================================
// Glosario científico — definiciones de referencia
// ============================================================

export interface GlossaryTerm {
  term: string;
  definition: string;
  source?: string;
  relatedTerms?: string[];
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "ADN (Ácido desoxirribonucleico)",
    definition:
      "Molécula que contiene las instrucciones genéticas para el desarrollo, funcionamiento y reproducción de todos los organismos vivos conocidos. Está compuesta por dos cadenas de nucleótidos que forman una doble hélice. Cada nucleótido contiene una base nitrogenada (adenina, timina, guanina o citosina), un azúcar (desoxirribosa) y un grupo fosfato.",
    source: "NHGRI Genome Glossary",
    relatedTerms: ["nucleótido", "genoma", "gen"],
  },
  {
    term: "Gen",
    definition:
      "Unidad funcional y física de la herencia. Los genes son segmentos de ADN que contienen las instrucciones para sintetizar proteínas o moléculas funcionales de ARN. El genoma humano contiene entre 20,000 y 25,000 genes codificantes de proteínas.",
    source: "NHGRI Genome Glossary",
    relatedTerms: ["ADN", "proteína", "genoma"],
  },
  {
    term: "Genoma",
    definition:
      "Conjunto completo de ADN de un organismo, incluyendo todos sus genes y secuencias no codificantes. El genoma humano contiene aproximadamente 3,200 millones de pares de bases distribuidos en 23 pares de cromosomas.",
    source: "NHGRI Genome Glossary",
    relatedTerms: ["ADN", "cromosoma", "gen"],
  },
  {
    term: "SNV (Variante de un solo nucleótido)",
    definition:
      "Cambio en una sola posición (base) del ADN. Las SNVs son la forma más común de variación genética entre individuos humanos. Un individuo típico porta entre 4 y 5 millones de SNVs respecto al genoma de referencia. La mayoría son neutrales, pero algunas se asocian con susceptibilidades a enfermedades, respuesta a fármacos o características biológicas.",
    source: "NCBI dbSNP / NHGRI",
    relatedTerms: ["alelo", "polimorfismo", "genotipo"],
  },
  {
    term: "SNP (Polimorfismo de un solo nucleótido)",
    definition:
      "Variante de un solo nucleótido que se presenta con una frecuencia de al menos 1% en una población. Es un subconjunto de las SNVs. Los SNPs son marcadores ampliamente utilizados en estudios de asociación genómica (GWAS) y en la construcción de perfiles de riesgo.",
    source: "NHGRI Genome Glossary",
    relatedTerms: ["SNV", "frecuencia alélica", "GWAS"],
  },
  {
    term: "Alelo",
    definition:
      "Cada una de las formas alternativas que puede presentar un gen o una variante genética en una posición específica del genoma. Los organismos diploides (como los humanos) portan dos alelos para cada posición: uno heredado de cada progenitor. La palabra 'alelo' da nombre a Clínica Alelo como símbolo de la individualidad genética.",
    source: "NHGRI Genome Glossary",
    relatedTerms: ["gen", "genotipo", "heterocigoto", "homocigoto"],
  },
  {
    term: "Genotipo",
    definition:
      "Combinación de alelos que un individuo posee en una o más posiciones genómicas. Por ejemplo, para una SNV con alelos A y G, los genotipos posibles son AA, AG o GG.",
    source: "NHGRI Genome Glossary",
    relatedTerms: ["alelo", "fenotipo", "heterocigoto"],
  },
  {
    term: "Fenotipo",
    definition:
      "Conjunto de características observables de un individuo resultantes de la interacción entre su genotipo y el ambiente. Incluye rasgos físicos, bioquímicos y fisiológicos.",
    source: "NHGRI Genome Glossary",
    relatedTerms: ["genotipo", "expresión génica"],
  },
  {
    term: "Frecuencia alélica",
    definition:
      "Proporción con la que un alelo específico aparece en una población determinada. Las frecuencias alélicas varían entre poblaciones debido a la historia evolutiva, migración, selección natural y deriva genética. Conocer la frecuencia alélica en la población mexicana es esencial para interpretar correctamente la relevancia clínica de una variante.",
    source: "gnomAD / 1000 Genomes",
    relatedTerms: ["alelo", "población", "MAF"],
  },
  {
    term: "MAF (Frecuencia del alelo menor)",
    definition:
      "Frecuencia del alelo menos común en una población específica. Se utiliza para distinguir variantes raras (MAF < 1%) de variantes comunes (MAF ≥ 1%). La MAF puede variar significativamente entre grupos poblacionales.",
    source: "gnomAD",
    relatedTerms: ["frecuencia alélica", "SNP"],
  },
  {
    term: "Secuenciación de nueva generación (NGS)",
    definition:
      "Conjunto de tecnologías que permiten la lectura masiva y paralela de fragmentos de ADN. A diferencia de la secuenciación Sanger (primera generación), la NGS permite analizar millones de fragmentos simultáneamente, reduciendo costos y tiempos. Oxford Nanopore, utilizada en Clínica Alelo, es una plataforma de tercera generación que permite lecturas largas en tiempo real.",
    source: "NHGRI",
    relatedTerms: ["secuenciación", "Oxford Nanopore", "bioinformática"],
  },
  {
    term: "Oxford Nanopore",
    definition:
      "Tecnología de secuenciación de tercera generación que lee cadenas de ADN o ARN al pasar moléculas individuales a través de nanoporos proteicos incrustados en una membrana. Permite lecturas largas, análisis en tiempo real y portabilidad del equipo. Clínica Alelo utiliza esta plataforma como base de su infraestructura de secuenciación.",
    source: "Oxford Nanopore Technologies",
    relatedTerms: ["NGS", "secuenciación", "MinION"],
  },
  {
    term: "Bioinformática",
    definition:
      "Disciplina que aplica herramientas computacionales y estadísticas al análisis de datos biológicos. En el contexto de Clínica Alelo, la bioinformática se utiliza para el alineamiento de lecturas, la detección de variantes, la anotación funcional y la integración de datos genómicos con bases de datos clínicas y poblacionales.",
    source: "NHGRI",
    relatedTerms: ["NGS", "análisis de variantes", "pipeline"],
  },
  {
    term: "Farmacogenética",
    definition:
      "Estudio de cómo las variantes genéticas de un individuo influyen en su respuesta a los medicamentos. Permite anticipar si un fármaco será eficaz, requerirá ajuste de dosis, o podría producir efectos adversos en un paciente específico.",
    source: "PharmGKB / CPIC",
    relatedTerms: ["farmacogenómica", "CYP450", "metabolizador"],
  },
  {
    term: "Nutrigenómica",
    definition:
      "Área de la ciencia que estudia la relación entre los nutrientes, la dieta y la expresión génica. Incluye cómo las variantes genéticas influyen en la absorción, el metabolismo y los requerimientos de nutrientes específicos de cada individuo.",
    source: "NuGO / ISNN",
    relatedTerms: ["nutrigenética", "metabolismo", "micronutrientes"],
  },
  {
    term: "GWAS (Estudio de asociación del genoma completo)",
    definition:
      "Tipo de estudio que analiza cientos de miles o millones de variantes genéticas en grandes grupos de personas para identificar asociaciones estadísticas entre variantes específicas y rasgos o enfermedades. Los GWAS han identificado miles de variantes asociadas con enfermedades comunes, muchas de las cuales se evalúan en el Índice Alelo.",
    source: "NHGRI-EBI GWAS Catalog",
    relatedTerms: ["SNP", "asociación", "riesgo genético"],
  },
  {
    term: "Haplogrupo",
    definition:
      "Grupo de haplotipos (conjunto de variantes heredadas juntas) que comparten un ancestro común. Los haplogrupos del ADN mitocondrial y del cromosoma Y se utilizan para estudiar la historia poblacional y las migraciones humanas. Clínica Alelo contempla el análisis de haplogrupos como línea complementaria de estudio de ancestría.",
    source: "ISOGG / PhyloTree",
    relatedTerms: ["ancestría", "ADN mitocondrial", "cromosoma Y"],
  },
  {
    term: "Consentimiento informado",
    definition:
      "Proceso y documento mediante el cual una persona recibe información clara, completa y comprensible sobre un procedimiento médico o de investigación, sus beneficios, riesgos y alternativas, y decide de manera libre y voluntaria si participa o no. En genómica, incluye el manejo de datos genéticos y los posibles hallazgos incidentales.",
    source: "NOM-012-SSA3-2012 / Declaración de Helsinki",
    relatedTerms: ["ética", "confidencialidad", "datos sensibles"],
  },
  {
    term: "Medicina de precisión",
    definition:
      "Enfoque médico que utiliza información individual —genética, ambiental y de estilo de vida— para diseñar estrategias de prevención, diagnóstico y tratamiento más específicas y eficaces para cada persona.",
    source: "NIH / PMI",
    relatedTerms: ["medicina personalizada", "genómica", "prevención"],
  },
];
