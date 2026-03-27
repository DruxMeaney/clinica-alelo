import Link from "next/link";

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
  status = "esqueleto",
  children,
  ctaLabel,
  ctaHref,
}: PageSkeletonProps) {
  return (
    <>
      {/* Header de página */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          {badge && (
            <p className="text-sm font-medium text-[#2D6A4F] tracking-widest uppercase mb-4">
              {badge}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            {subtitle}
          </p>
          {status === "esqueleto" && (
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-medium text-amber-700">
                Contenido en desarrollo
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {children || (
            <div className="space-y-6">
              <div className="p-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
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
                className="px-6 py-3 bg-[#2D6A4F] text-white font-medium rounded-lg hover:bg-[#245A42] transition-colors"
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
