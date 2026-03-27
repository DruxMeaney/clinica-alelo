// ============================================================
// Los 7 módulos del Índice Alelo
// ============================================================

import { IndiceAleloModule } from "@/types";

export const INDICE_ALELO_MODULES: IndiceAleloModule[] = [
  {
    id: "peso-obesidad",
    name: "Regulación del peso y obesidad",
    shortDescription:
      "Evalúa variantes asociadas con la regulación del apetito, el metabolismo basal, la acumulación de tejido adiposo y la predisposición genética a la obesidad.",
    fullDescription: "", // POR LLENAR — desarrollo detallado
    icon: "scale",
    colorAccent: "#2D6A4F",
    snvCount: 0, // POR DEFINIR
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide: "", // POR LLENAR
  },
  {
    id: "diabetes-tipo2",
    name: "Diabetes tipo 2",
    shortDescription:
      "Analiza variantes relacionadas con la resistencia a la insulina, la función de las células beta pancreáticas y el metabolismo de la glucosa, con especial énfasis en el módulo SLC16A11, variante de alta relevancia para la población mexicana.",
    fullDescription: "", // POR LLENAR
    icon: "droplet",
    colorAccent: "#1B4965",
    snvCount: 0, // POR DEFINIR
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide: "", // POR LLENAR
  },
  {
    id: "rendimiento-deportivo",
    name: "Rendimiento deportivo y composición muscular",
    shortDescription:
      "Examina variantes vinculadas con la composición de fibras musculares, la capacidad aeróbica, la recuperación y la respuesta al entrenamiento físico.",
    fullDescription: "", // POR LLENAR
    icon: "activity",
    colorAccent: "#3A7D44",
    snvCount: 0, // POR DEFINIR
    hasProtectiveVariants: false,
    hasRiskVariants: false,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide: "", // POR LLENAR
  },
  {
    id: "salud-cardiovascular",
    name: "Salud cardiovascular",
    shortDescription:
      "Integra variantes asociadas con hipertensión, dislipidemias, riesgo de eventos cardiovasculares y factores de coagulación.",
    fullDescription: "", // POR LLENAR
    icon: "heart",
    colorAccent: "#9B2226",
    snvCount: 0, // POR DEFINIR
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide: "", // POR LLENAR
  },
  {
    id: "nutrigenomica",
    name: "Nutrigenómica y micronutrientes",
    shortDescription:
      "Evalúa variantes que influyen en la absorción, el metabolismo y los requerimientos de vitaminas, minerales y macronutrientes.",
    fullDescription: "", // POR LLENAR
    icon: "leaf",
    colorAccent: "#606C38",
    snvCount: 0, // POR DEFINIR
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide: "", // POR LLENAR
  },
  {
    id: "farmacogenetica",
    name: "Farmacogenética y respuesta a fármacos",
    shortDescription:
      "Identifica variantes que modulan la absorción, el metabolismo y la eficacia de fármacos comunes, permitiendo anticipar ajustes terapéuticos.",
    fullDescription: "", // POR LLENAR
    icon: "pill",
    colorAccent: "#5C4D7D",
    snvCount: 0, // POR DEFINIR
    hasProtectiveVariants: false,
    hasRiskVariants: false,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide: "", // POR LLENAR
  },
  {
    id: "bienestar-general",
    name: "Tendencias de bienestar y salud general",
    shortDescription:
      "Agrupa variantes relacionadas con inflamación sistémica, respuesta al estrés oxidativo, longevidad y otros indicadores de salud general.",
    fullDescription: "", // POR LLENAR
    icon: "sun",
    colorAccent: "#BC6C25",
    snvCount: 0, // POR DEFINIR
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide: "", // POR LLENAR
  },
];
