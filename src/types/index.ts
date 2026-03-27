// ============================================================
// Clínica Alelo — Tipos base del sitio
// ============================================================

/** Variante de un solo nucleótido (SNV) */
export interface SNV {
  rsId: string;           // Identificador en dbSNP (e.g. "rs9939609")
  gene: string;           // Gen asociado (e.g. "FTO")
  chromosome: string;     // Cromosoma
  position: number;       // Posición genómica
  referenceAllele: string;
  alternateAllele: string;
  clinicalSignificance: "riesgo" | "protectora" | "neutral" | "farmacogenetica";
  moduleId: IndiceAleloModuleId;
  clinicalWeight: number; // Peso clínico 0-1
  evidenceLevel: "alta" | "moderada" | "emergente";
  populationRelevance: "global" | "mexicana" | "latinoamericana";
  ncbiUrl: string;        // Enlace directo a dbSNP/ClinVar
  pubmedIds: string[];    // PMIDs de evidencia
  description: string;    // Descripción breve para el sitio
}

/** Identificadores de los 7 módulos del Índice Alelo */
export type IndiceAleloModuleId =
  | "peso-obesidad"
  | "diabetes-tipo2"
  | "rendimiento-deportivo"
  | "salud-cardiovascular"
  | "nutrigenomica"
  | "farmacogenetica"
  | "bienestar-general";

/** Módulo del Índice Alelo */
export interface IndiceAleloModule {
  id: IndiceAleloModuleId;
  name: string;
  shortDescription: string;
  fullDescription: string;       // Por llenar
  icon: string;                  // Nombre del ícono
  colorAccent: string;           // Color del módulo
  snvCount: number;              // Número de SNVs evaluados
  hasProtectiveVariants: boolean;
  hasRiskVariants: boolean;
  scaleMin: 0;
  scaleMax: 100;
  interpretationGuide: string;   // Por llenar
}

/** Sección del sitio web */
export interface SiteSection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  objective: string;
  keyMessage: string;
  contentStatus: "esqueleto" | "borrador" | "revisado" | "final";
  visualElement: string;
  cta: CallToAction;
}

export interface CallToAction {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "outline";
}

/** Miembro del equipo */
export interface TeamMember {
  name: string;
  role: string;
  discipline: string;
  bio: string;                   // Por llenar
  photoUrl: string;
}

/** Paso del flujo clínico */
export interface ClinicalStep {
  order: number;
  title: string;
  description: string;
  icon: string;
}

/** Pregunta frecuente */
export interface FAQ {
  question: string;
  answer: string;
  category: "general" | "genetica" | "indice-alelo" | "proceso" | "etica" | "tecnologia";
}

/** Respuesta de la API de NCBI */
export interface NCBISnpResponse {
  rsId: string;
  gene: string;
  chromosome: string;
  position: number;
  alleles: string[];
  clinicalSignificance: string;
  maf: number | null;           // Minor allele frequency
  publications: string[];
}

/** Configuración de enlace a base de datos externa */
export interface ExternalDatabase {
  name: string;
  baseUrl: string;
  description: string;
  queryPattern: string;
}
