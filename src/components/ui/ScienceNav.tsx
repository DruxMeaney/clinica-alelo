"use client";
import { useState, useEffect } from "react";

export interface ScienceSection {
  id: string;
  num: string;
  label: string;
  shortLabel: string;
}

export const SCIENCE_SECTIONS: ScienceSection[] = [
  { id: "contexto",   num: "01", label: "El problema",         shortLabel: "Contexto"   },
  { id: "panel",      num: "02", label: "El panel genómico",   shortLabel: "Panel"      },
  { id: "funcion",    num: "03", label: "Impacto funcional",   shortLabel: "Función"    },
  { id: "poblacion",  num: "04", label: "Base poblacional",    shortLabel: "Población"  },
  { id: "redes",      num: "05", label: "Redes biológicas",    shortLabel: "Redes"      },
  { id: "modelo",     num: "06", label: "El Índice Alelo",     shortLabel: "Modelo"     },
  { id: "conclusion", num: "07", label: "Conclusión",          shortLabel: "Cierre"     },
];

export default function ScienceNav() {
  const [active, setActive] = useState<string>("contexto");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("science-hero");

    const heroObs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0 }
    );
    if (heroEl) heroObs.observe(heroEl);

    const sectionObs: IntersectionObserver[] = [];
    SCIENCE_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -60% 0px" }
      );
      obs.observe(el);
      sectionObs.push(obs);
    });

    return () => {
      heroObs.disconnect();
      sectionObs.forEach(o => o.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (!visible) return null;

  const activeIdx = SCIENCE_SECTIONS.findIndex(s => s.id === active);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all"
      style={{ backgroundColor: "rgba(10,8,24,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none py-2.5">
          {/* Progress line */}
          <div className="hidden md:flex items-center gap-0.5 mr-3 flex-shrink-0">
            <span className="text-[10px] text-gray-600 font-mono mr-1">ciencia</span>
            <div className="w-24 h-0.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${((activeIdx + 1) / SCIENCE_SECTIONS.length) * 100}%`, backgroundColor: "#8b2fa0" }}
              />
            </div>
          </div>

          {SCIENCE_SECTIONS.map((s, i) => {
            const isActive = s.id === active;
            const isPast = i < activeIdx;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                title={s.label}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all flex-shrink-0 group"
                style={isActive
                  ? { backgroundColor: "#8b2fa0", color: "#fff" }
                  : { color: isPast ? "#6b7280" : "#4b5563" }
                }
              >
                <span
                  className="text-[10px] font-mono leading-none transition-colors"
                  style={{ color: isActive ? "#d8b4fe" : isPast ? "#4b5563" : "#374151" }}
                >
                  {s.num}
                </span>
                <span className={`text-[11px] font-medium transition-colors ${isActive ? "text-white" : "group-hover:text-gray-300"}`}>
                  {s.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
