"use client";

import Link from "next/link";
import { useState } from "react";
import { MAIN_NAV } from "@/data/site-structure";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#2D6A4F] flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              Clínica Alelo
            </span>
            <span className="hidden sm:block text-xs text-gray-500 -mt-0.5">
              Medicina Genómica Preventiva
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button className="px-3 py-2 text-sm text-gray-700 hover:text-[#2D6A4F] transition-colors rounded-md">
                  {item.label}
                  <svg className="inline-block ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2D6A4F] first:rounded-t-lg last:rounded-b-lg"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-gray-700 hover:text-[#2D6A4F] transition-colors rounded-md"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contacto"
            className="hidden md:inline-flex px-5 py-2.5 bg-[#2D6A4F] text-white text-sm font-medium rounded-lg hover:bg-[#245A42] transition-colors"
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
        <nav className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-1">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <div key={item.label}>
                <span className="block px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item.label}
                </span>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-6 py-2 text-sm text-gray-700 hover:text-[#2D6A4F]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-gray-700 hover:text-[#2D6A4F]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
