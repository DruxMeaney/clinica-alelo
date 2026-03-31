"use client";

import Link from "next/link";
import { useState } from "react";
import { MAIN_NAV } from "@/data/site-structure";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-purple-100/50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Isotipo Alelo — Manual de Identidad 2024 */}
          <svg width="36" height="36" viewBox="0 0 120 120" className="text-[#8b2fa0] group-hover:text-[#a855f7] transition-colors">
            <path d="M10 30 L10 110 L70 110 L70 70 L110 70 L110 10 L50 10 L50 30 Z" fill="currentColor"/>
            <rect x="30" y="30" width="30" height="30" fill="white"/>
          </svg>
          <div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              alelo
            </span>
            <span className="hidden sm:block text-[10px] text-gray-400 tracking-wider uppercase -mt-0.5">
              Medicina Genómica Preventiva
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-gray-600 hover:text-[#8b2fa0] transition-colors rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contacto"
            className="hidden md:inline-flex px-5 py-2.5 gradient-alelo text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Contacto
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700"
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-purple-100/50 bg-white/95 backdrop-blur-xl px-6 py-4 space-y-1">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm text-gray-600 hover:text-[#8b2fa0]"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
