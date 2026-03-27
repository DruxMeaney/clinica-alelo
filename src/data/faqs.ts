// ============================================================
// Preguntas frecuentes — esqueleto
// ============================================================

import { FAQ } from "@/types";

export const FAQS: FAQ[] = [
  // ─── GENERAL ───
  {
    question: "¿Qué es Clínica Alelo?",
    answer:
      "Clínica Alelo es un espacio innovador en México que conjuga la investigación genética de vanguardia con servicios clínicos orientados a la prevención y al mejoramiento de la calidad de vida. Ofrece la posibilidad de conocer tu perfil genético en tres áreas: predisposición a enfermedades cardiovasculares, nutrigenómica y metabolismo de nutrientes, y genética de la respuesta al ejercicio físico.",
    category: "general",
  },
  {
    question: "¿Qué diferencia a Clínica Alelo de otras propuestas de genómica en México?",
    answer:
      "Clínica Alelo no solo ofrece pruebas genéticas, sino que integra investigación, atención clínica y generación de conocimiento poblacional. Utilizamos una metodología rigurosa de selección de variantes, con revisión sistemática de la literatura, verificación de frecuencias alélicas en la población mexicana y un enfoque interdisciplinario que incluye médicos, genetistas, nutriólogos, farmacéuticos y profesionales de la actividad física. Además, contribuimos activamente a la ciencia mediante estudios poblacionales y publicaciones.",
    category: "general",
  },
  {
    question: "¿A quién está dirigido el servicio?",
    answer:
      "A cualquier persona interesada en conocer su perfil genético para orientar estrategias de prevención y cuidado de salud personalizado. También a médicos que deseen integrar información genómica en su práctica clínica, nutriólogos, profesionales de la actividad física, instituciones académicas, hospitales e investigadores interesados en genómica poblacional.",
    category: "general",
  },

  // ─── GENÉTICA ───
  {
    question: "¿Qué puede decirme una prueba genómica?",
    answer:
      "Una prueba genómica identifica variantes en tu ADN que pueden estar asociadas con susceptibilidades a ciertas condiciones de salud, respuestas a nutrientes, metabolismo de fármacos y otros rasgos biológicos. No predice el futuro con certeza, pero ofrece información valiosa para orientar estrategias de prevención y cuidado personalizado.",
    category: "genetica",
  },
  {
    question: "¿El análisis genético predice con certeza si desarrollaré una enfermedad?",
    answer:
      "No. La genómica estima susceptibilidades y riesgos relativos, no certezas. El desarrollo de una enfermedad depende de la interacción entre factores genéticos, ambientales, de estilo de vida y otros elementos. Un resultado de riesgo elevado no significa que la condición se presentará inevitablemente, así como un resultado de bajo riesgo no garantiza ausencia de enfermedad.",
    category: "genetica",
  },
  {
    question: "¿Qué es una variante de un solo nucleótido (SNV)?",
    answer:
      "Una SNV (Single Nucleotide Variant) es un cambio en una sola posición del ADN. El genoma humano contiene aproximadamente 3,200 millones de pares de bases, y las SNVs representan la forma más común de variación genética entre individuos. Cada persona porta millones de SNVs; la mayoría son neutras, pero algunas pueden influir en procesos biológicos como el metabolismo, la inflamación o la respuesta a fármacos.",
    category: "genetica",
  },
  {
    question: "¿Qué significa que una variante sea de riesgo o protectora?",
    answer:
      "Una variante de riesgo es aquella cuya presencia se ha asociado, con base en evidencia científica, a una mayor susceptibilidad hacia una condición o un proceso biológico específico. Una variante protectora, por el contrario, se asocia con una menor susceptibilidad o con un efecto favorable. Ambas se interpretan de manera diferenciada dentro del Índice Alelo para construir una estimación neta más precisa.",
    category: "genetica",
  },
  {
    question: "¿Todas las poblaciones tienen las mismas variantes genéticas?",
    answer:
      "No. Las frecuencias alélicas —es decir, qué tan común es una variante en un grupo— varían significativamente entre poblaciones. La población mexicana presenta una mezcla compleja de ancestrías que genera frecuencias distintas a las de poblaciones europeas, asiáticas o africanas. Esto significa que extrapolar hallazgos de otras poblaciones sin contexto local puede ser insuficiente o incluso engañoso para la práctica clínica en México.",
    category: "genetica",
  },

  // ─── ÍNDICE ALELO ───
  {
    question: "¿Qué es el Índice Alelo?",
    answer:
      "El Índice Alelo es un sistema de integración genómica diseñado por Clínica Alelo para convertir la información de múltiples variantes genéticas en puntajes modulares interpretables. Organiza la información en siete módulos temáticos y expresa la carga relativa de riesgo o protección en una escala de 0 a 100, permitiendo una lectura clínica más clara e intuitiva.",
    category: "indice-alelo",
  },
  {
    question: "¿Cómo se interpreta un puntaje del Índice Alelo?",
    answer:
      "Cada módulo del Índice Alelo expresa la carga relativa de riesgo o protección en una escala de 0 a 100. Un puntaje más alto en un módulo de riesgo indica mayor carga genética asociada a ese eje temático. Sin embargo, el puntaje debe interpretarse siempre en conjunto con la historia clínica, los estudios de laboratorio y los factores de estilo de vida. No es un diagnóstico ni un pronóstico, sino una herramienta de orientación clínica.",
    category: "indice-alelo",
  },
  {
    question: "¿El puntaje del Índice Alelo es un diagnóstico?",
    answer:
      "No. El Índice Alelo es una herramienta de interpretación clínica y preventiva, no un diagnóstico. Los puntajes reflejan una estimación de la carga genética asociada a un módulo específico, pero deben interpretarse en conjunto con la historia clínica, los estudios de laboratorio y los factores de estilo de vida de cada paciente.",
    category: "indice-alelo",
  },

  // ─── PROCESO ───
  {
    question: "¿Cómo es el proceso de atención en Clínica Alelo?",
    answer:
      "El proceso incluye: recepción y consentimiento informado, elaboración de historia clínica, cuestionarios de estilo de vida, toma de muestra biológica bajo Buenas Prácticas de Laboratorio, secuenciación con tecnología Oxford Nanopore, interpretación interdisciplinaria de resultados, entrega personalizada de resultados, propuesta de intervención, coordinación con especialistas cuando sea necesario, y seguimiento clínico continuo.",
    category: "proceso",
  },
  {
    question: "¿Necesito estudios de laboratorio además de la prueba genética?",
    answer:
      "En muchos casos, sí. La prueba genómica aporta información sobre susceptibilidades constitutivas, pero los estudios de laboratorio (por ejemplo, perfil lipídico, glucosa, hemoglobina glucosilada) reflejan el estado metabólico actual. La integración de ambos permite una interpretación más completa y recomendaciones más precisas.",
    category: "proceso",
  },
  {
    question: "¿La clínica da seguimiento después de entregar resultados?",
    answer:
      "Sí. Clínica Alelo contempla un proceso de seguimiento clínico para evaluar la adherencia a las recomendaciones, actualizar el perfil del paciente con nuevos estudios y ajustar las estrategias preventivas cuando sea necesario.",
    category: "proceso",
  },

  // ─── ÉTICA ───
  {
    question: "¿Cómo se protegen mis datos genéticos?",
    answer:
      "Clínica Alelo cumple con el marco regulatorio mexicano aplicable en materia de protección de datos personales y datos sensibles de salud. Toda la información genómica se maneja bajo estricta confidencialidad, con consentimiento informado, trazabilidad de muestras y medidas de seguridad tecnológica. Los datos no se comparten con terceros sin autorización expresa del paciente.",
    category: "etica",
  },
  {
    question: "¿Qué es el consentimiento informado?",
    answer:
      "Es un documento y proceso mediante el cual el paciente recibe información clara sobre el alcance, los beneficios, las limitaciones y los posibles hallazgos del estudio genómico, y autoriza de manera voluntaria e informada la realización del análisis y el manejo de sus datos.",
    category: "etica",
  },

  // ─── TECNOLOGÍA ───
  {
    question: "¿Qué tecnología utiliza Clínica Alelo para la secuenciación?",
    answer:
      "Clínica Alelo utiliza secuenciación de nueva generación basada en tecnología Oxford Nanopore, que permite lecturas largas de ADN en tiempo real. Esta plataforma se complementa con análisis bioinformático, curación de literatura científica y revisión de bases de datos genómicas para la interpretación de cada variante.",
    category: "tecnologia",
  },
  {
    question: "¿Qué bases de datos científicas respaldan los análisis de Alelo?",
    answer:
      "Los análisis se apoyan en bases de datos reconocidas internacionalmente, incluyendo dbSNP y ClinVar del NCBI, gnomAD del Broad Institute, PharmGKB para farmacogenómica, el catálogo GWAS del NHGRI-EBI, Ensembl y literatura publicada en PubMed, entre otras fuentes.",
    category: "tecnologia",
  },
];
