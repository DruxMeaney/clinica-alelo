import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteGate from "@/components/ui/SiteGate";
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
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <SiteGate>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SiteGate>
      </body>
    </html>
  );
}
