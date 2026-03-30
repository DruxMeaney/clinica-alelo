import type { Metadata } from "next";
import ClinicaGateway from "./ClinicaGateway";

export const metadata: Metadata = {
  title: "Área clínica — Uso interno",
  description: "Sección restringida para el personal clínico de Clínica Alelo.",
};

export default function ClinicaPage() {
  return <ClinicaGateway />;
}
