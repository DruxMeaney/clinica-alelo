// ============================================================
// API Route: /api/ncbi
// Proxy para consultas a NCBI (dbSNP, ClinVar, PubMed)
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { fetchSnpInfo, searchPubMed, searchClinVar } from "@/lib/ncbi";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const query = searchParams.get("q");

  if (!action || !query) {
    return NextResponse.json(
      { error: "Parámetros 'action' y 'q' son requeridos." },
      { status: 400 }
    );
  }

  try {
    switch (action) {
      case "snp": {
        const data = await fetchSnpInfo(query);
        return NextResponse.json({ success: true, data });
      }
      case "pubmed": {
        const data = await searchPubMed(query);
        return NextResponse.json({ success: true, data });
      }
      case "clinvar": {
        const data = await searchClinVar(query);
        return NextResponse.json({ success: true, data });
      }
      default:
        return NextResponse.json(
          { error: `Acción '${action}' no reconocida. Usa: snp, pubmed, clinvar.` },
          { status: 400 }
        );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
