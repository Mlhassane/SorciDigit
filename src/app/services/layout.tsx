import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services | Sorci Digit - Agence Digitale en Afrique',
  description: "Découvrez nos services : développement web sur mesure, création d'applications mobiles, automatisation métier et branding stratégique.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
