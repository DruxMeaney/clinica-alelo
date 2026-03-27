// ============================================================
// Utilidades para consultar las APIs de NCBI
// ============================================================
// Documentación: https://www.ncbi.nlm.nih.gov/home/develop/api/
// E-utilities base: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/

const NCBI_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

// Se recomienda registrar un api_key en NCBI para mayor rate limit.
// Sin api_key: 3 requests/segundo. Con api_key: 10 requests/segundo.
const NCBI_API_KEY = process.env.NCBI_API_KEY || "";

interface ESearchResult {
  esearchresult: {
    idlist: string[];
    count: string;
  };
}

interface ESummaryResult {
  result: Record<string, unknown>;
}

/**
 * Busca en una base de datos de NCBI.
 * @param db - Base de datos (e.g., "snp", "pubmed", "clinvar")
 * @param term - Término de búsqueda
 * @param retmax - Máximo de resultados
 */
export async function ncbiSearch(
  db: string,
  term: string,
  retmax: number = 10
): Promise<ESearchResult> {
  const params = new URLSearchParams({
    db,
    term,
    retmax: String(retmax),
    retmode: "json",
    ...(NCBI_API_KEY && { api_key: NCBI_API_KEY }),
  });

  const res = await fetch(`${NCBI_BASE}/esearch.fcgi?${params}`);
  if (!res.ok) throw new Error(`NCBI esearch failed: ${res.status}`);
  return res.json();
}

/**
 * Obtiene resúmenes de registros de NCBI.
 * @param db - Base de datos
 * @param ids - Lista de IDs
 */
export async function ncbiSummary(
  db: string,
  ids: string[]
): Promise<ESummaryResult> {
  const params = new URLSearchParams({
    db,
    id: ids.join(","),
    retmode: "json",
    ...(NCBI_API_KEY && { api_key: NCBI_API_KEY }),
  });

  const res = await fetch(`${NCBI_BASE}/esummary.fcgi?${params}`);
  if (!res.ok) throw new Error(`NCBI esummary failed: ${res.status}`);
  return res.json();
}

/**
 * Obtiene información detallada de un SNP por rsId.
 * Utiliza la API de variación de NCBI.
 * @param rsId - Identificador del SNP (e.g., "rs9939609")
 */
export async function fetchSnpInfo(rsId: string): Promise<unknown> {
  // La NCBI Variation Services API
  const numericId = rsId.replace("rs", "");
  const url = `https://api.ncbi.nlm.nih.gov/variation/v0/refsnp/${numericId}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`NCBI SNP API failed for ${rsId}: ${res.status}`);
  return res.json();
}

/**
 * Busca publicaciones en PubMed relacionadas con un gen o SNP.
 * @param query - Término de búsqueda (gen, rsId, etc.)
 * @param maxResults - Máximo de resultados
 */
export async function searchPubMed(
  query: string,
  maxResults: number = 5
): Promise<{ pmids: string[]; count: number }> {
  const result = await ncbiSearch("pubmed", query, maxResults);
  return {
    pmids: result.esearchresult.idlist,
    count: parseInt(result.esearchresult.count, 10),
  };
}

/**
 * Busca variantes en ClinVar por gen o rsId.
 */
export async function searchClinVar(
  query: string,
  maxResults: number = 10
): Promise<{ ids: string[]; count: number }> {
  const result = await ncbiSearch("clinvar", query, maxResults);
  return {
    ids: result.esearchresult.idlist,
    count: parseInt(result.esearchresult.count, 10),
  };
}
