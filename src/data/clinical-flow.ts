// ============================================================
// Flujo clínico del paciente
// ============================================================

import { ClinicalStep } from "@/types";

export const CLINICAL_STEPS: ClinicalStep[] = [
  {
    order: 1,
    title: "Recepción",
    description:
      "Primer contacto con el equipo de Clínica Alelo. Se brinda orientación sobre el proceso y se aclaran expectativas.",
    icon: "clipboard-check",
  },
  {
    order: 2,
    title: "Consentimiento informado",
    description:
      "Documento donde el paciente autoriza, con pleno conocimiento, la toma de muestra, el análisis genético y el uso de sus datos bajo estricta confidencialidad.",
    icon: "file-signature",
  },
  {
    order: 3,
    title: "Historia clínica",
    description:
      "Recopilación de antecedentes médicos personales y familiares, condiciones actuales, medicamentos y factores de riesgo conocidos.",
    icon: "stethoscope",
  },
  {
    order: 4,
    title: "Cuestionarios de estilo de vida",
    description:
      "Evaluación de hábitos de alimentación, actividad física, sueño, estrés y otros factores ambientales relevantes para la interpretación clínica.",
    icon: "list-checks",
  },
  {
    order: 5,
    title: "Toma de muestra biológica",
    description:
      "Obtención de la muestra necesaria para la extracción de ADN, siguiendo protocolos de trazabilidad y buenas prácticas de laboratorio.",
    icon: "test-tube",
  },
  {
    order: 6,
    title: "Secuenciación y análisis genético",
    description:
      "Procesamiento de la muestra mediante secuenciación de nueva generación (Oxford Nanopore) y análisis bioinformático de las variantes detectadas.",
    icon: "dna",
  },
  {
    order: 7,
    title: "Interpretación interdisciplinaria",
    description:
      "El equipo multidisciplinario —médicos, genetistas, biólogos moleculares, nutriólogos— analiza los hallazgos en contexto clínico y poblacional.",
    icon: "users",
  },
  {
    order: 8,
    title: "Entrega de resultados",
    description:
      "Sesión personalizada donde se explican los resultados del Índice Alelo, los hallazgos relevantes y su significado clínico.",
    icon: "presentation",
  },
  {
    order: 9,
    title: "Recomendaciones personalizadas",
    description:
      "Plan de prevención, seguimiento y, cuando aplique, intervención personalizada basado en el perfil genómico, la historia clínica y los estudios de laboratorio.",
    icon: "target",
  },
  {
    order: 10,
    title: "Seguimiento clínico e integración investigativa",
    description:
      "Acompañamiento continuo del paciente y, con su consentimiento, integración anonimizada de datos a las bases de investigación poblacional de Alelo.",
    icon: "refresh-cw",
  },
];
