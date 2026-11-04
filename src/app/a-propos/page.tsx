import { Metadata } from "next"
import AboutPageClient from "./page-client"

export const metadata: Metadata = {
  title: "À Propos | Qui sommes-nous - Sorci Digit",
  description:
    "Sorci Digit est une agence digitale basée en Afrique de l'Ouest. Nous aidons les entreprises et startups à valoriser leurs produits grâce au web, mobile et branding.",
  openGraph: {
    title: "À Propos | Sorci Digit",
    description:
      "Notre histoire, notre mission et notre approche ROIste pour le développement web, mobile et branding en Afrique de l'Ouest.",
    type: "website",
    url: "https://www.sorcidigit.com/a-propos",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "Sorci Digit - À Propos",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sorcidigit.com/a-propos",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
