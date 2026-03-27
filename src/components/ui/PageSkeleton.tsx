import Link from "next/link";
import GlowOrbs from "./GlowOrbs";

interface PageSkeletonProps {
  badge?: string;
  title: string;
  subtitle: string;
  status?: string;
  children?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageSkeleton({
  badge,
  title,
  subtitle,
  status = "borrador",
  children,
  ctaLabel,
  ctaHref,
}: PageSkeletonProps) {
  return (
    <>
      {/* Header de página */}
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
                {badge}
              </span>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6">
          {children || (
            <div className="space-y-6">
              <div className="p-8 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30">
                <p className="text-gray-400 text-center">
                  Esta sección se irá llenando progresivamente con contenido revisado y aprobado.
                </p>
              </div>
            </div>
          )}

          {ctaLabel && ctaHref && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link
                href={ctaHref}
                className="px-6 py-3 gradient-alelo text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
