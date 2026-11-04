import { Metadata } from "next"
import ContactPageClient from "./page-client"

export const metadata: Metadata = {
  title: "Commencez votre projet | Sorci Digit",
  description:
    "Démarrez votre projet digital avec Sorci Digit. Site web, application mobile, branding ou stratégie digitale en Afrique de l'Ouest.",
  openGraph: {
    title: "Commencez votre projet | Sorci Digit",
    description:
      "Dites-nous en plus sur votre projet et nous vous proposerons une solution digitale sur mesure.",
    type: "website",
    url: "https://www.sorcidigit.com/get-started",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "Sorci Digit - Commencez votre projet",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sorcidigit.com/get-started",
  },
}

export default function GetStartedPage() {
  return <ContactPageClient />
}
