import { Metadata } from "next"
import ServicesPageClient from "./page-client"

export const metadata: Metadata = {
  title: "Nos Services | Agence Digitale Sorci Digit",
  description:
    "Découvrez nos services digitaux : création de sites web, applications mobiles, branding, e-commerce, AgriTech et stratégie digitale en Afrique de l'Ouest pour entrepreneurs ambitieux.",
  openGraph: {
    title: "Nos Services | Sorci Digit",
    description:
      "Création de sites web, applications mobiles, branding et stratégie digitale pour entrepreneurs ambitieux en Afrique de l'Ouest.",
    type: "website",
    url: "https://www.sorcidigit.com/services",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "Sorci Digit - Nos Services",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sorcidigit.com/services",
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
