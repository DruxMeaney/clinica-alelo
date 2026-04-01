import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteGate from "@/components/ui/SiteGate";
import ThemeProvider from "@/components/ui/ThemeProvider";
import PaletteSwitcher from "@/components/ui/PaletteSwitcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Clínica Alelo — Medicina Genómica Preventiva",
    template: "%s | Clínica Alelo",
  },
  description:
    "Clínica de investigación genómica y atención clínica personalizada enfocada en la prevención cardiometabólica, nutrigenómica y respuesta al ejercicio para la población mexicana.",
  keywords: [
    "medicina genómica",
    "genómica preventiva",
    "clínica genómica México",
    "Índice Alelo",
    "SNV",
    "riesgo cardiometabólico",
    "nutrigenómica",
    "farmacogenética",
    "Oxford Nanopore",
    "medicina personalizada",
  ],
  openGraph: {
    title: "Clínica Alelo — Medicina Genómica Preventiva",
    description:
      "Investigación genómica y atención clínica personalizada para la prevención y el cuidado de la salud en México.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Inline script — runs before first paint to apply saved theme.
          Prevents flash of unstyled/wrong-theme content on page load.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('alelo-theme');if(t&&t!=='original')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <ThemeProvider>
          <SiteGate>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SiteGate>
          <PaletteSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
