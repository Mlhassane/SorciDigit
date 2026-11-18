import { Metadata } from "next"
import PortfolioPageClient from "./page-client"
import { getProjects } from "@/lib/cms-server"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Portfolio | Réalisations Web & Mobile Sorci Digit",
  description:
    "Découvrez nos réalisations : applications mobiles 5 étoiles et plateformes web hautes performances conçues par Sorci Digit en Afrique de l'Ouest.",
  openGraph: {
    title: "Portfolio | Sorci Digit",
    description:
      "Nos réalisations web et mobile : DocuFlow, EcoTrack, StartKit, SmartGrenier, Agrona, HealthConnect, PayFlow.",
    type: "website",
    url: "https://www.sorcidigit.com/portfolio",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "Sorci Digit - Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sorcidigit.com/portfolio",
  },
}

export default async function PortfolioPage() {
  const projects = await getProjects()
  return <PortfolioPageClient initialProjects={projects} />
}
