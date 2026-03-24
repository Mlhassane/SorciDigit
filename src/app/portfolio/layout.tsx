import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Réalisations | Sorci Digit',
  description: "Découvrez nos projets : applications mobiles performantes, plateformes SaaS, et sites web innovants réalisés pour nos clients.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
