// ============================================================
// Conexiones con bases de datos genómicas externas
// ============================================================

import { ExternalDatabase } from "@/types";

export const EXTERNAL_DATABASES: ExternalDatabase[] = [
  {
    name: "dbSNP (NCBI)",
    baseUrl: "https://www.ncbi.nlm.nih.gov/snp/",
    description:
      "Base de datos de variantes genéticas de un solo nucleótido del National Center for Biotechnology Information.",
    queryPattern: "https://www.ncbi.nlm.nih.gov/snp/{rsId}",
  },
  {
    name: "ClinVar (NCBI)",
    baseUrl: "https://www.ncbi.nlm.nih.gov/clinvar/",
    description:
      "Archivo de relaciones entre variantes genéticas humanas y fenotipos clínicos, con interpretaciones de significancia clínica.",
    queryPattern:
      "https://www.ncbi.nlm.nih.gov/clinvar/?term={rsId}",
  },
  {
    name: "PubMed (NCBI)",
    baseUrl: "https://pubmed.ncbi.nlm.nih.gov/",
    description:
      "Base de datos de literatura biomédica y ciencias de la vida.",
    queryPattern: "https://pubmed.ncbi.nlm.nih.gov/{pmid}",
  },
  {
    name: "OMIM",
    baseUrl: "https://omim.org/",
    description:
      "Online Mendelian Inheritance in Man — catálogo de genes humanos y enfermedades genéticas.",
    queryPattern: "https://omim.org/entry/{omimId}",
  },
  {
    name: "gnomAD",
    baseUrl: "https://gnomad.broadinstitute.org/",
    description:
      "Genome Aggregation Database — frecuencias alélicas en poblaciones diversas.",
    queryPattern:
      "https://gnomad.broadinstitute.org/variant/{variantId}?dataset=gnomad_r4",
  },
  {
    name: "Ensembl",
    baseUrl: "https://www.ensembl.org/",
    description:
      "Navegador genómico que integra anotaciones, variantes y datos regulatorios.",
    queryPattern:
      "https://www.ensembl.org/Homo_sapiens/Variation/Explore?v={rsId}",
  },
  {
    name: "PharmGKB",
    baseUrl: "https://www.pharmgkb.org/",
    description:
      "Base de datos de farmacogenómica — relaciones gen-fármaco-fenotipo.",
    queryPattern: "https://www.pharmgkb.org/rsid/{rsId}",
  },
  {
    name: "SNPedia",
    baseUrl: "https://www.snpedia.com/",
    description:
      "Wiki de variantes genéticas humanas con información sobre efectos fenotípicos.",
    queryPattern: "https://www.snpedia.com/index.php/{rsId}",
  },
  {
    name: "GWAS Catalog (NHGRI-EBI)",
    baseUrl: "https://www.ebi.ac.uk/gwas/",
    description:
      "Catálogo de estudios de asociación del genoma completo y sus variantes asociadas.",
    queryPattern:
      "https://www.ebi.ac.uk/gwas/variants/{rsId}",
  },
  {
    name: "UniProt",
    baseUrl: "https://www.uniprot.org/",
    description:
      "Base de datos de secuencias y funciones de proteínas.",
    queryPattern: "https://www.uniprot.org/uniprotkb?query={gene}+AND+organism_id:9606",
  },
];

/**
 * Genera la URL de consulta para una base de datos externa.
 */
export function buildDatabaseUrl(
  db: ExternalDatabase,
  params: Record<string, string>
): string {
  let url = db.queryPattern;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`{${key}}`, encodeURIComponent(value));
  }
  return url;
}

/**
 * Genera el enlace directo a dbSNP para un rsId dado.
 */
export function getDbSnpUrl(rsId: string): string {
  return `https://www.ncbi.nlm.nih.gov/snp/${rsId}`;
}

/**
 * Genera el enlace a ClinVar para un rsId dado.
 */
export function getClinVarUrl(rsId: string): string {
  return `https://www.ncbi.nlm.nih.gov/clinvar/?term=${rsId}`;
}

/**
 * Genera el enlace a PubMed para un PMID dado.
 */
export function getPubMedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}`;
}

/**
 * Genera el enlace a gnomAD para una variante.
 */
export function getGnomadUrl(chromosome: string, position: number, ref: string, alt: string): string {
  return `https://gnomad.broadinstitute.org/variant/${chromosome}-${position}-${ref}-${alt}?dataset=gnomad_r4`;
}

/**
 * Genera el enlace a PharmGKB para un rsId dado.
 */
export function getPharmGKBUrl(rsId: string): string {
  return `https://www.pharmgkb.org/rsid/${rsId}`;
}
