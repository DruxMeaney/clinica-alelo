// ============================================================
// Bibliografía — fuentes de datos primarias del panel Alelo
// ============================================================

export interface BibEntry {
  id: string;
  tag: string;
  category:
    | "herramienta"
    | "anotacion"
    | "fenotipo"
    | "poblacion"
    | "rutas"
    | "farmacogenetica"
    | "estudio";
  authors: string;
  year: number;
  title: string;
  journal: string;
  volume?: string;
  pages?: string;
  doi: string;
  url: string;
  /** Páginas del sitio donde esta referencia es relevante */
  pages_site: Array<"ciencia" | "vias-metabolicas" | "investigacion">;
}

export const BIBLIOGRAPHY: BibEntry[] = [
  /* ── Herramienta de anotación ────────────────────────────── */
  {
    id: "snpnexus",
    tag: "SNPnexus",
    category: "herramienta",
    authors: "Oscanoa J, Sivapalan L, Kinnersley B, et al.",
    year: 2020,
    title:
      "SNPnexus: a web server for functional annotation of human genome sequence variation (2020 update)",
    journal: "Nucleic Acids Research",
    volume: "48(W1)",
    pages: "W185–W192",
    doi: "10.1093/nar/gkaa420",
    url: "https://www.snp-nexus.org/v4/",
    pages_site: ["ciencia", "investigacion"],
  },

  /* ── Anotación funcional ──────────────────────────────────── */
  {
    id: "ensembl",
    tag: "Ensembl / VEP",
    category: "anotacion",
    authors: "Martin FJ, Amode MR, Aneja A, et al.",
    year: 2023,
    title: "Ensembl 2023",
    journal: "Nucleic Acids Research",
    volume: "51(D1)",
    pages: "D933–D941",
    doi: "10.1093/nar/gkac958",
    url: "https://www.ensembl.org/",
    pages_site: ["ciencia", "investigacion"],
  },
  {
    id: "polyphen2",
    tag: "PolyPhen-2",
    category: "anotacion",
    authors: "Adzhubei IA, Schmidt S, Peshkin L, et al.",
    year: 2010,
    title: "A method and server for predicting damaging missense mutations",
    journal: "Nature Methods",
    volume: "7",
    pages: "248–249",
    doi: "10.1038/nmeth0410-248",
    url: "http://genetics.bwh.harvard.edu/pph2/",
    pages_site: ["ciencia"],
  },
  {
    id: "sift",
    tag: "SIFT",
    category: "anotacion",
    authors: "Ng PC, Henikoff S.",
    year: 2003,
    title: "SIFT: Predicting amino acid changes that affect protein function",
    journal: "Nucleic Acids Research",
    volume: "31(13)",
    pages: "3812–3814",
    doi: "10.1093/nar/gkg509",
    url: "https://sift.bii.a-star.edu.sg/",
    pages_site: ["ciencia"],
  },

  /* ── Fenotipos y asociaciones ─────────────────────────────── */
  {
    id: "clinvar",
    tag: "ClinVar",
    category: "fenotipo",
    authors: "Landrum MJ, Lee JM, Benson M, et al.",
    year: 2018,
    title:
      "ClinVar: improving access to variant interpretations and supporting evidence",
    journal: "Nucleic Acids Research",
    volume: "46(D1)",
    pages: "D1062–D1067",
    doi: "10.1093/nar/gkx1153",
    url: "https://www.ncbi.nlm.nih.gov/clinvar/",
    pages_site: ["ciencia", "vias-metabolicas"],
  },
  {
    id: "gwascatalog",
    tag: "GWAS Catalog",
    category: "fenotipo",
    authors: "Sollis E, Mosaku A, Abid A, et al.",
    year: 2023,
    title:
      "The NHGRI-EBI GWAS Catalog: knowledgebase and deposition resource",
    journal: "Nucleic Acids Research",
    volume: "51(D1)",
    pages: "D977–D985",
    doi: "10.1093/nar/gkac1010",
    url: "https://www.ebi.ac.uk/gwas/",
    pages_site: ["ciencia", "vias-metabolicas", "investigacion"],
  },
  {
    id: "cosmic",
    tag: "COSMIC",
    category: "fenotipo",
    authors: "Tate JG, Bamford S, Jubb HC, et al.",
    year: 2019,
    title: "COSMIC: the Catalogue Of Somatic Mutations In Cancer",
    journal: "Nucleic Acids Research",
    volume: "47(D1)",
    pages: "D941–D947",
    doi: "10.1093/nar/gky1015",
    url: "https://cancer.sanger.ac.uk/cosmic",
    pages_site: ["investigacion"],
  },

  /* ── Frecuencias poblacionales ────────────────────────────── */
  {
    id: "gnomad",
    tag: "gnomAD v4",
    category: "poblacion",
    authors: "Chen S, Francioli LC, Goodrich JK, et al.",
    year: 2024,
    title:
      "A genomic mutational constraint map using variation in 76,156 human genomes",
    journal: "Nature",
    volume: "625",
    pages: "92–100",
    doi: "10.1038/s41586-023-06045-0",
    url: "https://gnomad.broadinstitute.org/",
    pages_site: ["ciencia", "vias-metabolicas"],
  },
  {
    id: "1000genomes",
    tag: "1000 Genomes Project",
    category: "poblacion",
    authors: "1000 Genomes Project Consortium.",
    year: 2015,
    title: "A global reference for human genetic variation",
    journal: "Nature",
    volume: "526",
    pages: "68–74",
    doi: "10.1038/nature15393",
    url: "https://www.internationalgenome.org/",
    pages_site: ["ciencia", "vias-metabolicas", "investigacion"],
  },
  {
    id: "hapmap",
    tag: "HapMap Phase 3",
    category: "poblacion",
    authors: "International HapMap 3 Consortium.",
    year: 2010,
    title:
      "Integrating common and rare genetic variation in diverse human populations",
    journal: "Nature",
    volume: "467",
    pages: "52–58",
    doi: "10.1038/nature09298",
    url: "https://www.ncbi.nlm.nih.gov/variation/news/NCBI_retiring_HapMap/",
    pages_site: ["ciencia", "investigacion"],
  },

  /* ── Rutas metabólicas ────────────────────────────────────── */
  {
    id: "reactome",
    tag: "Reactome",
    category: "rutas",
    authors: "Gillespie M, Jassal B, Stephan R, et al.",
    year: 2022,
    title: "The reactome pathway knowledgebase 2022",
    journal: "Nucleic Acids Research",
    volume: "50(D1)",
    pages: "D687–D692",
    doi: "10.1093/nar/gkab1028",
    url: "https://reactome.org/",
    pages_site: ["ciencia", "vias-metabolicas", "investigacion"],
  },

  /* ── Farmacogenómica ──────────────────────────────────────── */
  {
    id: "pharmgkb",
    tag: "PharmGKB",
    category: "farmacogenetica",
    authors: "Barbarino JM, Whirl-Carrillo M, Altman RB, Klein TE.",
    year: 2018,
    title:
      "PharmGKB: A worldwide resource for pharmacogenomic information",
    journal: "Wiley Interdisciplinary Reviews: Systems Biology and Medicine",
    volume: "10(4)",
    pages: "e1417",
    doi: "10.1002/wsbm.1417",
    url: "https://www.pharmgkb.org/",
    pages_site: ["ciencia", "vias-metabolicas"],
  },
  {
    id: "cpic",
    tag: "CPIC",
    category: "farmacogenetica",
    authors: "Relling MV, Klein TE, Gammal RS, et al.",
    year: 2020,
    title:
      "The Clinical Pharmacogenetics Implementation Consortium: 10 Years Later",
    journal: "Clinical Pharmacology & Therapeutics",
    volume: "107(1)",
    pages: "171–175",
    doi: "10.1002/cpt.1651",
    url: "https://cpicpgx.org/",
    pages_site: ["ciencia", "vias-metabolicas"],
  },

  /* ── Estudios de referencia ───────────────────────────────── */
  {
    id: "sigma",
    tag: "SIGMA 2014",
    category: "estudio",
    authors: "SIGMA Type 2 Diabetes Consortium.",
    year: 2014,
    title:
      "Sequence variants in SLC16A11 are a common risk factor for type 2 diabetes in Mexico",
    journal: "Nature",
    volume: "506",
    pages: "97–101",
    doi: "10.1038/nature12828",
    url: "https://doi.org/10.1038/nature12828",
    pages_site: ["ciencia", "vias-metabolicas"],
  },
  {
    id: "sirugo2019",
    tag: "Sirugo et al. 2019",
    category: "estudio",
    authors: "Sirugo G, Williams SM, Tishkoff SA.",
    year: 2019,
    title: "The missing diversity in human genetic studies",
    journal: "Cell",
    volume: "177(1)",
    pages: "26–31",
    doi: "10.1016/j.cell.2019.02.048",
    url: "https://doi.org/10.1016/j.cell.2019.02.048",
    pages_site: ["ciencia"],
  },
];

export const CATEGORY_LABEL: Record<string, string> = {
  herramienta: "Herramienta de anotación",
  anotacion: "Anotación funcional",
  fenotipo: "Fenotipos y asociaciones clínicas",
  poblacion: "Frecuencias poblacionales",
  rutas: "Rutas metabólicas",
  farmacogenetica: "Farmacogenómica",
  estudio: "Estudios de referencia",
};

export const CATEGORY_COLOR: Record<string, string> = {
  herramienta: "#8b2fa0",
  anotacion: "#7c3aed",
  fenotipo: "#e11d73",
  poblacion: "#059669",
  rutas: "#0891b2",
  farmacogenetica: "#d97706",
  estudio: "#6b7280",
};
