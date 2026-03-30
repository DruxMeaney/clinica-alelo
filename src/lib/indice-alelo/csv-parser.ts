/**
 * Parser del archivo SNV_completa.csv
 * Transforma las 71 columnas del CSV maestro a SNVRecord[]
 */

import type { SNVRecord, InheritanceModel } from "./engine";

const POPS = ["General", "Europea", "Americana", "Latinoamericana", "Mexicana"];

function safeFloat(val: string | undefined): number {
  if (!val) return NaN;
  const cleaned = val.trim().replace(",", ".");
  const n = parseFloat(cleaned);
  return isNaN(n) ? NaN : n;
}

function safeStr(val: string | undefined): string {
  return (val ?? "").trim();
}

/**
 * Parsea el contenido de un CSV (texto completo) a registros SNV.
 */
/**
 * Aplica los modelos de herencia a los registros SNV.
 * inheritanceData es un objeto { rsID: "aditivo"|"dominante"|"recesivo" }
 */
export function applyInheritanceModels(
  records: SNVRecord[],
  inheritanceData: Record<string, string>
): SNVRecord[] {
  return records.map(r => ({
    ...r,
    inheritanceModel: (inheritanceData[r.rsID] as InheritanceModel) || "aditivo",
  }));
}

export function parseSNVcsv(csvText: string): SNVRecord[] {
  // Detectar y remover BOM si existe
  const text = csvText.replace(/^\uFEFF/, "");

  const lines = text.split("\n").filter(l => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const headers = parseCSVLine(lines[0]);
  const colIndex = new Map<string, number>();
  headers.forEach((h, i) => colIndex.set(h.trim(), i));

  const records: SNVRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 5) continue;

    const get = (name: string) => {
      const idx = colIndex.get(name);
      return idx !== undefined ? cols[idx] : undefined;
    };

    const altAlleles: Record<string, string> = {};
    const freqAlt: Record<string, number> = {};
    const pPrior: Record<string, number> = {};
    const qPrior: Record<string, number> = {};
    const hweAA: Record<string, number> = {};
    const hweAa: Record<string, number> = {};
    const hweaa: Record<string, number> = {};

    for (const pop of POPS) {
      altAlleles[pop] = safeStr(get(`ALT_mas_frecuente_${pop}`));
      freqAlt[pop] = safeFloat(get(`Freq_ALT_mas_frecuente_${pop}`));
      pPrior[pop] = safeFloat(get(`p_prior_ALT_${pop}`));
      qPrior[pop] = safeFloat(get(`q_prior_ALT_${pop}`));
      hweAA[pop] = safeFloat(get(`P_HWE_AA_ALT_${pop}`));
      hweAa[pop] = safeFloat(get(`P_HWE_Aa_ALT_${pop}`));
      hweaa[pop] = safeFloat(get(`P_HWE_aa_ALT_${pop}`));
    }

    const rsID = safeStr(get("rsID"));
    if (!rsID) continue;

    records.push({
      rsID,
      gene: safeStr(get("Gene")),
      wi: safeFloat(get("Wi")) || 0,
      tipo: safeStr(get("tipo")),
      funcion: safeStr(get("Función fisiológica clave")),
      indice: Math.round(safeFloat(get("indice")) || 0),
      category: safeStr(get("Category")),
      alleleRef: safeStr(get("AlleleRef")),
      alleleString: safeStr(get("AlleleString")),
      aleloInteres: safeStr(get("Alelo_Interes") || get("Alelo_interes") || ""),
      altAlleles,
      freqAlt,
      pPrior,
      qPrior,
      hweAA,
      hweAa,
      hweaa,
      inheritanceModel: "aditivo" as InheritanceModel, // default, overridden by applyInheritanceModels
      oddsRatio: safeStr(get("OddsRatio")),
      ci95: safeStr(get("CI95")),
      pubmedID: safeStr(get("PubMedID")),
    });
  }

  return records;
}

/**
 * Parser CSV que respeta comillas y comas dentro de campos.
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

/**
 * Parser de CSV de lecturas (rsID, n, k) — para importar desde archivo.
 */
export function parseReadingsCSV(csvText: string): Map<string, { rsID: string; n: number; k: number }> {
  const text = csvText.replace(/^\uFEFF/, "");
  const lines = text.split("\n").filter(l => l.trim().length > 0);
  if (lines.length < 2) return new Map();

  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  const rsidIdx = headers.findIndex(h => h === "rsid" || h === "rs_id" || h === "snp");
  const nIdx = headers.findIndex(h => h === "n" || h === "total" || h === "coverage");
  const kIdx = headers.findIndex(h => h === "k" || h === "alt_count" || h === "alt");

  if (rsidIdx === -1 || nIdx === -1 || kIdx === -1) return new Map();

  const readings = new Map<string, { rsID: string; n: number; k: number }>();

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const rsID = (cols[rsidIdx] || "").trim();
    const n = parseInt(cols[nIdx] || "0", 10);
    const k = parseInt(cols[kIdx] || "0", 10);
    if (rsID && n > 0 && k >= 0 && k <= n) {
      readings.set(rsID, { rsID, n, k });
    }
  }

  return readings;
}
